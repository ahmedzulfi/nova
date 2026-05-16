import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { checkoutSchema, calculateTotal } from '@/lib/validations';
import { rateLimit, RATE_LIMIT_STRICT } from '@/lib/rate-limit';
import { sanitizeString, sanitizeEmail, sanitizePhone, generateSecureId } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  // ─── Rate Limit: 5 per minute (prevents order spam) ────────────────
  const limited = rateLimit(req, RATE_LIMIT_STRICT);
  if (limited) return limited;

  try {
    // ─── Size guard: reject payloads > 10KB ──────────────────────────
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // ─── Sanitize all inputs ─────────────────────────────────────────
    const fullName = sanitizeString(data.fullName);
    const email = sanitizeEmail(data.email);
    const phone = sanitizePhone(data.phone);
    const petName = data.petName ? sanitizeString(data.petName) : null;

    // ─── Server-side total calculation (never trust client total) ────
    const total = calculateTotal(data.adultQty, data.kidsQty, data.petQty);

    // ─── Cryptographically secure Order ID ───────────────────────────
    const orderId = `#NPV-2026-${generateSecureId(6).toUpperCase()}`;

    const [order] = await db.insert(orders).values({
      id: orderId,
      fullName,
      email,
      phone,
      tier: data.tier,
      adultQty: data.adultQty,
      kidsQty: data.kidsQty,
      petQty: data.petQty,
      petName,
      total: total.toFixed(2),
      status: 'PAID', // MVP: skip payment gateway
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
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
