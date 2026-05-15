import { NextResponse } from "next/server";

import { getDataSource } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/env";
import { createStaticSupabaseClient } from "@/lib/supabase/static-server";

export async function GET() {
  const dataSource = getDataSource();
  let supabaseOk: boolean | null = null;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createStaticSupabaseClient();
      const { error } = await supabase.from("categories").select("id").limit(1);
      supabaseOk = !error;
    } catch {
      supabaseOk = false;
    }
  }

  return NextResponse.json(
    {
      ok: true,
      service: "casa-testa",
      dataSource,
      supabase: supabaseOk,
      ts: new Date().toISOString(),
    },
    { status: 200 }
  );
}
