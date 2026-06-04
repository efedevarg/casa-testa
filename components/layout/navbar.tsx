"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { MAIN_NAV, SITE, WHATSAPP_CHAT_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

function WhatsAppButton({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      render={
        <TrackedWhatsAppLink
          href={WHATSAPP_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          trackingContext="navbar"
        />
      }
      size="sm"
      className={cn(
        "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90",
        className
      )}
    >
      WhatsApp
    </Button>
  );
}

function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
      {MAIN_NAV.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium tracking-tight transition-colors hover:text-primary",
              active ? "text-primary" : "text-foreground/80"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4" aria-label="Principal móvil">
      {MAIN_NAV.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <SheetClose
            key={item.href}
            nativeButton={false}
            render={
              <Link
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted",
                  active ? "text-primary" : "text-foreground/85"
                )}
              >
                {item.label}
              </Link>
            }
          />
        );
      })}
    </nav>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="section-inline flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-brand text-[1.35rem] font-normal tracking-[0.06em] text-foreground transition-colors group-hover:text-primary sm:text-[1.5rem] lg:text-[1.65rem]">
            {SITE.name}
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <DesktopNav />
          <WhatsAppButton />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <WhatsAppButton />
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Abrir menú de navegación"
                >
                  <MenuIcon className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="gap-0 p-0 sm:max-w-sm">
              <SheetHeader className="border-b border-border px-4 py-4 text-left">
                <SheetTitle className="font-brand text-xl font-normal tracking-[0.05em]">
                  {SITE.name}
                </SheetTitle>
              </SheetHeader>
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
