"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Button } from "@/components/ui/button";

export function HomePizzelleFeature() {
  const reduce = useReducedMotion();

  return (
    <section className="section-inline grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
      <FadeIn className="order-2 space-y-6 lg:order-1">
        <SectionHeader
          eyebrow="Pizzelle della Nonna"
          title="Un molde no calienta solo masa: calienta recuerdos"
          description="Las pizzellas son crujido y abrazo, mesa de domingo y risas repetidas. Elegimos moldes con peso real, materiales nobles y acabados que entienden el fuego sin apurarse."
        />
        <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>· Hierro, bronce y gres esmaltado seleccionados a mano.</li>
          <li>· Historias de familia italiana tejidas en cada relieve.</li>
          <li>· Asesoramos qué molde acompaña tu fogón y tu impasto.</li>
        </ul>
        <Button
          nativeButton={false}
          render={<Link href="/pizzellas" />}
          size="lg"
          className="rounded-full"
        >
          Descubrir moldes
        </Button>
      </FadeIn>

      <FadeIn className="order-1 lg:order-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/70 shadow-xl">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80"
            alt="Pan artesanal dorado en ambiente cálido de panadería"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
          {!reduce ? (
            <m.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-6 bottom-6 rounded-2xl border border-border/70 bg-background/85 p-5 text-sm leading-relaxed text-muted-foreground backdrop-blur-md"
            >
              “La pizzella perfecta no se discute: se comparte recién salida,
              con polvo de azúcar o con el silencio de quien la esperaba.”
            </m.div>
          ) : (
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-border/70 bg-background/85 p-5 text-sm leading-relaxed text-muted-foreground backdrop-blur-md">
              “La pizzella perfecta no se discute: se comparte recién salida,
              con polvo de azúcar o con el silencio de quien la esperaba.”
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
