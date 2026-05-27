declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    /** Solo servidor — inserciones admin / bypass RLS cuando haga falta */
    SUPABASE_SERVICE_ROLE_KEY?: string;
    /** Emails permitidos para /internal (separados por coma) */
    INTERNAL_ADMIN_EMAILS?: string;
  }
}
