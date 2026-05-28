"use client";

import { useState, useTransition } from "react";

import { updateInquiryStatusAction } from "@/lib/actions/inquiries";

import { StatusMessage } from "./status-message";

type Props = {
  kind: "contact" | "repair";
  inquiryId: string;
  current: "nueva" | "respondida" | "archivada";
};

export function InquiryStatusSelect({ kind, inquiryId, current }: Props) {
  const [status, setStatus] = useState(current);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function handleChange(next: "nueva" | "respondida" | "archivada") {
    setStatus(next);
    setFeedback(null);
    startTransition(async () => {
      const result = await updateInquiryStatusAction(kind, inquiryId, next);
      if (!result.ok) {
        setFeedback({ ok: false, text: result.error });
        setStatus(current);
      } else {
        setFeedback({ ok: true, text: "Estado actualizado." });
      }
    });
  }

  return (
    <div className="space-y-2">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value as Props["current"])}
        disabled={pending}
        className="rounded-lg border border-input bg-background px-2 py-1 text-xs"
      >
        <option value="nueva">Nueva</option>
        <option value="respondida">Respondida</option>
        <option value="archivada">Archivada</option>
      </select>
      {feedback ? (
        <StatusMessage variant={feedback.ok ? "success" : "error"} className="px-2 py-1 text-xs">
          {feedback.text}
        </StatusMessage>
      ) : null}
    </div>
  );
}
