import { isSupabaseConfigured } from "@/lib/env";
import type { DataSource } from "./domain";

export function getDataSource(): DataSource {
  return isSupabaseConfigured() ? "supabase" : "mock";
}

export function shouldUseSupabase(): boolean {
  return getDataSource() === "supabase";
}
