import type { Metadata } from "next";
import Link from "next/link";

import { InternalNav } from "@/components/internal/internal-nav";
import { LogoutButton } from "@/components/internal/logout-button";
import { requireInternalAdmin } from "@/lib/auth/internal-access";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Herramientas internas",
  robots: { index: false, follow: false },
};

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireInternalAdmin();
  const adminReady = isAdminSupabaseConfigured();

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Casa Testa
              </p>
              <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                Herramientas internas
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <p className="hidden text-xs text-muted-foreground sm:block">
                {user.email}
              </p>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Sitio
              </Link>
              <LogoutButton />
            </div>
          </div>

          <InternalNav />

          {!adminReady ? (
            <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-100">
              <strong>SUPABASE_SERVICE_ROLE_KEY</strong> no está configurada. Las
              acciones de guardar y subir no persistirán hasta agregarla en el entorno.
            </p>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
