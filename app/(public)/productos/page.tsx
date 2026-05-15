import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductCatalog } from "@/components/products/product-catalog";
import { fetchProducts } from "@/lib/data/fetchers";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Ollas, sartenes, vajilla, cocina, decoración y pizzellas con curaduría italiana. Casa Testa, Caseros.",
  openGraph: {
    title: "Productos | Casa Testa",
    description:
      "Catálogo con filtros claros y fotografía del salón — consultá disponibilidad por WhatsApp.",
  },
};

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
