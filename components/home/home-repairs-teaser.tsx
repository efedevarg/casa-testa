import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Recibimos tu pieza",
    body: "Nos contás qué pasó, desde el golpe accidental hasta el desgaste del tiempo. Fotos y memoria valen.",
  },
  {
    title: "Diagnóstico honesto",
    body: "Evaluamos si conviene reparar, restaurar o dejarla descansar con dignidad. Sin promesas imposibles.",
  },
  {
    title: "Propuesta clara",
    body: "Plazos aproximados, costos estimados y riesgos. Preferimos una frase sincera que un presupuesto inflado.",
  },
  {
    title: "Vuelve a tu cocina",
    body: "Probamos, limpiamos y entregamos lista para el próximo guiso, la próxima mesa, el próximo abrazo.",
  },
];

export function HomeRepairsTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-background py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <div className="relative h-full min-h-[420px]">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1584990340619-374305e7ade0?auto=format&fit=crop&w=1600&q=80"
            alt="Detalle de utensilios de cocina metálicos"
            fill
            className="object-cover opacity-40"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
        </div>
      </div>

      <div className="section-inline relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeIn className="space-y-6">
          <SectionHeader
            eyebrow="Reparaciones"
            title="Lo que se rompió merece una segunda oportunidad"
            description="Trabajamos ollas, sartenes, moldes y piezas que ya forman parte de tu historia. No somos un taller exprés: somos un lugar donde el metal vuelve a confiar."
          />
          <Button
            nativeButton={false}
            render={<Link href="/reparaciones" />}
            variant="secondary"
            size="lg"
            className="rounded-full"
          >
            Ver servicio de reparaciones
          </Button>
        </FadeIn>

        <FadeIn className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Paso {index + 1}
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
