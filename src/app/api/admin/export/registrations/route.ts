import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allRegs = await db
      .select()
      .from(petRegistrations)
      .orderBy(desc(petRegistrations.submittedAt));

    // Build CSV
    const headers = [
      'Registration ID', 'Order ID', 'Competition', 'Owner Name', 'Email', 'Phone',
      'Pet Name', 'Breed', 'Gender', 'Experience', 'Status', 'Submitted Date',
    ];
    const rows = allRegs.map((r) => [
      r.id,
      r.orderId,
      r.competitionName,
      r.ownerName,
      r.ownerEmail || '',
      r.ownerPhone,
      r.petName,
      r.petBreed,
      r.petGender,
      r.experienceLevel,
      r.status,
      r.submittedAt.toISOString().split('T')[0],
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="nova_paw_registrations_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/export/registrations]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
