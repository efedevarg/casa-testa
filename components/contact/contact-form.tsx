"use client";

import { useState } from "react";

import { FadeIn } from "@/components/marketing/fade-in";
import { Button } from "@/components/ui/button";

export function ContactForm() {
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
            Escribinos
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Dejanos un mensaje con calma: en esta etapa el formulario nos ayuda a
            validar la experiencia; pronto conectaremos envío real a nuestro mail
            o CRM.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Nombre</span>
            <input
              required
              name="name"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">Email</span>
            <input
              required
              name="email"
              type="email"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Motivo</span>
          <select
            name="topic"
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
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
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
          />
        </label>

        <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto">
          Enviar mensaje
        </Button>

        {sent ? (
          <p className="text-sm font-medium text-primary">
            Gracias — por ahora es una demostración; pronto recibirás confirmación
            real desde Casa Testa.
          </p>
        ) : null}
      </form>
    </FadeIn>
  );
}
