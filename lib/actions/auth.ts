"use server";

import { redirect } from "next/navigation";

import { isEmailAllowedForInternal } from "@/lib/auth/internal-access";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import type { ActionResult } from "./types";

export type LoginFormState = ActionResult;

export async function loginWithPasswordAction(
  _prev: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const next = String(formData.get("next") ?? "/internal").trim() || "/internal";

  if (!email || !password) {
    return { ok: false, error: "Completá email y contraseña." };
  }

  if (!isEmailAllowedForInternal(email)) {
    return { ok: false, error: "Este usuario no está habilitado para el admin." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, error: "Credenciales inválidas. Verificá email y contraseña." };
  }

  redirect(next.startsWith("/internal") ? next : "/internal");
}

export async function logoutAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}
