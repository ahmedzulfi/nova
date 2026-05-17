import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petRegistrations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { rateLimit, RATE_LIMIT_STRICT } from '@/lib/rate-limit';
import { sanitizeString, isCleanPath } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  // ─── Rate Limit: Prevent upload spam ────────────────────────────────
  const limited = rateLimit(req, RATE_LIMIT_STRICT);
  if (limited) return limited;

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

    // ─── Security Check: Sanitize inputs ─────────────────────────────
    const cleanId = sanitizeString(registrationId);
    const cleanType = sanitizeString(type);

    if (cleanType !== 'passport' && cleanType !== 'vaccination') {
      return NextResponse.json({ error: 'Invalid upload type' }, { status: 400 });
    }

    if (!isCleanPath(cleanId)) {
      return NextResponse.json({ error: 'Invalid registration ID' }, { status: 400 });
    }

    // ─── Verify registration exists before allowing upload ───────────
    const registration = await db.query.petRegistrations.findFirst({
      where: eq(petRegistrations.id, cleanId),
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // ─── Validate file: PDF only ────────────────────────────────────
    if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are accepted' }, { status: 400 });
    }

    // ─── Validate size: Max 5MB ─────────────────────────────────────
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be under 5MB' }, { status: 400 });
    }

    // ─── Supabase Storage Upload ────────────────────────────────────
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      // If no keys, fallback to mock (useful for initial dev)
      console.warn('Supabase keys missing, using mock URL');
      const mockUrl = `/uploads/${cleanType}/${cleanId}_document.pdf`;
      await db.update(petRegistrations)
        .set({ [cleanType === 'passport' ? 'passportUrl' : 'vaccinationUrl']: mockUrl })
        .where(eq(petRegistrations.id, cleanId));
        
      return NextResponse.json({ success: true, url: mockUrl, fileName: sanitizeString(file.name), fileSize: file.size, mock: true });
    }

    const { supabase } = await import('@/lib/supabase');
    const fileExt = 'pdf';
    const fileName = `${cleanId}_${cleanType}_${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    // Convert File to ArrayBuffer for Supabase
    const buffer = await file.arrayBuffer();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('nova-paw-docs') // Bucket name
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload document to cloud storage' }, { status: 500 });
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('nova-paw-docs')
      .getPublicUrl(filePath);

    // ─── Update DB with the real URL ─────────────────────────────────
    await db.update(petRegistrations)
      .set({ 
        [cleanType === 'passport' ? 'passportUrl' : 'vaccinationUrl']: publicUrl 
      })
      .where(eq(petRegistrations.id, cleanId));

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: sanitizeString(file.name),
      fileSize: file.size,
    });
  } catch (error) {
    console.error('[POST /api/uploads]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
