/**
 * Sustituir por tipos generados (`supabase gen types typescript`).
 * Mientras tanto, `Json` cubre payloads genéricos.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/** Placeholder hasta conectar el esquema real de PostgreSQL */
export type Database = Record<string, never>;
