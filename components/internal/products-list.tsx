"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";

import { DeleteProductButton } from "@/components/internal/delete-product-button";
import { formatArs } from "@/lib/format";
import type { ProductAdminListItem } from "@/lib/queries/products-admin";
import { cn } from "@/lib/utils";

type ProductsListProps = {
  products: ProductAdminListItem[];
};

export function ProductsList({ products }: ProductsListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.categories?.name.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div className="space-y-4">
      <label className="block max-w-md space-y-2 text-sm">
        <span className="font-medium text-foreground">Buscar</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nombre, SKU o categoría…"
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
        />
      </label>

      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card/90 shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Destacado</th>
              <th className="px-4 py-3 font-medium">Creado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  {query ? "Sin resultados para tu búsqueda." : "No hay productos todavía."}
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border/40 last:border-0 hover:bg-muted/20"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/internal/products/${product.id}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {product.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {product.categories?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatArs(product.price)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                        product.featured
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {product.featured ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(product.created_at).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/internal/products/${product.id}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label={`Editar ${product.name}`}
                      >
                        <PencilIcon className="size-4" />
                      </Link>
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} de {products.length} producto{products.length === 1 ? "" : "s"}
      </p>
    </div>
  );
}
