import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, checkInLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { scanSchema } from '@/lib/validations';

// POST /api/admin/check-in — Confirm gate entry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = scanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { orderId } = parsed.data;

    // Verify order exists and is valid
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.checkedIn) {
      return NextResponse.json({ error: 'Already checked in' }, { status: 400 });
    }

    // Update order check-in status
    await db
      .update(orders)
      .set({
        checkedIn: true,
        checkedInAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    // Create check-in log
    await db.insert(checkInLogs).values({
      orderId,
      gate: body.gate || 'Main Gate',
      // scannedBy will be set from session when auth is implemented
    });

    return NextResponse.json({
      success: true,
      message: `Guest ${order.fullName} checked in successfully`,
      checkedInAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[POST /api/admin/check-in]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
