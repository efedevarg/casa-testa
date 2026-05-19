import { fetchCategories } from "@/lib/data/fetchers";
import { pickContent, type SiteContentMap } from "@/lib/data/site-content";

import { HomeCategoryGridView } from "./home-category-grid-view";

type HomeCategoryGridProps = {
  content: SiteContentMap;
};

export async function HomeCategoryGrid({ content }: HomeCategoryGridProps) {
  const categories = await fetchCategories();
  return (
    <HomeCategoryGridView
      categories={categories}
      curaduriaTitle={pickContent(content, "curaduria_title")}
      curaduriaDescription={pickContent(content, "curaduria_subtitle")}
    />
  );
}
