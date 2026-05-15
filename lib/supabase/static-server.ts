import { createClient } from "@supabase/supabase-js";

import { getPublicSupabaseConfig } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Cliente de solo lectura para catálogo — sin cookies.
 * Compatible con `unstable_cache` y generación estática.
 * Para sesiones de usuario usar `createServerSupabaseClient`.
 */
export function createStaticSupabaseClient() {
  const { url, anonKey } = getPublicSupabaseConfig();

  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
