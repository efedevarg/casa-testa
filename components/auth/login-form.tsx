"use client";

import { useActionState } from "react";

import { StatusMessage } from "@/components/internal/status-message";
import { Button } from "@/components/ui/button";
import { loginWithPasswordAction } from "@/lib/actions/auth";

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginWithPasswordAction, undefined);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-border/70 bg-card/95 p-6 shadow-sm">
      <input type="hidden" name="next" value={nextPath} />

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Contraseña</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
        />
      </label>

      {state && !state.ok ? <StatusMessage variant="error">{state.error}</StatusMessage> : null}

      <Button type="submit" disabled={pending} className="w-full rounded-full">
        {pending ? "Ingresando…" : "Ingresar"}
      </Button>
    </form>
  );
}
