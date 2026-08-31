import type { Metadata } from "next";
import { NavSite } from "@/components/NavSite";
import { FooterSite } from "@/components/sections/FooterSite";
import { LabLog } from "@/components/sections/LabLog";
import { copy } from "@/data/site";

export const metadata: Metadata = {
  title: "Lab — Shua Labs",
  description: copy.logBody,
};

export default function LabPage() {
  return (
    <>
      <NavSite />
      <main className="pt-14">
        <LabLog />
      </main>
      <FooterSite />
    </>
  );
}
