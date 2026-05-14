import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Button } from "@/components/ui/button";
import { SITE, SITE_IMAGES, WHATSAPP_CHAT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Historia, valores y mirada artesanal de Casa Testa — tradición italiana en Caseros.",
  openGraph: {
    title: "Nosotros | Casa Testa",
    description:
      "Un salón que mezcla cocina, hogar y oficio: conocé nuestra historia.",
  },
};

const milestones = [
  {
    year: "Raíces",
    title: "Una mesa larga en Av. San Martín",
    body: "Casa Testa empezó como un gesto doméstico que fue creciendo: primero las ollas que curábamos para vecinos, después las pizzellas que salían a la merienda, después el deseo de elegir piezas con nombre propio y contar por qué estaban ahí.",
  },
  {
    year: "Oficio",
    title: "Manos que escuchan el metal",
    body: "Aprendimos a leer el hierro: dónde se cansó la soldadura, dónde el esmalte pide aire, dónde conviene parar. Cada reparación es una conversación con el tiempo, no una carrera contra el reloj ni un parche escondido.",
  },
  {
    year: "Hoy",
    title: "Un salón que huele a café y masa",
    body: "Te recibimos para mirar moldes, vajilla y piezas seleccionadas. No vendemos ruido: preferimos contarte de dónde viene cada objeto, cómo se cuida y qué esperar del fuego de tu cocina.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={SITE_IMAGES.pages.nosotrosHero}
            alt={SITE_IMAGES.pages.nosotrosHeroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        </div>

        <div className="section-inline relative flex min-h-[60vh] flex-col justify-end gap-6 py-16 sm:min-h-[65vh] sm:py-20 lg:max-w-3xl">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
              Historia
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
              Casa Testa: cocina italiana con manos de barrio y mirada de
              salón
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Somos un equipo chico que cree en la mesa como lugar de cuidado.
              Seleccionamos piezas con carácter, restauramos lo que merece
              seguir y celebramos la pizzella como ritual compartido — con el
              respeto de quien entiende el oficio.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/contacto" />}
              size="lg"
              className="mt-4 w-full rounded-full sm:w-auto"
            >
              Coordiná una visita
            </Button>
          </FadeIn>
        </div>
      </section>

      <section className="section-inline grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <FadeIn className="space-y-5">
          <SectionHeader
            eyebrow="Filosofía"
            title="La calidad se nota en el silencio de los detalles"
            description="No competimos con el ruido del descartable. Apostamos a piezas que envejecen con dignidad, texturas que invitan a tocar y procesos que se explican sin prisa, con la calidez de quien recibe en casa."
          />
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>· Atención personalizada, sin scripts de call center.</li>
            <li>· Curaduría italiana con sensibilidad porteña.</li>
            <li>· Reparaciones con diagnóstico claro y manos expertas.</li>
          </ul>
        </FadeIn>
        <FadeIn>
          <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] border border-border/70 shadow-xl">
            <OptimizedImage
              src={SITE_IMAGES.pages.nosotrosMesa}
              alt={SITE_IMAGES.pages.nosotrosMesaAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-border/60 bg-muted/35 py-16 sm:py-20">
        <div className="section-inline space-y-10">
          <FadeIn>
            <SectionHeader
              eyebrow="Tiempo"
              title="Tres capítulos, una misma mesa larga"
              description="Un relato breve para que sientas el tono de Casa Testa antes de cruzar el umbral: raíces en el barrio, oficio en las manos y un presente que huele a café recién hecho."
              align="center"
            />
          </FadeIn>
          <div className="grid gap-6 lg:grid-cols-3">
            {milestones.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-3xl border border-border/70 bg-card/90 p-6 shadow-sm backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {item.year}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-inline py-16 sm:py-20">
        <FadeIn className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-card via-background to-muted/40 p-8 text-center shadow-inner sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
            Te esperamos
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Pasá a saludar por {SITE.address.line}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Abrimos con agenda ordenada para que cada visita tenga tiempo de
            mirar, comparar y preguntar. Si preferís, escribinos antes por
            WhatsApp y armamos una pequeña selección sobre la mesa.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={
                <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" />
              }
              size="lg"
              className="rounded-full"
            >
              WhatsApp
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/productos" />}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              Ver productos
            </Button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
