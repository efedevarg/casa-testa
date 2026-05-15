"use server";

import { isSupabaseConfigured } from "@/lib/env";
import { insertRepairInquiry } from "@/lib/queries/inquiries";

import type { ActionResult } from "./types";

export type RepairFormState = ActionResult;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitRepairInquiry(
  _prev: RepairFormState | undefined,
  formData: FormData
): Promise<RepairFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const piece = String(formData.get("piece") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length < 2) {
    return { ok: false, error: "Indicá tu nombre." };
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Indicá un email válido." };
  }
  if (!piece || piece.length < 3) {
    return { ok: false, error: "Contanos qué pieza querés restaurar." };
  }
  if (!message || message.length < 10) {
    return { ok: false, error: "Describí el problema con un poco más de detalle." };
  }

  if (!isSupabaseConfigured()) {
    return { ok: true, mode: "demo" };
  }

  try {
    await insertRepairInquiry({
      name,
      email,
      piece_description: piece,
      message,
    });
    return { ok: true, mode: "persisted" };
  } catch (error) {
    console.error("[submitRepairInquiry]", error);
    return {
      ok: false,
      error:
        "No pudimos registrar la consulta. Mandanos fotos por WhatsApp mientras tanto.",
    };
  }
}
