"use server";

import { isSupabaseConfigured } from "@/lib/env";
import { insertContactInquiry } from "@/lib/queries/inquiries";

import type { ActionResult } from "./types";

export type ContactFormState = ActionResult<{ id?: string }>;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactInquiry(
  _prev: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "productos").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length < 2) {
    return { ok: false, error: "Indicá tu nombre." };
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Indicá un email válido." };
  }
  if (!message || message.length < 10) {
    return { ok: false, error: "El mensaje debe tener al menos 10 caracteres." };
  }

  if (!isSupabaseConfigured()) {
    return { ok: true, mode: "demo" };
  }

  try {
    await insertContactInquiry({ name, email, topic, message });
    return { ok: true, mode: "persisted" };
  } catch (error) {
    console.error("[submitContactInquiry]", error);
    return {
      ok: false,
      error:
        "No pudimos guardar tu mensaje. Escribinos por WhatsApp y lo vemos enseguida.",
    };
  }
}
