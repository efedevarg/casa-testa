"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/media/optimized-image";
import { SITE_IMAGES, WHATSAPP_CHAT_URL } from "@/lib/constants";

export function HomeHero() {
  const reduce = useReducedMotion();

  const content = (
    <div className="space-y-7 sm:space-y-8">
      <HeroCopy />
    </div>
  );

  return (
    <section className="relative isolate min-h-[min(92vh,880px)] overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={SITE_IMAGES.hero.home}
          alt={SITE_IMAGES.hero.homeAlt}
          fill
          priority
          placeholder="empty"
          objectPosition="50% 42%"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/45 to-transparent sm:via-background/35"
          aria-hidden
        />
      </div>

      <div className="section-inline relative flex min-h-[min(92vh,880px)] flex-col justify-end gap-8 pb-14 pt-28 sm:gap-10 sm:pb-20 sm:pt-36 lg:max-w-2xl lg:pb-24 lg:pt-44">
        {reduce ? (
          content
        ) : (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {content}
          </m.div>
        )}
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary sm:text-xs">
        Casa Testa · Caseros
      </p>
      <div className="space-y-4 sm:space-y-5">
        <h1 className="font-heading text-[2rem] font-semibold leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.25rem]">
          Cocina italiana, elegida pieza por pieza
        </h1>
        <p className="max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground sm:text-lg">
          En Av. San Martín elegimos ollas, sartenes, vajilla y moldes con el
          criterio de quien cocina en casa: materiales nobles, gesto lento y un
          taller que restaura lo que ya tiene historia.
        </p>
      </div>
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button
          nativeButton={false}
          render={<Link href="/productos" />}
          size="lg"
          className="rounded-full px-7 shadow-sm"
        >
          Ver selección
        </Button>
        <Button
          nativeButton={false}
          render={
            <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" />
          }
          variant="outline"
          size="lg"
          className="rounded-full border-border/80 bg-background/75 px-7 text-foreground backdrop-blur-md hover:bg-background"
        >
          Escribinos
        </Button>
      </div>
    </>
  );
}
