import { NextRequest, NextResponse } from 'next/server';

// ─── In-Memory Rate Limiter ──────────────────────────────────────────────────
// For production, use Redis or Upstash Rate Limit

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** Max requests allowed in the window */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

/**
 * Rate limits a request by IP + route.
 * Returns null if allowed, or a 429 NextResponse if blocked.
 */
export function rateLimit(
  req: NextRequest,
  config: RateLimitConfig
): NextResponse | null {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';

  const route = new URL(req.url).pathname;
  const key = `${ip}:${route}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + config.windowSeconds * 1000,
    });
    return null;
  }

  entry.count++;

  if (entry.count > config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(entry.resetAt).toISOString(),
        },
      }
    );
  }

  return null;
}

// ─── Preset Rate Limit Configurations ────────────────────────────────────────

/** Strict: 5 requests per minute (login, checkout) */
export const RATE_LIMIT_STRICT: RateLimitConfig = { maxRequests: 5, windowSeconds: 60 };

/** Standard: 30 requests per minute (normal API calls) */
export const RATE_LIMIT_STANDARD: RateLimitConfig = { maxRequests: 30, windowSeconds: 60 };

/** Relaxed: 60 requests per minute (read-heavy admin pages) */
export const RATE_LIMIT_RELAXED: RateLimitConfig = { maxRequests: 60, windowSeconds: 60 };
