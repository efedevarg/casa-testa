import type { ProductCategoryId } from "./domain";

export const STATIC_CATEGORY_LABELS: Record<string, string> = {
  ollas: "Ollas",
  sartenes: "Sartenes",
  vajilla: "Vajilla",
  cocina: "Cocina",
  decoracion: "Decoración",
  pizzellas: "Pizzellas",
};
/** Compat legacy para categorías históricas conocidas. */
export const PRODUCT_CATEGORY_LABEL = STATIC_CATEGORY_LABELS;

function toTitleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\p{L}/gu, (char) => char.toUpperCase());
}

export function getCategoryLabel(categoryId: ProductCategoryId): string {
  const normalized = categoryId.toLowerCase();
  return STATIC_CATEGORY_LABELS[normalized] ?? toTitleCase(categoryId);
}
