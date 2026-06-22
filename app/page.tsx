import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Principles } from "@/components/sections/Principles";
import { Work } from "@/components/sections/Work";
import { Consulting } from "@/components/sections/Consulting";
import { Journey } from "@/components/sections/Journey";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Principles />
        <Work />
        <Consulting />
        <Journey />
        <About />
      </main>
      <Footer />
    </>
  );
}
