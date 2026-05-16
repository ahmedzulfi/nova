import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { checkoutSchema, calculateTotal, generateOrderId } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const total = calculateTotal(data.adultQty, data.kidsQty, data.petQty);
    const orderId = generateOrderId();

    const [order] = await db.insert(orders).values({
      id: orderId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      tier: data.tier,
      adultQty: data.adultQty,
      kidsQty: data.kidsQty,
      petQty: data.petQty,
      petName: data.petName || null,
      total: total.toFixed(2),
      status: 'PAID', // For MVP, skip payment gateway — mark as PAID directly
    }).returning();

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
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
      },
    });
  } catch (error) {
    console.error('[POST /api/checkout]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
