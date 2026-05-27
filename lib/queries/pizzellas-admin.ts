import { createAdminSupabaseClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { PizzellaMoldWithImages, Tables } from "@/lib/supabase/database.types";

const PIZZELLA_SELECT = `
  *,
  pizzella_images ( id, mold_id, image_url, alt_text )
`;

export type PizzellaUpsertInput = {
  model_name: string;
  slug: string;
  description: string;
  dimensions: string | null;
  material: string | null;
  price: number | null;
  featured: boolean;
};

function getAdmin() {
  if (!isAdminSupabaseConfigured()) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY requerida para administrar pizzellas.");
  }
  return createAdminSupabaseClient();
}

export async function queryPizzellasAdmin(): Promise<Tables<"pizzella_molds">[]> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("pizzella_molds")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`[pizzellasAdmin.list] ${error.message}`);
  return data;
}

export async function queryPizzellaAdminById(
  id: string
): Promise<PizzellaMoldWithImages | null> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("pizzella_molds")
    .select(PIZZELLA_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`[pizzellasAdmin.byId] ${error.message}`);
  return data as PizzellaMoldWithImages | null;
}

export async function insertPizzellaAdmin(
  input: PizzellaUpsertInput
): Promise<Tables<"pizzella_molds">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("pizzella_molds")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(`[pizzellasAdmin.insert] ${error.message}`);
  return data;
}

export async function updatePizzellaAdmin(
  id: string,
  input: PizzellaUpsertInput
): Promise<Tables<"pizzella_molds">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("pizzella_molds")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`[pizzellasAdmin.update] ${error.message}`);
  return data;
}

export async function deletePizzellaAdmin(id: string): Promise<void> {
  const supabase = getAdmin();
  const { error } = await supabase.from("pizzella_molds").delete().eq("id", id);
  if (error) throw new Error(`[pizzellasAdmin.delete] ${error.message}`);
}

export async function insertPizzellaImageAdmin(input: {
  mold_id: string;
  image_url: string;
  alt_text: string;
}): Promise<Tables<"pizzella_images">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("pizzella_images")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(`[pizzellasAdmin.imageInsert] ${error.message}`);
  return data;
}

export async function updatePizzellaImageAdmin(
  id: string,
  patch: Partial<Pick<Tables<"pizzella_images">, "image_url" | "alt_text">>
): Promise<Tables<"pizzella_images">> {
  const supabase = getAdmin();
  const { data, error } = await supabase
    .from("pizzella_images")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`[pizzellasAdmin.imageUpdate] ${error.message}`);
  return data;
}

export async function deletePizzellaImageAdmin(id: string): Promise<void> {
  const supabase = getAdmin();
  const { error } = await supabase.from("pizzella_images").delete().eq("id", id);
  if (error) throw new Error(`[pizzellasAdmin.imageDelete] ${error.message}`);
}
