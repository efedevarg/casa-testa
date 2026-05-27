"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Trash2Icon } from "lucide-react";

import {
  deletePizzellaImageAction,
  updatePizzellaImageAction,
  uploadPizzellaImageAction,
} from "@/lib/actions/pizzellas";
import type { PizzellaMoldWithImages, Tables } from "@/lib/supabase/database.types";
import { getPublicImageUrl } from "@/lib/supabase/storage";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./copy-button";
import { StatusMessage } from "./status-message";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40";

function getSrc(imageUrl: string) {
  if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) return imageUrl;
  try {
    return getPublicImageUrl("pizzellas", imageUrl);
  } catch {
    return imageUrl;
  }
}

function PizzellaImageRow({
  image,
  moldId,
}: {
  image: Tables<"pizzella_images">;
  moldId: string;
}) {
  const [updateState, updateAction, updatePending] = useActionState(
    updatePizzellaImageAction,
    undefined
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm("¿Eliminar imagen?")) return;
    setDeleting(true);
    const storagePath = image.image_url.startsWith("http") || image.image_url.startsWith("/")
      ? undefined
      : image.image_url;
    const result = await deletePizzellaImageAction(image.id, moldId, storagePath);
    if (!result.ok) setDeleteError(result.error);
    setDeleting(false);
  }

  return (
    <article className="grid gap-4 rounded-xl border border-border/60 bg-muted/20 p-4 sm:grid-cols-[120px_1fr]">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border/60 bg-background">
        <Image src={getSrc(image.image_url)} alt={image.alt_text} fill unoptimized className="object-cover" sizes="120px" />
      </div>
      <div className="space-y-3">
        <p className="font-mono text-xs break-all text-muted-foreground">{image.image_url}</p>
        <CopyButton value={image.image_url} label="Copiar path" />
        <form action={updateAction} className="grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="image_id" value={image.id} />
          <input type="hidden" name="mold_id" value={moldId} />
          <input name="alt_text" defaultValue={image.alt_text} required className={`${inputClass} sm:col-span-2`} />
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={updatePending} className="rounded-full">
              {updatePending ? "Guardando…" : "Actualizar"}
            </Button>
            <Button type="button" size="sm" variant="destructive" disabled={deleting} onClick={handleDelete} className="rounded-full">
              <Trash2Icon className="size-3.5" />
              {deleting ? "…" : "Eliminar"}
            </Button>
          </div>
        </form>
        {updateState && !updateState.ok ? <StatusMessage variant="error">{updateState.error}</StatusMessage> : null}
        {updateState?.ok ? <StatusMessage variant="success">Imagen actualizada.</StatusMessage> : null}
        {deleteError ? <StatusMessage variant="error">{deleteError}</StatusMessage> : null}
      </div>
    </article>
  );
}

export function PizzellaImagesPanel({ mold }: { mold: PizzellaMoldWithImages }) {
  const [uploadState, uploadAction, uploadPending] = useActionState(
    uploadPizzellaImageAction,
    undefined
  );
  const images = mold.pizzella_images ?? [];

  return (
    <section className="space-y-5 rounded-2xl border border-border/70 bg-card/90 p-6">
      <h3 className="font-heading text-xl font-semibold">Imágenes del molde</h3>
      <form action={uploadAction} className="grid gap-4 rounded-xl border border-dashed border-border/70 bg-muted/20 p-4">
        <input type="hidden" name="mold_id" value={mold.id} />
        <input name="path" placeholder={`${mold.slug}/portada.jpg`} className={`${inputClass} font-mono`} />
        <input name="alt_text" defaultValue={mold.model_name} className={inputClass} />
        <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required />
        {uploadState && !uploadState.ok ? <StatusMessage variant="error">{uploadState.error}</StatusMessage> : null}
        {uploadState?.ok ? <StatusMessage variant="success">Imagen subida.</StatusMessage> : null}
        <Button type="submit" disabled={uploadPending} className="w-fit rounded-full">
          {uploadPending ? "Subiendo…" : "Subir imagen"}
        </Button>
      </form>

      <div className="space-y-3">
        {images.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin imágenes todavía.</p>
        ) : (
          images.map((image) => <PizzellaImageRow key={image.id} image={image} moldId={mold.id} />)
        )}
      </div>
    </section>
  );
}
