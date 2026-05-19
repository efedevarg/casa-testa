import { normalizeSupabaseUrl } from "@/lib/env";
import { createAdminSupabaseClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

/** Buckets públicos definidos en la migración de Storage */
export const STORAGE_BUCKETS = [
  "products",
  "categories",
  "pizzellas",
  "brand",
  "site",
] as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[number];

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

const BUCKET_PATH_PATTERN: Record<StorageBucket, RegExp> = {
  products: /^[a-z0-9][a-z0-9/_-]*\.(jpe?g|png|webp|avif)$/i,
  categories: /^[a-z0-9][a-z0-9/_-]*\.(jpe?g|png|webp|avif)$/i,
  pizzellas: /^[a-z0-9][a-z0-9/_-]*\.(jpe?g|png|webp|avif)$/i,
  brand: /^[a-z0-9][a-z0-9/_-]*\.(jpe?g|png|webp|avif|svg)$/i,
  site: /^[a-z0-9][a-z0-9/_-]*\.(jpe?g|png|webp|avif)$/i,
};

/** Quita slashes iniciales/finales y colapsa segmentos vacíos */
export function normalizeStoragePath(path: string): string {
  return path
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

/** Valida path relativo dentro de un bucket (sin `..` ni caracteres raros) */
export function validateImagePath(bucket: StorageBucket, path: string): boolean {
  const normalized = normalizeStoragePath(path);
  if (!normalized || normalized.includes("..")) return false;
  if (!IMAGE_EXTENSIONS.test(normalized)) return false;
  return BUCKET_PATH_PATTERN[bucket].test(normalized);
}

function getSupabaseProjectUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL no está configurada.");
  }
  return normalizeSupabaseUrl(raw);
}

/**
 * Resuelve URL pública de imagen: absoluta, /public o path en bucket Storage.
 */
export function getPublicImageUrl(bucket: StorageBucket, path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  const objectPath = normalizeStoragePath(trimmed);
  const base = getSupabaseProjectUrl();
  return `${base}/storage/v1/object/public/${bucket}/${objectPath}`;
}

export type UploadImageOptions = {
  bucket: StorageBucket;
  path: string;
  body: ArrayBuffer | Buffer | Blob;
  contentType?: string;
  upsert?: boolean;
};

export type UploadImageResult = {
  path: string;
  publicUrl: string;
};

/** Sube imagen con service role (Server Actions / scripts admin) */
export async function uploadImage(
  options: UploadImageOptions
): Promise<UploadImageResult> {
  if (!isAdminSupabaseConfigured()) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY requerida para subir imágenes."
    );
  }

  const { bucket, path, body, contentType, upsert = true } = options;
  const objectPath = normalizeStoragePath(path);

  if (!validateImagePath(bucket, objectPath)) {
    throw new Error(`Path de imagen inválido para bucket "${bucket}": ${path}`);
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.storage.from(bucket).upload(objectPath, body, {
    contentType: contentType ?? "image/jpeg",
    upsert,
    cacheControl: "3600",
  });

  if (error) {
    throw new Error(`[Storage:upload] ${error.message}`);
  }

  return {
    path: objectPath,
    publicUrl: getPublicImageUrl(bucket, objectPath),
  };
}

/** Elimina objeto del bucket (service role) */
export async function deleteImage(bucket: StorageBucket, path: string): Promise<void> {
  if (!isAdminSupabaseConfigured()) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY requerida para eliminar imágenes."
    );
  }

  const objectPath = normalizeStoragePath(path);
  if (!validateImagePath(bucket, objectPath)) {
    throw new Error(`Path de imagen inválido para bucket "${bucket}": ${path}`);
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.storage.from(bucket).remove([objectPath]);

  if (error) {
    throw new Error(`[Storage:delete] ${error.message}`);
  }
}
