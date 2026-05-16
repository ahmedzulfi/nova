import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { rateLimit, RATE_LIMIT_STANDARD } from '@/lib/rate-limit';
import { scanSchema } from '@/lib/validations';
import { sanitizeString } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.authenticated) return auth.response;

  const limited = rateLimit(req, RATE_LIMIT_STANDARD);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = scanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid order ID', valid: false }, { status: 400 });
    }

    const orderId = sanitizeString(parsed.data.orderId);

    if (orderId.length > 30 || !/^#?[A-Za-z0-9\-]+$/.test(orderId)) {
      return NextResponse.json({ error: 'Invalid order ID format', valid: false }, { status: 400 });
    }

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: { registrations: true },
    });

    if (!order) {
      return NextResponse.json({ valid: false, error: 'Ticket not found' }, { status: 404 });
    }

    if (order.status === 'CANCELLED') {
      return NextResponse.json({ valid: false, error: 'This ticket has been cancelled' }, { status: 400 });
    }

    if (order.checkedIn) {
      return NextResponse.json({
        valid: false,
        error: 'This ticket has already been used for entry',
        checkedInAt: order.checkedInAt,
      }, { status: 400 });
    }

    const tierLabel: Record<string, string> = {
      'adult': 'Adult Ticket', 'dog-owner': 'Dog Owner Ticket', 'cat-owner': 'Cat Owner Ticket',
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
        avatarUrl: `https://i.pravatar.cc/150?u=${encodeURIComponent(order.email)}`,
      },
      breakdown: { adults: order.adultQty, kids: order.kidsQty, pets: order.petQty },
      registrations: order.registrations.map((reg) => ({
        id: reg.id,
        category: reg.competitionName,
        pet: reg.petName,
        status: reg.status === 'Completed' ? 'Approved' : reg.status,
      })),
    });
  } catch (error) {
    console.error('[POST /api/admin/scan]', error);
    return NextResponse.json({ error: 'Internal server error', valid: false }, { status: 500 });
  }
}
