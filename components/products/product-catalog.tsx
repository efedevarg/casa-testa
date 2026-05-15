"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { ProductCard } from "@/components/products/product-card";
import type { Product, ProductCategoryId } from "@/lib/data";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/data/labels";
import { cn } from "@/lib/utils";

const ALL = "todos" as const;

const CATEGORY_ORDER: ProductCategoryId[] = [
  "ollas",
  "sartenes",
  "vajilla",
  "cocina",
  "decoracion",
  "pizzellas",
];

const FILTERS: Array<{ id: ProductCategoryId | "todos"; label: string }> = [
  { id: "todos", label: "Todos" },
  ...CATEGORY_ORDER.map((id) => ({
    id,
    label: PRODUCT_CATEGORY_LABEL[id],
  })),
];

function isCategory(value: string | null): value is ProductCategoryId {
  return !!value && value in PRODUCT_CATEGORY_LABEL;
}

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ProductCategoryId | "todos">(ALL);

  useEffect(() => {
    const param = searchParams.get("categoria");
    setCategory(isCategory(param) ? param : ALL);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (category === ALL) return products;
    return products.filter((p) => p.category === category);
  }, [category, products]);

  const setFilter = (next: ProductCategoryId | "todos") => {
    setCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === ALL) params.delete("categoria");
    else params.set("categoria", next);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="space-y-10">
      <FadeIn>
        <SectionHeader
          eyebrow="Catálogo"
          title="Objetos con nombre y precio de salón"
          description="Filtrá por familia y consultá disponibilidad por WhatsApp. Cada pieza se puede ver y comparar en Av. San Martín antes de llevarla."
        />
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/80 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay productos en esta categoría por ahora.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.04}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
