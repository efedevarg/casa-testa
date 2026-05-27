import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryForm } from "@/components/internal/category-form";
import { CategoryImagePanel } from "@/components/internal/category-image-panel";
import { DeleteCategoryButton } from "@/components/internal/delete-category-button";
import { queryCategoryAdminById } from "@/lib/queries/categories-admin";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function InternalCategoryEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved } = await searchParams;
  const category = await queryCategoryAdminById(id);
  if (!category) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Link href="/internal/categories" className="text-sm text-muted-foreground hover:text-foreground">
            ← Categories
          </Link>
          <h2 className="font-heading text-3xl font-semibold tracking-tight">{category.name}</h2>
          <p className="font-mono text-xs text-muted-foreground">{category.slug}</p>
        </div>
        <DeleteCategoryButton categoryId={category.id} categoryName={category.name} />
      </div>
      <CategoryForm category={category} showSavedBanner={saved === "1"} />
      <CategoryImagePanel category={category} />
    </div>
  );
}
