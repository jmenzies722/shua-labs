import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Shipped } from "@/components/sections/Shipped";
import { About } from "@/components/sections/About";
import { RegistryTeaser } from "@/components/sections/RegistryTeaser";
import { Stack } from "@/components/sections/Stack";
import { Platform } from "@/components/sections/Platform";
import { Journey } from "@/components/sections/Journey";
import { Footer } from "@/components/sections/Footer";

/**
 * Order is a reading path, not a filing system: what's real and usable
 * first (Shipped), then who's building it (About) while the reader still
 * has patience for it, then the deep-dive sections — each folded behind a
 * toggle so the page reads as a portfolio, not a wall of documentation.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Shipped />
        <About />
        <RegistryTeaser />
        <Stack />
        <Platform />
        <Journey />
      </main>
      <Footer />
    </>
  );
}
