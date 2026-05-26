import { ContentEntryForm } from "@/components/internal/content-entry-form";
import { getAdminSiteContentEntries } from "@/lib/data/site-content-admin";

export default async function InternalContentPage() {
  const entries = await getAdminSiteContentEntries();
  const textEntries = entries.filter((e) => !e.isImageKey);
  const imageEntries = entries.filter((e) => e.isImageKey);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Contenido del sitio
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Cada clave corresponde a un campo en <code className="rounded bg-muted px-1">site_content</code>.
          Los cambios se reflejan en el sitio público tras guardar (revalidación automática).
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Textos
        </h3>
        <div className="grid gap-4">
          {textEntries.map((entry) => (
            <ContentEntryForm key={entry.key} entry={entry} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Imágenes y textos alternativos
        </h3>
        <p className="text-sm text-muted-foreground">
          Para URLs de imagen podés usar un path de Storage (ej.{" "}
          <code className="rounded bg-muted px-1">hero/home.jpg</code>) o una ruta en{" "}
          <code className="rounded bg-muted px-1">/public</code>. Subí archivos en{" "}
          <a href="/internal/media" className="font-medium text-primary underline-offset-2 hover:underline">
            Medios
          </a>
          .
        </p>
        <div className="grid gap-4">
          {imageEntries.map((entry) => (
            <ContentEntryForm key={entry.key} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
