import Link from "next/link";

import { StatusMessage } from "@/components/internal/status-message";
import { queryContactInquiriesAdmin, queryRepairInquiriesAdmin } from "@/lib/queries/inquiries-admin";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type Props = {
  searchParams: Promise<{ type?: "all" | "contact" | "repair" }>;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function InternalInquiriesPage({ searchParams }: Props) {
  const { type = "all" } = await searchParams;
  const adminReady = isAdminSupabaseConfigured();
  let loadError: string | null = null;
  let contacts: Awaited<ReturnType<typeof queryContactInquiriesAdmin>> = [];
  let repairs: Awaited<ReturnType<typeof queryRepairInquiriesAdmin>> = [];

  if (adminReady) {
    try {
      [contacts, repairs] = await Promise.all([
        queryContactInquiriesAdmin(),
        queryRepairInquiriesAdmin(),
      ]);
    } catch (error) {
      loadError = error instanceof Error ? error.message : "No pudimos cargar consultas.";
    }
  }

  const showContact = type === "all" || type === "contact";
  const showRepair = type === "all" || type === "repair";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight">Inquiries</h2>
        <p className="text-sm text-muted-foreground">
          Consultas recibidas por formularios públicos, ordenadas por fecha descendente.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Todas" },
          { id: "contact", label: "Contacto" },
          { id: "repair", label: "Reparaciones" },
        ].map((tab) => (
          <Link
            key={tab.id}
            href={`/internal/inquiries?type=${tab.id}`}
            className={`rounded-full px-3 py-1.5 text-sm ${type === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {!adminReady ? <StatusMessage variant="error">Service role no configurada.</StatusMessage> : null}
      {loadError ? <StatusMessage variant="error">{loadError}</StatusMessage> : null}

      {showContact ? (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contacto</h3>
          <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card/90">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Teléfono</th>
                  <th className="px-4 py-3">Mensaje</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item) => (
                  <tr key={item.id} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">—</td>
                    <td className="px-4 py-3">{item.message}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{formatDate(item.created_at)}</td>
                  </tr>
                ))}
                {contacts.length === 0 ? (
                  <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>Sin consultas de contacto.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {showRepair ? (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Reparaciones</h3>
          <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card/90">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Teléfono</th>
                  <th className="px-4 py-3">Mensaje</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((item) => (
                  <tr key={item.id} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">—</td>
                    <td className="px-4 py-3">
                      <p>{item.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Pieza: {item.piece_description}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{formatDate(item.created_at)}</td>
                  </tr>
                ))}
                {repairs.length === 0 ? (
                  <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>Sin consultas de reparación.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
