"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Trash2Icon } from "lucide-react";

import { CopyButton } from "@/components/internal/copy-button";
import { StatusMessage } from "@/components/internal/status-message";
import {
  deleteProductImageAction,
  setProductPrimaryImageAction,
  updateProductImageAction,
  uploadProductImageAction,
} from "@/lib/actions/products";
import { resolveImageUrl } from "@/lib/data/resolve-image";
import type { ProductAdminDetail } from "@/lib/queries/products-admin";
import type { Tables } from "@/lib/supabase/database.types";
import { getPublicImageUrl } from "@/lib/supabase/storage";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60";

type ProductImagesPanelProps = {
  product: ProductAdminDetail;
};

function isStoragePath(url: string): boolean {
  return !url.startsWith("http") && !url.startsWith("/");
}

function imageSrc(url: string): string {
  if (url.startsWith("http") || url.startsWith("/")) return url;
  try {
    return getPublicImageUrl("products", url);
  } catch {
    return resolveImageUrl(url, "products", url);
  }
}

function ProductImageRow({
  image,
  productId,
}: {
  image: Tables<"product_images">;
  productId: string;
}) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updateState, updateAction, updatePending] = useActionState(
    updateProductImageAction,
    undefined
  );

  async function handleDelete() {
    const confirmed = window.confirm("¿Eliminar esta imagen del producto?");
    if (!confirmed) return;

    setDeleting(true);
    setDeleteError(null);
    const storagePath = isStoragePath(image.image_url) ? image.image_url : undefined;
    const result = await deleteProductImageAction(image.id, productId, storagePath);
    if (!result.ok) {
      setDeleteError(result.error);
    }
    setDeleting(false);
  }

  async function handleSetPrimary() {
    await setProductPrimaryImageAction(image.id, productId);
  }

  return (
    <article className="rounded-xl border border-border/60 bg-muted/20 p-4">
      <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border/60 bg-background">
          <Image
            src={imageSrc(image.image_url)}
            alt={image.alt_text}
            fill
            unoptimized
            className="object-cover"
            sizes="120px"
          />
        </div>

        <div className="space-y-3">
          {image.sort_order === 0 ? (
            <span className="inline-flex rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
              Principal
            </span>
          ) : null}
          <p className="break-all font-mono text-xs text-muted-foreground">{image.image_url}</p>
          <CopyButton value={image.image_url} label="Copiar path" />

          <form action={updateAction} className="grid gap-3 sm:grid-cols-2">
            <input type="hidden" name="image_id" value={image.id} />
            <input type="hidden" name="product_id" value={productId} />

            <label className="space-y-1 text-sm sm:col-span-2">
              <span className="font-medium text-foreground">Texto alternativo</span>
              <input
                name="alt_text"
                defaultValue={image.alt_text}
                required
                disabled={updatePending}
                className={inputClass}
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-foreground">Orden</span>
              <input
                name="sort_order"
                type="number"
                min={0}
                defaultValue={image.sort_order}
                required
                disabled={updatePending}
                className={inputClass}
              />
            </label>

            <div className="flex items-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={deleting || updatePending || image.sort_order === 0}
                onClick={handleSetPrimary}
                className="rounded-full"
              >
                Definir principal
              </Button>
              <Button type="submit" size="sm" disabled={updatePending} className="rounded-full">
                {updatePending ? "Guardando…" : "Actualizar"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={deleting || updatePending}
                onClick={handleDelete}
                className="rounded-full"
              >
                <Trash2Icon className="size-3.5" />
                {deleting ? "…" : "Eliminar"}
              </Button>
            </div>
          </form>

          {updateState && !updateState.ok ? (
            <StatusMessage variant="error">{updateState.error}</StatusMessage>
          ) : null}
          {updateState?.ok ? (
            <StatusMessage variant="success">Imagen actualizada.</StatusMessage>
          ) : null}
          {deleteError ? <StatusMessage variant="error">{deleteError}</StatusMessage> : null}
        </div>
      </div>
    </article>
  );
}

export function ProductImagesPanel({ product }: ProductImagesPanelProps) {
  const images = [...(product.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const nextSort =
    images.length > 0 ? Math.max(...images.map((i) => i.sort_order)) + 1 : 0;

  const [uploadState, uploadAction, uploadPending] = useActionState(
    uploadProductImageAction,
    undefined
  );

  return (
    <section className="space-y-5 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          Imágenes del producto
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Bucket <strong>products</strong>. La imagen con menor orden se usa como principal en
          el sitio.
        </p>
      </div>

      <form action={uploadAction} className="grid gap-4 rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 sm:grid-cols-2">
        <input type="hidden" name="product_id" value={product.id} />

        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Archivo</span>
          <input
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            required
            disabled={uploadPending}
            className="w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">Path (opcional)</span>
          <input
            name="path"
            placeholder={`${product.slug}/portada.jpg`}
            disabled={uploadPending}
            className={`${inputClass} font-mono text-xs`}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">Orden</span>
          <input
            name="sort_order"
            type="number"
            min={0}
            defaultValue={nextSort}
            disabled={uploadPending}
            className={inputClass}
          />
        </label>

        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Texto alternativo</span>
          <input
            name="alt_text"
            defaultValue={product.name}
            disabled={uploadPending}
            className={inputClass}
          />
        </label>

        {uploadState && !uploadState.ok ? (
          <div className="sm:col-span-2">
            <StatusMessage variant="error">{uploadState.error}</StatusMessage>
          </div>
        ) : null}

        {uploadState?.ok && uploadState.data ? (
          <div className="space-y-2 sm:col-span-2">
            <StatusMessage variant="success">
              {uploadState.data.images.length} imagen(es) subida(s) y asociadas al producto.
            </StatusMessage>
            <div className="space-y-1">
              {uploadState.data.images.map((img) => (
                <div key={img.imageId} className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-xs break-all text-muted-foreground">{img.path}</p>
                  <CopyButton value={img.path} label="Copiar" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <Button type="submit" disabled={uploadPending} className="rounded-full">
            {uploadPending ? "Subiendo…" : "Subir imagen"}
          </Button>
        </div>
      </form>

      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground">Este producto no tiene imágenes todavía.</p>
      ) : (
        <div className="space-y-4">
          {images.map((image) => (
            <ProductImageRow key={image.id} image={image} productId={product.id} />
          ))}
        </div>
      )}
    </section>
  );
}
