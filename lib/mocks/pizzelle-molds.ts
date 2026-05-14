import type { MockPizzelleMold } from "./types";

export const MOCK_PIZZELLE_MOLDS: MockPizzelleMold[] = [
  {
    id: "m1",
    name: "Ferro della Nonna",
    subtitle: "Clásico de hierro fundido, peso honesto.",
    diameterCm: "12 cm",
    material: "Hierro fundido curado",
    heat: "Fogón, horno, inducción (con difusor)",
    story:
      "El hierro guarda memoria de fuego lento. Cada pizzella sale dorada, con borde crocante y corazón tierno.",
    imageSrc:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pan artesanal dorado sobre tabla de madera",
  },
  {
    id: "m2",
    name: "Ceramica Ligure",
    subtitle: "Terracota esmaltada, tacto cálido.",
    diameterCm: "11 cm",
    material: "Gres esmaltado",
    heat: "Placa eléctrica, horno",
    story:
      "Para quienes buscan una dorado más suave y aromático. El esmalte crema evita que el impasto se pegue con ansiedad.",
    imageSrc:
      "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Masa cruda sobre superficie de cocina",
  },
  {
    id: "m3",
    name: "Doppio Tradizione",
    subtitle: "Doble cavidad, ritmo de taller.",
    diameterCm: "10 cm (x2)",
    material: "Aluminio forjado",
    heat: "Gas, vitro",
    story:
      "Dos pizzellas a la vez, mismas reglas de temperatura. Ideal para mesas familiares donde nadie quiere esperar el segundo round.",
    imageSrc:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Preparación de pan en cocina luminosa",
  },
  {
    id: "m4",
    name: "Bruno di Siena",
    subtitle: "Textura rugosa, costra audaz.",
    diameterCm: "13 cm",
    material: "Hierro colado envejecido",
    heat: "Gas, leña",
    story:
      "Un molde con carácter: exige mantequilla clarificada y mano firme. La recompensa es una costra profunda, casi canción.",
    imageSrc:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Panadería con panes dorados en estantes",
  },
  {
    id: "m5",
    name: "Oro Puglia",
    subtitle: "Borde bajo, diseño para impasto fino.",
    diameterCm: "9,5 cm",
    material: "Bronce alimentario",
    heat: "Gas suave",
    story:
      "Pensado para impasto delicado y rellenos dulces. El bronce conduce el calor con elegancia, sin estridencias.",
    imageSrc:
      "https://images.unsplash.com/photo-1517433670267-08bbd4f89046?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Café y pastelería en mesa de mármol",
  },
  {
    id: "m6",
    name: "Neve Alpina",
    subtitle: "Acero inoxidable pulido espejo.",
    diameterCm: "11,5 cm",
    material: "Acero inoxidable 18/10",
    heat: "Inducción, vitro",
    story:
      "Para cocinas contemporáneas que no renuncian al ritual. Limpieza sencilla, línea limpia, resultado consistente.",
    imageSrc:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cocina moderna con utensilios metálicos",
  },
];
