"use client";

import { useState, useTransition } from "react";
import { Trash2Icon } from "lucide-react";

import { deletePizzellaAction } from "@/lib/actions/pizzellas";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/internal/status-message";

type Props = {
  moldId: string;
  moldName: string;
  compact?: boolean;
};

export function DeletePizzellaButton({ moldId, moldName, compact }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    if (!window.confirm(`¿Eliminar molde "${moldName}"?`)) return;
    startTransition(async () => {
      const result = await deletePizzellaAction(moldId);
      if (result && !result.ok) setError(result.error);
    });
  }

  return (
    <div className={compact ? undefined : "space-y-2"}>
      <Button
        type="button"
        variant={compact ? "ghost" : "destructive"}
        size={compact ? "icon-sm" : "sm"}
        onClick={handleDelete}
        disabled={pending}
        className={compact ? "text-muted-foreground hover:text-destructive" : "rounded-full"}
      >
        <Trash2Icon className="size-4" />
        {compact ? null : pending ? "Eliminando…" : "Eliminar molde"}
      </Button>
      {!compact && error ? <StatusMessage variant="error">{error}</StatusMessage> : null}
    </div>
  );
}
