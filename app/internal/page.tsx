import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/env";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

export default function InternalHomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Panel interno
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Gestioná textos del sitio, imágenes en Storage y el catálogo de productos sin
          tocar SQL.
        </p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        <StatusCard label="Supabase (lectura)" ok={isSupabaseConfigured()} />
        <StatusCard label="Service role (escritura)" ok={isAdminSupabaseConfigured()} />
      </dl>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ToolCard
          href="/internal/content"
          title="Contenido del sitio"
          description="Editá títulos, textos e URLs de imágenes en site_content."
        />
        <ToolCard
          href="/internal/media"
          title="Medios"
          description="Subí o eliminá imágenes en los buckets de Storage."
        />
        <ToolCard
          href="/internal/products"
          title="Productos"
          description="CRUD del catálogo: precios, stock, descripciones e imágenes."
        />
      </div>
    </div>
  );
}

function StatusCard({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/90 px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">
        {ok ? "✓ Configurado" : "— Pendiente"}
      </dd>
    </div>
  );
}

function ToolCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Button
        nativeButton={false}
        render={<Link href={href} />}
        className="w-full rounded-full sm:w-auto"
      >
        Abrir
      </Button>
    </article>
  );
}
