/** Normaliza teléfono opcional del formulario; null si viene vacío. */
export function normalizeOptionalPhone(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8) {
    return null;
  }
  return trimmed;
}

export function isOptionalPhoneValid(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return true;
  return normalizeOptionalPhone(trimmed) !== null;
}
