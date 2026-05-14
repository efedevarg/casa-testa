import Link from "next/link";

import { InstagramMark } from "@/components/icons/instagram-mark";
import { MAIN_NAV, SITE, WHATSAPP_CHAT_URL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-muted/40">
      <div className="section-inline grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-3">
          <p className="font-heading text-xl font-semibold tracking-tight text-foreground">
            {SITE.name}
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/90">
            Ubicación
          </p>
          <address className="not-italic text-sm leading-relaxed text-muted-foreground">
            {SITE.address.line}
            <br />
            {SITE.address.city}
          </address>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/90">
            Contacto
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="text-foreground/80">WhatsApp: </span>
              <a
                className="underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                <InstagramMark className="size-4" />
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/90">
            Enlaces rápidos
          </p>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 bg-background/80">
        <div className="section-inline flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground/90">
            Hecho con cuidado artesanal — Caseros, Buenos Aires.
          </p>
        </div>
      </div>
    </footer>
  );
}
