import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, petRegistrations, checkInLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { scanSchema } from '@/lib/validations';

// POST /api/admin/scan — Verify a ticket by order ID
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

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: {
        registrations: true,
      },
    });

    if (!order) {
      return NextResponse.json({
        valid: false,
        error: 'Ticket not found',
      }, { status: 404 });
    }

    if (order.status === 'CANCELLED') {
      return NextResponse.json({
        valid: false,
        error: 'This ticket has been cancelled',
      }, { status: 400 });
    }

    if (order.checkedIn) {
      return NextResponse.json({
        valid: false,
        error: 'This ticket has already been used for entry',
        checkedInAt: order.checkedInAt,
      }, { status: 400 });
    }

    const tierLabel: Record<string, string> = {
      'adult': 'Adult Ticket',
      'dog-owner': 'Dog Owner Ticket',
      'cat-owner': 'Cat Owner Ticket',
    };

    return NextResponse.json({
      valid: true,
      id: order.id,
      status: 'Valid',
      checkInTime: null,
      tier: tierLabel[order.tier] || order.tier,
      attendee: {
        name: order.fullName,
        email: order.email,
        phone: order.phone,
        address: 'Doha, Qatar',
        avatarUrl: `https://i.pravatar.cc/150?u=${order.email}`,
      },
      breakdown: {
        adults: order.adultQty,
        kids: order.kidsQty,
        pets: order.petQty,
      },
      registrations: order.registrations.map((reg) => ({
        id: reg.id,
        category: reg.competitionName,
        pet: reg.petName,
        status: reg.status === 'Completed' ? 'Approved' : reg.status,
      })),
    });
  } catch (error) {
    console.error('[POST /api/admin/scan]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
