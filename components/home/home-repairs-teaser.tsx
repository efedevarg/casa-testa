"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/constants";

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
            src={SITE_IMAGES.home.repairsTeaser}
            alt={SITE_IMAGES.home.repairsTeaserAlt}
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
            title="Restaurar también es honrar lo que ya cocinó con vos"
            description="Ollas, sartenes, moldes y gres: miramos la pieza, te decimos si conviene intervenir y trabajamos con plazos claros."
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
            <RepairStepCard key={step.title} step={step} index={index} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

function RepairStepCard({
  step,
  index,
}: {
  step: { title: string; body: string };
  index: number;
}) {
  const reduce = useReducedMotion();
  const inner = (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Paso {index + 1}
      </p>
      <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
    </>
  );

  if (reduce) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md">
        {inner}
      </div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {inner}
    </m.div>
  );
}
