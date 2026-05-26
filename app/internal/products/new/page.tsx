import Link from "next/link";

import { ProductForm } from "@/components/internal/product-form";
import { StatusMessage } from "@/components/internal/status-message";
import { queryCategoriesForAdmin } from "@/lib/queries/products-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

export default async function NewProductPage() {
  const adminReady = isAdminSupabaseConfigured();

  if (!adminReady) {
    return (
      <div className="space-y-4">
        <h2 className="font-heading text-3xl font-semibold tracking-tight">Nuevo producto</h2>
        <StatusMessage variant="error">
          Service role no configurada. No podés crear productos sin{" "}
          <strong>SUPABASE_SERVICE_ROLE_KEY</strong>.
        </StatusMessage>
        <Link href="/internal/products" className="text-sm font-medium text-primary hover:underline">
          ← Volver al listado
        </Link>
      </div>
    );
  }

  const categories = await queryCategoriesForAdmin();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/internal/products"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Productos
        </Link>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Nuevo producto
        </h2>
        <p className="text-sm text-muted-foreground">
          El slug se genera desde el nombre. Después de crear podrás subir imágenes.
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
