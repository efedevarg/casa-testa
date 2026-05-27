import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { StatusMessage } from "@/components/internal/status-message";

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams;
  const nextPath = next?.startsWith("/internal") ? next : "/internal";

  return (
    <div className="section-inline flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Casa Testa
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Acceso interno
          </h1>
          <p className="text-sm text-muted-foreground">
            Ingresá con tu usuario de Supabase Auth para administrar el sitio.
          </p>
        </div>

        {error === "not_allowed" ? (
          <StatusMessage variant="error">
            Tu email no está habilitado para el panel interno.
          </StatusMessage>
        ) : null}

        <LoginForm nextPath={nextPath} />
      </div>
    </div>
  );
}
