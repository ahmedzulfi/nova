import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, petRegistrations, checkInLogs } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { rateLimit, RATE_LIMIT_STANDARD } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/sanitize';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if (!auth.authenticated) return auth.response;

  const limited = rateLimit(req, RATE_LIMIT_STANDARD);
  if (limited) return limited;

  try {
    const { id } = await params;
    const cleanId = sanitizeString(id);

    if (!cleanId || cleanId.length > 30) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, cleanId),
      with: {
        registrations: true,
        checkInLogs: { orderBy: [desc(checkInLogs.scannedAt)] },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const tierLabel: Record<string, string> = {
      'adult': 'Adult Ticket', 'dog-owner': 'Dog Owner Ticket', 'cat-owner': 'Cat Owner Ticket',
    };

    return NextResponse.json({
      id: order.id,
      status: order.status === 'PAID' ? 'Active' : order.status === 'USED' ? 'Used' : order.status,
      purchaseDate: order.createdAt.toISOString(),
      tier: tierLabel[order.tier] || order.tier,
      total: `QAR ${Number(order.total).toFixed(2)}`,
      paymentMethod: order.paymentMethod || 'N/A',
      attendee: {
        name: order.fullName,
        email: order.email,
        phone: order.phone,
        address: 'Doha, Qatar',
        avatarUrl: `https://i.pravatar.cc/150?u=${encodeURIComponent(order.email)}`,
      },
      breakdown: { adults: order.adultQty, kids: order.kidsQty, pets: order.petQty },
      registrations: order.registrations.map((reg) => ({
        id: reg.id, category: reg.competitionName, pet: reg.petName, status: reg.status,
      })),
      checkInHistory: order.checkInLogs.map((log) => ({
        gate: log.gate || 'Main Gate', time: log.scannedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('[GET /api/admin/orders/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if (!auth.authenticated) return auth.response;

  const limited = rateLimit(req, RATE_LIMIT_STANDARD);
  if (limited) return limited;

  try {
    const { id } = await params;
    const cleanId = sanitizeString(id);
    const body = await req.json();
    const action = typeof body.action === 'string' ? body.action : '';

    // Whitelist allowed actions
    if (!['mark-used', 'resend-email'].includes(action)) {
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    if (action === 'mark-used') {
      const [updated] = await db
        .update(orders)
        .set({ status: 'USED' })
        .where(eq(orders.id, cleanId))
        .returning();

      if (!updated) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      return NextResponse.json({ success: true, status: 'Used' });
    }

    if (action === 'resend-email') {
      // TODO: Integrate with Resend
      return NextResponse.json({ success: true, message: 'Email resent' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('[PATCH /api/admin/orders/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
