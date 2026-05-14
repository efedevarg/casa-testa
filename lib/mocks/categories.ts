import type { MockCategory } from "./types";

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "ollas",
    title: "Ollas",
    blurb: "Cocción lenta, aromas que vuelven a casa.",
    imageSrc:
      "https://images.unsplash.com/photo-1585672840413-8a3cf639e26c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ollas de hierro y cocción artesanal sobre mesa de madera",
    href: "/productos?categoria=ollas",
  },
  {
    id: "vajilla",
    title: "Vajilla",
    blurb: "Mesas que invitan a quedarse un poco más.",
    imageSrc:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Vajilla cerámica dispuesta con luz cálida",
    href: "/productos?categoria=vajilla",
  },
  {
    id: "cocina",
    title: "Cocina",
    blurb: "Herramientas nobles para el ritual diario.",
    imageSrc:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Utensilios de cocina sobre encimera clara",
    href: "/productos?categoria=cocina",
  },
  {
    id: "decoracion",
    title: "Decoración",
    blurb: "Piezas con presencia suave y carácter italiano.",
    imageSrc:
      "https://images.unsplash.com/photo-1615876234887-fd9cd25cbf95?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Objetos decorativos y floreros en ambiente hogareño",
    href: "/productos?categoria=decoracion",
  },
  {
    id: "pizzellas",
    title: "Pizzellas",
    blurb: "El alma crocante de la tradición.",
    imageSrc:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pan artesanal y ambiente de panadería cálida",
    href: "/pizzellas",
  },
];
