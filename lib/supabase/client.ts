"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getPublicSupabaseConfig } from "@/lib/env";

/**
 * Cliente Supabase para Client Components y hooks en el navegador.
 * Auth: en una fase posterior se reutilizará el mismo patrón con sesión en cookies.
 */
export function createBrowserSupabaseClient() {
  const { url, anonKey } = getPublicSupabaseConfig();
  return createBrowserClient(url, anonKey);
}
