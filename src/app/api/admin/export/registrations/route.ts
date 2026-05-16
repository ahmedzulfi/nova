import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { rateLimit, RATE_LIMIT_STRICT } from '@/lib/rate-limit';
import { sanitizeForCsv } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  // ─── Auth Guard ────────────────────────────────────────────────────
  const auth = await requireAdmin(req);
  if (!auth.authenticated) return auth.response;

  // ─── Rate Limit ────────────────────────────────────────────────────
  const limited = rateLimit(req, RATE_LIMIT_STRICT);
  if (limited) return limited;

  try {
    const allRegs = await db
      .select()
      .from(petRegistrations)
      .orderBy(desc(petRegistrations.submittedAt));

    // Build CSV with safe sanitization
    const headers = [
      'Registration ID', 'Order ID', 'Competition', 'Owner Name', 'Email', 'Phone',
      'Pet Name', 'Breed', 'Gender', 'Experience', 'Status', 'Submitted Date',
    ];

    const rows = allRegs.map((r) => [
      sanitizeForCsv(r.id),
      sanitizeForCsv(r.orderId),
      sanitizeForCsv(r.competitionName),
      sanitizeForCsv(r.ownerName),
      sanitizeForCsv(r.ownerEmail || ''),
      sanitizeForCsv(r.ownerPhone),
      sanitizeForCsv(r.petName),
      sanitizeForCsv(r.petBreed),
      sanitizeForCsv(r.petGender),
      sanitizeForCsv(r.experienceLevel),
      sanitizeForCsv(r.status),
      sanitizeForCsv(r.submittedAt.toISOString().split('T')[0]),
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="nova_paw_registrations_${new Date().toISOString().split('T')[0]}.csv"`,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/export/registrations]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
