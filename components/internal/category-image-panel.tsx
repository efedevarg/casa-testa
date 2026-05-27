"use client";

import Image from "next/image";
import { useActionState } from "react";

import { uploadCategoryImageAction } from "@/lib/actions/categories";
import { resolveImageUrl } from "@/lib/data/resolve-image";
import type { Tables } from "@/lib/supabase/database.types";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./copy-button";
import { StatusMessage } from "./status-message";

type Props = {
  category: Tables<"categories">;
};

export function CategoryImagePanel({ category }: Props) {
  const [state, formAction, pending] = useActionState(uploadCategoryImageAction, undefined);
  const image = state?.ok && state.data?.path ? state.data.path : category.image_url;
  const imageSrc = resolveImageUrl(image, "categories", "/images/categories/ollas.jpg");

  return (
    <section className="space-y-4 rounded-2xl border border-border/70 bg-card/90 p-6">
      <h3 className="font-heading text-xl font-semibold">Imagen de categoría</h3>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-muted">
        <Image src={imageSrc} alt={category.name} fill unoptimized className="object-cover" />
      </div>
      {image ? (
        <div className="space-y-2">
          <p className="font-mono text-xs break-all text-muted-foreground">{image}</p>
          <CopyButton value={image} label="Copiar path" />
        </div>
      ) : null}

      <form action={formAction} className="space-y-3">
        <input type="hidden" name="category_id" value={category.id} />
        <input
          name="path"
          placeholder={`${category.slug}/portada.jpg`}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 font-mono text-sm"
        />
        <input
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required
          className="w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground"
        />
        {state && !state.ok ? <StatusMessage variant="error">{state.error}</StatusMessage> : null}
        {state?.ok ? <StatusMessage variant="success">Imagen actualizada.</StatusMessage> : null}
        <Button type="submit" disabled={pending} className="rounded-full">
          {pending ? "Subiendo…" : "Subir imagen"}
        </Button>
      </form>
    </section>
  );
}
