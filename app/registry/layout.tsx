import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";

export default function RegistryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {/* pt-12 clears the fixed 48px nav. */}
      <main className="pt-12">{children}</main>
      <Footer />
    </>
  );
}
