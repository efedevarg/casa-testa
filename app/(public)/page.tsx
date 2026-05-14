import type { Metadata } from "next";

import { HomePageView } from "@/components/home/home-page-view";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Inicio",
  description: `${SITE.tagline}. Productos curados, pizzellas y reparaciones con alma italiana en Caseros.`,
  openGraph: {
    title: "Casa Testa — Inicio",
    description: SITE.description,
  },
};

export default function HomePage() {
  return <HomePageView />;
}
