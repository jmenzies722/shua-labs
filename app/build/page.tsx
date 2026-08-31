import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { buildLog } from "@/content/build-log";
import { formatDateStamp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Build Log",
  description:
    "Engineering changelog and founder notebook for Shua Labs — dated work only.",
  alternates: { canonical: "/build" },
};

export default function BuildLogPage() {
  return (
    <PageShell>
      <section className="section-pad border-b border-line">
        <div className="site-shell">
          <p className="label-text mb-4">Changelog</p>
          <h1 className="display-section mb-4">Build log</h1>
          <p className="body-lg mb-12">
            Halfway between an engineering changelog and a founder’s notebook. Dated work only.
          </p>

          <ol className="divide-y divide-line border-y border-line">
            {buildLog.map((e) => (
              <li key={e.id} className="grid gap-3 py-8 md:grid-cols-[9rem_1fr] md:gap-10">
                <time dateTime={e.date} className="font-mono text-[12px] tracking-wide text-signal">
                  {formatDateStamp(e.date)}
                </time>
                <div>
                  <Link
                    href={`/build/${e.slug}`}
                    className="font-display text-2xl font-bold tracking-tight hover:text-signal"
                  >
                    {e.title}
                  </Link>
                  <p className="mt-2 max-w-2xl text-[15px] text-fg-muted">{e.summary}</p>
                  {e.tags.length ? (
                    <p className="mt-3 font-mono text-[11px] text-fg-subtle">
                      {e.tags.join(" · ")}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
