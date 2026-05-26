import Link from "next/link";

import { ProductsList } from "@/components/internal/products-list";
import { StatusMessage } from "@/components/internal/status-message";
import { Button } from "@/components/ui/button";
import { queryProductsAdmin } from "@/lib/queries/products-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type PageProps = {
  searchParams: Promise<{ deleted?: string }>;
};

export default async function InternalProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const adminReady = isAdminSupabaseConfigured();

  let products: Awaited<ReturnType<typeof queryProductsAdmin>> = [];
  let loadError: string | null = null;

  if (adminReady) {
    try {
      products = await queryProductsAdmin();
    } catch (error) {
      loadError =
        error instanceof Error ? error.message : "No pudimos cargar los productos.";
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Productos
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Administrá el catálogo: precios, stock, textos e imágenes sin entrar a Supabase.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/internal/products/new" />}
          className="rounded-full"
          disabled={!adminReady}
        >
          Nuevo producto
        </Button>
      </div>

      {params.deleted === "1" ? (
        <StatusMessage variant="success">Producto eliminado.</StatusMessage>
      ) : null}

      {!adminReady ? (
        <StatusMessage variant="error">
          Configurá <strong>SUPABASE_SERVICE_ROLE_KEY</strong> para administrar productos.
        </StatusMessage>
      ) : null}

      {loadError ? <StatusMessage variant="error">{loadError}</StatusMessage> : null}

      {adminReady && !loadError ? <ProductsList products={products} /> : null}
    </div>
  );
}
