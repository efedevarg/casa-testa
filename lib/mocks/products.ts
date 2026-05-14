import type { MockProduct } from "./types";

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "p1",
    slug: "cacerola-firenze",
    name: "Cacerola Firenze",
    shortDescription: "Hierro esmaltado, calor parejo y mesa elegante.",
    description:
      "Una cacerola pensada para guisos largos y domingos sin apuro. El esmalte crema acaricia la luz y el hierro retiene el calor con la paciencia de la cocina italiana.",
    price: 189900,
    category: "ollas",
    imageSrc:
      "https://images.unsplash.com/photo-1585672840413-8a3cf639e26c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cacerola de hierro esmaltado sobre mesa rústica",
    featured: true,
    highlights: ["3,4 L", "Tapa hermética", "Apta horno"],
  },
  {
    id: "p2",
    slug: "sarten-toscana",
    name: "Sartén Toscana",
    shortDescription: "Superficie noble para sellar sin prisa.",
    description:
      "Curva amplia, borde alto y un mango que se sostiene como un gesto familiar. Ideal para verduras de estación y pescados delicados.",
    price: 124500,
    category: "cocina",
    imageSrc:
      "https://images.unsplash.com/photo-1588731245328-9b1a924d73b0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sartén de acero sobre fogón",
    featured: true,
    highlights: ["28 cm", "Fondo multicapa", "Apta inducción"],
  },
  {
    id: "p3",
    slug: "vajilla-verona",
    name: "Vajilla Verona",
    shortDescription: "Cerámica mate, tonos tierra y tacto cálido.",
    description:
      "Platos y bowls que convierten cualquier almuerzo en un pequeño ritual. El borde imperfecto celebra lo hecho a mano.",
    price: 98500,
    category: "vajilla",
    imageSrc:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Vajilla cerámica en tonos arena",
    featured: true,
    highlights: ["Set 4 personas", "Apilable", "Microondas"],
  },
  {
    id: "p4",
    slug: "taza-milano",
    name: "Taza Milano",
    shortDescription: "Espresso corto, silueta alta y asa fina.",
    description:
      "Porcelana ligera con un brillo discreto. Para esos minutos quietos antes de que arranque el día.",
    price: 18900,
    category: "vajilla",
    imageSrc:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Taza de café sobre platillo",
    featured: false,
    highlights: ["90 ml", "Porcelana", "Pack x2"],
  },
  {
    id: "p5",
    slug: "cazuela-siena",
    name: "Cazuela Siena",
    shortDescription: "Terracota esmaltada, aroma a hogar.",
    description:
      "Perfecta para arroces al horno y pastas gratinadas. La tapa pesa justo lo necesario para sellar vapor y memoria.",
    price: 75900,
    category: "ollas",
    imageSrc:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cazuela de barro con guiso humeante",
    featured: false,
    highlights: ["2,1 L", "Interior crema", "Horno y mesa"],
  },
  {
    id: "p6",
    slug: "plato-umbria",
    name: "Plato Umbria",
    shortDescription: "Borde orgánico, superficie satinada.",
    description:
      "Un plato hondo que abraza la porción sin competir con ella. Pensado para pastas frescas y ensaladas generosas.",
    price: 14200,
    category: "vajilla",
    imageSrc:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Plato hondo de cerámica artesanal",
    featured: false,
    highlights: ["24 cm", "Gres", "Lavavajillas"],
  },
  {
    id: "p7",
    slug: "batidor-manual-lucca",
    name: "Batidor manual Lucca",
    shortDescription: "Acero inoxidable con peso equilibrado.",
    description:
      "Para merengues lentos y salsas que piden constancia. El mango de madera templada no transmite frío.",
    price: 28900,
    category: "cocina",
    imageSrc:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Batidor de cocina metálico",
    featured: false,
    highlights: ["32 cm", "Acero 18/10", "Mango nogal"],
  },
  {
    id: "p8",
    slug: "terrina-romana",
    name: "Terrina Romana",
    shortDescription: "Silueta clásica para hornos lentos.",
    description:
      "Diseñada para carnes que se deshacen solas. El pomo de latón envejece con dignidad.",
    price: 215000,
    category: "ollas",
    imageSrc:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Olla de hierro fundido con tapa",
    featured: true,
    highlights: ["4,7 L", "Hierro fundido", "Esmalte interior"],
  },
  {
    id: "p9",
    slug: "jarron-venecia",
    name: "Jarrón Venecia",
    shortDescription: "Vidrio soplado con burbujas de luz.",
    description:
      "Una pieza escultórica que funciona con una sola flor o vacía, como escenario de sombras.",
    price: 67900,
    category: "decoracion",
    imageSrc:
      "https://images.unsplash.com/photo-1612198188060-c7c2a2b20a0b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Jarrón de vidrio con luz lateral",
    featured: false,
    highlights: ["34 cm alto", "Vidrio soplado", "Edición limitada"],
  },
  {
    id: "p10",
    slug: "bowls-liguria",
    name: "Bowls Liguria",
    shortDescription: "Set de tres tamaños, gres reactivo.",
    description:
      "Para sopas, yogur y frutas de verano. Los tonos varían levemente entre pieza y pieza: eso también es belleza.",
    price: 45600,
    category: "vajilla",
    imageSrc:
      "https://images.unsplash.com/photo-1610701596007-11502848dcde?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bowls de cerámica apilados",
    featured: false,
    highlights: ["Set x3", "Gres", "Microondas"],
  },
  {
    id: "p11",
    slug: "bandeja-parma",
    name: "Bandeja Parma",
    shortDescription: "Roble ahumado, bordes biselados.",
    description:
      "Para servir quesos curados, frutas y pan recién horneado. Las vetas cuentan una historia distinta cada vez.",
    price: 52900,
    category: "decoracion",
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bandeja de madera con quesos y pan",
    featured: false,
    highlights: ["45 x 22 cm", "Roble", "Aceite de mantenimiento incl."],
  },
  {
    id: "p12",
    slug: "olla-presion-piemonte",
    name: "Olla a presión Piemonte",
    shortDescription: "Seguridad moderna, alma de olla clásica.",
    description:
      "Para quienes aman el tiempo ahorrado pero no el sabor apresurado. Válvula silenciosa y asas reforzadas.",
    price: 268900,
    category: "ollas",
    imageSrc:
      "https://images.unsplash.com/photo-1584990340619-374305e7ade0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Olla a presión de acero inoxidable",
    featured: false,
    highlights: ["6 L", "Triple válvula", "Inducción"],
  },
  {
    id: "p13",
    slug: "plancha-genova",
    name: "Plancha Genova",
    shortDescription: "Superficie amplia, cantos redondeados.",
    description:
      "Para sellar carnes y verduras con trazo limpio. El canal perimetral recoge jugos sin drama.",
    price: 158900,
    category: "cocina",
    imageSrc:
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Plancha de cocina con vegetales",
    featured: false,
    highlights: ["28 x 46 cm", "Hierro", "Curado incluido"],
  },
  {
    id: "p14",
    slug: "molinillo-amalfi",
    name: "Molinillo Amalfi",
    shortDescription: "Molienda ajustable, cuerpo de nogal.",
    description:
      "Pimienta recién molida, aroma que se adelanta al plato. Un objeto pequeño con ceremonia propia.",
    price: 34900,
    category: "cocina",
    imageSrc:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Molinillo de pimienta de madera",
    featured: false,
    highlights: ["Núcleo cerámico", "Nogal", "Ajuste fino"],
  },
  {
    id: "p15",
    slug: "prensa-pizzella-perugia",
    name: "Prensa Pizzella Perugia",
    shortDescription: "Hierro fundido, bisagra firme y mango largo.",
    description:
      "Pensada para impasto fino y dorado uniforme. El peso hace el trabajo: vos solo guiás el gesto, como enseñó la nonna.",
    price: 112900,
    category: "pizzellas",
    imageSrc:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Preparación artesanal de pan en cocina luminosa",
    featured: true,
    highlights: ["18 cm", "Hierro curado", "Apta gas y horno"],
  },
  {
    id: "p16",
    slug: "molde-doppio-venezia",
    name: "Molde Doppio Venezia",
    shortDescription: "Doble cavidad simétrica, acabado satinado.",
    description:
      "Dos pizzellas gemelas en una sola pasada: ideal para meriendas con muchas manos pequeñas alrededor de la mesa.",
    price: 138500,
    category: "pizzellas",
    imageSrc:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pan dorado sobre tabla de madera",
    featured: false,
    highlights: ["2 x 10 cm", "Aluminio forjado", "Antiadherente natural"],
  },
];

export function getProductBySlug(slug: string) {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4) {
  const featured = MOCK_PRODUCTS.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return MOCK_PRODUCTS.slice(0, limit);
}
