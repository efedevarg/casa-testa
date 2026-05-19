import { SITE_IMAGES } from "@/lib/constants/site-images";

/**
 * Valores por defecto cuando Supabase no está disponible o falta una clave.
 * Mantener sincronizado con el seed en la migración site_content.
 */
export const SITE_CONTENT_DEFAULTS = {
  hero_eyebrow: "Casa Testa · Caseros",
  hero_title: "Cocina italiana, elegida pieza por pieza",
  hero_subtitle:
    "En Av. San Martín elegimos ollas, sartenes, vajilla y moldes con el criterio de quien cocina en casa: materiales nobles, gesto lento y un taller que restaura lo que ya tiene historia.",
  hero_cta: "Ver selección",
  hero_image_url: SITE_IMAGES.hero.home,
  hero_image_alt: SITE_IMAGES.hero.homeAlt,

  curaduria_title: "Seis maneras de habitar la cocina",
  curaduria_subtitle:
    "Elegimos por familia, no por volumen: piezas que se sienten en la mano, duran en el tiempo y tienen historia que contar en el salón.",

  home_pizzelle_title: "El crujido que heredás sin saber de quién",
  home_pizzelle_description:
    "Moldes con peso real, hierro curado y gres esmaltado. Te ayudamos a elegir según tu fogón y tu impasto.",
  home_pizzelle_image_url: SITE_IMAGES.home.pizzelleFeature,
  home_pizzelle_image_alt: SITE_IMAGES.home.pizzelleFeatureAlt,

  home_repairs_image_url: SITE_IMAGES.home.repairsTeaser,
  home_repairs_image_alt: SITE_IMAGES.home.repairsTeaserAlt,

  reparaciones_intro:
    "No acumulamos pedidos sin criterio: miramos la pieza, escuchamos la historia y decidimos juntos si vale la pena intervenir. Cuando decimos que sí, trabajamos con tiempo, diagnóstico claro y manos que conocen el oficio.",
  reparaciones_image_url: SITE_IMAGES.pages.reparaciones,
  reparaciones_image_alt: SITE_IMAGES.pages.reparacionesAlt,

  pizzellas_intro:
    "Moldes artesanales con relieve clásico, hierro curado y gres que respetan el fuego lento. Elegimos cada pieza en el salón para que el ritual de la merienda tenga el peso y el aroma que merece.",
  pizzellas_hero_image_url: SITE_IMAGES.pages.pizzellasHero,
  pizzellas_hero_image_alt: SITE_IMAGES.pages.pizzellasHeroAlt,

  about_intro:
    "Casa Testa empezó como un gesto doméstico que fue creciendo: primero las ollas que curábamos para vecinos, después las pizzellas que salían a la merienda, después el deseo de elegir piezas con nombre propio y contar por qué estaban ahí.",
  nosotros_hero_image_url: SITE_IMAGES.pages.nosotrosHero,
  nosotros_hero_image_alt: SITE_IMAGES.pages.nosotrosHeroAlt,
  contacto_image_url: SITE_IMAGES.pages.contacto,
  contacto_image_alt: SITE_IMAGES.pages.contactoAlt,
} as const;

export type SiteContentKey = keyof typeof SITE_CONTENT_DEFAULTS;

export type SiteContentMap = Record<SiteContentKey, string>;
