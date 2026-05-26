import { MediaManager } from "@/components/internal/media-manager";

export default function InternalMediaPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Medios
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Buckets disponibles: <strong>site</strong>, <strong>categories</strong>,{" "}
          <strong>products</strong>, <strong>pizzellas</strong>, <strong>brand</strong>.
          Después de subir, copiá el path y actualizalo en Contenido o en la tabla
          correspondiente.
        </p>
      </div>

      <MediaManager />
    </div>
  );
}
