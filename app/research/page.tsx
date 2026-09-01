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
          <p className="label-text mb-2">Notes</p>
          <h1 className="display-section mb-2">Research</h1>
          <p className="body-lg mb-8">
            Technical explorations, process notes, and venture theses. Scaffold entries are marked.
          </p>

          <ul className="grid gap-4 sm:grid-cols-2">
            {research.map((r) => (
              <li
                key={r.id}
                className="surface-panel p-5 transition-[transform,border-color] duration-500 ease-smooth hover:-translate-y-0.5 hover:border-line-strong"
              >
                <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  <span>{r.status}</span>
                  <span aria-hidden>·</span>
                  <span>{r.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={r.date}>{formatDateStamp(r.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{r.readingTime}</span>
                  {r.placeholder ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>Placeholder</span>
                    </>
                  ) : null}
                </div>
                <Link
                  href={`/research/${r.slug}`}
                  className="mt-3 block font-display text-[18px] font-semibold tracking-tight text-fg hover:opacity-80"
                >
                  {r.title}
                </Link>
                <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{r.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
