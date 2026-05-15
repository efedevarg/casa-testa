import { runSupabaseQuery } from "@/lib/supabase/helpers";
import type { Tables } from "@/lib/supabase/database.types";

export async function queryCategories(): Promise<Tables<"categories">[]> {
  return runSupabaseQuery("categories.list", async (supabase) =>
    supabase.from("categories").select("*").order("name", { ascending: true })
  );
}
