"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { CACHE_TAGS } from "@/lib/data/cache-tags";
import {
  deletePizzellaAdmin,
  deletePizzellaImageAdmin,
  insertPizzellaAdmin,
  insertPizzellaImageAdmin,
  queryPizzellaAdminById,
  updatePizzellaAdmin,
  updatePizzellaImageAdmin,
  type PizzellaUpsertInput,
} from "@/lib/queries/pizzellas-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import { deleteImage, uploadImage, validateImagePath } from "@/lib/supabase/storage";
import { slugify } from "@/lib/utils/slug";

import type { ActionResult } from "./types";
import { rethrowIfRedirectError } from "./redirect";

function revalidatePizzellas() {
  revalidateTag(CACHE_TAGS.pizzelleMolds);
  revalidatePath("/pizzellas");
  revalidatePath("/");
  revalidatePath("/internal/pizzellas");
}

function parsePizzellaForm(formData: FormData): PizzellaUpsertInput | { error: string } {
  const model_name = String(formData.get("model_name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dimensionsRaw = String(formData.get("dimensions") ?? "").trim();
  const materialRaw = String(formData.get("material") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const featured = formData.get("featured") === "on";

  if (!model_name) return { error: "El nombre del molde es obligatorio." };
  if (!slug) slug = slugify(model_name);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug inválido. Usá minúsculas, números y guiones." };
  }
  if (!description || description.length < 10) {
    return { error: "La descripción debe tener al menos 10 caracteres." };
  }

  let price: number | null = null;
  if (priceRaw) {
    const parsed = Number(priceRaw);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return { error: "Precio inválido." };
    }
    price = Math.round(parsed);
  }

  return {
    model_name,
    slug,
    description,
    dimensions: dimensionsRaw || null,
    material: materialRaw || null,
    price,
    featured,
  };
}

export type SavePizzellaState = ActionResult<{ id: string }>;

export async function savePizzellaAction(
  _prev: SavePizzellaState | undefined,
  formData: FormData
): Promise<SavePizzellaState> {
  if (!isAdminSupabaseConfigured()) return { ok: false, error: "Service role no configurada." };
  const parsed = parsePizzellaForm(formData);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  const moldId = String(formData.get("id") ?? "").trim();

  try {
    if (!moldId) {
      const created = await insertPizzellaAdmin(parsed);
      revalidatePizzellas();
      redirect(`/internal/pizzellas/${created.id}?saved=1`);
    }

    const existing = await queryPizzellaAdminById(moldId);
    if (!existing) return { ok: false, error: "Molde no encontrado." };
    const updated = await updatePizzellaAdmin(moldId, parsed);
    revalidatePizzellas();
    revalidatePath(`/internal/pizzellas/${moldId}`);
    return { ok: true, mode: "persisted", data: { id: updated.id } };
  } catch (error) {
    rethrowIfRedirectError(error);
    const message = error instanceof Error ? error.message : "No pudimos guardar.";
    if (message.includes("duplicate") || message.includes("unique")) {
      return { ok: false, error: "El slug ya existe." };
    }
    return { ok: false, error: message };
  }
}

export async function deletePizzellaAction(moldId: string): Promise<ActionResult> {
  if (!isAdminSupabaseConfigured()) return { ok: false, error: "Service role no configurada." };
  try {
    await deletePizzellaAdmin(moldId);
    revalidatePizzellas();
    redirect("/internal/pizzellas?deleted=1");
  } catch (error) {
    rethrowIfRedirectError(error);
    const message = error instanceof Error ? error.message : "No pudimos eliminar.";
    return { ok: false, error: message };
  }
}

export type UploadPizzellaImageState = ActionResult<{
  images: Array<{ path: string; imageId: string }>;
}>;

export async function uploadPizzellaImageAction(
  _prev: UploadPizzellaImageState | undefined,
  formData: FormData
): Promise<UploadPizzellaImageState> {
  if (!isAdminSupabaseConfigured()) return { ok: false, error: "Service role no configurada." };
  const moldId = String(formData.get("mold_id") ?? "").trim();
  const altText = String(formData.get("alt_text") ?? "").trim();
  const path = String(formData.get("path") ?? "").trim();
  const files = formData.getAll("file").filter((item): item is File => item instanceof File);
  if (!moldId) return { ok: false, error: "Molde inválido." };
  if (files.length === 0) return { ok: false, error: "Seleccioná una imagen." };

  try {
    const mold = await queryPizzellaAdminById(moldId);
    if (!mold) return { ok: false, error: "Molde no encontrado." };
    const uploadedImages: Array<{ path: string; imageId: string }> = [];
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const filePath =
        path ||
        `${mold.slug}/${file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-") || `imagen-${index + 1}.jpg`}`;
      if (!validateImagePath("pizzellas", filePath)) return { ok: false, error: "Path inválido." };
      const uploaded = await uploadImage({
        bucket: "pizzellas",
        path: filePath,
        body: await file.arrayBuffer(),
        contentType: file.type || "image/jpeg",
        upsert: true,
      });
      const row = await insertPizzellaImageAdmin({
        mold_id: moldId,
        image_url: uploaded.path,
        alt_text: altText || mold.model_name,
      });
      uploadedImages.push({ path: uploaded.path, imageId: row.id });
    }
    revalidatePizzellas();
    revalidatePath(`/internal/pizzellas/${moldId}`);
    return { ok: true, mode: "persisted", data: { images: uploadedImages } };
  } catch (error) {
    rethrowIfRedirectError(error);
    const message = error instanceof Error ? error.message : "No pudimos subir imagen.";
    return { ok: false, error: message };
  }
}

export async function updatePizzellaImageAction(
  _prev: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  if (!isAdminSupabaseConfigured()) return { ok: false, error: "Service role no configurada." };
  const imageId = String(formData.get("image_id") ?? "").trim();
  const moldId = String(formData.get("mold_id") ?? "").trim();
  const alt_text = String(formData.get("alt_text") ?? "").trim();
  if (!imageId || !moldId || !alt_text) return { ok: false, error: "Datos inválidos." };
  try {
    await updatePizzellaImageAdmin(imageId, { alt_text });
    revalidatePizzellas();
    revalidatePath(`/internal/pizzellas/${moldId}`);
    return { ok: true, mode: "persisted" };
  } catch (error) {
    rethrowIfRedirectError(error);
    const message = error instanceof Error ? error.message : "No pudimos actualizar.";
    return { ok: false, error: message };
  }
}

export async function deletePizzellaImageAction(
  imageId: string,
  moldId: string,
  storagePath?: string
): Promise<ActionResult> {
  if (!isAdminSupabaseConfigured()) return { ok: false, error: "Service role no configurada." };
  try {
    await deletePizzellaImageAdmin(imageId);
    if (storagePath && validateImagePath("pizzellas", storagePath)) {
      try {
        await deleteImage("pizzellas", storagePath);
      } catch {
        // noop
      }
    }
    revalidatePizzellas();
    revalidatePath(`/internal/pizzellas/${moldId}`);
    return { ok: true, mode: "persisted" };
  } catch (error) {
    rethrowIfRedirectError(error);
    const message = error instanceof Error ? error.message : "No pudimos eliminar.";
    return { ok: false, error: message };
  }
}
