"use client";

import { useState, useTransition } from "react";
import { Trash2Icon } from "lucide-react";

import { StatusMessage } from "@/components/internal/status-message";
import { deleteProductAction } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";

type DeleteProductButtonProps = {
  productId: string;
  productName: string;
  showErrorBelow?: boolean;
};

export function DeleteProductButton({
  productId,
  productName,
  showErrorBelow,
}: DeleteProductButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(
      `¿Eliminar "${productName}"? Se borrarán también sus imágenes. Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setError(null);
    startTransition(async () => {
      const result = await deleteProductAction(productId);
      if (result && !result.ok) {
        setError(result.error);
      }
    });
  }

  return (
    <div className={showErrorBelow ? "space-y-2" : undefined}>
      <Button
        type="button"
        variant={showErrorBelow ? "destructive" : "ghost"}
        size={showErrorBelow ? "sm" : "icon-sm"}
        disabled={pending}
        onClick={handleDelete}
        className={
          showErrorBelow
            ? "rounded-full"
            : "text-muted-foreground hover:text-destructive"
        }
        aria-label={`Eliminar ${productName}`}
      >
        <Trash2Icon className="size-4" />
        {showErrorBelow ? (pending ? "Eliminando…" : "Eliminar producto") : null}
      </Button>
      {showErrorBelow && error ? (
        <StatusMessage variant="error">{error}</StatusMessage>
      ) : null}
    </div>
  );
}
