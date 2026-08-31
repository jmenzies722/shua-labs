import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { research } from "@/content/research";
import { formatDateStamp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Market notes, architecture explorations, and venture theses from Shua Labs.",
  alternates: { canonical: "/research" },
};

export default function ResearchIndexPage() {
  return (
    <PageShell>
      <section className="section-pad border-b border-line">
        <div className="site-shell">
          <p className="label-text mb-4">Notes</p>
          <h1 className="display-section mb-4">Research</h1>
          <p className="body-lg mb-12">
            Technical explorations, process notes, and venture theses. Scaffold entries are marked.
          </p>

          <ul className="grid gap-px bg-line sm:grid-cols-2">
            {research.map((r) => (
              <li key={r.id} className="bg-bg p-6 sm:p-7">
                <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.14em] text-fg-subtle">
                  <span className="text-signal">{r.status}</span>
                  <span>·</span>
                  <span>{r.category}</span>
                  <span>·</span>
                  <time dateTime={r.date}>{formatDateStamp(r.date)}</time>
                  <span>·</span>
                  <span>{r.readingTime}</span>
                  {r.placeholder ? (
                    <>
                      <span>·</span>
                      <span>PLACEHOLDER</span>
                    </>
                  ) : null}
                </div>
                <Link
                  href={`/research/${r.slug}`}
                  className="mt-4 block font-display text-2xl font-bold tracking-tight hover:text-signal"
                >
                  {r.title}
                </Link>
                <p className="mt-2 text-[14px] text-fg-muted">{r.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
