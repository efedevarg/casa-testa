import {
  SITE_CONTENT_DEFAULTS,
  type SiteContentKey,
} from "@/lib/constants/site-content-defaults";
import { isSupabaseConfigured } from "@/lib/env";
import { querySiteContent } from "@/lib/queries/site-content";

export type SiteContentAdminEntry = {
  key: SiteContentKey;
  value: string;
  description: string | null;
  defaultValue: string;
  isImageKey: boolean;
};

function isImageContentKey(key: string): boolean {
  return key.includes("image_url") || key.includes("_alt");
}

/** Lista de contenido para el panel interno (sin caché de catálogo). */
export async function getAdminSiteContentEntries(): Promise<SiteContentAdminEntry[]> {
  const keys = Object.keys(SITE_CONTENT_DEFAULTS) as SiteContentKey[];
  const rowMap = new Map<string, { value: string; description: string | null }>();

  if (isSupabaseConfigured()) {
    try {
      const rows = await querySiteContent();
      for (const row of rows) {
        if (row.key in SITE_CONTENT_DEFAULTS) {
          rowMap.set(row.key, {
            value: row.value,
            description: row.description,
          });
        }
      }
    } catch (error) {
      console.warn("[getAdminSiteContentEntries]", error);
    }
  }

  return keys.map((key) => {
    const fromDb = rowMap.get(key);
    return {
      key,
      value: fromDb?.value ?? SITE_CONTENT_DEFAULTS[key],
      description: fromDb?.description ?? null,
      defaultValue: SITE_CONTENT_DEFAULTS[key],
      isImageKey: isImageContentKey(key),
    };
  });
}
