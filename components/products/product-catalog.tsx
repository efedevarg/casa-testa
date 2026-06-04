"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/lib/data";
import { getCategoryLabel } from "@/lib/data/labels";
import { cn } from "@/lib/utils";

const ALL = "todos" as const;

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryFilters = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    unique.sort((a, b) => getCategoryLabel(a).localeCompare(getCategoryLabel(b), "es"));
    return [
      { id: ALL, label: "Todos" },
      ...unique.map((id) => ({ id, label: getCategoryLabel(id) })),
    ] as Array<{ id: string; label: string }>;
  }, [products]);
  const validCategories = useMemo(
    () => new Set(categoryFilters.filter((f) => f.id !== ALL).map((f) => f.id)),
    [categoryFilters]
  );
  const [category, setCategory] = useState<string>(ALL);

  useEffect(() => {
    const param = searchParams.get("categoria");
    setCategory(param && validCategories.has(param) ? param : ALL);
  }, [searchParams, validCategories]);

  const filtered = useMemo(() => {
    if (category === ALL) return products;
    return products.filter((p) => p.category === category);
  }, [category, products]);

  const setFilter = (next: string) => {
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
          {categoryFilters.map((item) => {
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
        <div className="rounded-3xl border border-dashed border-border/80 bg-muted/30 px-6 py-12 text-center">
          <p className="font-heading text-xl font-semibold text-foreground">
            Sin piezas en esta categoría
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Probá otro filtro o escribinos por WhatsApp — te ayudamos a encontrar algo
            similar en salón.
          </p>
        </div>
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
