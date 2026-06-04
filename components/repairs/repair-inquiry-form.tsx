"use client";

import { useActionState } from "react";

import { InquirySuccessTracker } from "@/components/analytics/inquiry-success-tracker";
import { submitRepairInquiry } from "@/lib/actions/repair";
import { FadeIn } from "@/components/marketing/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fields = [
  { id: "name", label: "Nombre y apellido", type: "text", placeholder: "Ej. Laura Bianchi" },
  { id: "email", label: "Email", type: "email", placeholder: "hola@tumail.com" },
  {
    id: "phone",
    label: "Teléfono (opcional)",
    type: "tel",
    placeholder: "+54 11 …",
    required: false,
  },
  {
    id: "piece",
    label: "¿Qué pieza querés restaurar?",
    type: "text",
    placeholder: "Olla esmaltada, sartén de hierro, molde…",
    required: true,
  },
] as const;

export function RepairInquiryForm() {
  const [state, formAction, pending] = useActionState(submitRepairInquiry, undefined);

  return (
    <FadeIn>
      <form
        action={formAction}
        className="space-y-5 rounded-3xl border border-border/70 bg-card/90 p-6 shadow-sm backdrop-blur-sm sm:p-8"
      >
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Consulta de reparación
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Contanos el caso: guardamos la consulta para coordinar una visita o
            responder por WhatsApp con fotos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label
              key={field.id}
              className={cn("space-y-2 text-sm", field.id === "piece" && "sm:col-span-2")}
            >
              <span className="font-medium text-foreground">{field.label}</span>
              <input
                required={"required" in field ? field.required !== false : true}
                name={field.id}
                type={field.type}
                autoComplete={field.id === "phone" ? "tel" : undefined}
                disabled={pending}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
              />
            </label>
          ))}
        </div>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Contanos el problema</span>
          <textarea
            required
            name="message"
            rows={4}
            disabled={pending}
            placeholder="Golpes, mangos flojos, esmalte saltado, curado de hierro…"
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
          />
        </label>

        {state && !state.ok ? (
          <p className="text-sm font-medium text-destructive">{state.error}</p>
        ) : null}

        {state?.ok ? (
          <>
            <InquirySuccessTracker kind="repair" />
            <p className="text-sm font-medium text-primary">
              {state.mode === "persisted"
                ? "Consulta registrada. Te escribimos a la brevedad."
                : "Gracias — modo demo (Supabase no configurado). Si es urgente, WhatsApp."}
            </p>
          </>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={pending} className="rounded-full sm:w-auto">
            {pending ? "Enviando…" : "Enviar consulta"}
          </Button>
          {!state?.ok && !pending ? (
            <p className="text-xs text-muted-foreground">
              Podés adjuntar fotos por WhatsApp después de enviar.
            </p>
          ) : null}
        </div>
      </form>
    </FadeIn>
  );
}
