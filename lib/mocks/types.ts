export type ProductCategoryId =
  | "ollas"
  | "sartenes"
  | "vajilla"
  | "cocina"
  | "decoracion"
  | "pizzellas";

export type MockProduct = {
  id: string;
  /** SKU interno mock — listo para futura integración de stock / ERP */
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  /** Precio tachado opcional (promo / referencia) */
  compareAtPrice?: number;
  category: ProductCategoryId;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  highlights?: string[];
  /** Disponibilidad mock — el UI puede ocultar “Comprar” si en el futuro es false */
  inStock: boolean;
  /** Etiquetas libres para futuros filtros / SEO */
  tags?: string[];
};

export type MockCategory = {
  id: ProductCategoryId;
  title: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type MockPizzelleMold = {
  id: string;
  name: string;
  subtitle: string;
  diameterCm: string;
  material: string;
  heat: string;
  story: string;
  imageSrc: string;
  imageAlt: string;
};

export type MockRepairItem = {
  id: string;
  title: string;
  description: string;
};
