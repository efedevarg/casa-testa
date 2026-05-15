const PLACEHOLDER_URL_FRAGMENTS = ["tu-proyecto", "your-project", "example.supabase"];
const PLACEHOLDER_KEY_FRAGMENTS = ["tu_clave_anon", "your_anon_key", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example"];

function looksLikePlaceholderSupabaseUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return PLACEHOLDER_URL_FRAGMENTS.some((fragment) => lower.includes(fragment));
}

function looksLikePlaceholderAnonKey(key: string): boolean {
  const lower = key.toLowerCase();
  if (PLACEHOLDER_KEY_FRAGMENTS.some((fragment) => lower.includes(fragment.toLowerCase()))) {
    return true;
  }
  // JWT anon real suele ser largo; evita intentar Supabase con valores de ejemplo cortos
  return key.length < 80;
}

function isValidSupabaseProjectUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname.endsWith(".supabase.co") &&
      parsed.hostname.length > ".supabase.co".length
    );
  } catch {
    return false;
  }
}

/**
 * Variables públicas de Supabase y sitio.
 * Si Supabase no está configurado (o hay placeholders de `.env.example`),
 * la app sigue con mocks locales.
 */
export function isSupabaseConfigured(): boolean {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!rawUrl || !anonKey) return false;
  if (looksLikePlaceholderSupabaseUrl(rawUrl)) return false;
  if (looksLikePlaceholderAnonKey(anonKey)) return false;

  const url = normalizeSupabaseUrl(rawUrl);
  if (!isValidSupabaseProjectUrl(url)) return false;

  return true;
}

/** Normaliza la URL del proyecto (Settings → API → Project URL). */
export function normalizeSupabaseUrl(raw: string): string {
  let url = raw.trim();

  // Quitar comillas accidentales al copiar desde el dashboard
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }

  url = url.replace(/\/+$/, "");
  url = url.replace(/\/rest\/v1\/?$/i, "");

  return url;
}

export function getPublicSupabaseConfig(): {
  url: string;
  anonKey: string;
} {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!rawUrl || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY. Copiá `.env.example` a `.env.local`."
    );
  }

  const url = normalizeSupabaseUrl(rawUrl);

  if (!isValidSupabaseProjectUrl(url)) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL debe ser la Project URL de Supabase (https://<ref>.supabase.co), sin /rest/v1 ni rutas del dashboard."
    );
  }

  return { url, anonKey };
}
