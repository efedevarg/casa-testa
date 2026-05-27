"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { OptimizedImage } from "@/components/media/optimized-image";
import {
  getCategoryImageFocus,
  getCategoryLayout,
  type CategoryLayoutVariant,
} from "@/lib/constants/category-visuals";
import type { Category } from "@/lib/data";
import { cn } from "@/lib/utils";

type HomeCategoryGridViewProps = {
  categories: Category[];
  curaduriaTitle: string;
  curaduriaDescription: string;
};

const LAYOUT_GRID_CLASS: Record<CategoryLayoutVariant, string> = {
  feature:
    "col-span-1 row-span-2 sm:col-span-2 sm:row-span-2 min-h-[280px] sm:min-h-0",
  standard: "col-span-1 row-span-1 min-h-[220px] sm:min-h-[240px]",
  wide: "col-span-1 row-span-1 sm:col-span-3 min-h-[200px] sm:min-h-[220px]",
};

export function HomeCategoryGridView({
  categories,
  curaduriaTitle,
  curaduriaDescription,
}: HomeCategoryGridViewProps) {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-border/50 bg-muted/25 py-16 sm:py-24">
      <div className="section-inline space-y-10 sm:space-y-12">
        <FadeIn>
          <SectionHeader
            eyebrow="Curaduría"
            title={curaduriaTitle}
            description={curaduriaDescription}
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-[repeat(3,minmax(0,1fr))] sm:gap-5">
          {categories.map((cat, index) => {
            const layout = getCategoryLayout(cat.slug);
            const focus = getCategoryImageFocus(cat.slug);

            return (
              <FadeIn
                key={cat.id}
                delay={index * 0.04}
                className={cn("h-full", LAYOUT_GRID_CLASS[layout])}
              >
                <CategoryCard
                  category={cat}
                  layout={layout}
                  objectPosition={focus}
                  reduceMotion={reduce}
                />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  layout,
  objectPosition,
  reduceMotion,
}: {
  category: Category;
  layout: CategoryLayoutVariant;
  objectPosition: string;
  reduceMotion: boolean | null;
}) {
  const isFeature = layout === "feature";
  const isWide = layout === "wide";

  return (
    <Link
      href={category.href}
      className={cn(
        "group relative flex h-full min-h-[inherit] overflow-hidden rounded-[1.35rem] border border-border/60 bg-card shadow-sm",
        "ring-0 transition-[transform,box-shadow,ring-color] duration-500",
        "hover:-translate-y-0.5 hover:shadow-xl hover:ring-2 hover:ring-primary/12"
      )}
    >
      <m.div
        className="absolute inset-0 overflow-hidden"
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <OptimizedImage
          src={category.imageSrc}
          alt={category.imageAlt}
          fill
          sizes={
            isFeature
              ? "(max-width: 640px) 100vw, 66vw"
              : isWide
                ? "100vw"
                : "(max-width: 640px) 100vw, 33vw"
          }
          objectPosition={objectPosition}
        />
      </m.div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          isFeature
            ? "bg-gradient-to-t from-background via-background/55 to-background/10"
            : "bg-gradient-to-t from-background via-background/50 to-transparent"
        )}
      />

      <div
        className={cn(
          "relative mt-auto flex w-full flex-col gap-2 p-5 sm:p-6",
          isFeature && "sm:p-8",
          isWide && "sm:flex-row sm:items-end sm:justify-between sm:gap-8"
        )}
      >
        <div className="space-y-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary">
            {category.title}
          </p>
          <p
            className={cn(
              "max-w-md font-heading font-semibold leading-snug tracking-tight text-foreground",
              isFeature
                ? "text-2xl sm:text-3xl"
                : isWide
                  ? "text-xl sm:text-2xl"
                  : "text-lg sm:text-xl"
            )}
          >
            {category.blurb}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-full border border-border/50 bg-background/75 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur-sm transition-colors group-hover:border-primary/30 group-hover:text-foreground",
            isWide && "sm:shrink-0"
          )}
        >
          Explorar
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
