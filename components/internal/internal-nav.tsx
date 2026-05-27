"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/internal", label: "Dashboard", exact: true },
  { href: "/internal/content", label: "Content", exact: false },
  { href: "/internal/media", label: "Media", exact: false },
  { href: "/internal/products", label: "Products", exact: false },
  { href: "/internal/categories", label: "Categories", exact: false },
  { href: "/internal/pizzellas", label: "Pizzellas", exact: false },
  { href: "/internal/inquiries", label: "Inquiries", exact: false },
] as const;

export function InternalNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Navegación interna">
      {LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
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
