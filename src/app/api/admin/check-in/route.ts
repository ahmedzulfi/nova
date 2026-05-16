import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, checkInLogs } from '@/db/schema';
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
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const orderId = sanitizeString(parsed.data.orderId);

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.checkedIn) {
      return NextResponse.json({ error: 'Already checked in' }, { status: 409 });
    }

    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Ticket is not in valid state for check-in' }, { status: 400 });
    }

    // Atomic update with check-in timestamp
    const now = new Date();
    await db
      .update(orders)
      .set({ checkedIn: true, checkedInAt: now })
      .where(eq(orders.id, orderId));

    // Create audit log
    await db.insert(checkInLogs).values({
      orderId,
      gate: typeof body.gate === 'string' ? sanitizeString(body.gate).slice(0, 50) : 'Main Gate',
      scannedBy: auth.admin.uid,
    });

    return NextResponse.json({
      success: true,
      message: `Guest ${order.fullName} checked in successfully`,
      checkedInAt: now.toISOString(),
    });
  } catch (error) {
    console.error('[POST /api/admin/check-in]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
