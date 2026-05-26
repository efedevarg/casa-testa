import { createAdminSupabaseClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { Tables } from "@/lib/supabase/database.types";
import type { ProductWithRelations } from "@/lib/supabase/database.types";

const PRODUCT_ADMIN_SELECT = `
  *,
  categories ( id, slug, name ),
  product_images ( id, product_id, image_url, alt_text, sort_order )
`;

export type ProductAdminListItem = Tables<"products"> & {
  categories: Pick<Tables<"categories">, "id" | "slug" | "name"> | null;
};

export type ProductAdminDetail = ProductWithRelations;

export type ProductUpsertInput = {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price: number | null;
  sku: string;
  stock: number;
  featured: boolean;
  category_id: string;
};

export type ProductImageInput = {
  product_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

function getAdmin() {
  if (!isAdminSupabaseConfigured()) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY requerida para administrar productos.");
  }
  return createAdminSupabaseClient();
}

export async function queryProductsAdmin(): Promise<ProductAdminListItem[]> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories ( id, slug, name )")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`[productsAdmin.list] ${error.message}`);
  return data as ProductAdminListItem[];
}

export async function queryProductAdminById(
  id: string
): Promise<ProductAdminDetail | null> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_ADMIN_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`[productsAdmin.byId] ${error.message}`);
  return data as ProductAdminDetail | null;
}

export async function insertProductAdmin(
  input: ProductUpsertInput
): Promise<Tables<"products">> {
  const supabase = getAdmin();
  const { data, error } = await supabase.from("products").insert(input).select().single();

  if (error) throw new Error(`[productsAdmin.insert] ${error.message}`);
  return data;
}

export async function updateProductAdmin(
  id: string,
  input: ProductUpsertInput
): Promise<Tables<"products">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`[productsAdmin.update] ${error.message}`);
  return data;
}

export async function deleteProductAdmin(id: string): Promise<void> {
  const supabase = getAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(`[productsAdmin.delete] ${error.message}`);
}

export async function insertProductImageAdmin(
  input: ProductImageInput
): Promise<Tables<"product_images">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("product_images")
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(`[productsAdmin.imageInsert] ${error.message}`);
  return data;
}

export async function updateProductImageAdmin(
  id: string,
  patch: Partial<Pick<Tables<"product_images">, "alt_text" | "sort_order" | "image_url">>
): Promise<Tables<"product_images">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("product_images")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`[productsAdmin.imageUpdate] ${error.message}`);
  return data;
}

export async function deleteProductImageAdmin(id: string): Promise<void> {
  const supabase = getAdmin();
  const { error } = await supabase.from("product_images").delete().eq("id", id);
  if (error) throw new Error(`[productsAdmin.imageDelete] ${error.message}`);
}

export async function queryCategoriesForAdmin(): Promise<Tables<"categories">[]> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(`[productsAdmin.categories] ${error.message}`);
  return data;
}
