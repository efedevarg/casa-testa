import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PizzellaMoldWithImages } from "@/lib/supabase/database.types";

const MOLD_SELECT = `
  *,
  pizzella_images ( id, mold_id, image_url, alt_text )
`;

export async function queryPizzelleMolds(): Promise<PizzellaMoldWithImages[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("pizzella_molds")
    .select(MOLD_SELECT)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as PizzellaMoldWithImages[];
}
