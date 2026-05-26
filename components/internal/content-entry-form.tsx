"use client";

import { useActionState, useEffect, useState } from "react";

import { saveSiteContentAction } from "@/lib/actions/internal-content";
import type { SiteContentAdminEntry } from "@/lib/data/site-content-admin";

import { CopyButton } from "./copy-button";
import { StatusMessage } from "./status-message";
import { Button } from "@/components/ui/button";

type ContentEntryFormProps = {
  entry: SiteContentAdminEntry;
};

export function ContentEntryForm({ entry }: ContentEntryFormProps) {
  const [state, formAction, pending] = useActionState(saveSiteContentAction, undefined);
  const [value, setValue] = useState(entry.value);

  useEffect(() => {
    setValue(entry.value);
  }, [entry.value]);

  const isLong = value.length > 120 || value.includes("\n");
  const changed = value.trim() !== entry.value.trim();

  return (
    <article className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <code className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
            {entry.key}
          </code>
          {entry.description ? (
            <p className="text-sm text-muted-foreground">{entry.description}</p>
          ) : null}
        </div>
        {entry.isImageKey ? (
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Imagen / alt
          </span>
        ) : null}
      </div>

      <form action={formAction} className="mt-4 space-y-3">
        <input type="hidden" name="key" value={entry.key} />

        {isLong ? (
          <textarea
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            disabled={pending}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
          />
        ) : (
          <input
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={pending}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
          />
        )}

        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer font-medium hover:text-foreground">
            Valor por defecto (referencia)
          </summary>
          <p className="mt-2 break-all rounded-lg bg-muted/50 p-2">{entry.defaultValue}</p>
        </details>

        {state && !state.ok ? (
          <StatusMessage variant="error">{state.error}</StatusMessage>
        ) : null}

        {state?.ok ? (
          <StatusMessage variant="success">
            Guardado. Los cambios se verán en el sitio en breve.
          </StatusMessage>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={pending || !changed}>
            {pending ? "Guardando…" : "Guardar"}
          </Button>
          {entry.isImageKey && value ? <CopyButton value={value} label="Copiar path" /> : null}
        </div>
      </form>
    </article>
  );
}
