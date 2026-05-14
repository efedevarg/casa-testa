/**
 * Rutas de assets en /public/images (generados con scripts/download-site-images.mjs).
 * Centralizado para evitar strings duplicadas y facilitar futuro CMS / ecommerce.
 */
export const SITE_IMAGES = {
  hero: {
    home: "/images/hero/home-kitchen.jpg",
    homeAlt: "Cocina luminosa con ingredientes frescos y gesto hogareño",
  },
  pages: {
    nosotrosHero: "/images/pages/nosotros-hero.jpg",
    nosotrosHeroAlt: "Mesa servida con luz cálida, invitación a compartir",
    nosotrosMesa: "/images/pages/nosotros-mesa.jpg",
    nosotrosMesaAlt: "Pan, frutas y quesos dispuestos con cuidado artesanal",
    pizzellasHero: "/images/pages/pizzellas-hero.jpg",
    pizzellasHeroAlt: "Panadería con dorados suaves y atmósfera de taller",
    reparaciones: "/images/pages/reparaciones.jpg",
    reparacionesAlt: "Detalle de cocina con utensilios nobles y metal cuidado",
    contacto: "/images/pages/contacto.jpg",
    contactoAlt: "Personas compartiendo mesa y conversación",
  },
  home: {
    pizzelleFeature: "/images/home/pizzelle-feature.jpg",
    pizzelleFeatureAlt: "Pan artesanal dorado en ambiente cálido",
    repairsTeaser: "/images/home/repairs-teaser.jpg",
    repairsTeaserAlt: "Hierro fundido y piezas de cocina con carácter",
  },
  categories: {
    ollas: "/images/categories/ollas.jpg",
    sartenes: "/images/categories/sartenes.jpg",
    vajilla: "/images/categories/vajilla.jpg",
    cocina: "/images/categories/cocina.jpg",
    decoracion: "/images/categories/decoracion.jpg",
    pizzellas: "/images/categories/pizzellas.jpg",
  },
  products: {
    castIronCocotte: "/images/products/cast-iron-cocotte.jpg",
    steelPanGrill: "/images/products/steel-pan-grill.jpg",
    ceramicDinnerware: "/images/products/ceramic-dinnerware.jpg",
    espressoCups: "/images/products/espresso-cups.jpg",
    terracottaCasserole: "/images/products/terracotta-casserole.jpg",
    artisanPlate: "/images/products/artisan-plate.jpg",
    whiskUtensils: "/images/products/whisk-utensils.jpg",
    woodBoardSpread: "/images/products/wood-board-spread.jpg",
    pepperMillWalnut: "/images/products/pepper-mill-walnut.jpg",
    wafflePress: "/images/products/waffle-press.jpg",
    goldenBread: "/images/products/golden-bread.jpg",
    doughBench: "/images/products/dough-bench.jpg",
    bakeryRacks: "/images/products/bakery-racks.jpg",
    pastryTable: "/images/products/pastry-table.jpg",
    kitchenCounter: "/images/products/kitchen-counter.jpg",
    copperStillLife: "/images/products/copper-still-life.jpg",
  },
} as const;
