"use client";

import { useActionState, useEffect, useState } from "react";

import { savePizzellaAction } from "@/lib/actions/pizzellas";
import type { Tables } from "@/lib/supabase/database.types";
import { slugify } from "@/lib/utils/slug";
import { Button } from "@/components/ui/button";

import { StatusMessage } from "./status-message";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40";

type Props = {
  mold?: Tables<"pizzella_molds">;
  showSavedBanner?: boolean;
};

export function PizzellaForm({ mold, showSavedBanner }: Props) {
  const isEdit = Boolean(mold);
  const [state, formAction, pending] = useActionState(savePizzellaAction, undefined);
  const [name, setName] = useState(mold?.model_name ?? "");
  const [slug, setSlug] = useState(mold?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);

  useEffect(() => {
    if (!slugTouched && name) setSlug(slugify(name));
  }, [name, slugTouched]);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-border/70 bg-card/90 p-6">
      {isEdit ? <input type="hidden" name="id" value={mold!.id} /> : null}
      {showSavedBanner ? <StatusMessage variant="success">Molde guardado.</StatusMessage> : null}
      {state && !state.ok ? <StatusMessage variant="error">{state.error}</StatusMessage> : null}
      {state?.ok && isEdit ? <StatusMessage variant="success">Cambios guardados.</StatusMessage> : null}

      <label className="block space-y-2 text-sm">
        <span className="font-medium">Model name</span>
        <input name="model_name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
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
        <textarea name="description" required rows={6} defaultValue={mold?.description ?? ""} className={inputClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Dimensiones</span>
          <input name="dimensions" defaultValue={mold?.dimensions ?? ""} className={inputClass} />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Material</span>
          <input name="material" defaultValue={mold?.material ?? ""} className={inputClass} />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Precio (ARS)</span>
          <input name="price" type="number" min={0} step={1} defaultValue={mold?.price ?? ""} className={inputClass} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={mold?.featured} />
        <span className="font-medium">Destacado</span>
      </label>
      <Button type="submit" disabled={pending} className="rounded-full">
        {pending ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear molde"}
      </Button>
    </form>
  );
}
