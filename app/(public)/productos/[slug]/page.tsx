import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/media/optimized-image";
import { WHATSAPP_CHAT_URL } from "@/lib/constants";
import { formatArs } from "@/lib/format";
import { MOCK_PRODUCTS, PRODUCT_CATEGORY_LABEL, getProductBySlug } from "@/lib/mocks";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Casa Testa`,
      description: product.shortDescription,
      images: [{ url: product.imageSrc, alt: product.imageAlt }],
    },
  };
}

export default async function ProductoDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const waText = encodeURIComponent(
    `Hola Casa Testa, me interesa ${product.name}. ¿Me comparten disponibilidad?`
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
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Imagen de referencia vía Unsplash — reemplazable por fotografía propia
            del producto.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {PRODUCT_CATEGORY_LABEL[product.category]}
            </p>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              {product.name}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
            <p className="text-3xl font-semibold text-foreground">
              {formatArs(product.price)}
            </p>
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
