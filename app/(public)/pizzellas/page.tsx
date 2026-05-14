import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { PizzelleMoldCard } from "@/components/pizzellas/pizzelle-mold-card";
import { Button } from "@/components/ui/button";
import { WHATSAPP_CHAT_URL } from "@/lib/constants";
import { MOCK_PIZZELLE_MOLDS } from "@/lib/mocks";

export const metadata: Metadata = {
  title: "Pizzellas",
  description:
    "Moldes artesanales para pizzellas con storytelling italiano. Casa Testa, Caseros.",
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
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=2000&q=80"
            alt="Interior de panadería con panes dorados"
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
              Las pizzellas son memoria audible: el molde caliente, el impasto
              fino, el azúcar que nieve. En Casa Testa elegimos piezas con peso
              honesto y materiales que respetan el fuego lento de la cocina
              italiana.
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
            eyebrow="Catálogo mock"
            title="Moldes con nombre de pueblo"
            description="Seis propuestas ficticias con medidas, materiales y vocación emocional. Cuando llegue el stock real, este layout ya estará listo para recibir datos verdaderos."
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
