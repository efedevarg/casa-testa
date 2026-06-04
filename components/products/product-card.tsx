"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { OptimizedImage } from "@/components/media/optimized-image";
import { SITE, WHATSAPP_CHAT_URL } from "@/lib/constants";
import { formatArs } from "@/lib/format";
import type { Product } from "@/lib/data";
import { getCategoryLabel } from "@/lib/data/labels";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp/messages";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const reduce = useReducedMotion();
  const productUrl = `${SITE.url.replace(/\/$/, "")}/productos/${product.slug}`;
  const whatsappHref = buildProductWhatsAppUrl(
    { product, productUrl },
    WHATSAPP_CHAT_URL
  );

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm ring-0 transition-[transform,box-shadow,ring-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-primary/15",
        className
      )}
    >
      <Link href={`/productos/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <OptimizedImage
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {!product.inStock ? (
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur-sm">
              Sin stock
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary/90">
                {getCategoryLabel(product.category)}
              </p>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {product.name}
              </h3>
            </div>
            {!reduce ? (
              <m.span
                className="shrink-0 rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                whileHover={{ scale: 1.03 }}
              >
                Ver
              </m.span>
            ) : (
              <span className="shrink-0 rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
                Ver
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
          <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-3">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-semibold text-foreground sm:text-base">
                {formatArs(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-xs text-muted-foreground line-through">
                  {formatArs(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
            <span className="text-xs text-muted-foreground">Envío a coordinar</span>
          </div>
        </div>
      </Link>
      <div className="border-t border-border/60 px-5 pb-5 sm:px-6 sm:pb-6">
        <TrackedWhatsAppLink
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          trackingContext="product_card"
          trackingSlug={product.slug}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary/10"
          onClick={(event) => event.stopPropagation()}
        >
          <MessageCircle className="size-3.5" aria-hidden />
          Consulta rápida
        </TrackedWhatsAppLink>
      </div>
    </article>
  );
}
