import { HomeCategoryGrid } from "@/components/home/home-category-grid";
import { HomeFeaturedProducts } from "@/components/home/home-featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { HomePizzelleFeature } from "@/components/home/home-pizzelle-feature";
import { HomeRepairsTeaser } from "@/components/home/home-repairs-teaser";

export function HomePageView() {
  return (
    <>
      <HomeHero />
      <HomeCategoryGrid />
      <HomeFeaturedProducts />
      <HomePizzelleFeature />
      <HomeRepairsTeaser />
    </>
  );
}
