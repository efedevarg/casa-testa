import type { MockCategory } from "./types";
import { SITE_IMAGES } from "@/lib/constants/site-images";

const { categories: C } = SITE_IMAGES;

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "ollas",
    title: "Ollas",
    blurb: "Cocción lenta, aromas que vuelven a casa.",
    imageSrc: C.ollas,
    imageAlt: "Ollas de hierro y cocción artesanal sobre mesa de madera",
    href: "/productos?categoria=ollas",
  },
  {
    id: "sartenes",
    title: "Sartenes",
    blurb: "Sellado preciso, superficies que respetan el producto.",
    imageSrc: C.sartenes,
    imageAlt: "Sartén de acero sobre encimera clara",
    href: "/productos?categoria=sartenes",
  },
  {
    id: "vajilla",
    title: "Vajilla",
    blurb: "Mesas que invitan a quedarse un poco más.",
    imageSrc: C.vajilla,
    imageAlt: "Vajilla cerámica dispuesta con luz cálida",
    href: "/productos?categoria=vajilla",
  },
  {
    id: "cocina",
    title: "Cocina",
    blurb: "Herramientas nobles para el ritual diario.",
    imageSrc: C.cocina,
    imageAlt: "Utensilios de cocina sobre encimera clara",
    href: "/productos?categoria=cocina",
  },
  {
    id: "decoracion",
    title: "Decoración",
    blurb: "Piezas con presencia suave y carácter italiano.",
    imageSrc: C.decoracion,
    imageAlt: "Detalles hogareños con luz natural y texturas cálidas",
    href: "/productos?categoria=decoracion",
  },
  {
    id: "pizzellas",
    title: "Pizzellas",
    blurb: "El alma crocante de la tradición.",
    imageSrc: C.pizzellas,
    imageAlt: "Pan artesanal y ambiente de panadería cálida",
    href: "/pizzellas",
  },
];
