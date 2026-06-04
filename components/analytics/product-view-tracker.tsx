"use client";

import { useEffect, useRef } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track-client";

type ProductViewTrackerProps = {
  slug: string;
  name: string;
};

export function ProductViewTracker({ slug, name }: ProductViewTrackerProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent(ANALYTICS_EVENTS.productView, { slug, name });
  }, [slug, name]);

  return null;
}
