import Link from "next/link";

import { CategoriesList } from "@/components/internal/categories-list";
import { StatusMessage } from "@/components/internal/status-message";
import { Button } from "@/components/ui/button";
import { queryCategoriesAdmin } from "@/lib/queries/categories-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type Props = {
  searchParams: Promise<{ deleted?: string }>;
};

export default async function InternalCategoriesPage({ searchParams }: Props) {
  const { deleted } = await searchParams;
  const adminReady = isAdminSupabaseConfigured();
  let categories: Awaited<ReturnType<typeof queryCategoriesAdmin>> = [];
  let loadError: string | null = null;

  if (adminReady) {
    try {
      categories = await queryCategoriesAdmin();
    } catch (error) {
      loadError = error instanceof Error ? error.message : "No pudimos cargar categorías.";
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">Categorías</h2>
          <p className="text-sm text-muted-foreground">
            CRUD básico de categorías y su imagen principal.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/internal/categories/new" />} className="rounded-full" disabled={!adminReady}>
          Nueva categoría
        </Button>
      </div>
      {deleted === "1" ? <StatusMessage variant="success">Categoría eliminada.</StatusMessage> : null}
      {!adminReady ? <StatusMessage variant="error">Service role no configurada.</StatusMessage> : null}
      {loadError ? <StatusMessage variant="error">{loadError}</StatusMessage> : null}
      {adminReady && !loadError ? <CategoriesList categories={categories} /> : null}
    </div>
  );
}
