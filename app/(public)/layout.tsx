import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LocalBusinessJsonLd />
      <Navbar />
      <main id="contenido-principal" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
