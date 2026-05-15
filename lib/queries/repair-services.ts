import { runSupabaseQuery } from "@/lib/supabase/helpers";
import type { Tables } from "@/lib/supabase/database.types";

export async function queryRepairServices(): Promise<Tables<"repair_services">[]> {
  return runSupabaseQuery("repairServices.list", async (supabase) =>
    supabase.from("repair_services").select("*").order("title", { ascending: true })
  );
}
