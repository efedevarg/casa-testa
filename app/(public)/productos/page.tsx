import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductCatalog } from "@/components/products/product-catalog";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo mock de ollas, vajilla, cocina y decoración con estética italiana premium. Casa Testa, Caseros.",
  openGraph: {
    title: "Productos | Casa Testa",
    description:
      "Explorá el catálogo visual: filtros, cards y fotografías reales mientras definimos el backend.",
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

export default function ProductosPage() {
  return (
    <div className="section-inline py-14 sm:py-16">
      <Suspense fallback={<CatalogFallback />}>
        <ProductCatalog />
      </Suspense>
    </div>
  );
}
