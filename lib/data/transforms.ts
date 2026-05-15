import { SITE_IMAGES } from "@/lib/constants/site-images";
import type {
  PizzellaMoldWithImages,
  ProductWithRelations,
  Tables,
} from "@/lib/supabase/database.types";

import type {
  Category,
  PizzelleMold,
  Product,
  ProductCategoryId,
  RepairService,
} from "./domain";

const CATEGORY_IMAGES = SITE_IMAGES.categories;
const CATEGORY_HREFS: Record<ProductCategoryId, string> = {
  ollas: "/productos?categoria=ollas",
  sartenes: "/productos?categoria=sartenes",
  vajilla: "/productos?categoria=vajilla",
  cocina: "/productos?categoria=cocina",
  decoracion: "/productos?categoria=decoracion",
  pizzellas: "/pizzellas",
};

function isProductCategoryId(slug: string): slug is ProductCategoryId {
  return slug in CATEGORY_IMAGES;
}

export function transformCategory(row: Tables<"categories">): Category | null {
  if (!isProductCategoryId(row.slug)) return null;

  return {
    id: row.slug,
    title: row.name,
    blurb: row.description ?? "",
    imageSrc: CATEGORY_IMAGES[row.slug],
    imageAlt: `${row.name} — Casa Testa`,
    href: CATEGORY_HREFS[row.slug],
  };
}

export function transformProduct(row: ProductWithRelations): Product | null {
  const categorySlug = row.categories?.slug;
  if (!categorySlug || !isProductCategoryId(categorySlug)) return null;

  const images = [...(row.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const primary = images[0];

  return {
    id: row.id,
    sku: row.sku,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    category: categorySlug,
    imageSrc: primary?.image_url ?? SITE_IMAGES.products.castIronCocotte,
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
    imageSrc: image?.image_url ?? SITE_IMAGES.products.goldenBread,
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
