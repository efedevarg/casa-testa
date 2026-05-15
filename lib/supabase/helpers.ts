import { isSupabaseConfigured } from "@/lib/env";
import { createStaticSupabaseClient } from "@/lib/supabase/static-server";
import type { Database } from "@/lib/supabase/database.types";

type SupabaseCatalogClient = ReturnType<typeof createStaticSupabaseClient>;

/**
 * Cliente para lecturas de catálogo (sin cookies — cacheable).
 */
export function getCatalogSupabase(): SupabaseCatalogClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase no está configurado en el entorno.");
  }
  return createStaticSupabaseClient();
}

export async function runSupabaseQuery<T>(
  label: string,
  query: (client: SupabaseCatalogClient) => Promise<{ data: T | null; error: unknown }>
): Promise<T> {
  const client = getCatalogSupabase();
  const { data, error } = await query(client);

  if (error) {
    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: string }).message)
        : String(error);
    throw new Error(`[Supabase:${label}] ${message}`);
  }

  return data as T;
}

export async function runSupabaseMutation(
  label: string,
  mutation: (client: SupabaseCatalogClient) => Promise<{ error: unknown }>
): Promise<void> {
  const client = getCatalogSupabase();
  const { error } = await mutation(client);

  if (error) {
    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: string }).message)
        : String(error);
    throw new Error(`[Supabase:${label}] ${message}`);
  }
}

export type { Database };
