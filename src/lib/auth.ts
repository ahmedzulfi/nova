import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcryptjs from 'bcryptjs';

// ─── Simple JWT-like token using signed cookies ──────────────────────────────
// For production, replace with NextAuth.js v5

const ADMIN_TOKEN_COOKIE = 'nova_admin_session';
const SESSION_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours

/**
 * Creates a base64-encoded session token.
 * In production, this should be a signed JWT or NextAuth session.
 */
export function createAdminToken(userId: string, email: string): string {
  const payload = {
    uid: userId,
    email,
    role: 'ADMIN',
    exp: Date.now() + SESSION_EXPIRY_MS,
    iat: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * Decodes and validates the admin session token.
 */
export function decodeAdminToken(token: string): { uid: string; email: string; role: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));

    // Check expiry
    if (!decoded.exp || decoded.exp < Date.now()) {
      return null;
    }

    // Check required fields
    if (!decoded.uid || !decoded.email || decoded.role !== 'ADMIN') {
      return null;
    }

    return { uid: decoded.uid, email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}

/**
 * Middleware: Verifies admin authentication on a request.
 * Returns the admin user data or a 401 response.
 */
export async function requireAdmin(req: NextRequest): Promise<
  | { authenticated: true; admin: { uid: string; email: string } }
  | { authenticated: false; response: NextResponse }
> {
  const token = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      ),
    };
  }

  const admin = decodeAdminToken(token);

  if (!admin) {
    // Clear invalid cookie
    const response = NextResponse.json(
      { error: 'Session expired or invalid' },
      { status: 401 }
    );
    response.cookies.delete(ADMIN_TOKEN_COOKIE);
    return { authenticated: false, response };
  }

  return { authenticated: true, admin: { uid: admin.uid, email: admin.email } };
}

/**
 * Authenticates admin credentials and returns a session token.
 */
export async function authenticateAdmin(email: string, password: string): Promise<
  | { success: true; token: string; userId: string }
  | { success: false; error: string }
> {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase().trim()),
  });

  if (!user) {
    // Use generic error to prevent email enumeration
    return { success: false, error: 'Invalid credentials' };
  }

  const isValid = await bcryptjs.compare(password, user.password);

  if (!isValid) {
    return { success: false, error: 'Invalid credentials' };
  }

  const token = createAdminToken(user.id, user.email);
  return { success: true, token, userId: user.id };
}

export { ADMIN_TOKEN_COOKIE };
