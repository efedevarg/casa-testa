"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/internal", label: "Inicio", exact: true },
  { href: "/internal/content", label: "Contenido", exact: false },
  { href: "/internal/media", label: "Medios", exact: false },
  { href: "/internal/products", label: "Productos", exact: false },
] as const;

export function InternalNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1" aria-label="Navegación interna">
      {LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
