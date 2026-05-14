export const MAIN_NAV = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Pizzellas", href: "/pizzellas" },
  { label: "Reparaciones", href: "/reparaciones" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export type NavItem = (typeof MAIN_NAV)[number];
