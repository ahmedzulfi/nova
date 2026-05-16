import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations, orders } from '@/db/schema';
import { registrationSchema } from '@/lib/validations';
import { rateLimit, RATE_LIMIT_STRICT } from '@/lib/rate-limit';
import { sanitizeString, sanitizeEmail, sanitizePhone, generateSecureId } from '@/lib/sanitize';
import { eq, and } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  // ─── Rate Limit: 5 per minute ──────────────────────────────────────
  const limited = rateLimit(req, RATE_LIMIT_STRICT);
  if (limited) return limited;

  try {
    // ─── Size guard ──────────────────────────────────────────────────
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 20480) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const body = await req.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // ─── Verify the order exists and is paid ─────────────────────────
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, data.orderId),
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Order is not in valid state' }, { status: 400 });
    }

    // ─── Verify the order is a pet-owner tier ────────────────────────
    if (order.tier === 'adult') {
      return NextResponse.json({ error: 'Adult tickets cannot register for competitions' }, { status: 403 });
    }

    // ─── Prevent duplicate registrations (same order + same competition) ─
    const existing = await db.query.petRegistrations.findFirst({
      where: and(
        eq(petRegistrations.orderId, data.orderId),
        eq(petRegistrations.competitionType, data.competitionType)
      ),
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Already registered for this competition' },
        { status: 409 }
      );
    }

    // ─── Sanitize all inputs ─────────────────────────────────────────
    const registrationId = `REG-${generateSecureId(6).toUpperCase()}`;

    const [registration] = await db.insert(petRegistrations).values({
      id: registrationId,
      orderId: data.orderId,
      competitionType: data.competitionType,
      competitionName: sanitizeString(data.competitionName),
      ownerName: sanitizeString(data.ownerName),
      ownerPhone: sanitizePhone(data.ownerPhone),
      ownerEmail: data.ownerEmail ? sanitizeEmail(data.ownerEmail) : null,
      ownerAddress: data.ownerAddress ? sanitizeString(data.ownerAddress) : null,
      petName: sanitizeString(data.petName),
      petBreed: sanitizeString(data.petBreed),
      petGender: data.petGender,
      experienceLevel: data.experienceLevel,
      previousTitles: data.previousTitles ? sanitizeString(data.previousTitles) : null,
      drawingMaterials: data.drawingMaterials ? sanitizeString(data.drawingMaterials) : null,
      outfitDescription: data.outfitDescription ? sanitizeString(data.outfitDescription) : null,
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
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
