import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Puzzle } from "lucide-react";

import { CatalogTable } from "@/components/hub/CatalogTable";
import { TopNav } from "@/components/site/TopNav";
import { catalog, catalogSections } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalog — Shua Labs",
  description:
    "Products, open-source tooling, and engagements for teams putting AI agents into production.",
};

/**
 * The shelf.
 *
 * Split out from the brand page because the two answer different questions. An employer wants
 * evidence; a buyer wants stock and a price. Forcing both onto one page makes each worse.
 *
 * Reading order stays: buy it → take it free → have it built. Cheapest commitment first.
 */
export default function CatalogPage() {
  const sections = catalogSections();
  const items = catalog();
  const buyable = items.filter((i) => i.checkoutUrl).length;

  return (
    <>
      <TopNav />
      <div>
        <main className="mx-auto max-w-[1020px] px-[clamp(24px,4vw,52px)] pb-[clamp(76px,10vw,116px)] pt-[clamp(48px,7vw,84px)]">
          <header>
            <h1 className="grad-brand-text font-display text-[clamp(32px,4.8vw,52px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Catalog
            </h1>
            <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.65] text-fg-muted">
              Everything here started as something I needed. The open-source tools are the proof,
              the products are those tools packaged so you can run them without me, and the
              engagements are the same work done for you.
            </p>
          </header>

          {/* Page properties, Notion-style. */}
          <dl className="mt-6 flex flex-col gap-1 border-b border-line pb-6">
            {sections.map((section) => (
              <div key={section.kind} className="flex items-center gap-3 text-[14px]">
                <dt className="w-[130px] shrink-0 text-fg-subtle">{section.label}</dt>
                <dd className="text-fg">{section.items.length}</dd>
              </div>
            ))}
            <div className="flex items-center gap-3 text-[14px]">
              <dt className="w-[130px] shrink-0 text-fg-subtle">Buyable now</dt>
              <dd className={buyable > 0 ? "text-fg" : "text-fg-muted"}>
                {buyable > 0 ? buyable : "None — checkout opening soon"}
              </dd>
            </div>
          </dl>

          {sections.map((section) => (
            <section key={section.kind} id={section.kind} className="mt-12 scroll-mt-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-fg">
                  {section.label}
                </h2>
                <p className="text-[13px] text-fg-subtle">{section.blurb}</p>
              </div>
              <div className="mt-3">
                <CatalogTable items={section.items} />
              </div>
            </section>
          ))}

          <aside className="mt-12 flex gap-3 rounded-lg border border-line bg-bg-panel p-4">
            <Puzzle className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" strokeWidth={1.75} aria-hidden />
            <p className="text-[15px] leading-relaxed text-fg-muted">
              Every agent, MCP server, and harness tool behind this work is listed in{" "}
              <Link href="/registry" className="text-accent underline underline-offset-2">
                the registry
              </Link>{" "}
              — what it does, what it costs to run, and whether it can write to disk.
            </p>
          </aside>
        </main>
      </div>

      {buyable > 0 ? (
        <Script src="https://assets.lemonsqueezy.com/lemon.js" strategy="lazyOnload" />
      ) : null}
    </>
  );
}
