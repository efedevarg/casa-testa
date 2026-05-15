import type { MockCategory } from "./types";
import { SITE_IMAGES } from "@/lib/constants/site-images";

const { categories: C } = SITE_IMAGES;

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "ollas",
    title: "Ollas",
    blurb: "Guisos lentos, hierro honesto.",
    imageSrc: C.ollas,
    imageAlt: "Ollas de hierro y cocción artesanal sobre mesa de madera",
    href: "/productos?categoria=ollas",
  },
  {
    id: "sartenes",
    title: "Sartenes",
    blurb: "Sellado limpio, calor parejo.",
    imageSrc: C.sartenes,
    imageAlt: "Sartén de acero sobre encimera clara",
    href: "/productos?categoria=sartenes",
  },
  {
    id: "vajilla",
    title: "Vajilla",
    blurb: "Mesa cálida, tacto sedoso.",
    imageSrc: C.vajilla,
    imageAlt: "Vajilla cerámica dispuesta con luz cálida",
    href: "/productos?categoria=vajilla",
  },
  {
    id: "cocina",
    title: "Cocina",
    blurb: "Utensilios para el ritual diario.",
    imageSrc: C.cocina,
    imageAlt: "Utensilios de cocina sobre encimera clara",
    href: "/productos?categoria=cocina",
  },
  {
    id: "decoracion",
    title: "Decoración",
    blurb: "Detalles con carácter italiano.",
    imageSrc: C.decoracion,
    imageAlt: "Detalles hogareños con luz natural y texturas cálidas",
    href: "/productos?categoria=decoracion",
  },
  {
    id: "pizzellas",
    title: "Pizzellas",
    blurb: "Crujido de tradición familiar.",
    imageSrc: C.pizzellas,
    imageAlt: "Pan artesanal y ambiente de panadería cálida",
    href: "/pizzellas",
  },
];
