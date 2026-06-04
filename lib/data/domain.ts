/**
 * Tipos de dominio de Casa Testa (UI + fetchers).
 * Independientes del origen: Supabase o mocks locales.
 */
export type ProductCategoryId = string;

export type Product = {
  id: string;
  sku?: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategoryId;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  highlights?: string[];
  inStock: boolean;
  tags?: string[];
};

export type Category = {
  id: ProductCategoryId;
  slug: string;
  title: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type PizzelleMold = {
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

export type RepairService = {
  id: string;
  title: string;
  description: string;
};

export type DataSource = "supabase" | "mock";
