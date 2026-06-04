"use client";

import { useActionState, useEffect, useState } from "react";

import { StatusMessage } from "@/components/internal/status-message";
import { saveProductAction } from "@/lib/actions/products";
import type { ProductAdminDetail } from "@/lib/queries/products-admin";
import type { Tables } from "@/lib/supabase/database.types";
import { slugify } from "@/lib/utils/slug";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60";

type ProductFormProps = {
  categories: Tables<"categories">[];
  product?: ProductAdminDetail;
  showSavedBanner?: boolean;
};

export function ProductForm({ categories, product, showSavedBanner }: ProductFormProps) {
  const isEdit = Boolean(product);
  const [state, formAction, pending] = useActionState(saveProductAction, undefined);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);

  useEffect(() => {
    if (!slugTouched && name) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
      {isEdit ? <input type="hidden" name="id" value={product!.id} /> : null}

      {showSavedBanner ? (
        <StatusMessage variant="success">Producto guardado correctamente.</StatusMessage>
      ) : null}

      {state && !state.ok ? (
        <StatusMessage variant="error">{state.error}</StatusMessage>
      ) : null}

      {state?.ok && isEdit ? (
        <StatusMessage variant="success">Cambios guardados.</StatusMessage>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Nombre</span>
          <input
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={pending}
            className={inputClass}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">Slug</span>
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            disabled={pending}
            className={`${inputClass} font-mono`}
            placeholder="auto-desde-nombre"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">
            SKU <span className="font-normal text-muted-foreground">(opcional)</span>
          </span>
          <input
            name="sku"
            defaultValue={product?.sku ?? ""}
            disabled={pending}
            placeholder="Ej. CT-OLL-001"
            className={`${inputClass} font-mono`}
          />
        </label>

        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Categoría</span>
          <select
            name="category_id"
            required
            defaultValue={product?.category_id}
            disabled={pending}
            className={inputClass}
          >
            <option value="">Seleccionar…</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.slug})
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">Precio (ARS)</span>
          <input
            name="price"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.price ?? ""}
            disabled={pending}
            className={inputClass}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">Precio comparado (opcional)</span>
          <input
            name="compare_at_price"
            type="number"
            min={0}
            step={1}
            defaultValue={product?.compare_at_price ?? ""}
            disabled={pending}
            className={inputClass}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">Stock</span>
          <input
            name="stock"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.stock ?? 0}
            disabled={pending}
            className={inputClass}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-foreground">Orden</span>
          <input
            name="sort_order"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.sort_order ?? 0}
            disabled={pending}
            className={inputClass}
          />
        </label>

        <label className="flex items-center gap-2 self-end text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
            disabled={pending}
            className="size-4 rounded border-input"
          />
          <span className="font-medium text-foreground">Producto destacado</span>
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Descripción corta</span>
        <input
          name="short_description"
          required
          defaultValue={product?.short_description}
          disabled={pending}
          className={inputClass}
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Descripción</span>
        <textarea
          name="description"
          required
          rows={6}
          defaultValue={product?.description}
          disabled={pending}
          className={`${inputClass} leading-relaxed`}
        />
      </label>

      <Button type="submit" disabled={pending} className="rounded-full">
        {pending ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
      </Button>
    </form>
  );
}
