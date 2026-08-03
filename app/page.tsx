import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Shipped } from "@/components/sections/Shipped";
import { RegistryTeaser } from "@/components/sections/RegistryTeaser";
import { Enablement } from "@/components/sections/Enablement";
import { Stack } from "@/components/sections/Stack";
import { Platform } from "@/components/sections/Platform";
import { Principles } from "@/components/sections/Principles";
import { Journey } from "@/components/sections/Journey";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

/**
 * Order is an argument: what exists and can be used comes first, what is being
 * built next comes after, and the rules that govern the difference come after
 * that. Leading with the roadmap would put unfinished work above finished work.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Shipped />
        <Enablement />
        <RegistryTeaser />
        <Stack />
        <Platform />
        <Principles />
        <Journey />
        <About />
      </main>
      <Footer />
    </>
  );
}
