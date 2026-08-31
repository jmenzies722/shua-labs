import type { Metadata } from "next";
import { NavSite } from "@/components/NavSite";
import { FooterSite } from "@/components/sections/FooterSite";
import { Watch } from "@/components/sections/Watch";
import { copy } from "@/data/site";

export const metadata: Metadata = {
  title: "Watch — Shua Labs",
  description: copy.watchBody,
};

export default function WatchPage() {
  return (
    <>
      <NavSite />
      <main className="pt-14">
        <Watch />
      </main>
      <FooterSite />
    </>
  );
}
