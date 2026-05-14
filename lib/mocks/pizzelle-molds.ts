import type { MockPizzelleMold } from "./types";
import { SITE_IMAGES } from "@/lib/constants/site-images";

const P = SITE_IMAGES.products;

export const MOCK_PIZZELLE_MOLDS: MockPizzelleMold[] = [
  {
    id: "m1",
    name: "Ferro della Nonna",
    subtitle: "Hierro fundido, peso honesto, dorado profundo.",
    diameterCm: "12 cm",
    material: "Hierro fundido curado",
    heat: "Gas, horno, inducción con difusor",
    story:
      "El hierro guarda memoria de fuego lento. Cada pizzella sale con borde crocante y corazón tierno, como cuando la casa entera esperaba el olor antes de ver la mesa.",
    imageSrc: P.goldenBread,
    imageAlt: "Pan artesanal dorado sobre tabla de madera",
  },
  {
    id: "m2",
    name: "Ceramica Ligure",
    subtitle: "Gres esmaltado, tacto cálido, dorado suave.",
    diameterCm: "11 cm",
    material: "Gres esmaltado",
    heat: "Placa eléctrica, horno",
    story:
      "Para impastos delicados y rellenos dulces que no piden costra agresiva. El esmalto crema guía el desmoldado sin ansiedad: la cocina también puede ser susurro.",
    imageSrc: P.doughBench,
    imageAlt: "Masa trabajada sobre mesada con harina y luz lateral",
  },
  {
    id: "m3",
    name: "Doppio Tradizione",
    subtitle: "Doble cavidad, ritmo de taller familiar.",
    diameterCm: "10 cm (×2)",
    material: "Aluminio forjado",
    heat: "Gas, vitrocerámica",
    story:
      "Dos pizzellas en una sola pasada: misma temperatura, misma paciencia. Ideal cuando la mesa está llena de manos pequeñas que no quieren esperar el segundo turno.",
    imageSrc: P.wafflePress,
    imageAlt: "Prensa de cocina y preparación artesanal",
  },
  {
    id: "m4",
    name: "Bruno di Siena",
    subtitle: "Textura viva, costra audaz, carácter sureño.",
    diameterCm: "13 cm",
    material: "Hierro colado envejecido",
    heat: "Gas, leña",
    story:
      "Exige mantequilla clarificada y mano firme. La recompensa es una costra profunda, casi canción, con el aroma que se cuela por el pasillo antes de llegar al plato.",
    imageSrc: P.bakeryRacks,
    imageAlt: "Estantes de panadería con panes dorados",
  },
  {
    id: "m5",
    name: "Oro Puglia",
    subtitle: "Borde bajo, impasto fino, bronce alimentario.",
    diameterCm: "9,5 cm",
    material: "Bronce alimentario",
    heat: "Gas suave",
    story:
      "Pensado para rellenos dulces y meriendas que saben a confitería de pueblo. El bronce conduce el calor con elegancia, sin estridencias ni quemaduras caprichosas.",
    imageSrc: P.pastryTable,
    imageAlt: "Mesa de pastelería con mármol y detalles delicados",
  },
  {
    id: "m6",
    name: "Neve Alpina",
    subtitle: "Acero pulido, línea limpia, cocina contemporánea.",
    diameterCm: "11,5 cm",
    material: "Acero inoxidable 18/10",
    heat: "Inducción, vitro",
    story:
      "Para cocinas actuales que no renuncian al ritual. Limpieza sencilla, resultado consistente y un brillo que convive con el mármol frío y la madera cálida.",
    imageSrc: P.kitchenCounter,
    imageAlt: "Cocina moderna con utensilios metálicos ordenados",
  },
];
