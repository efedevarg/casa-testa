import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductCatalog } from "@/components/products/product-catalog";
import { fetchCategories, fetchProducts } from "@/lib/data/fetchers";
import { resolveCategoryMetadata } from "@/lib/seo/metadata";

const defaultMetadata: Metadata = {
  title: "Productos",
  description:
    "Ollas, sartenes, vajilla, cocina, decoración y pizzellas con curaduría italiana. Casa Testa, Caseros.",
  openGraph: {
    title: "Productos | Casa Testa",
    description:
      "Catálogo con filtros claros y fotografía del salón — consultá disponibilidad por WhatsApp.",
  },
  alternates: { canonical: "/productos" },
};

type PageProps = {
  searchParams: Promise<{ categoria?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { categoria } = await searchParams;
  if (!categoria) return defaultMetadata;

  const categories = await fetchCategories();
  const dynamic = resolveCategoryMetadata(categoria, categories);
  return dynamic ?? defaultMetadata;
}

function CatalogFallback() {
  return (
    <div className="space-y-6">
      <div className="h-28 animate-pulse rounded-3xl bg-muted/70" />
      <div className="h-10 w-2/3 max-w-md animate-pulse rounded-full bg-muted/70" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index.toString()}
            className="aspect-[3/4] animate-pulse rounded-3xl bg-muted/70"
          />
        ))}
      </div>
    </div>
  );
}

export default async function ProductosPage() {
  const products = await fetchProducts();

  return (
    <div className="section-inline py-14 sm:py-16">
      <Suspense fallback={<CatalogFallback />}>
        <ProductCatalog products={products} />
      </Suspense>
    </div>
  );
}
