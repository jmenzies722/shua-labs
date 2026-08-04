import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Shipped } from "@/components/sections/Shipped";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

/**
 * Three sections: what's real (Shipped), who's building it (About), how to
 * reach it (Footer). No roadmap, no changelog — unshipped work doesn't get a
 * place on the homepage. Deeper technical detail lives in /registry and the
 * console, both one click away, neither forced on a first-time visitor.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Shipped />
        <About />
      </main>
      <Footer />
    </>
  );
}
