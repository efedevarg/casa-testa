import Link from "next/link";

import { Button } from "@/components/ui/button";
import { queryCategoriesAdmin } from "@/lib/queries/categories-admin";
import { queryContactInquiriesAdmin, queryRepairInquiriesAdmin } from "@/lib/queries/inquiries-admin";
import { queryPizzellasAdmin } from "@/lib/queries/pizzellas-admin";
import { queryProductsAdmin } from "@/lib/queries/products-admin";
import { isSupabaseConfigured } from "@/lib/env";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function InternalHomePage() {
  const adminReady = isAdminSupabaseConfigured();
  const metrics = {
    products: 0,
    categories: 0,
    pizzellas: 0,
    newInquiries: 0,
  };
  let latest: Array<{ id: string; type: "contacto" | "reparacion"; name: string; created_at: string }> = [];

  if (adminReady) {
    const [products, categories, pizzellas, contacts, repairs] = await Promise.all([
      queryProductsAdmin(),
      queryCategoriesAdmin(),
      queryPizzellasAdmin(),
      queryContactInquiriesAdmin(),
      queryRepairInquiriesAdmin(),
    ]);
    metrics.products = products.length;
    metrics.categories = categories.length;
    metrics.pizzellas = pizzellas.length;
    metrics.newInquiries =
      contacts.filter((c) => c.status === "nueva").length +
      repairs.filter((r) => r.status === "nueva").length;
    latest = [
      ...contacts.slice(0, 4).map((c) => ({
        id: c.id,
        type: "contacto" as const,
        name: c.name,
        created_at: c.created_at,
      })),
      ...repairs.slice(0, 4).map((r) => ({
        id: r.id,
        type: "reparacion" as const,
        name: r.name,
        created_at: r.created_at,
      })),
    ]
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
      .slice(0, 5);
  }

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
        <StatusCard label="Service role (escritura)" ok={adminReady} />
      </dl>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Productos" value={metrics.products} />
        <MetricCard label="Categorías" value={metrics.categories} />
        <MetricCard label="Pizzellas" value={metrics.pizzellas} />
        <MetricCard label="Consultas nuevas" value={metrics.newInquiries} />
      </div>

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
        <ToolCard
          href="/internal/categories"
          title="Categorías"
          description="Administrá categorías, slug, destacados e imagen."
        />
        <ToolCard
          href="/internal/pizzellas"
          title="Pizzellas"
          description="CRUD de moldes y sus imágenes de referencia."
        />
        <ToolCard
          href="/internal/inquiries"
          title="Consultas"
          description="Lectura de mensajes de contacto y reparaciones."
        />
      </div>

      <section className="space-y-3 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Últimas consultas
          </h3>
          <Link href="/internal/inquiries" className="text-sm text-primary hover:underline">
            Ver todas
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no hay consultas registradas.</p>
        ) : (
          <ul className="space-y-2">
            {latest.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
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

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/90 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
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
