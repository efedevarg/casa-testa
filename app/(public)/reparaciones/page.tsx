import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { RepairInquiryForm } from "@/components/repairs/repair-inquiry-form";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES, WHATSAPP_CHAT_URL } from "@/lib/constants";
import { fetchRepairServices } from "@/lib/data/fetchers";

export const metadata: Metadata = {
  title: "Reparaciones",
  description:
    "Servicio de restauración de ollas, sartenes, moldes y vajilla con criterio artesanal. Casa Testa, Caseros.",
  openGraph: {
    title: "Reparaciones | Casa Testa",
    description:
      "Diagnóstico honesto, proceso claro y manos que entienden el metal.",
  },
};

export default async function ReparacionesPage() {
  const services = await fetchRepairServices();

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-border/60 bg-muted/30">
        <div className="section-inline grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <FadeIn className="space-y-5">
            <SectionHeader
              eyebrow="Taller Casa Testa"
              title="Reparar también es honrar lo que ya cocinó con vos"
              description="No acumulamos pedidos sin criterio: miramos la pieza, escuchamos la historia y decidimos juntos si vale la pena intervenir. Cuando decimos que sí, trabajamos con tiempo, diagnóstico claro y manos que conocen el oficio."
            />
            <Button
              nativeButton={false}
              render={
                <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" />
              }
              size="lg"
              className="w-full rounded-full sm:w-auto"
            >
              Mandanos fotos por WhatsApp
            </Button>
          </FadeIn>
          <FadeIn>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-border/70 shadow-xl">
              <OptimizedImage
                src={SITE_IMAGES.pages.reparaciones}
                alt={SITE_IMAGES.pages.reparacionesAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-inline space-y-10 py-16 sm:py-20">
        <FadeIn>
          <SectionHeader
            eyebrow="Qué restauramos"
            title="Un taller que entiende hierro, gres y paciencia"
            description="Servicios pensados para ordenar la información antes de digitalizar turnos y presupuestos. Cada ítem resume un tipo de pieza que ya pasó por nuestras manos."
          />
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.05}>
              <div className="h-full rounded-3xl border border-border/70 bg-card/90 p-6 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Servicio
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-inline grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <FadeIn className="space-y-4">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Antes de traer la pieza
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Sacá fotos con buena luz, contanos desde cuándo la usás y qué tipo de
            cocina tenés. Si conviene verla en persona, coordinamos un encuentro
            tranquilo en el salón de Av. San Martín.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/contacto" />}
            variant="outline"
            className="rounded-full"
          >
            Ver datos de contacto
          </Button>
        </FadeIn>
        <RepairInquiryForm />
      </section>
    </div>
  );
}
