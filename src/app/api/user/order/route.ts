import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { rateLimit, RATE_LIMIT_STANDARD } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  // ─── Rate Limit ────────────────────────────────────────────────────
  const limited = rateLimit(req, RATE_LIMIT_STANDARD);
  if (limited) return limited;

  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // ─── Validate order ID format ────────────────────────────────────
    const cleanId = sanitizeString(orderId);
    if (cleanId.length > 30 || !/^#?[A-Za-z0-9\-]+$/.test(cleanId)) {
      return NextResponse.json({ error: 'Invalid order ID format' }, { status: 400 });
    }

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, cleanId),
      with: {
        registrations: true,
      },
    });

    if (!order) {
      // Generic response to prevent order ID enumeration
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const competitionEntry = order.registrations?.[0]?.competitionName || null;

    return NextResponse.json({
      fullName: order.fullName,
      email: order.email,
      phone: order.phone,
      tier: order.tier,
      adultQty: order.adultQty,
      kidsQty: order.kidsQty,
      petQty: order.petQty,
      petName: order.petName,
      total: Number(order.total),
      orderId: order.id,
      entryDate: order.createdAt.toISOString(),
      competitionEntry,
      status: order.status,
    });
  } catch (error) {
    console.error('[GET /api/user/order]', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
