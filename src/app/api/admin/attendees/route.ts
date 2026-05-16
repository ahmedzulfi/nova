import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { sql, desc, ilike, or } from 'drizzle-orm';
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
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = 20;
    const offset = (page - 1) * limit;

    const searchCondition = search
      ? or(
          ilike(orders.fullName, `%${search}%`),
          ilike(orders.email, `%${search}%`),
          ilike(orders.phone, `%${search}%`)
        )
      : undefined;

    const attendees = await db
      .select({
        name: orders.fullName,
        email: orders.email,
        phone: orders.phone,
        tickets: sql<number>`count(*)::int`,
        joined: sql<string>`min(created_at)::text`,
      })
      .from(orders)
      .where(searchCondition)
      .groupBy(orders.fullName, orders.email, orders.phone)
      .orderBy(desc(sql`min(created_at)`))
      .limit(limit)
      .offset(offset);

    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(distinct email)::int` })
      .from(orders)
      .where(searchCondition);

    const result = attendees.map((a, index) => ({
      id: index + 1 + offset,
      name: a.name,
      email: a.email,
      phone: a.phone,
      location: 'Doha, Qatar',
      joined: a.joined?.split('T')[0] || '',
      tickets: a.tickets,
    }));

    return NextResponse.json({
      attendees: result,
      pagination: { total: totalCount, page, limit, totalPages: Math.ceil(totalCount / limit) },
    });
  } catch (error) {
    console.error('[GET /api/admin/attendees]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
