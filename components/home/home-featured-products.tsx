import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { getFeaturedProducts } from "@/lib/mocks";

export function HomeFeaturedProducts() {
  const products = getFeaturedProducts(4);

  return (
    <section className="border-y border-border/60 bg-muted/35 py-16 sm:py-20">
      <div className="section-inline space-y-10">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Selección del salón"
              title="Piezas que piden ser usadas, no guardadas"
              description="Una muestra de lo que hoy respira en Casa Testa: hierro que pesa bien, cerámica que acaricia la luz y herramientas con nombre propio. Cada objeto viene con historia y criterio de cuidado."
            />
            <Button
              nativeButton={false}
              render={<Link href="/productos" />}
              variant="outline"
              className="w-full shrink-0 rounded-full sm:w-auto"
            >
              Ver catálogo completo
            </Button>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.06}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
