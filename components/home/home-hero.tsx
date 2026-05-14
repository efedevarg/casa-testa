"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/media/optimized-image";
import { SITE_IMAGES, WHATSAPP_CHAT_URL } from "@/lib/constants";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={SITE_IMAGES.hero.home}
          alt={SITE_IMAGES.hero.homeAlt}
          fill
          priority
          className="scale-105 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
      </div>

      <div className="section-inline relative flex min-h-[88vh] flex-col justify-end gap-10 pb-16 pt-32 sm:pb-20 lg:max-w-2xl lg:pb-24 lg:pt-40">
        {!reduce ? (
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <HeroCopy />
          </m.div>
        ) : (
          <div className="space-y-6">
            <HeroCopy />
          </div>
        )}
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
        Casa Testa · Caseros
      </p>
      <div className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          Italia en la mesa, con la calma de quien sabe esperar.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Curamos ollas que retienen memoria de guiso, sartenes que sellan con
          respeto, vajilla que invita a quedarse, moldes para pizzellas con olor
          a domingo y un taller que escucha el metal antes de prometer.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          nativeButton={false}
          render={<Link href="/productos" />}
          size="lg"
          className="rounded-full px-6"
        >
          Ver productos
        </Button>
        <Button
          nativeButton={false}
          render={
            <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" />
          }
          variant="outline"
          size="lg"
          className="rounded-full border-secondary/60 bg-background/70 px-6 text-foreground backdrop-blur-sm hover:bg-background"
        >
          Escribinos por WhatsApp
        </Button>
      </div>
    </>
  );
}
