import { NavSite } from "@/components/NavSite";
import { HeroLab } from "@/components/sections/HeroLab";
import { Edge } from "@/components/sections/Edge";
import { SystemBoard } from "@/components/sections/SystemBoard";
import { LabLog } from "@/components/sections/LabLog";
import { Watch } from "@/components/sections/Watch";
import { FounderLab } from "@/components/sections/FounderLab";
import { FooterSite } from "@/components/sections/FooterSite";

export default function HomePage() {
  return (
    <>
      <NavSite />
      <main>
        <HeroLab />
        <Edge />
        <SystemBoard />
        <LabLog />
        <Watch />
        <FounderLab />
      </main>
      <FooterSite />
    </>
  );
}
