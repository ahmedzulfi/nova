import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { sql, eq, or, ilike, and, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const tier = searchParams.get('tier') || 'All';
    const status = searchParams.get('status') || 'All';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    // Build WHERE conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(orders.fullName, `%${search}%`),
          ilike(orders.email, `%${search}%`),
          ilike(orders.id, `%${search}%`)
        )
      );
    }

    if (tier !== 'All') {
      const tierMap: Record<string, string> = {
        'Adult': 'adult',
        'Dog Owner': 'dog-owner',
        'Cat Owner': 'cat-owner',
      };
      conditions.push(eq(orders.tier, tierMap[tier] as any));
    }

    if (status !== 'All') {
      const statusMap: Record<string, string> = {
        'Active': 'PAID',
        'Used': 'USED',
      };
      conditions.push(eq(orders.status, statusMap[status] as any));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get total count
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(whereClause);

    // Get paginated results
    const results = await db
      .select()
      .from(orders)
      .where(whereClause)
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);

    // Map to frontend format
    const tickets = results.map((order) => {
      const tierLabel: Record<string, string> = {
        'adult': 'Adult',
        'dog-owner': 'Dog Owner',
        'cat-owner': 'Cat Owner',
      };

      return {
        id: order.id,
        name: order.fullName,
        email: order.email,
        type: tierLabel[order.tier] || order.tier,
        adults: order.adultQty,
        kids: order.kidsQty,
        pets: order.petQty,
        total: `QAR ${Number(order.total).toFixed(2)}`,
        date: order.createdAt.toISOString().split('T')[0],
        status: order.status === 'PAID' ? 'Active' : order.status === 'USED' ? 'Used' : order.status,
      };
    });

    return NextResponse.json({
      tickets,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/orders]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
