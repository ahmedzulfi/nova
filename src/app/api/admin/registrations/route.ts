import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations } from '@/db/schema';
import { sql, eq, or, ilike, and, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';
    const status = searchParams.get('status') || 'All';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    // Build WHERE conditions
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
      conditions.push(eq(petRegistrations.status, status as any));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get total count
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(petRegistrations)
      .where(whereClause);

    // Get paginated results
    const results = await db
      .select()
      .from(petRegistrations)
      .where(whereClause)
      .orderBy(desc(petRegistrations.submittedAt))
      .limit(limit)
      .offset(offset);

    // Map to frontend format
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
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/registrations]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
