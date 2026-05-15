import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants/site";
import { fetchProductSlugs } from "@/lib/data/fetchers";

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
  const productSlugs = await fetchProductSlugs();

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

  return [...staticEntries, ...productEntries];
}
