import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { rateLimit, RATE_LIMIT_STRICT } from '@/lib/rate-limit';
import { sanitizeForCsv } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  // ─── Auth Guard ────────────────────────────────────────────────────
  const auth = await requireAdmin(req);
  if (!auth.authenticated) return auth.response;

  // ─── Rate Limit: Strict for export to prevent server strain ────────
  const limited = rateLimit(req, RATE_LIMIT_STRICT);
  if (limited) return limited;

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

    // Build CSV with safe sanitization to prevent CSV injection
    const headers = ['Order ID', 'Full Name', 'Email', 'Phone', 'Tier', 'Adults', 'Kids', 'Pets', 'Pet Name', 'Total (QAR)', 'Status', 'Purchase Date'];
    
    const rows = allOrders.map((o) => [
      sanitizeForCsv(o.id),
      sanitizeForCsv(o.fullName),
      sanitizeForCsv(o.email),
      sanitizeForCsv(o.phone),
      sanitizeForCsv(tierLabel[o.tier] || o.tier),
      sanitizeForCsv(o.adultQty),
      sanitizeForCsv(o.kidsQty),
      sanitizeForCsv(o.petQty),
      sanitizeForCsv(o.petName || ''),
      sanitizeForCsv(Number(o.total).toFixed(2)),
      sanitizeForCsv(o.status),
      sanitizeForCsv(o.createdAt.toISOString().split('T')[0]),
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="nova_paw_orders_${new Date().toISOString().split('T')[0]}.csv"`,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/export/orders]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
