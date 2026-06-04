"use client";

import { useEffect, useRef } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track-client";

type InquirySuccessTrackerProps = {
  kind: "contact" | "repair";
  topic?: string;
};

export function InquirySuccessTracker({ kind, topic }: InquirySuccessTrackerProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent(ANALYTICS_EVENTS.inquirySubmitted, { kind, topic: topic ?? null });
  }, [kind, topic]);

  return null;
}
