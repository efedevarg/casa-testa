import { unstable_cache } from "next/cache";
import { cache } from "react";

import { isSupabaseConfigured } from "@/lib/env";
import { MOCK_CATEGORIES } from "@/lib/mocks/categories";
import { MOCK_PIZZELLE_MOLDS } from "@/lib/mocks/pizzelle-molds";
import {
  MOCK_PRODUCTS,
  getFeaturedProducts as getMockFeaturedProducts,
  getProductBySlug as getMockProductBySlug,
} from "@/lib/mocks/products";
import { MOCK_REPAIR_SERVICES } from "@/lib/mocks/repairs";
import { queryCategories } from "@/lib/queries/categories";
import { queryPizzelleMolds } from "@/lib/queries/pizzelle-molds";
import {
  queryFeaturedProducts,
  queryProductBySlug,
  queryProductSlugs,
  queryProducts,
} from "@/lib/queries/products";
import { queryRepairServices } from "@/lib/queries/repair-services";

import { CACHE_TAGS, CATALOG_REVALIDATE_SECONDS } from "./cache-tags";
import type {
  Category,
  PizzelleMold,
  Product,
  RepairService,
} from "./domain";
import { getDataSource } from "./source";
import {
  transformCategory,
  transformPizzelleMold,
  transformProduct,
  transformRepairService,
} from "./transforms";

export { getDataSource, shouldUseSupabase } from "./source";

function sortCategories(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => a.title.localeCompare(b.title, "es"));
}

async function withMockFallback<T>(
  loader: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    const result = await loader();
    if (Array.isArray(result) && result.length === 0) return fallback;
    if (result === null || result === undefined) return fallback;
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Invalid path specified in request URL")) {
      console.warn(
        "[Casa Testa] Supabase: URL inválida en NEXT_PUBLIC_SUPABASE_URL. Usá la Project URL (https://<ref>.supabase.co) sin /rest/v1. Usando mocks."
      );
    } else if (message.includes("Could not find the table")) {
      console.warn(
        "[Casa Testa] Supabase: faltan tablas en la base. Ejecutá las migraciones en supabase/migrations/ y supabase/seed.sql. Usando mocks."
      );
    } else {
      console.error(`[Casa Testa] Supabase (${getDataSource()}) fallback:`, error);
    }
    return fallback;
  }
}

function cachedCatalog<T>(
  key: string,
  tag: string,
  loader: () => Promise<T>
): () => Promise<T> {
  return unstable_cache(loader, [key], {
    tags: [tag],
    revalidate: CATALOG_REVALIDATE_SECONDS,
  });
}

async function loadCategoriesFromDb(): Promise<Category[]> {
  const rows = await queryCategories();
  return sortCategories(rows.map(transformCategory));
}

async function loadProductsFromDb(): Promise<Product[]> {
  const rows = await queryProducts();
  return rows.map(transformProduct).filter((p): p is Product => p !== null);
}

async function loadProductBySlugFromDb(slug: string): Promise<Product | undefined> {
  const row = await queryProductBySlug(slug);
  if (!row) return undefined;
  return transformProduct(row) ?? undefined;
}

async function loadFeaturedFromDb(limit: number): Promise<Product[]> {
  const rows = await queryFeaturedProducts(limit);
  const products = rows.map(transformProduct).filter((p): p is Product => p !== null);
  return products.length > 0 ? products : getMockFeaturedProducts(limit);
}

async function loadPizzelleMoldsFromDb(): Promise<PizzelleMold[]> {
  const rows = await queryPizzelleMolds();
  return rows.map(transformPizzelleMold);
}

async function loadRepairServicesFromDb(): Promise<RepairService[]> {
  const rows = await queryRepairServices();
  return rows.map(transformRepairService);
}

export const fetchCategories = cache(async (): Promise<Category[]> => {
  const fallback = sortCategories(MOCK_CATEGORIES);
  if (!isSupabaseConfigured()) return fallback;

  return withMockFallback(
    () => cachedCatalog("categories", CACHE_TAGS.categories, loadCategoriesFromDb)(),
    fallback
  );
});

export const fetchProducts = cache(async (): Promise<Product[]> => {
  if (!isSupabaseConfigured()) return MOCK_PRODUCTS;

  return withMockFallback(
    () => cachedCatalog("products", CACHE_TAGS.products, loadProductsFromDb)(),
    MOCK_PRODUCTS
  );
});

export const fetchProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    const fallback = getMockProductBySlug(slug);
    if (!isSupabaseConfigured()) return fallback;

    return withMockFallback(
      () =>
        cachedCatalog(
          `product-${slug}`,
          CACHE_TAGS.product(slug),
          () => loadProductBySlugFromDb(slug)
        )(),
      fallback
    );
  }
);

export const fetchFeaturedProducts = cache(
  async (limit = 4): Promise<Product[]> => {
    const fallback = getMockFeaturedProducts(limit);
    if (!isSupabaseConfigured()) return fallback;

    return withMockFallback(
      () =>
        cachedCatalog(`featured-${limit}`, CACHE_TAGS.products, () =>
          loadFeaturedFromDb(limit)
        )(),
      fallback
    );
  }
);

export const fetchProductSlugs = cache(async (): Promise<string[]> => {
  if (!isSupabaseConfigured()) return MOCK_PRODUCTS.map((p) => p.slug);

  return withMockFallback(async () => queryProductSlugs(), MOCK_PRODUCTS.map((p) => p.slug));
});

export const fetchPizzelleMolds = cache(async (): Promise<PizzelleMold[]> => {
  if (!isSupabaseConfigured()) return MOCK_PIZZELLE_MOLDS;

  return withMockFallback(
    () =>
      cachedCatalog("pizzelle-molds", CACHE_TAGS.pizzelleMolds, loadPizzelleMoldsFromDb)(),
    MOCK_PIZZELLE_MOLDS
  );
});

export const fetchRepairServices = cache(async (): Promise<RepairService[]> => {
  if (!isSupabaseConfigured()) return MOCK_REPAIR_SERVICES;

  return withMockFallback(
    () =>
      cachedCatalog(
        "repair-services",
        CACHE_TAGS.repairServices,
        loadRepairServicesFromDb
      )(),
    MOCK_REPAIR_SERVICES
  );
});
