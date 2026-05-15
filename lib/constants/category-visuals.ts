import type { ProductCategoryId } from "@/lib/mocks/types";

/** Encuadre por categoría — evita crops que cortan el sujeto principal */
export const CATEGORY_IMAGE_FOCUS: Record<ProductCategoryId, string> = {
  ollas: "50% 58%",
  sartenes: "50% 52%",
  vajilla: "50% 45%",
  cocina: "50% 40%",
  decoracion: "50% 50%",
  pizzellas: "50% 42%",
};

export type CategoryLayoutVariant = "feature" | "standard" | "wide";

/** Variante editorial del grid Curaduría (home) */
export const CATEGORY_LAYOUT: Record<ProductCategoryId, CategoryLayoutVariant> = {
  ollas: "feature",
  sartenes: "standard",
  vajilla: "standard",
  cocina: "standard",
  decoracion: "standard",
  pizzellas: "wide",
};
