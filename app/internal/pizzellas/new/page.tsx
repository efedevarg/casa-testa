import Link from "next/link";

import { PizzellaForm } from "@/components/internal/pizzella-form";

export default function InternalPizzellaNewPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/internal/pizzellas" className="text-sm text-muted-foreground hover:text-foreground">
          ← Pizzellas
        </Link>
        <h2 className="font-heading text-3xl font-semibold tracking-tight">Nuevo molde</h2>
      </div>
      <PizzellaForm />
    </div>
  );
}
