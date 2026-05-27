import Link from "next/link";
import { notFound } from "next/navigation";

import { DeletePizzellaButton } from "@/components/internal/delete-pizzella-button";
import { PizzellaForm } from "@/components/internal/pizzella-form";
import { PizzellaImagesPanel } from "@/components/internal/pizzella-images-panel";
import { queryPizzellaAdminById } from "@/lib/queries/pizzellas-admin";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function InternalPizzellaEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved } = await searchParams;
  const mold = await queryPizzellaAdminById(id);
  if (!mold) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Link href="/internal/pizzellas" className="text-sm text-muted-foreground hover:text-foreground">
            ← Pizzellas
          </Link>
          <h2 className="font-heading text-3xl font-semibold tracking-tight">{mold.model_name}</h2>
          <p className="font-mono text-xs text-muted-foreground">{mold.slug}</p>
        </div>
        <DeletePizzellaButton moldId={mold.id} moldName={mold.model_name} />
      </div>
      <PizzellaForm mold={mold} showSavedBanner={saved === "1"} />
      <PizzellaImagesPanel mold={mold} />
    </div>
  );
}
