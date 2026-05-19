import { HomeCategoryGrid } from "@/components/home/home-category-grid";
import { HomeFeaturedProducts } from "@/components/home/home-featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { HomePizzelleFeature } from "@/components/home/home-pizzelle-feature";
import { HomeRepairsTeaser } from "@/components/home/home-repairs-teaser";
import { SITE_IMAGES } from "@/lib/constants";
import {
  getSiteContent,
  pickContent,
  resolveSiteContentImage,
} from "@/lib/data/site-content";

export async function HomePageView() {
  const content = await getSiteContent();

  return (
    <>
      <HomeHero
        eyebrow={pickContent(content, "hero_eyebrow")}
        title={pickContent(content, "hero_title")}
        subtitle={pickContent(content, "hero_subtitle")}
        ctaLabel={pickContent(content, "hero_cta")}
        imageSrc={resolveSiteContentImage(
          content,
          "hero_image_url",
          SITE_IMAGES.hero.home
        )}
        imageAlt={pickContent(content, "hero_image_alt")}
      />
      <HomeCategoryGrid content={content} />
      <HomeFeaturedProducts />
      <HomePizzelleFeature
        title={pickContent(content, "home_pizzelle_title")}
        description={pickContent(content, "home_pizzelle_description")}
        imageSrc={resolveSiteContentImage(
          content,
          "home_pizzelle_image_url",
          SITE_IMAGES.home.pizzelleFeature
        )}
        imageAlt={pickContent(content, "home_pizzelle_image_alt")}
      />
      <HomeRepairsTeaser
        imageSrc={resolveSiteContentImage(
          content,
          "home_repairs_image_url",
          SITE_IMAGES.home.repairsTeaser
        )}
        imageAlt={pickContent(content, "home_repairs_image_alt")}
      />
    </>
  );
}
