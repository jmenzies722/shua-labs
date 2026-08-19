import { NavNew } from "@/components/NavNew";
import { HeroNew } from "@/components/sections/HeroNew";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { InFormation } from "@/components/sections/InFormation";
import { Signals } from "@/components/sections/Signals";
import { Founder } from "@/components/sections/Founder";
import { Contact } from "@/components/sections/Contact";
import { FooterNew } from "@/components/sections/FooterNew";

/**
 * Shua Labs — A future-facing venture company.
 *
 * Building ventures, products, and systems for an AI-native world.
 */
export default function HomePage() {
  return (
    <>
      <NavNew />
      <main>
        <HeroNew />
        <WhatWeBuild />
        <HowWeWork />
        <InFormation />
        <Signals />
        <Founder />
        <Contact />
      </main>
      <FooterNew />
    </>
  );
}
