import { NavSite } from "@/components/NavSite";
import { FooterSite } from "@/components/sections/FooterSite";

export default function RegistryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavSite />
      <main className="pt-14">{children}</main>
      <FooterSite />
    </>
  );
}
