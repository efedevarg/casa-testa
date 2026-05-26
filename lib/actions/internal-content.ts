"use server";

import { updateSiteContent } from "@/lib/actions/content";

import type { ActionResult } from "./types";

export type SaveSiteContentState = ActionResult<{ key: string }>;

export async function saveSiteContentAction(
  _prev: SaveSiteContentState | undefined,
  formData: FormData
): Promise<SaveSiteContentState> {
  const key = String(formData.get("key") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  return updateSiteContent(key, value);
}
