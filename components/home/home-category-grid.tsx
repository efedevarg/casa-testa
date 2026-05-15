import { fetchCategories } from "@/lib/data/fetchers";

import { HomeCategoryGridView } from "./home-category-grid-view";

export async function HomeCategoryGrid() {
  const categories = await fetchCategories();
  return <HomeCategoryGridView categories={categories} />;
}
