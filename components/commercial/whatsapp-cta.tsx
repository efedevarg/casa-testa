import { MessageCircle } from "lucide-react";

import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_CHAT_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type WhatsAppCtaProps = {
  href?: string;
  label?: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  trackingContext?: string;
  trackingSlug?: string;
};

export function WhatsAppCta({
  href = WHATSAPP_CHAT_URL,
  label = "Consultar por WhatsApp",
  className,
  size = "lg",
  variant = "default",
  trackingContext,
  trackingSlug,
}: WhatsAppCtaProps) {
  return (
    <Button
      nativeButton={false}
      size={size}
      variant={variant}
      className={cn("rounded-full gap-2", className)}
      render={
        <TrackedWhatsAppLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          trackingContext={trackingContext}
          trackingSlug={trackingSlug}
        />
      }
    >
      <MessageCircle className="size-4 shrink-0" aria-hidden />
      {label}
    </Button>
  );
}
