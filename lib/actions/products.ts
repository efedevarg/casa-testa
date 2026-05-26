"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { CACHE_TAGS } from "@/lib/data/cache-tags";
import {
  deleteProductAdmin,
  deleteProductImageAdmin,
  insertProductAdmin,
  insertProductImageAdmin,
  queryProductAdminById,
  updateProductAdmin,
  updateProductImageAdmin,
  type ProductUpsertInput,
} from "@/lib/queries/products-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import {
  deleteImage,
  uploadImage,
  validateImagePath,
} from "@/lib/supabase/storage";
import { slugify } from "@/lib/utils/slug";

import type { ActionResult } from "./types";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function revalidateCatalog(slug?: string) {
  revalidateTag(CACHE_TAGS.products);
  revalidateTag(CACHE_TAGS.categories);
  if (slug) revalidateTag(CACHE_TAGS.product(slug));
  revalidatePath("/productos");
  revalidatePath("/");
  if (slug) revalidatePath(`/productos/${slug}`);
}

function parseProductForm(formData: FormData): ProductUpsertInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const short_description = String(formData.get("short_description") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const category_id = String(formData.get("category_id") ?? "").trim();
  const featured = formData.get("featured") === "on";

  const priceRaw = Number(formData.get("price"));
  const compareRaw = String(formData.get("compare_at_price") ?? "").trim();
  const stockRaw = Number(formData.get("stock"));

  if (!name || name.length < 2) {
    return { error: "El nombre es obligatorio." };
  }

  if (!slug) slug = slugify(name);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug inválido. Usá solo letras minúsculas, números y guiones." };
  }

  if (!description || description.length < 10) {
    return { error: "La descripción debe tener al menos 10 caracteres." };
  }

  if (!short_description) {
    return { error: "La descripción corta es obligatoria." };
  }

  if (!sku) {
    return { error: "El SKU es obligatorio." };
  }

  if (!category_id) {
    return { error: "Seleccioná una categoría." };
  }

  if (!Number.isFinite(priceRaw) || priceRaw < 0) {
    return { error: "Precio inválido." };
  }

  if (!Number.isFinite(stockRaw) || stockRaw < 0 || !Number.isInteger(stockRaw)) {
    return { error: "Stock inválido (número entero ≥ 0)." };
  }

  let compare_at_price: number | null = null;
  if (compareRaw) {
    const compare = Number(compareRaw);
    if (!Number.isFinite(compare) || compare < 0) {
      return { error: "Precio comparado inválido." };
    }
    compare_at_price = compare;
  }

  return {
    name,
    slug,
    description,
    short_description,
    price: Math.round(priceRaw),
    compare_at_price,
    sku,
    stock: stockRaw,
    featured,
    category_id,
  };
}

export type SaveProductState = ActionResult<{ id: string; slug: string }>;

export async function saveProductAction(
  _prev: SaveProductState | undefined,
  formData: FormData
): Promise<SaveProductState> {
  if (!isAdminSupabaseConfigured()) {
    return {
      ok: false,
      error: "Service role no configurada (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const parsed = parseProductForm(formData);
  if ("error" in parsed) {
    return { ok: false, error: parsed.error };
  }

  const productId = String(formData.get("id") ?? "").trim();
  const isCreate = !productId;

  try {
    if (isCreate) {
      const created = await insertProductAdmin(parsed);
      revalidateCatalog(created.slug);
      redirect(`/internal/products/${created.id}?saved=1`);
    }

    const existing = await queryProductAdminById(productId);
    if (!existing) {
      return { ok: false, error: "Producto no encontrado." };
    }

    const updated = await updateProductAdmin(productId, parsed);
    revalidateCatalog(existing.slug);
    if (existing.slug !== updated.slug) {
      revalidateTag(CACHE_TAGS.product(updated.slug));
    }
    revalidatePath(`/internal/products/${productId}`);

    return {
      ok: true,
      mode: "persisted",
      data: { id: updated.id, slug: updated.slug },
    };
  } catch (error) {
    console.error("[saveProductAction]", error);
    const message =
      error instanceof Error ? error.message : "No pudimos guardar el producto.";
    if (message.includes("duplicate") || message.includes("unique")) {
      return { ok: false, error: "SKU o slug ya existen. Elegí otros valores." };
    }
    return { ok: false, error: message };
  }
}

export async function deleteProductAction(
  productId: string
): Promise<ActionResult> {
  if (!isAdminSupabaseConfigured()) {
    return { ok: false, error: "Service role no configurada." };
  }

  if (!productId.trim()) {
    return { ok: false, error: "ID de producto inválido." };
  }

  try {
    const existing = await queryProductAdminById(productId);
    if (!existing) {
      return { ok: false, error: "Producto no encontrado." };
    }

    await deleteProductAdmin(productId);
    revalidateCatalog(existing.slug);
    redirect("/internal/products?deleted=1");
  } catch (error) {
    console.error("[deleteProductAction]", error);
    return { ok: false, error: "No pudimos eliminar el producto." };
  }
}

export type UploadProductImageState = ActionResult<{
  imageId: string;
  path: string;
  publicUrl: string;
}>;

export async function uploadProductImageAction(
  _prev: UploadProductImageState | undefined,
  formData: FormData
): Promise<UploadProductImageState> {
  if (!isAdminSupabaseConfigured()) {
    return { ok: false, error: "Service role no configurada." };
  }

  const productId = String(formData.get("product_id") ?? "").trim();
  const alt_text = String(formData.get("alt_text") ?? "").trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);
  let path = String(formData.get("path") ?? "").trim();
  const file = formData.get("file");

  if (!productId) {
    return { ok: false, error: "Producto inválido." };
  }

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Seleccioná una imagen." };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "La imagen no puede superar 5 MB." };
  }

  try {
    const product = await queryProductAdminById(productId);
    if (!product) {
      return { ok: false, error: "Producto no encontrado." };
    }

    if (!path) {
      const safeName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]+/g, "-")
        .replace(/^-|-$/g, "");
      path = `${product.slug}/${safeName || "imagen.jpg"}`;
    }

    if (!validateImagePath("products", path)) {
      return { ok: false, error: "Path de imagen inválido." };
    }

    const buffer = await file.arrayBuffer();
    const uploaded = await uploadImage({
      bucket: "products",
      path,
      body: buffer,
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

    const row = await insertProductImageAdmin({
      product_id: productId,
      image_url: uploaded.path,
      alt_text: alt_text || product.name,
      sort_order: Number.isFinite(sort_order) ? sort_order : 0,
    });

    revalidateCatalog(product.slug);
    revalidatePath(`/internal/products/${productId}`);

    return {
      ok: true,
      mode: "persisted",
      data: {
        imageId: row.id,
        path: uploaded.path,
        publicUrl: uploaded.publicUrl,
      },
    };
  } catch (error) {
    console.error("[uploadProductImageAction]", error);
    return { ok: false, error: "No pudimos subir la imagen." };
  }
}

export type UpdateProductImageState = ActionResult;

export async function updateProductImageAction(
  _prev: UpdateProductImageState | undefined,
  formData: FormData
): Promise<UpdateProductImageState> {
  if (!isAdminSupabaseConfigured()) {
    return { ok: false, error: "Service role no configurada." };
  }

  const imageId = String(formData.get("image_id") ?? "").trim();
  const productId = String(formData.get("product_id") ?? "").trim();
  const alt_text = String(formData.get("alt_text") ?? "").trim();
  const sort_order = Number(formData.get("sort_order"));

  if (!imageId || !productId) {
    return { ok: false, error: "Datos de imagen inválidos." };
  }

  if (!alt_text) {
    return { ok: false, error: "El texto alternativo es obligatorio." };
  }

  if (!Number.isFinite(sort_order) || sort_order < 0) {
    return { ok: false, error: "Orden inválido." };
  }

  try {
    const product = await queryProductAdminById(productId);
    if (!product) {
      return { ok: false, error: "Producto no encontrado." };
    }

    await updateProductImageAdmin(imageId, {
      alt_text,
      sort_order: Math.round(sort_order),
    });

    revalidateCatalog(product.slug);
    revalidatePath(`/internal/products/${productId}`);

    return { ok: true, mode: "persisted" };
  } catch (error) {
    console.error("[updateProductImageAction]", error);
    return { ok: false, error: "No pudimos actualizar la imagen." };
  }
}

export async function deleteProductImageAction(
  imageId: string,
  productId: string,
  storagePath?: string
): Promise<ActionResult> {
  if (!isAdminSupabaseConfigured()) {
    return { ok: false, error: "Service role no configurada." };
  }

  try {
    const product = await queryProductAdminById(productId);
    if (!product) {
      return { ok: false, error: "Producto no encontrado." };
    }

    await deleteProductImageAdmin(imageId);

    if (storagePath && validateImagePath("products", storagePath)) {
      try {
        await deleteImage("products", storagePath);
      } catch {
        // Si falla el borrado en Storage, la fila ya se eliminó
      }
    }

    revalidateCatalog(product.slug);
    revalidatePath(`/internal/products/${productId}`);

    return { ok: true, mode: "persisted" };
  } catch (error) {
    console.error("[deleteProductImageAction]", error);
    return { ok: false, error: "No pudimos eliminar la imagen." };
  }
}
