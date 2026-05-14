/**
 * Datos públicos del negocio y URLs externas.
 * Centralizado para navbar, footer y futuras integraciones.
 */
export const SITE = {
  name: "Casa Testa",
  tagline: "Selección italiana para cocinas que valoran el gesto lento",
  description:
    "Casa Testa — curaduría de ollas, sartenes, vajilla y pizzellas con estética mediterránea; taller de reparaciones con criterio artesanal en Caseros.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    line: "Av. San Martín 1465, Caseros",
    city: "Buenos Aires, Argentina",
  },
  phoneDisplay: "+54 11 4750-1346",
  /** wa.me sin espacios ni guiones */
  whatsappE164: "5491147501346",
  instagramUrl:
    "https://www.instagram.com/pizzelledellanonna/",
} as const;

export const WHATSAPP_CHAT_URL = `https://wa.me/${SITE.whatsappE164}`;
