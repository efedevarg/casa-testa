import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getPublicSupabaseConfig } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Cliente Supabase para Server Components, Server Actions y Route Handlers.
 * Listo para lecturas públicas; la escritura con sesión se habilitará con Auth.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getPublicSupabaseConfig();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          /* set desde Server Component sin mutación: ignorar hasta usar Server Actions */
        }
      },
    },
  });
}
