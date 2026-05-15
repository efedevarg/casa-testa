"use client";

import { useActionState } from "react";

import { submitContactInquiry } from "@/lib/actions/contact";
import { FadeIn } from "@/components/marketing/fade-in";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactInquiry, undefined);

  return (
    <FadeIn>
      <form
        action={formAction}
        className="space-y-5 rounded-3xl border border-border/70 bg-card/90 p-6 shadow-sm backdrop-blur-sm sm:p-8"
      >
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Escribinos
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Dejanos tu consulta y la guardamos en nuestro sistema. Te respondemos por
            email o WhatsApp según el caso.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Nombre</span>
            <input
              required
              name="name"
              disabled={pending}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Email</span>
            <input
              required
              name="email"
              type="email"
              disabled={pending}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Motivo</span>
          <select
            name="topic"
            disabled={pending}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
            defaultValue="productos"
          >
            <option value="productos">Consulta por productos</option>
            <option value="pizzellas">Pizzellas / moldes</option>
            <option value="reparaciones">Reparaciones</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Mensaje</span>
          <textarea
            required
            name="message"
            rows={4}
            disabled={pending}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
          />
        </label>

        {state && !state.ok ? (
          <p className="text-sm font-medium text-destructive">{state.error}</p>
        ) : null}

        {state?.ok ? (
          <p className="text-sm font-medium text-primary">
            {state.mode === "persisted"
              ? "Mensaje recibido. Te contactamos pronto desde Casa Testa."
              : "Gracias — el mensaje se registró en modo demo (Supabase no configurado)."}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="w-full rounded-full sm:w-auto"
        >
          {pending ? "Enviando…" : "Enviar mensaje"}
        </Button>
      </form>
    </FadeIn>
  );
}
