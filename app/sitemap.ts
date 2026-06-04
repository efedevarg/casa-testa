import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants/site";
import { fetchCategories, fetchProductSlugs } from "@/lib/data/fetchers";

const routes = [
  "",
  "/productos",
  "/pizzellas",
  "/reparaciones",
  "/nosotros",
  "/contacto",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");
  const [productSlugs, categories] = await Promise.all([
    fetchProductSlugs(),
    fetchCategories(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${base}/productos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug !== "pizzellas")
    .map((category) => ({
      url: `${base}/productos?categoria=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.55,
    }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
