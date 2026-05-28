"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { CACHE_TAGS } from "@/lib/data/cache-tags";
import {
  deleteCategoryAdmin,
  insertCategoryAdmin,
  queryCategoryAdminById,
  updateCategoryAdmin,
  type CategoryUpsertInput,
} from "@/lib/queries/categories-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import { uploadImage, validateImagePath } from "@/lib/supabase/storage";
import { slugify } from "@/lib/utils/slug";

import type { ActionResult } from "./types";
import { rethrowIfRedirectError } from "./redirect";

function revalidateCategories(slug?: string) {
  revalidateTag(CACHE_TAGS.categories);
  revalidateTag(CACHE_TAGS.products);
  revalidatePath("/");
  revalidatePath("/productos");
  revalidatePath("/internal/categories");
  revalidatePath("/internal/products");
  if (slug) revalidatePath(`/productos?categoria=${slug}`);
}

function parseCategoryForm(formData: FormData): CategoryUpsertInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const descRaw = String(formData.get("description") ?? "").trim();
  const featured = formData.get("featured") === "on";
  const imageRaw = String(formData.get("image_url") ?? "").trim();
  const sortOrderRaw = Number(formData.get("sort_order") ?? 0);

  if (!name) return { error: "El nombre es obligatorio." };
  if (!slug) slug = slugify(name);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug inválido. Usá minúsculas, números y guiones." };
  }
  if (!Number.isFinite(sortOrderRaw) || sortOrderRaw < 0 || !Number.isInteger(sortOrderRaw)) {
    return { error: "Orden inválido (entero ≥ 0)." };
  }

  return {
    name,
    slug,
    description: descRaw || null,
    featured,
    image_url: imageRaw || null,
    sort_order: sortOrderRaw,
  };
}

export type SaveCategoryState = ActionResult<{ id: string }>;

export async function saveCategoryAction(
  _prev: SaveCategoryState | undefined,
  formData: FormData
): Promise<SaveCategoryState> {
  if (!isAdminSupabaseConfigured()) {
    return { ok: false, error: "Service role no configurada." };
  }

  const parsed = parseCategoryForm(formData);
  if ("error" in parsed) return { ok: false, error: parsed.error };

  const categoryId = String(formData.get("id") ?? "").trim();

  try {
    if (!categoryId) {
      const created = await insertCategoryAdmin(parsed);
      revalidateCategories(created.slug);
      redirect(`/internal/categories/${created.id}?saved=1`);
    }

    const existing = await queryCategoryAdminById(categoryId);
    if (!existing) return { ok: false, error: "Categoría no encontrada." };
    const updated = await updateCategoryAdmin(categoryId, parsed);
    revalidateCategories(existing.slug);
    if (existing.slug !== updated.slug) revalidateCategories(updated.slug);
    revalidatePath(`/internal/categories/${categoryId}`);
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

export async function deleteCategoryAction(categoryId: string): Promise<ActionResult> {
  if (!isAdminSupabaseConfigured()) return { ok: false, error: "Service role no configurada." };
  try {
    const existing = await queryCategoryAdminById(categoryId);
    if (!existing) return { ok: false, error: "Categoría no encontrada." };
    await deleteCategoryAdmin(categoryId);
    revalidateCategories(existing.slug);
    redirect("/internal/categories?deleted=1");
  } catch (error) {
    rethrowIfRedirectError(error);
    const message = error instanceof Error ? error.message : "No pudimos eliminar.";
    return { ok: false, error: message };
  }
}

export type UploadCategoryImageState = ActionResult<{ path: string }>;

export async function uploadCategoryImageAction(
  _prev: UploadCategoryImageState | undefined,
  formData: FormData
): Promise<UploadCategoryImageState> {
  if (!isAdminSupabaseConfigured()) return { ok: false, error: "Service role no configurada." };
  const categoryId = String(formData.get("category_id") ?? "").trim();
  const file = formData.get("file");
  let path = String(formData.get("path") ?? "").trim();

  if (!categoryId) return { ok: false, error: "Categoría inválida." };
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Seleccioná una imagen." };

  try {
    const category = await queryCategoryAdminById(categoryId);
    if (!category) return { ok: false, error: "Categoría no encontrada." };
    if (!path) {
      const name = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
      path = `${category.slug}/${name || "imagen.jpg"}`;
    }
    if (!validateImagePath("categories", path)) {
      return { ok: false, error: "Path inválido para bucket categories." };
    }
    const buffer = await file.arrayBuffer();
    const uploaded = await uploadImage({
      bucket: "categories",
      path,
      body: buffer,
      contentType: file.type || "image/jpeg",
      upsert: true,
    });
    await updateCategoryAdmin(categoryId, {
      name: category.name,
      slug: category.slug,
      description: category.description,
      featured: category.featured,
      image_url: uploaded.path,
      sort_order: category.sort_order,
    });
    revalidateCategories(category.slug);
    revalidatePath(`/internal/categories/${categoryId}`);
    return { ok: true, mode: "persisted", data: { path: uploaded.path } };
  } catch (error) {
    rethrowIfRedirectError(error);
    const message = error instanceof Error ? error.message : "No pudimos subir imagen.";
    return { ok: false, error: message };
  }
}
