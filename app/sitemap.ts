import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants/site";
import { MOCK_PRODUCTS } from "@/lib/mocks";

const routes = [
  "",
  "/productos",
  "/pizzellas",
  "/reparaciones",
  "/nosotros",
  "/contacto",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = MOCK_PRODUCTS.map(
    (product) => ({
      url: `${base}/productos/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [...staticEntries, ...productEntries];
}
