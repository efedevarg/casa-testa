import { createAdminSupabaseClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { Tables } from "@/lib/supabase/database.types";

export type CategoryUpsertInput = {
  name: string;
  slug: string;
  description: string | null;
  featured: boolean;
  image_url: string | null;
};

function getAdmin() {
  if (!isAdminSupabaseConfigured()) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY requerida para administrar categorías.");
  }
  return createAdminSupabaseClient();
}

export async function queryCategoriesAdmin(): Promise<Tables<"categories">[]> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`[categoriesAdmin.list] ${error.message}`);
  return data;
}

export async function queryCategoryAdminById(
  id: string
): Promise<Tables<"categories"> | null> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`[categoriesAdmin.byId] ${error.message}`);
  return data;
}

export async function insertCategoryAdmin(
  input: CategoryUpsertInput
): Promise<Tables<"categories">> {
  const supabase = getAdmin();
  const { data, error } = await supabase.from("categories").insert(input).select().single();
  if (error) throw new Error(`[categoriesAdmin.insert] ${error.message}`);
  return data;
}

export async function updateCategoryAdmin(
  id: string,
  input: CategoryUpsertInput
): Promise<Tables<"categories">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("categories")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`[categoriesAdmin.update] ${error.message}`);
  return data;
}

export async function deleteCategoryAdmin(id: string): Promise<void> {
  const supabase = getAdmin();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(`[categoriesAdmin.delete] ${error.message}`);
}
