export function toInt(
  value: unknown,
  fallback: number,
  limits?: { min?: number; max?: number },
): number {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  let normalized = Number.isNaN(parsed) ? fallback : parsed;
  if (limits?.min !== undefined) {
    normalized = Math.max(limits.min, normalized);
  }
  if (limits?.max !== undefined) {
    normalized = Math.min(limits.max, normalized);
  }
  return normalized;
}
