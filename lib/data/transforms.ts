import { SITE_IMAGES } from "@/lib/constants/site-images";
import { resolveImageUrl } from "@/lib/data/resolve-image";
import type {
  PizzellaMoldWithImages,
  ProductWithRelations,
  Tables,
} from "@/lib/supabase/database.types";

import type {
  Category,
  PizzelleMold,
  Product,
  RepairService,
} from "./domain";

const CATEGORY_IMAGE_FALLBACKS = Object.values(SITE_IMAGES.categories);

function getCategoryFallbackImage(slug: string): string {
  if (CATEGORY_IMAGE_FALLBACKS.length === 0) {
    return SITE_IMAGES.products.castIronCocotte;
  }
  const chars = [...slug.toLowerCase()];
  const hash = chars.reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return CATEGORY_IMAGE_FALLBACKS[hash % CATEGORY_IMAGE_FALLBACKS.length];
}

function getCategoryHref(slug: string): string {
  return slug === "pizzellas" ? "/pizzellas" : `/productos?categoria=${slug}`;
}

export function transformCategory(row: Tables<"categories">): Category {
  const fallbackImage = getCategoryFallbackImage(row.slug);

  return {
    id: row.slug,
    slug: row.slug,
    title: row.name,
    blurb: row.description ?? "",
    imageSrc: resolveImageUrl(row.image_url, "categories", fallbackImage),
    imageAlt: `${row.name} — Casa Testa`,
    href: getCategoryHref(row.slug),
  };
}

export function transformProduct(row: ProductWithRelations): Product | null {
  const categorySlug = row.categories?.slug;
  if (!categorySlug) return null;

  const images = [...(row.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const primary = images[0];

  return {
    id: row.id,
    sku: row.sku ?? undefined,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    category: categorySlug,
    imageSrc: resolveImageUrl(
      primary?.image_url,
      "products",
      SITE_IMAGES.products.castIronCocotte
    ),
    imageAlt: primary?.alt_text ?? row.name,
    featured: row.featured,
    inStock: row.stock > 0,
  };
}

export function transformPizzelleMold(row: PizzellaMoldWithImages): PizzelleMold {
  const image = row.pizzella_images?.[0];
  const paragraphs = row.description.split("\n\n").filter(Boolean);
  const heatLine = paragraphs.find((p) => p.startsWith("Calor:"));
  const content = paragraphs.filter((p) => !p.startsWith("Calor:"));
  const subtitle = content[0] ?? "";
  const story = content.slice(1).join("\n\n") || row.description;
  const heat = heatLine?.replace(/^Calor:\s*/i, "") ?? "";

  return {
    id: row.id,
    name: row.model_name,
    subtitle,
    diameterCm: row.dimensions ?? "",
    material: row.material ?? "",
    heat,
    story,
    imageSrc: resolveImageUrl(
      image?.image_url,
      "pizzellas",
      SITE_IMAGES.products.goldenBread
    ),
    imageAlt: image?.alt_text ?? row.model_name,
  };
}

export function transformRepairService(row: Tables<"repair_services">): RepairService {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
  };
}
