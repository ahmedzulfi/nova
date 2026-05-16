import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
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
    const tier = searchParams.get('tier') || 'All';
    const status = searchParams.get('status') || 'All';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = 20;
    const offset = (page - 1) * limit;

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
      const tierMap: Record<string, string> = { 'Adult': 'adult', 'Dog Owner': 'dog-owner', 'Cat Owner': 'cat-owner' };
      const mappedTier = tierMap[tier];
      if (mappedTier) conditions.push(eq(orders.tier, mappedTier as any));
    }

    if (status !== 'All') {
      const statusMap: Record<string, string> = { 'Active': 'PAID', 'Used': 'USED' };
      const mappedStatus = statusMap[status];
      if (mappedStatus) conditions.push(eq(orders.status, mappedStatus as any));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(whereClause);

    const results = await db
      .select()
      .from(orders)
      .where(whereClause)
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);

    const tierLabel: Record<string, string> = { 'adult': 'Adult', 'dog-owner': 'Dog Owner', 'cat-owner': 'Cat Owner' };

    const tickets = results.map((order) => ({
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
    }));

    return NextResponse.json({
      tickets,
      pagination: { total: totalCount, page, limit, totalPages: Math.ceil(totalCount / limit) },
    });
  } catch (error) {
    console.error('[GET /api/admin/orders]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
