import type { Metadata } from "next";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { ContactForm } from "@/components/contact/contact-form";
import { InstagramMark } from "@/components/icons/instagram-mark";
import { SITE, WHATSAPP_CHAT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ubicación, WhatsApp, Instagram y formulario de contacto de Casa Testa, Caseros.",
  openGraph: {
    title: "Contacto | Casa Testa",
    description: "Escribinos, visitanos o seguinos en redes.",
  },
};

export default function ContactoPage() {
  return (
    <div className="pb-20">
      <section className="section-inline py-14 sm:py-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Contacto"
            title="Estamos a un mensaje de distancia"
            description="Pasá por el salón, escribinos o dejanos una nota en el formulario mock: vamos afinando la experiencia antes de conectar envíos reales."
          />
        </FadeIn>
      </section>

      <section className="section-inline grid gap-10 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="space-y-8">
          <FadeIn>
            <div className="overflow-hidden rounded-[2rem] border border-border/70 shadow-lg">
              <div className="relative aspect-[16/11]">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80"
                  alt="Personas compartiendo una mesa con bebidas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn className="space-y-6 rounded-3xl border border-border/70 bg-card/90 p-6 backdrop-blur-sm sm:p-8">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                Salón Casa Testa
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {SITE.address.line}
                <br />
                {SITE.address.city}
              </p>
            </div>
            <dl className="grid gap-4 text-sm text-muted-foreground">
              <div>
                <dt className="font-semibold text-foreground">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    className="underline decoration-border underline-offset-4 hover:text-primary"
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Instagram</dt>
                <dd className="mt-1">
                  <a
                    className="inline-flex items-center gap-2 underline decoration-border underline-offset-4 hover:text-primary"
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramMark className="size-4" />
                    @pizzelledellanonna
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Horarios mock</dt>
                <dd className="mt-1">
                  Lun a sáb · 10:00 a 13:30 y 16:00 a 19:30
                  <br />
                  Domingos con cita previa.
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
