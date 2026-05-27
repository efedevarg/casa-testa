import Link from "next/link";

import { PizzellasList } from "@/components/internal/pizzellas-list";
import { StatusMessage } from "@/components/internal/status-message";
import { Button } from "@/components/ui/button";
import { queryPizzellasAdmin } from "@/lib/queries/pizzellas-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type Props = {
  searchParams: Promise<{ deleted?: string }>;
};

export default async function InternalPizzellasPage({ searchParams }: Props) {
  const { deleted } = await searchParams;
  const adminReady = isAdminSupabaseConfigured();
  let molds: Awaited<ReturnType<typeof queryPizzellasAdmin>> = [];
  let loadError: string | null = null;

  if (adminReady) {
    try {
      molds = await queryPizzellasAdmin();
    } catch (error) {
      loadError = error instanceof Error ? error.message : "No pudimos cargar moldes.";
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">Pizzellas</h2>
          <p className="text-sm text-muted-foreground">
            CRUD básico de moldes y sus imágenes.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/internal/pizzellas/new" />} className="rounded-full" disabled={!adminReady}>
          Nuevo molde
        </Button>
      </div>
      {deleted === "1" ? <StatusMessage variant="success">Molde eliminado.</StatusMessage> : null}
      {!adminReady ? <StatusMessage variant="error">Service role no configurada.</StatusMessage> : null}
      {loadError ? <StatusMessage variant="error">{loadError}</StatusMessage> : null}
      {adminReady && !loadError ? <PizzellasList molds={molds} /> : null}
    </div>
  );
}
