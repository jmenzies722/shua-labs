import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Puzzle } from "lucide-react";

import { CatalogTable } from "@/components/hub/CatalogTable";
import { PageHeader, SectionHead } from "@/components/site/PageHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { catalog, catalogSections } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Products, open-source tooling, and engagements for teams putting AI agents into production.",
};

/** Same shell, same header, same cards as every other tab. */
export default function CatalogPage() {
  const sections = catalogSections();
  const items = catalog();
  const buyable = items.filter((i) => i.checkoutUrl).length;

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-[1120px] px-6">
        <PageHeader
          eyebrow="Shua Labs · Catalog"
          title="Everything here started as something I needed."
          description="The open-source tools are the proof, the products are those tools packaged so you can run them without me, and the engagements are the same work done for you."
          stats={[
            ...sections.map((s) => ({ value: s.items.length, label: s.label })),
            { value: buyable > 0 ? buyable : "—", label: "Buyable now" },
          ]}
        />

        {sections.map((section) => (
          <section key={section.kind} id={section.kind} className="reveal scroll-mt-20 pb-16">
            <SectionHead title={section.label} note={section.blurb} />
            <CatalogTable items={section.items} />
          </section>
        ))}

        <section className="reveal pb-28">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-bg-panel p-6">
            <Puzzle className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" strokeWidth={1.75} aria-hidden />
            <p className="text-[15px] leading-[1.6] text-fg-muted">
              Every agent, MCP server, and harness tool behind this work is listed in{" "}
              <Link href="/registry" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                the registry
              </Link>{" "}
              — what it does, what it costs to run, and whether it can write to disk.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />

      {buyable > 0 ? (
        <Script src="https://assets.lemonsqueezy.com/lemon.js" strategy="lazyOnload" />
      ) : null}
    </>
  );
}
