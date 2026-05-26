import Link from "next/link";
import { notFound } from "next/navigation";

import { DeleteProductButton } from "@/components/internal/delete-product-button";
import { ProductForm } from "@/components/internal/product-form";
import { ProductImagesPanel } from "@/components/internal/product-images-panel";
import { StatusMessage } from "@/components/internal/status-message";
import {
  queryCategoriesForAdmin,
  queryProductAdminById,
} from "@/lib/queries/products-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function EditProductPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { saved } = await searchParams;

  if (!isAdminSupabaseConfigured()) {
    return (
      <div className="space-y-4">
        <StatusMessage variant="error">
          Service role no configurada para editar productos.
        </StatusMessage>
        <Link href="/internal/products" className="text-sm font-medium text-primary hover:underline">
          ← Volver al listado
        </Link>
      </div>
    );
  }

  const [product, categories] = await Promise.all([
    queryProductAdminById(id),
    queryCategoriesForAdmin(),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Link
            href="/internal/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Productos
          </Link>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            {product.name}
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            {product.sku} · {product.slug}
          </p>
        </div>
        <DeleteProductButton
          productId={product.id}
          productName={product.name}
          showErrorBelow
        />
      </div>

      <ProductForm
        categories={categories}
        product={product}
        showSavedBanner={saved === "1"}
      />

      <ProductImagesPanel product={product} />
    </div>
  );
}
