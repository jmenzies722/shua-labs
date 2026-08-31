import type { Metadata } from "next";
import Link from "next/link";
import { NavSite } from "@/components/NavSite";
import { FooterSite } from "@/components/sections/FooterSite";
import { SystemBoard } from "@/components/sections/SystemBoard";
import { copy } from "@/data/site";

export const metadata: Metadata = {
  title: "System — Shua Labs",
  description: copy.systemBody,
};

export default function SystemPage() {
  return (
    <>
      <NavSite />
      <main className="pt-14">
        <SystemBoard />
        <div className="site-shell pb-20">
          <Link href="/watch" className="btn-primary">
            Watch the build
          </Link>
        </div>
      </main>
      <FooterSite />
    </>
  );
}
