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
import type { ProductCategoryId } from "@/lib/mocks/types";
import type {
  MockCategory,
  MockPizzelleMold,
  MockProduct,
  MockRepairItem,
} from "@/lib/mocks/types";

import {
  transformCategory,
  transformPizzelleMold,
  transformProduct,
  transformRepairService,
} from "./transforms";

const CATEGORY_ORDER: ProductCategoryId[] = [
  "ollas",
  "sartenes",
  "vajilla",
  "cocina",
  "decoracion",
  "pizzellas",
];

function sortCategories(categories: MockCategory[]): MockCategory[] {
  return [...categories].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.id) - CATEGORY_ORDER.indexOf(b.id)
  );
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
    console.error("[Casa Testa] Supabase fetch failed, using mocks:", error);
    return fallback;
  }
}

export const fetchCategories = cache(async (): Promise<MockCategory[]> => {
  return withMockFallback(async () => {
    const rows = await queryCategories();
    const mapped = rows
      .map(transformCategory)
      .filter((c): c is MockCategory => c !== null);
    return sortCategories(mapped);
  }, sortCategories(MOCK_CATEGORIES));
});

export const fetchProducts = cache(async (): Promise<MockProduct[]> => {
  return withMockFallback(async () => {
    const rows = await queryProducts();
    return rows
      .map(transformProduct)
      .filter((p): p is MockProduct => p !== null);
  }, MOCK_PRODUCTS);
});

export const fetchProductBySlug = cache(
  async (slug: string): Promise<MockProduct | undefined> => {
    return withMockFallback(async () => {
      const row = await queryProductBySlug(slug);
      if (!row) return undefined;
      return transformProduct(row) ?? undefined;
    }, getMockProductBySlug(slug));
  }
);

export const fetchFeaturedProducts = cache(
  async (limit = 4): Promise<MockProduct[]> => {
    return withMockFallback(async () => {
      const rows = await queryFeaturedProducts(limit);
      const products = rows
        .map(transformProduct)
        .filter((p): p is MockProduct => p !== null);
      return products.length > 0 ? products : getMockFeaturedProducts(limit);
    }, getMockFeaturedProducts(limit));
  }
);

export const fetchProductSlugs = cache(async (): Promise<string[]> => {
  return withMockFallback(async () => queryProductSlugs(), MOCK_PRODUCTS.map((p) => p.slug));
});

export const fetchPizzelleMolds = cache(async (): Promise<MockPizzelleMold[]> => {
  return withMockFallback(async () => {
    const rows = await queryPizzelleMolds();
    return rows.map(transformPizzelleMold);
  }, MOCK_PIZZELLE_MOLDS);
});

export const fetchRepairServices = cache(async (): Promise<MockRepairItem[]> => {
  return withMockFallback(async () => {
    const rows = await queryRepairServices();
    return rows.map(transformRepairService);
  }, MOCK_REPAIR_SERVICES);
});
