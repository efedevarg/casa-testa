import { unstable_cache } from "next/cache";
import { cache } from "react";

import {
  SITE_CONTENT_DEFAULTS,
  type SiteContentKey,
  type SiteContentMap,
} from "@/lib/constants/site-content-defaults";

export type { SiteContentKey, SiteContentMap } from "@/lib/constants/site-content-defaults";
import { isSupabaseConfigured } from "@/lib/env";
import { querySiteContent } from "@/lib/queries/site-content";
import { resolveImageUrl } from "@/lib/data/resolve-image";
import type { StorageBucket } from "@/lib/supabase/storage";

import { CACHE_TAGS, CATALOG_REVALIDATE_SECONDS } from "./cache-tags";

function rowsToMap(
  rows: { key: string; value: string }[]
): Partial<SiteContentMap> {
  const map: Partial<SiteContentMap> = {};
  for (const row of rows) {
    if (row.key in SITE_CONTENT_DEFAULTS) {
      map[row.key as SiteContentKey] = row.value;
    }
  }
  return map;
}

function mergeWithDefaults(partial: Partial<SiteContentMap>): SiteContentMap {
  return { ...SITE_CONTENT_DEFAULTS, ...partial };
}

async function loadSiteContentFromDb(): Promise<SiteContentMap> {
  const rows = await querySiteContent();
  return mergeWithDefaults(rowsToMap(rows));
}

const getCachedSiteContent = unstable_cache(
  loadSiteContentFromDb,
  ["site-content"],
  {
    tags: [CACHE_TAGS.siteContent],
    revalidate: CATALOG_REVALIDATE_SECONDS,
  }
);

/** Mapa completo de contenido del sitio con fallback a defaults */
export const getSiteContent = cache(async (): Promise<SiteContentMap> => {
  if (!isSupabaseConfigured()) {
    return { ...SITE_CONTENT_DEFAULTS };
  }

  try {
    const fromDb = await getCachedSiteContent();
    if (Object.keys(fromDb).length === 0) {
      return { ...SITE_CONTENT_DEFAULTS };
    }
    return fromDb;
  } catch (error) {
    console.warn("[Casa Testa] site_content fallback:", error);
    return { ...SITE_CONTENT_DEFAULTS };
  }
});

/** Un valor por clave con fallback */
export const getContentByKey = cache(
  async (key: SiteContentKey): Promise<string> => {
    const map = await getSiteContent();
    return map[key] ?? SITE_CONTENT_DEFAULTS[key];
  }
);

export function pickContent(
  map: SiteContentMap,
  key: SiteContentKey
): string {
  return map[key] ?? SITE_CONTENT_DEFAULTS[key];
}

/** Imagen de site_content (bucket `site` por defecto) */
export function resolveSiteContentImage(
  map: SiteContentMap,
  key: SiteContentKey,
  fallback: string,
  bucket: StorageBucket = "site"
): string {
  return resolveImageUrl(pickContent(map, key), bucket, fallback);
}
