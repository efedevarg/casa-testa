import { createAdminSupabaseClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { Tables } from "@/lib/supabase/database.types";

function getAdmin() {
  if (!isAdminSupabaseConfigured()) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY requerida para ver consultas.");
  }
  return createAdminSupabaseClient();
}

export async function queryContactInquiriesAdmin(): Promise<Tables<"contact_inquiries">[]> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`[inquiriesAdmin.contact] ${error.message}`);
  return data;
}

export async function queryRepairInquiriesAdmin(): Promise<Tables<"repair_inquiries">[]> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("repair_inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`[inquiriesAdmin.repair] ${error.message}`);
  return data;
}
