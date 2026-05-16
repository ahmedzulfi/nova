import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const registrations = await db.query.petRegistrations.findMany({
      where: eq(petRegistrations.orderId, orderId),
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('[GET /api/user/registrations]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
