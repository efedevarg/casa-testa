import { cn } from "@/lib/utils";

type StatusMessageProps = {
  variant: "success" | "error" | "info";
  children: React.ReactNode;
  className?: string;
};

const VARIANT_CLASS: Record<StatusMessageProps["variant"], string> = {
  success: "border-primary/30 bg-primary/10 text-foreground",
  error: "border-destructive/40 bg-destructive/10 text-destructive",
  info: "border-border bg-muted/60 text-muted-foreground",
};

export function StatusMessage({ variant, children, className }: StatusMessageProps) {
  return (
    <p
      role="status"
      className={cn(
        "rounded-xl border px-3 py-2 text-sm font-medium",
        VARIANT_CLASS[variant],
        className
      )}
    >
      {children}
    </p>
  );
}
