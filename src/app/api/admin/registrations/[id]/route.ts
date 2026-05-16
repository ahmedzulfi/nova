import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations, orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const registration = await db.query.petRegistrations.findFirst({
      where: eq(petRegistrations.id, id),
      with: {
        order: true,
      },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: registration.id,
      status: registration.status,
      submissionDate: registration.submittedAt.toISOString(),
      attendee: {
        name: registration.ownerName,
        email: registration.ownerEmail || registration.order.email,
        phone: registration.ownerPhone,
        address: registration.ownerAddress || 'Doha, Qatar',
        location: 'Doha, Qatar',
        avatarUrl: `https://i.pravatar.cc/150?u=${registration.ownerEmail || registration.order.email}`,
        memberSince: registration.order.createdAt.toISOString().split('T')[0],
      },
      pet: {
        name: registration.petName,
        type: registration.competitionType.includes('dog') ? 'Dog' : 'Cat',
        breed: registration.petBreed,
        age: 'N/A',
        weight: 'N/A',
        gender: registration.petGender,
        medicalNotes: 'Up to date on all vaccinations.',
        specialNeeds: 'None',
      },
      competition: {
        category: registration.competitionName,
        experienceLevel: registration.experienceLevel,
        previousTitles: registration.previousTitles || 'None',
        materialsList: registration.drawingMaterials || registration.outfitDescription || '',
      },
      documents: [
        ...(registration.passportUrl
          ? [{ name: 'Pet_Passport.pdf', size: 'N/A', type: 'pdf', url: registration.passportUrl }]
          : []),
        ...(registration.vaccinationUrl
          ? [{ name: 'Vaccination_Record.pdf', size: 'N/A', type: 'pdf', url: registration.vaccinationUrl }]
          : []),
      ],
      passportId: `NP-PASS-${registration.id.replace('REG-', '')}`,
    });
  } catch (error) {
    console.error('[GET /api/admin/registrations/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action } = body;

    if (action === 'approve') {
      const [updated] = await db
        .update(petRegistrations)
        .set({ status: 'Completed' })
        .where(eq(petRegistrations.id, id))
        .returning();

      if (!updated) {
        return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, status: 'Completed' });
    }

    if (action === 'decline') {
      const [updated] = await db
        .update(petRegistrations)
        .set({ status: 'Rejected' })
        .where(eq(petRegistrations.id, id))
        .returning();

      if (!updated) {
        return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, status: 'Rejected' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('[PATCH /api/admin/registrations/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
