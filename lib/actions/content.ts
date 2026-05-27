"use server";

import { revalidateTag } from "next/cache";

import {
  SITE_CONTENT_DEFAULTS,
  type SiteContentKey,
} from "@/lib/constants/site-content-defaults";
import { CACHE_TAGS } from "@/lib/data/cache-tags";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import { upsertSiteContent } from "@/lib/queries/site-content";

import type { ActionResult } from "./types";
import { rethrowIfRedirectError } from "./redirect";

function isSiteContentKey(key: string): key is SiteContentKey {
  return key in SITE_CONTENT_DEFAULTS;
}

export async function updateSiteContent(
  key: string,
  value: string
): Promise<ActionResult<{ key: SiteContentKey }>> {
  const trimmedKey = key.trim();
  const trimmedValue = value.trim();

  if (!isSiteContentKey(trimmedKey)) {
    return { ok: false, error: `Clave de contenido desconocida: ${key}` };
  }

  if (!trimmedValue) {
    return { ok: false, error: "El valor no puede estar vacío." };
  }

  if (!isAdminSupabaseConfigured()) {
    return {
      ok: false,
      error:
        "Supabase admin no configurado. Agregá SUPABASE_SERVICE_ROLE_KEY para persistir contenido.",
    };
  }

  try {
    await upsertSiteContent(trimmedKey, trimmedValue);
    revalidateTag(CACHE_TAGS.siteContent);
    return { ok: true, mode: "persisted", data: { key: trimmedKey } };
  } catch (error) {
    rethrowIfRedirectError(error);
    console.error("[updateSiteContent]", error);
    return {
      ok: false,
      error: "No pudimos guardar el contenido. Revisá permisos y la tabla site_content.",
    };
  }
}
