"use client";

import type { ComponentProps } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track-client";
import { cn } from "@/lib/utils";

type TrackedWhatsAppLinkProps = ComponentProps<"a"> & {
  trackingContext?: string;
  trackingSlug?: string;
};

export function TrackedWhatsAppLink({
  className,
  trackingContext,
  trackingSlug,
  onClick,
  children,
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      className={cn(className)}
      onClick={(event) => {
        trackEvent(ANALYTICS_EVENTS.whatsappClick, {
          context: trackingContext ?? "generic",
          slug: trackingSlug ?? null,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
