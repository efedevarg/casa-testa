import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/media/optimized-image";
import { SITE, WHATSAPP_CHAT_URL } from "@/lib/constants";
import { formatArs } from "@/lib/format";
import { getCategoryLabel } from "@/lib/data/labels";
import { fetchProductBySlug, fetchProductSlugs } from "@/lib/data/fetchers";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await fetchProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

function absoluteUrl(path: string) {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Casa Testa`,
      description: product.shortDescription,
      images: [{ url: absoluteUrl(product.imageSrc), alt: product.imageAlt }],
    },
  };
}

export default async function ProductoDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const waText = encodeURIComponent(
    `Hola Casa Testa, me interesa ${product.name} (${product.sku}). ¿Me comparten disponibilidad?`
  );

  return (
    <article className="pb-20 pt-10 sm:pt-14">
      <div className="section-inline grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/70 bg-muted shadow-xl">
            <OptimizedImage
              src={product.imageSrc}
              alt={product.imageAlt}
              fill
              priority
              placeholder="empty"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Fotografía de referencia tomada en el salón. En tienda podés ver la
            pieza, comparar acabados y confirmar medidas antes de llevarla.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {getCategoryLabel(product.category)}
              </p>
              <span className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                {product.sku}
              </span>
              {product.inStock ? (
                <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-primary">
                  Disponible en salón
                </span>
              ) : (
                <span className="rounded-full border border-border/80 bg-card px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  Sin stock
                </span>
              )}
            </div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              {product.name}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-semibold text-foreground">{formatArs(product.price)}</p>
              {product.compareAtPrice ? (
                <p className="text-lg text-muted-foreground line-through">
                  {formatArs(product.compareAtPrice)}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-3 rounded-3xl border border-border/70 bg-card/80 p-6 backdrop-blur-sm">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Historia de la pieza
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {product.description}
            </p>
            {product.highlights?.length ? (
              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {product.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={
                <a
                  href={`${WHATSAPP_CHAT_URL}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="lg"
              className="rounded-full"
            >
              Consultar por WhatsApp
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/productos" />}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              Volver al catálogo
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
