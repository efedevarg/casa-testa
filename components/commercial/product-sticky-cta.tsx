"use client";

import { WhatsAppCta } from "@/components/commercial/whatsapp-cta";
import { formatArs } from "@/lib/format";
import { cn } from "@/lib/utils";

type ProductStickyCtaProps = {
  whatsappHref: string;
  productName: string;
  productSlug: string;
  price: number;
  inStock: boolean;
};

export function ProductStickyCta({
  whatsappHref,
  productName,
  productSlug,
  price,
  inStock,
}: ProductStickyCtaProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 p-4 backdrop-blur-md",
        "pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
      )}
      role="region"
      aria-label="Consulta rápida"
    >
      <div className="section-inline flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{productName}</p>
          <p className="text-xs text-muted-foreground">
            {formatArs(price)} · {inStock ? "Consultá disponibilidad" : "Sin stock — consultá"}
          </p>
        </div>
        <WhatsAppCta
          href={whatsappHref}
          label="WhatsApp"
          size="default"
          className="shrink-0 px-5"
          trackingContext="product_sticky"
          trackingSlug={productSlug}
        />
      </div>
    </div>
  );
}
