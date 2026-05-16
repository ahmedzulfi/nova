import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string; // 'passport' or 'vaccination'
    const registrationId = formData.get('registrationId') as string;

    if (!file || !type || !registrationId) {
      return NextResponse.json(
        { error: 'File, type, and registrationId are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are accepted' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be under 10MB' }, { status: 400 });
    }

    // TODO: Upload to Supabase Storage or S3
    // For now, return a mock URL
    const mockUrl = `/uploads/${type}/${registrationId}_${file.name}`;

    // TODO: Update pet_registrations record with the URL
    // await db.update(petRegistrations)
    //   .set({ [type === 'passport' ? 'passportUrl' : 'vaccinationUrl']: uploadedUrl })
    //   .where(eq(petRegistrations.id, registrationId));

    return NextResponse.json({
      success: true,
      url: mockUrl,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('[POST /api/uploads]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
