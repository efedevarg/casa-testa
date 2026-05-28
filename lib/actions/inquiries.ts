"use server";

import { revalidatePath } from "next/cache";

import { createAdminSupabaseClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

import type { ActionResult } from "./types";
import { rethrowIfRedirectError } from "./redirect";

export type InquiryStatus = "nueva" | "respondida" | "archivada";
type InquiryKind = "contact" | "repair";

function isStatus(value: string): value is InquiryStatus {
  return value === "nueva" || value === "respondida" || value === "archivada";
}

function tableFromKind(kind: InquiryKind): "contact_inquiries" | "repair_inquiries" {
  return kind === "contact" ? "contact_inquiries" : "repair_inquiries";
}

export async function updateInquiryStatusAction(
  kind: InquiryKind,
  id: string,
  status: string
): Promise<ActionResult> {
  if (!isAdminSupabaseConfigured()) {
    return { ok: false, error: "Service role no configurada." };
  }
  if (!id.trim()) return { ok: false, error: "Consulta inválida." };
  if (!isStatus(status)) return { ok: false, error: "Estado inválido." };

  try {
    const admin = createAdminSupabaseClient();
    const { error } = await admin
      .from(tableFromKind(kind))
      .update({ status })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/internal/inquiries");
    return { ok: true, mode: "persisted" };
  } catch (error) {
    rethrowIfRedirectError(error);
    return { ok: false, error: "No pudimos actualizar el estado." };
  }
}
