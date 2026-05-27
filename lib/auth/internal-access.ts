import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const LOGIN_PATH = "/login";
const INTERNAL_PATH = "/internal";

function parseAllowlist(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getInternalAdminEmails(): string[] {
  return parseAllowlist(process.env.INTERNAL_ADMIN_EMAILS);
}

export function isEmailAllowedForInternal(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowlist = getInternalAdminEmails();
  if (allowlist.length === 0) return false;
  return allowlist.includes(email.trim().toLowerCase());
}

export function getLoginRedirect(nextPath = INTERNAL_PATH): string {
  const params = new URLSearchParams({ next: nextPath });
  return `${LOGIN_PATH}?${params.toString()}`;
}

export async function requireInternalAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect(getLoginRedirect(INTERNAL_PATH));
  }

  if (!isEmailAllowedForInternal(user.email)) {
    await supabase.auth.signOut();
    redirect(`${LOGIN_PATH}?error=not_allowed`);
  }

  return user;
}
