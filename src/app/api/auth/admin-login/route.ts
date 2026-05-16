import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, ADMIN_TOKEN_COOKIE } from '@/lib/auth';
import { adminLoginSchema } from '@/lib/validations';
import { rateLimit, RATE_LIMIT_STRICT } from '@/lib/rate-limit';
import { sanitizeEmail } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  // ─── Rate Limit: 5 attempts per minute ──────────────────────────────
  const limited = rateLimit(req, RATE_LIMIT_STRICT);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, // Generic error to prevent info leakage
        { status: 400 }
      );
    }

    const email = sanitizeEmail(parsed.data.email);
    const result = await authenticateAdmin(email, parsed.data.password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    // Set HTTP-only secure cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    });

    response.cookies.set(ADMIN_TOKEN_COOKIE, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('[POST /api/auth/admin-login]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
