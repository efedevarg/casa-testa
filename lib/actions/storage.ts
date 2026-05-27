"use server";

import { revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/data/cache-tags";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import {
  deleteImage,
  uploadImage,
  validateImagePath,
  type StorageBucket,
} from "@/lib/supabase/storage";

import type { ActionResult } from "./types";
import { rethrowIfRedirectError } from "./redirect";

const MAX_BYTES = 5 * 1024 * 1024;

function isStorageBucket(value: string): value is StorageBucket {
  return ["products", "categories", "pizzellas", "brand", "site"].includes(value);
}

export async function uploadSiteImage(
  formData: FormData
): Promise<
  ActionResult<{ publicUrl: string; path: string; bucket: StorageBucket }>
> {
  const bucketRaw = String(formData.get("bucket") ?? "").trim();
  const pathRaw = String(formData.get("path") ?? "").trim();
  const file = formData.get("file");

  if (!isStorageBucket(bucketRaw)) {
    return { ok: false, error: "Bucket inválido." };
  }

  if (!pathRaw || !validateImagePath(bucketRaw, pathRaw)) {
    return { ok: false, error: "Path de imagen inválido." };
  }

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Seleccioná un archivo de imagen." };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "La imagen no puede superar 5 MB." };
  }

  if (!isAdminSupabaseConfigured()) {
    return {
      ok: false,
      error:
        "Service role no configurada. Agregá SUPABASE_SERVICE_ROLE_KEY para subir imágenes.",
    };
  }

  try {
    const buffer = await file.arrayBuffer();
    const result = await uploadImage({
      bucket: bucketRaw,
      path: pathRaw,
      body: buffer,
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

    revalidateTag(CACHE_TAGS.siteContent);
    revalidateTag(CACHE_TAGS.products);
    revalidateTag(CACHE_TAGS.categories);

    return {
      ok: true,
      mode: "persisted",
      data: {
        bucket: bucketRaw,
        path: result.path,
        publicUrl: result.publicUrl,
      },
    };
  } catch (error) {
    rethrowIfRedirectError(error);
    console.error("[uploadSiteImage]", error);
    return { ok: false, error: "No pudimos subir la imagen." };
  }
}

export async function deleteSiteImage(
  bucket: string,
  path: string
): Promise<ActionResult> {
  if (!isStorageBucket(bucket)) {
    return { ok: false, error: "Bucket inválido." };
  }

  if (!path.trim() || !validateImagePath(bucket, path)) {
    return { ok: false, error: "Path de imagen inválido." };
  }

  if (!isAdminSupabaseConfigured()) {
    return {
      ok: false,
      error: "Service role no configurada para eliminar imágenes.",
    };
  }

  try {
    await deleteImage(bucket, path);
    revalidateTag(CACHE_TAGS.siteContent);
    return { ok: true, mode: "persisted" };
  } catch (error) {
    rethrowIfRedirectError(error);
    console.error("[deleteSiteImage]", error);
    return { ok: false, error: "No pudimos eliminar la imagen." };
  }
}
