import {
  getPublicImageUrl,
  type StorageBucket,
} from "@/lib/supabase/storage";

/**
 * Resuelve URL de imagen desde DB o CMS: absoluta, /public o Storage.
 */
export function resolveImageUrl(
  urlOrPath: string | null | undefined,
  bucket: StorageBucket,
  fallback: string
): string {
  const value = urlOrPath?.trim();
  if (!value) return fallback;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/")) {
    return value;
  }

  try {
    return getPublicImageUrl(bucket, value);
  } catch {
    return fallback;
  }
}
