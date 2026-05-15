/** Tags para revalidación (`revalidateTag`) cuando el catálogo cambie en Supabase */
export const CACHE_TAGS = {
  categories: "catalog:categories",
  products: "catalog:products",
  product: (slug: string) => `catalog:product:${slug}`,
  pizzelleMolds: "catalog:pizzelle-molds",
  repairServices: "catalog:repair-services",
} as const;

/** Segundos entre revalidaciones automáticas del catálogo público */
export const CATALOG_REVALIDATE_SECONDS = 60 * 60;
