import { Navigation } from "@/components/layout/Navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="pt-[calc(3.5rem+env(safe-area-inset-top))]">{children}</main>
      <SiteFooter />
    </>
  );
}
