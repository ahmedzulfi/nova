import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, petRegistrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: {
        registrations: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Map to the RegistrationData interface the dashboard expects
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
