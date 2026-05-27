export type CategoryLayoutVariant = "feature" | "standard" | "wide";

const CATEGORY_LAYOUT_OVERRIDES: Record<string, CategoryLayoutVariant> = {
  ollas: "feature",
  sartenes: "standard",
  vajilla: "standard",
  cocina: "standard",
  decoracion: "standard",
  pizzellas: "wide",
};

const CATEGORY_IMAGE_FOCUS_OVERRIDES: Record<string, string> = {
  ollas: "50% 58%",
  sartenes: "50% 52%",
  vajilla: "50% 45%",
  cocina: "50% 40%",
  decoracion: "50% 50%",
  pizzellas: "50% 42%",
};

export const DEFAULT_CATEGORY_LAYOUT: CategoryLayoutVariant = "standard";
export const DEFAULT_CATEGORY_IMAGE_FOCUS = "50% 50%";

/** Devuelve layout editorial para cualquier slug; fallback elegante para categorías nuevas */
export function getCategoryLayout(slug: string): CategoryLayoutVariant {
  return CATEGORY_LAYOUT_OVERRIDES[slug.toLowerCase()] ?? DEFAULT_CATEGORY_LAYOUT;
}

/** Devuelve encuadre de imagen para cualquier slug; fallback centrado */
export function getCategoryImageFocus(slug: string): string {
  return CATEGORY_IMAGE_FOCUS_OVERRIDES[slug.toLowerCase()] ?? DEFAULT_CATEGORY_IMAGE_FOCUS;
}
