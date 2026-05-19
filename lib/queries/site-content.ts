import { runSupabaseQuery } from "@/lib/supabase/helpers";
import type { Tables } from "@/lib/supabase/database.types";
import { createAdminSupabaseClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

export type SiteContentRow = Tables<"site_content">;

export async function querySiteContent(): Promise<SiteContentRow[]> {
  return runSupabaseQuery("siteContent.list", async (supabase) =>
    supabase.from("site_content").select("*").order("key", { ascending: true })
  ) as Promise<SiteContentRow[]>;
}

export async function querySiteContentByKey(
  key: string
): Promise<SiteContentRow | null> {
  return runSupabaseQuery("siteContent.byKey", async (supabase) =>
    supabase.from("site_content").select("*").eq("key", key).maybeSingle()
  ) as Promise<SiteContentRow | null>;
}

export async function upsertSiteContent(
  key: string,
  value: string,
  description?: string
): Promise<SiteContentRow> {
  if (!isAdminSupabaseConfigured()) {
    throw new Error("Service role requerida para actualizar site_content.");
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("site_content")
    .upsert(
      {
        key,
        value,
        ...(description !== undefined ? { description } : {}),
      },
      { onConflict: "key" }
    )
    .select()
    .single();

  if (error) {
    throw new Error(`[Supabase:siteContent.upsert] ${error.message}`);
  }

  return data;
}
