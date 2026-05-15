import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ProductWithRelations } from "@/lib/supabase/database.types";

const PRODUCT_SELECT = `
  *,
  categories ( slug, name ),
  product_images ( id, product_id, image_url, alt_text, sort_order )
`;

export async function queryProducts(): Promise<ProductWithRelations[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ProductWithRelations[];
}

export async function queryProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as ProductWithRelations | null;
}

export async function queryFeaturedProducts(
  limit: number
): Promise<ProductWithRelations[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("featured", true)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) throw error;
  const featured = (data ?? []) as ProductWithRelations[];
  if (featured.length >= limit) return featured;

  const { data: fallback, error: fallbackError } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (fallbackError) throw fallbackError;
  return (fallback ?? []) as ProductWithRelations[];
}

export async function queryProductSlugs(): Promise<string[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("products").select("slug");

  if (error) throw error;
  return (data ?? []).map((row) => row.slug);
}
