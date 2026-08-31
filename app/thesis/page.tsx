import type { Metadata } from "next";
import Link from "next/link";
import { NavSite } from "@/components/NavSite";
import { FooterSite } from "@/components/sections/FooterSite";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Thesis — Shua Labs",
  description:
    "Write the company before the product. Kill ideas with evidence. Build in the open without inventing traction.",
};

export default function ThesisPage() {
  return (
    <>
      <NavSite />
      <main className="section-pad min-h-[100svh] pt-[calc(5rem+env(safe-area-inset-top))]">
        <div className="site-shell max-w-2xl">
          <p className="label-text">Thesis</p>
          <h1 className="display-section text-balance mt-4 mb-8">
            Write the company before the product.
          </h1>
          <div className="space-y-5 text-[17px] leading-relaxed text-fg-muted">
            <p>
              Shua Labs is a New York lab. One founder. Ten AI specialists with
              named jobs. A constitution on GitHub. That is the company.
            </p>
            <p>
              We do not invent customers, traction, or revenue so the story has
              something to eat. Empty is valid. A kill with evidence is success.
            </p>
            <p>
              Building in the open means publishing the work and the rules — not
              leaking the private operating system, and not performing a community
              that does not exist yet.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/watch" className="btn-primary">
              Watch the build
            </Link>
            <a href={`mailto:${site.founder.email}`} className="btn-secondary">
              Get in touch
            </a>
          </div>
        </div>
      </main>
      <FooterSite />
    </>
  );
}
