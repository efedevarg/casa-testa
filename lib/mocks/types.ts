export type ProductCategoryId =
  | "ollas"
  | "vajilla"
  | "cocina"
  | "decoracion"
  | "pizzellas";

export type MockProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  category: ProductCategoryId;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  highlights?: string[];
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
