import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import { MOCK_CATEGORIES } from "@/lib/mocks";

export function HomeCategoryGrid() {
  return (
    <section className="section-inline space-y-10 py-16 sm:py-20">
      <FadeIn>
        <SectionHeader
          eyebrow="Curaduría"
          title="Cinco mundos para recorrer con calma"
          description="Cada categoría resume una forma de habitar la cocina: la cocción paciente, la mesa compartida, el gesto cotidiano, el detalle decorativo y el ritual de la pizzella."
        />
      </FadeIn>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {MOCK_CATEGORIES.map((cat, index) => (
          <FadeIn key={cat.id} delay={index * 0.05}>
            <Link
              href={cat.href}
              className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/11]">
                <OptimizedImage
                  src={cat.imageSrc}
                  alt={cat.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
              </div>
              <div className="absolute inset-x-0 bottom-0 space-y-2 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {cat.title}
                </p>
                <p className="max-w-sm font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {cat.blurb}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors group-hover:text-foreground">
                  Explorar
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
