"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";

import { OptimizedImage } from "@/components/media/optimized-image";
import { formatArs } from "@/lib/format";
import type { MockProduct } from "@/lib/mocks";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/mocks/labels";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: MockProduct;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const reduce = useReducedMotion();

  return (
    <Link
      href={`/productos/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <OptimizedImage
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary/90">
              {PRODUCT_CATEGORY_LABEL[product.category]}
            </p>
            <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              {product.name}
            </h3>
          </div>
          {!reduce ? (
            <m.span
              className="shrink-0 rounded-full border border-border/80 bg-background/80 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
              whileHover={{ scale: 1.03 }}
            >
              Ver
            </m.span>
          ) : (
            <span className="shrink-0 rounded-full border border-border/80 bg-background/80 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Ver
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-baseline justify-between pt-3">
          <span className="text-sm font-semibold text-foreground">
            {formatArs(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">Envío a coordinar</span>
        </div>
      </div>
    </Link>
  );
}
