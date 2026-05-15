import { runSupabaseQuery } from "@/lib/supabase/helpers";
import type { PizzellaMoldWithImages } from "@/lib/supabase/database.types";

const MOLD_SELECT = `
  *,
  pizzella_images ( id, mold_id, image_url, alt_text )
`;

export async function queryPizzelleMolds(): Promise<PizzellaMoldWithImages[]> {
  return runSupabaseQuery("pizzelleMolds.list", async (supabase) =>
    supabase.from("pizzella_molds").select(MOLD_SELECT).order("created_at", { ascending: true })
  ) as Promise<PizzellaMoldWithImages[]>;
}
