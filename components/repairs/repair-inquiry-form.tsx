"use client";

import { useState } from "react";

import { FadeIn } from "@/components/marketing/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fields = [
  { id: "name", label: "Nombre y apellido", type: "text", placeholder: "Ej. Laura Bianchi" },
  { id: "email", label: "Email", type: "email", placeholder: "hola@tumail.com" },
  {
    id: "piece",
    label: "¿Qué pieza querés restaurar?",
    type: "text",
    placeholder: "Olla esmaltada, sartén de hierro, molde…",
  },
] as const;

export function RepairInquiryForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <FadeIn>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-border/70 bg-card/90 p-6 shadow-sm backdrop-blur-sm sm:p-8"
      >
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Consulta de reparación
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Contanos el caso con fotos claras: hoy el envío es de demostración;
            conservamos este diseño para enchufar backend y respuestas reales
            sin cambiar tu flujo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.id} className={cn("space-y-2 text-sm", field.id === "piece" && "sm:col-span-2")}>
              <span className="font-medium text-foreground">{field.label}</span>
              <input
                required
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
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
            placeholder="Golpes, mangos flojos, esmalte saltado, curado de hierro…"
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" className="rounded-full sm:w-auto">
            Enviar consulta
          </Button>
          {sent ? (
            <p className="text-sm font-medium text-primary">
              Gracias — por ahora es demostración; te pedimos que, si es urgente,
              nos escribas por WhatsApp con fotos.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Mientras activamos el backend, priorizamos respuesta por WhatsApp.
            </p>
          )}
        </div>
      </form>
    </FadeIn>
  );
}
