"use client";

import Image from "next/image";
import { useActionState, useMemo, useState } from "react";

import { deleteSiteImage, uploadSiteImage } from "@/lib/actions/storage";
import { STORAGE_BUCKETS, type StorageBucket } from "@/lib/supabase/storage";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";
import { StatusMessage } from "./status-message";
import { Button } from "@/components/ui/button";

type UploadState =
  | { ok: true; publicUrl: string; path: string; bucket: StorageBucket }
  | { ok: false; error: string }
  | undefined;

function slugifyFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const ext = name.match(/\.[^.]+$/)?.[0]?.toLowerCase() ?? ".jpg";
  const slug = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "imagen"}${ext}`;
}

export function MediaManager() {
  const [bucket, setBucket] = useState<StorageBucket>("site");
  const [path, setPath] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [lastUpload, setLastUpload] = useState<UploadState>(undefined);

  const [uploadState, uploadAction, uploadPending] = useActionState(
    async (_prev: UploadState, formData: FormData) => {
      const result = await uploadSiteImage(formData);
      if (result.ok && result.data) {
        setLastUpload({
          ok: true,
          publicUrl: result.data.publicUrl,
          path: result.data.path,
          bucket: result.data.bucket,
        });
        return {
          ok: true as const,
          publicUrl: result.data.publicUrl,
          path: result.data.path,
          bucket: result.data.bucket,
        };
      }
      const message =
        !result.ok && "error" in result ? result.error : "Error al subir.";
      const err = { ok: false as const, error: message };
      setLastUpload(err);
      return err;
    },
    undefined
  );

  const [deleteState, deleteAction, deletePending] = useActionState(
    async (
      _prev: { ok: boolean; error?: string } | undefined,
      formData: FormData
    ) => {
      const b = String(formData.get("bucket") ?? "");
      const p = String(formData.get("path") ?? "");
      const result = await deleteSiteImage(b, p);
      if (result.ok) return { ok: true };
      return { ok: false, error: result.error };
    },
    undefined
  );

  const displayPreview = previewUrl ?? (lastUpload?.ok ? lastUpload.publicUrl : null);

  const pathHint = useMemo(() => {
    switch (bucket) {
      case "site":
        return "hero/home-kitchen.jpg";
      case "categories":
        return "ollas/portada.jpg";
      case "products":
        return "cocotte-vicenza/portada.jpg";
      case "pizzellas":
        return "ferro-della-nonna/portada.jpg";
      case "brand":
        return "logo.svg";
      default:
        return "carpeta/archivo.jpg";
    }
  }, [bucket]);

  function handleFileChange(file: File | null) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    if (!path.trim()) {
      setPath(slugifyFilename(file.name));
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="space-y-5 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Subir imagen
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Elegí bucket y path. El path es lo que guardás en la base (o la URL pública
            completa).
          </p>
        </div>

        <form action={uploadAction} className="space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="font-medium text-foreground">Bucket</span>
            <select
              name="bucket"
              value={bucket}
              onChange={(e) => setBucket(e.target.value as StorageBucket)}
              disabled={uploadPending}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
            >
              {STORAGE_BUCKETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2 text-sm">
            <span className="font-medium text-foreground">Path en Storage</span>
            <input
              name="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder={pathHint}
              required
              disabled={uploadPending}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
            />
            <span className="text-xs text-muted-foreground">
              Ejemplo: <code className="rounded bg-muted px-1">{pathHint}</code>
            </span>
          </label>

          <label className="block space-y-2 text-sm">
            <span className="font-medium text-foreground">Archivo</span>
            <input
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
              required
              disabled={uploadPending}
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              className="w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
            />
          </label>

          {uploadState && !uploadState.ok ? (
            <StatusMessage variant="error">{uploadState.error}</StatusMessage>
          ) : null}

          {uploadState?.ok ? (
            <StatusMessage variant="success">Imagen subida correctamente.</StatusMessage>
          ) : null}

          <Button type="submit" disabled={uploadPending} className="rounded-full">
            {uploadPending ? "Subiendo…" : "Subir imagen"}
          </Button>
        </form>

        {lastUpload?.ok ? (
          <div className="space-y-3 rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
            <p className="font-medium text-foreground">Última subida</p>
            <dl className="space-y-2 font-mono text-xs break-all">
              <div>
                <dt className="text-muted-foreground">Path</dt>
                <dd>{lastUpload.path}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">URL pública</dt>
                <dd>{lastUpload.publicUrl}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              <CopyButton value={lastUpload.path} label="Copiar path" />
              <CopyButton value={lastUpload.publicUrl} label="Copiar URL" />
            </div>
            <p className="text-xs text-muted-foreground">
              Para <strong>site_content</strong> de imagen, pegá el path relativo (ej.{" "}
              <code>hero/home.jpg</code>) o la URL completa en la clave correspondiente.
            </p>
          </div>
        ) : null}
      </section>

      <section className="space-y-5">
        <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Vista previa
          </h2>
          <div
            className={cn(
              "relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-muted",
              !displayPreview && "flex items-center justify-center"
            )}
          >
            {displayPreview ? (
              <Image
                src={displayPreview}
                alt="Vista previa"
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <p className="px-4 text-center text-sm text-muted-foreground">
                Seleccioná un archivo o subí una imagen para ver la preview.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-destructive/30 bg-card/90 p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Eliminar imagen
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Borrá por bucket + path exacto. Acción irreversible.
          </p>

          <form action={deleteAction} className="mt-4 space-y-4">
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-foreground">Bucket</span>
              <select
                name="bucket"
                defaultValue="site"
                disabled={deletePending}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
              >
                {STORAGE_BUCKETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-foreground">Path</span>
              <input
                name="path"
                required
                placeholder={pathHint}
                disabled={deletePending}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 font-mono text-sm"
              />
            </label>

            {deleteState && !deleteState.ok && "error" in deleteState ? (
              <StatusMessage variant="error">{deleteState.error}</StatusMessage>
            ) : null}

            {deleteState?.ok ? (
              <StatusMessage variant="success">Imagen eliminada.</StatusMessage>
            ) : null}

            <Button
              type="submit"
              variant="destructive"
              disabled={deletePending}
              className="rounded-full"
            >
              {deletePending ? "Eliminando…" : "Eliminar"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
