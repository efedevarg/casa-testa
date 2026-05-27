"use client";

import { useState, useTransition } from "react";
import { Trash2Icon } from "lucide-react";

import { deleteCategoryAction } from "@/lib/actions/categories";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/internal/status-message";

type Props = {
  categoryId: string;
  categoryName: string;
  compact?: boolean;
};

export function DeleteCategoryButton({ categoryId, categoryName, compact }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    if (!window.confirm(`¿Eliminar categoría "${categoryName}"?`)) return;
    startTransition(async () => {
      const result = await deleteCategoryAction(categoryId);
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
        {compact ? null : pending ? "Eliminando…" : "Eliminar categoría"}
      </Button>
      {!compact && error ? <StatusMessage variant="error">{error}</StatusMessage> : null}
    </div>
  );
}
