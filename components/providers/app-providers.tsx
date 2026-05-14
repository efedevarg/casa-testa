"use client";

import { LazyMotion, domAnimation } from "framer-motion";

type AppProvidersProps = {
  children: React.ReactNode;
};

/**
 * Providers globales (Framer Motion con bundle reducido).
 * Aquí se pueden añadir ThemeProvider, React Query, etc.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
