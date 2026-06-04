"use client";

import type { AnalyticsEventName, AnalyticsPayload } from "./events";

export function trackEvent(
  name: AnalyticsEventName,
  props?: AnalyticsPayload["props"]
): void {
  if (typeof window === "undefined") return;

  const body: AnalyticsPayload = {
    name,
    props,
    path: window.location.pathname,
  };

  const json = JSON.stringify(body);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([json], { type: "application/json" });
      navigator.sendBeacon("/api/analytics", blob);
      return;
    }
  } catch {
    /* fallback below */
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
    keepalive: true,
  });
}
