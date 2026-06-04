import { formatArs } from "@/lib/format";
import type { Product } from "@/lib/data";
import { getCategoryLabel } from "@/lib/data/labels";

type ProductInquiryContext = {
  product: Product;
  productUrl: string;
};

export function buildProductWhatsAppMessage({
  product,
  productUrl,
}: ProductInquiryContext): string {
  const categoryLabel = getCategoryLabel(product.category);
  const lines = [
    "Hola Casa Testa, me interesa este producto:",
    "",
    `Producto: ${product.name}`,
  ];

  if (product.sku) {
    lines.push(`SKU: ${product.sku}`);
  }

  lines.push(
    `Categoría: ${categoryLabel}`,
    `Precio: ${formatArs(product.price)}`,
    `URL: ${productUrl}`,
    "",
    product.inStock
      ? "¿Me confirman disponibilidad en salón?"
      : "Vi que figura sin stock — ¿hay fecha estimada o alternativa?"
  );

  return lines.join("\n");
}

export function buildProductWhatsAppUrl(context: ProductInquiryContext, baseUrl: string): string {
  const text = encodeURIComponent(buildProductWhatsAppMessage(context));
  return `${baseUrl}?text=${text}`;
}
