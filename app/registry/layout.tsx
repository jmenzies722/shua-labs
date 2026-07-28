import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

/**
 * Registry used its own Nav and Footer, so the site had two different headers depending on
 * which tab you were on. Same shell as everywhere else now.
 */
export default function RegistryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
