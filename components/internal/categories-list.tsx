"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PencilIcon } from "lucide-react";

import type { Tables } from "@/lib/supabase/database.types";

import { DeleteCategoryButton } from "./delete-category-button";

type Props = {
  categories: Tables<"categories">[];
};

export function CategoriesList({ categories }: Props) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return categories;
    return categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  }, [categories, query]);

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
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Destacada</th>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Creación</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat) => (
              <tr key={cat.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3">{cat.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{cat.slug}</td>
                <td className="px-4 py-3">{cat.featured ? "Sí" : "No"}</td>
                <td className="px-4 py-3">{cat.image_url ? "Sí" : "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(cat.created_at).toLocaleDateString("es-AR")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/internal/categories/${cat.id}`}
                      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <PencilIcon className="size-4" />
                    </Link>
                    <DeleteCategoryButton categoryId={cat.id} categoryName={cat.name} compact />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
