import { SITE, WHATSAPP_CHAT_URL } from "@/lib/constants";
import type { Product } from "@/lib/data";
import { getCategoryLabel } from "@/lib/data/labels";
import { absoluteUrl } from "@/lib/seo/urls";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE.name,
    description: SITE.description,
    url: absoluteUrl("/"),
    telephone: SITE.phoneDisplay,
    image: absoluteUrl("/"),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line,
      addressLocality: "Caseros",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    sameAs: [SITE.instagramUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: SITE.phoneDisplay,
      availableLanguage: ["Spanish"],
      url: WHATSAPP_CHAT_URL,
    },
  };

  return <JsonLdScript data={data} />;
}

type ProductJsonLdProps = {
  product: Product;
};

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const productUrl = absoluteUrl(`/productos/${product.slug}`);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: absoluteUrl(product.imageSrc),
    url: productUrl,
    brand: { "@type": "Brand", name: SITE.name },
    category: getCategoryLabel(product.category),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: productUrl,
      seller: { "@type": "Organization", name: SITE.name },
    },
  };

  if (product.sku) {
    data.sku = product.sku;
  }

  return <JsonLdScript data={data} />;
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return <JsonLdScript data={data} />;
}
