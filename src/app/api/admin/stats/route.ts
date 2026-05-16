import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, petRegistrations } from '@/db/schema';
import { sql, eq, desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { rateLimit, RATE_LIMIT_RELAXED } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  // ─── Auth Guard ────────────────────────────────────────────────────
  const auth = await requireAdmin(req);
  if (!auth.authenticated) return auth.response;

  // ─── Rate Limit ────────────────────────────────────────────────────
  const limited = rateLimit(req, RATE_LIMIT_RELAXED);
  if (limited) return limited;

  try {
    const [regCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(petRegistrations);

    const [ticketCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(eq(orders.status, 'PAID'));

    const [attendeeCount] = await db
      .select({
        total: sql<number>`coalesce(sum(adult_qty + kids_qty), 0)::int`,
      })
      .from(orders)
      .where(eq(orders.status, 'PAID'));

    const [revenue] = await db
      .select({
        total: sql<number>`coalesce(sum(total::numeric), 0)::float`,
      })
      .from(orders)
      .where(eq(orders.status, 'PAID'));

    const recentOrders = await db
      .select({
        id: orders.id,
        type: sql<string>`'ticket'`,
        user: orders.fullName,
        detail: orders.tier,
        time: orders.createdAt,
        status: orders.status,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(5);

    const recentRegistrations = await db
      .select({
        id: petRegistrations.id,
        type: sql<string>`'registration'`,
        user: petRegistrations.ownerName,
        detail: petRegistrations.competitionName,
        time: petRegistrations.submittedAt,
        status: petRegistrations.status,
      })
      .from(petRegistrations)
      .orderBy(desc(petRegistrations.submittedAt))
      .limit(5);

    const recentActivity = [...recentOrders, ...recentRegistrations]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);

    const chartData = await db
      .select({
        day: sql<string>`to_char(created_at, 'Dy')`,
        registrations: sql<number>`count(*)::int`,
      })
      .from(orders)
      .where(sql`created_at >= now() - interval '7 days'`)
      .groupBy(sql`to_char(created_at, 'Dy'), date_trunc('day', created_at)`)
      .orderBy(sql`date_trunc('day', created_at)`);

    return NextResponse.json({
      stats: [
        { name: 'Total Registrations', value: regCount.count.toLocaleString() },
        { name: 'Tickets Sold', value: ticketCount.count.toLocaleString() },
        { name: 'Total Attendees', value: attendeeCount.total.toLocaleString() },
        { name: 'Revenue', value: `QAR ${revenue.total.toLocaleString()}` },
      ],
      recentActivity,
      chartData: chartData.length > 0 ? chartData : [
        { day: 'Mon', registrations: 0 }, { day: 'Tue', registrations: 0 },
        { day: 'Wed', registrations: 0 }, { day: 'Thu', registrations: 0 },
        { day: 'Fri', registrations: 0 }, { day: 'Sat', registrations: 0 },
        { day: 'Sun', registrations: 0 },
      ],
    });
  } catch (error) {
    console.error('[GET /api/admin/stats]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
