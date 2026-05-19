import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Marcellus } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { SITE } from "@/lib/constants/site";

import "./globals.css";
import "@/styles/theme.css";

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-family",
  display: "swap",
});

const brand = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand-family",
  display: "swap",
});

const siteUrl = new URL(SITE.url);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Casa Testa",
    template: "%s | Casa Testa",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Casa Testa",
    "Caseros",
    "pizzellas",
    "artesanal",
    "italiano",
    "Buenos Aires",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <body className={`${body.variable} ${heading.variable} ${brand.variable} min-h-screen`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
