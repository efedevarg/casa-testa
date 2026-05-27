import Link from "next/link";

import { CategoryForm } from "@/components/internal/category-form";

export default function InternalCategoryNewPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/internal/categories" className="text-sm text-muted-foreground hover:text-foreground">
          ← Categories
        </Link>
        <h2 className="font-heading text-3xl font-semibold tracking-tight">Nueva categoría</h2>
      </div>
      <CategoryForm />
    </div>
  );
}
