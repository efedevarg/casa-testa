import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { PizzelleMoldCard } from "@/components/pizzellas/pizzelle-mold-card";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES, WHATSAPP_CHAT_URL } from "@/lib/constants";
import { MOCK_PIZZELLE_MOLDS } from "@/lib/mocks";

export const metadata: Metadata = {
  title: "Pizzellas",
  description:
    "Moldes artesanales para pizzellas, curaduría italiana y asesoramiento en Caseros — Casa Testa.",
  openGraph: {
    title: "Pizzelle della Nonna | Casa Testa",
    description:
      "Tradición, cocina familiar y piezas seleccionadas para el ritual de la pizzella.",
  },
};

export default function PizzellasPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={SITE_IMAGES.pages.pizzellasHero}
            alt={SITE_IMAGES.pages.pizzellasHeroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/40" />
        </div>

        <div className="section-inline relative flex min-h-[70vh] flex-col justify-center gap-8 py-20 sm:min-h-[75vh] sm:py-24 lg:max-w-3xl">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
              Pizzelle della Nonna
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              El crujido que heredás sin saber de quién viene
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              La pizzella es memoria audible: el molde caliente, el impasto fino,
              el azúcar que nieva. En Casa Testa elegimos piezas con peso honesto
              y materiales que respetan el fuego lento de la cocina italiana —
              para que el ritual vuelva a sonar en tu casa.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                render={
                  <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" />
                }
                size="lg"
                className="rounded-full"
              >
                Asesoramiento por WhatsApp
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/productos?categoria=pizzellas" />}
                variant="outline"
                size="lg"
                className="rounded-full border-secondary/50 bg-background/70 backdrop-blur-sm"
              >
                Ver curación en productos
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-inline space-y-12 py-16 sm:py-20">
        <FadeIn>
          <SectionHeader
            eyebrow="Colección"
            title="Moldes con nombre de pueblo y vocación emocional"
            description="Seis propuestas con medidas, materiales y relato. Cuando el stock viva en sistema, este layout ya respira como vitrina premium: solo habrá que conectar datos reales."
            align="center"
          />
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3">
          {MOCK_PIZZELLE_MOLDS.map((mold) => (
            <PizzelleMoldCard key={mold.id} mold={mold} />
          ))}
        </div>
      </section>
    </>
  );
}
