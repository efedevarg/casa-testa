"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PencilIcon } from "lucide-react";

import { formatArs } from "@/lib/format";
import type { Tables } from "@/lib/supabase/database.types";

import { DeletePizzellaButton } from "./delete-pizzella-button";

type Props = {
  molds: Tables<"pizzella_molds">[];
};

export function PizzellasList({ molds }: Props) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return molds;
    return molds.filter(
      (m) => m.model_name.toLowerCase().includes(q) || m.slug.toLowerCase().includes(q)
    );
  }, [molds, query]);

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nombre o slug…"
        className="w-full max-w-md rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
      />
      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card/90">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3">Molde</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Material</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Destacado</th>
              <th className="px-4 py-3">Creación</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No hay moldes para mostrar.
                </td>
              </tr>
            ) : (
              filtered.map((mold) => (
              <tr key={mold.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3">{mold.model_name}</td>
                <td className="px-4 py-3 font-mono text-xs">{mold.slug}</td>
                <td className="px-4 py-3">{mold.material ?? "—"}</td>
                <td className="px-4 py-3">{mold.price ? formatArs(mold.price) : "—"}</td>
                <td className="px-4 py-3">{mold.featured ? "Sí" : "No"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(mold.created_at).toLocaleDateString("es-AR")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/internal/pizzellas/${mold.id}`}
                      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <PencilIcon className="size-4" />
                    </Link>
                    <DeletePizzellaButton moldId={mold.id} moldName={mold.model_name} compact />
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
