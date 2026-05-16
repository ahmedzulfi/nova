import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations } from '@/db/schema';
import { sql, eq, or, ilike, and, desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { rateLimit, RATE_LIMIT_RELAXED } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.authenticated) return auth.response;

  const limited = rateLimit(req, RATE_LIMIT_RELAXED);
  if (limited) return limited;

  try {
    const { searchParams } = new URL(req.url);
    const search = sanitizeString(searchParams.get('search') || '');
    const category = searchParams.get('category') || 'All';
    const status = searchParams.get('status') || 'All';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = 20;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(petRegistrations.ownerName, `%${search}%`),
          ilike(petRegistrations.petName, `%${search}%`),
          ilike(petRegistrations.ownerEmail, `%${search}%`),
          ilike(petRegistrations.id, `%${search}%`)
        )
      );
    }

    if (category !== 'All') {
      conditions.push(eq(petRegistrations.competitionName, category));
    }

    if (status !== 'All') {
      const validStatuses = ['Pending', 'Completed', 'Rejected'];
      if (validStatuses.includes(status)) {
        conditions.push(eq(petRegistrations.status, status as any));
      }
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(petRegistrations)
      .where(whereClause);

    const results = await db
      .select()
      .from(petRegistrations)
      .where(whereClause)
      .orderBy(desc(petRegistrations.submittedAt))
      .limit(limit)
      .offset(offset);

    const registrations = results.map((reg) => ({
      id: reg.id,
      owner: reg.ownerName,
      email: reg.ownerEmail || '',
      pet: reg.petName,
      category: reg.competitionName,
      date: reg.submittedAt.toISOString().split('T')[0],
      status: reg.status,
    }));

    return NextResponse.json({
      registrations,
      pagination: { total: totalCount, page, limit, totalPages: Math.ceil(totalCount / limit) },
    });
  } catch (error) {
    console.error('[GET /api/admin/registrations]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
