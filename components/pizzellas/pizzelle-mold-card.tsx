"use client";

import { FadeIn } from "@/components/marketing/fade-in";
import { OptimizedImage } from "@/components/media/optimized-image";
import type { MockPizzelleMold } from "@/lib/mocks";
import { cn } from "@/lib/utils";

export function PizzelleMoldCard({
  mold,
  className,
}: {
  mold: MockPizzelleMold;
  className?: string;
}) {
  return (
    <FadeIn className={cn("h-full", className)}>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[5/6] overflow-hidden bg-muted">
          <OptimizedImage
            src={mold.imageSrc}
            alt={mold.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-x-5 bottom-5 space-y-1 rounded-2xl border border-border/60 bg-background/80 p-4 text-xs text-muted-foreground backdrop-blur-md">
            <p>
              <span className="font-semibold text-foreground">Diámetro: </span>
              {mold.diameterCm}
            </p>
            <p>
              <span className="font-semibold text-foreground">Material: </span>
              {mold.material}
            </p>
            <p>
              <span className="font-semibold text-foreground">Calor: </span>
              {mold.heat}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Molde artesanal
            </p>
            <h3 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-foreground">
              {mold.name}
            </h3>
            <p className="text-sm text-muted-foreground">{mold.subtitle}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{mold.story}</p>
        </div>
      </article>
    </FadeIn>
  );
}
