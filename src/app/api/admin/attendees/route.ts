import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { sql, eq, desc, ilike, or } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    // Attendees are derived from orders (no separate user accounts for buyers)
    // Group by email to get unique attendees
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

    // Total count of unique attendees
    const [{ count: totalCount }] = await db
      .select({
        count: sql<number>`count(distinct email)::int`,
      })
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
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/attendees]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
