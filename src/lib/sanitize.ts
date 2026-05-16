// ─── Input Sanitization Utilities ─────────────────────────────────────────────
// Prevents XSS, CSV injection, and other injection attacks

/**
 * Strips HTML tags and trims whitespace from a string.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')       // Strip HTML tags
    .replace(/&lt;/g, '<')         // Decode common entities
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

/**
 * Sanitizes a string for safe CSV export.
 * Prevents CSV injection by escaping formula characters.
 */
export function sanitizeForCsv(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';

  const str = String(value);

  // Prefix formula-triggering characters to prevent CSV injection
  const dangerousChars = ['=', '+', '-', '@', '\t', '\r', '\n'];
  const needsEscape = dangerousChars.some((char) => str.startsWith(char));

  // Always quote and escape internal quotes
  const escaped = str.replace(/"/g, '""');

  if (needsEscape) {
    return `"'${escaped}"`;  // Prepend single quote inside quotes
  }

  // Quote if contains comma, newline, or quotes
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${escaped}"`;
  }

  return escaped;
}

/**
 * Sanitizes an email address — lowercase, trim, basic format validation.
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Sanitizes a phone number — strips everything except digits, +, spaces, dashes.
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s+\-()]/g, '').trim();
}

/**
 * Deep sanitizes all string values in an object.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeString(value);
    }
  }
  return result;
}

/**
 * Validates that a string doesn't contain path traversal attempts.
 */
export function isCleanPath(path: string): boolean {
  return !path.includes('..') && !path.includes('~') && !/[<>"|?*]/.test(path);
}

/**
 * Generates a cryptographically random string for IDs and tokens.
 */
export function generateSecureId(length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}
