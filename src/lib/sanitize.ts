/** Strip HTML tags and trim a string. Use on all user-supplied text inputs. */
export function sanitizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim().slice(0, 10000);
}

/**
 * Sanitize a plain object's string values (1 level deep).
 * Fields listed in `htmlFields` are passed through without HTML stripping
 * (they contain intentional rich-text HTML from the editor).
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T,
  htmlFields: string[] = []
): T {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (htmlFields.includes(key)) {
      result[key] = typeof val === "string" ? val.slice(0, 500000) : val;
    } else {
      result[key] = typeof val === "string" ? sanitizeString(val) : val;
    }
  }
  return result as T;
}
