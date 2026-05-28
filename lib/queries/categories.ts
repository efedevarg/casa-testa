import { runSupabaseQuery } from "@/lib/supabase/helpers";
import type { Tables } from "@/lib/supabase/database.types";

export async function queryCategories(): Promise<Tables<"categories">[]> {
  try {
    return await runSupabaseQuery("categories.list", async (supabase) =>
      supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true })
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("sort_order")) throw error;
    return runSupabaseQuery("categories.list.legacyOrder", async (supabase) =>
      supabase.from("categories").select("*").order("name", { ascending: true })
    );
  }
}
