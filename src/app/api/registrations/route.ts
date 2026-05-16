import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations, orders } from '@/db/schema';
import { registrationSchema, generateRegistrationId } from '@/lib/validations';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Verify the order exists and is paid
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, data.orderId),
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Order is not paid' }, { status: 400 });
    }

    // Verify the order is a pet-owner tier
    if (order.tier === 'adult') {
      return NextResponse.json({ error: 'Adult tickets cannot register for competitions' }, { status: 400 });
    }

    const registrationId = generateRegistrationId();

    const [registration] = await db.insert(petRegistrations).values({
      id: registrationId,
      orderId: data.orderId,
      competitionType: data.competitionType,
      competitionName: data.competitionName,
      ownerName: data.ownerName,
      ownerPhone: data.ownerPhone,
      ownerEmail: data.ownerEmail || null,
      ownerAddress: data.ownerAddress || null,
      petName: data.petName,
      petBreed: data.petBreed,
      petGender: data.petGender,
      experienceLevel: data.experienceLevel,
      previousTitles: data.previousTitles || null,
      drawingMaterials: data.drawingMaterials || null,
      outfitDescription: data.outfitDescription || null,
    }).returning();

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        competitionName: registration.competitionName,
        petName: registration.petName,
        status: registration.status,
      },
    });
  } catch (error) {
    console.error('[POST /api/registrations]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
