import type { Metadata } from "next";

import { SITE } from "@/lib/constants/site";
import type { Category, Product } from "@/lib/data";
import { getCategoryLabel } from "@/lib/data/labels";

import { absoluteUrl, canonicalPath } from "./urls";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export function buildProductMetadata(product: Product): Metadata {
  const path = `/productos/${product.slug}`;
  const title = product.name;
  const description = truncate(
    product.shortDescription || product.description,
    160
  );
  const imageUrl = absoluteUrl(product.imageSrc);

  return {
    title,
    description,
    alternates: { canonical: canonicalPath(path) },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: absoluteUrl(path),
      siteName: SITE.name,
      title: `${title} | ${SITE.name}`,
      description,
      images: [{ url: imageUrl, alt: product.imageAlt, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [imageUrl],
    },
  };
}

export function buildCategoryCatalogMetadata(categorySlug: string, label: string): Metadata {
  const path = `/productos?categoria=${categorySlug}`;
  const title = `${label} — Catálogo`;
  const description = truncate(
    `Piezas de ${label.toLowerCase()} en Casa Testa, Caseros. Curaduría italiana, fotos del salón y consulta por WhatsApp.`,
    160
  );

  return {
    title,
    description,
    alternates: { canonical: canonicalPath(path) },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: absoluteUrl(path),
      siteName: SITE.name,
      title: `${title} | ${SITE.name}`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} | ${SITE.name}`,
      description,
    },
  };
}

export function resolveCategoryMetadata(
  categorySlug: string | undefined,
  categories: Category[]
): Metadata | undefined {
  if (!categorySlug) return undefined;
  const match = categories.find((c) => c.slug === categorySlug);
  if (!match) return undefined;
  const label = getCategoryLabel(match.slug);
  return buildCategoryCatalogMetadata(match.slug, label);
}
