"use client";

import { useActionState, useEffect, useState } from "react";

import { saveCategoryAction } from "@/lib/actions/categories";
import type { Tables } from "@/lib/supabase/database.types";
import { slugify } from "@/lib/utils/slug";
import { Button } from "@/components/ui/button";

import { StatusMessage } from "./status-message";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40";

type Props = {
  category?: Tables<"categories">;
  showSavedBanner?: boolean;
};

export function CategoryForm({ category, showSavedBanner }: Props) {
  const isEdit = Boolean(category);
  const [state, formAction, pending] = useActionState(saveCategoryAction, undefined);
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);

  useEffect(() => {
    if (!slugTouched && name) setSlug(slugify(name));
  }, [name, slugTouched]);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-border/70 bg-card/90 p-6">
      {isEdit ? <input type="hidden" name="id" value={category!.id} /> : null}
      {showSavedBanner ? <StatusMessage variant="success">Categoría guardada.</StatusMessage> : null}
      {state && !state.ok ? <StatusMessage variant="error">{state.error}</StatusMessage> : null}
      {state?.ok && isEdit ? <StatusMessage variant="success">Cambios guardados.</StatusMessage> : null}

      <label className="block space-y-2 text-sm">
        <span className="font-medium">Nombre</span>
        <input name="name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
      </label>
      <label className="block space-y-2 text-sm">
        <span className="font-medium">Slug</span>
        <input
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className={`${inputClass} font-mono`}
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span className="font-medium">Descripción</span>
        <textarea name="description" defaultValue={category?.description ?? ""} rows={4} className={inputClass} />
      </label>
      <label className="block space-y-2 text-sm">
        <span className="font-medium">image_url (path/URL)</span>
        <input name="image_url" defaultValue={category?.image_url ?? ""} className={`${inputClass} font-mono`} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={category?.featured} />
        <span className="font-medium">Destacada</span>
      </label>
      <Button type="submit" disabled={pending} className="rounded-full">
        {pending ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear categoría"}
      </Button>
    </form>
  );
}
