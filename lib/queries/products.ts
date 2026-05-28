import { runSupabaseQuery } from "@/lib/supabase/helpers";
import type { ProductWithRelations } from "@/lib/supabase/database.types";

const PRODUCT_SELECT = `
  *,
  categories ( slug, name ),
  product_images ( id, product_id, image_url, alt_text, sort_order )
`;

export async function queryProducts(): Promise<ProductWithRelations[]> {
  try {
    return (await runSupabaseQuery("products.list", async (supabase) =>
      supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true })
    )) as ProductWithRelations[];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("sort_order")) throw error;
    return (await runSupabaseQuery("products.list.legacyOrder", async (supabase) =>
      supabase.from("products").select(PRODUCT_SELECT).order("created_at", { ascending: true })
    )) as ProductWithRelations[];
  }
}

export async function queryProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  return runSupabaseQuery("products.bySlug", async (supabase) =>
    supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).maybeSingle()
  ) as Promise<ProductWithRelations | null>;
}

export async function queryFeaturedProducts(
  limit: number
): Promise<ProductWithRelations[]> {
  let featured: ProductWithRelations[] = [];
  try {
    featured = (await runSupabaseQuery("products.featured", async (supabase) =>
      supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("featured", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true })
        .limit(limit)
    )) as ProductWithRelations[];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("sort_order")) throw error;
    featured = (await runSupabaseQuery("products.featured.legacyOrder", async (supabase) =>
      supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("featured", true)
        .order("created_at", { ascending: true })
        .limit(limit)
    )) as ProductWithRelations[];
  }

  if (featured.length >= limit) return featured;

  try {
    return (await runSupabaseQuery("products.featuredFallback", async (supabase) =>
      supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true })
        .limit(limit)
    )) as ProductWithRelations[];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("sort_order")) throw error;
    return (await runSupabaseQuery("products.featuredFallback.legacyOrder", async (supabase) =>
      supabase.from("products").select(PRODUCT_SELECT).order("created_at", { ascending: true }).limit(limit)
    )) as ProductWithRelations[];
  }
}

export async function queryProductSlugs(): Promise<string[]> {
  const rows = await runSupabaseQuery("products.slugs", async (supabase) =>
    supabase.from("products").select("slug")
  );
  return rows.map((row) => row.slug);
}
