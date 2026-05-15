import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/database.types";

export async function queryRepairServices(): Promise<Tables<"repair_services">[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("repair_services")
    .select("*")
    .order("title", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
