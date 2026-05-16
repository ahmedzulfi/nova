import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));

    const tierLabel: Record<string, string> = {
      'adult': 'Adult',
      'dog-owner': 'Dog Owner',
      'cat-owner': 'Cat Owner',
    };

    // Build CSV
    const headers = ['Order ID', 'Full Name', 'Email', 'Phone', 'Tier', 'Adults', 'Kids', 'Pets', 'Pet Name', 'Total (QAR)', 'Status', 'Purchase Date'];
    const rows = allOrders.map((o) => [
      o.id,
      o.fullName,
      o.email,
      o.phone,
      tierLabel[o.tier] || o.tier,
      o.adultQty,
      o.kidsQty,
      o.petQty,
      o.petName || '',
      Number(o.total).toFixed(2),
      o.status,
      o.createdAt.toISOString().split('T')[0],
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="nova_paw_orders_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/export/orders]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
