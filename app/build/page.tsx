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
          <p className="label-text mb-2">Changelog</p>
          <h1 className="display-section mb-2">Build log</h1>
          <p className="body-lg mb-8">
            Halfway between an engineering changelog and a founder’s notebook. Dated work only.
          </p>

          <ol className="divide-y divide-line overflow-hidden rounded-md border border-line">
            {buildLog.map((e) => (
              <li key={e.id} className="notion-row grid gap-1 px-4 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:px-5">
                <time dateTime={e.date} className="text-[12px] text-fg-subtle">
                  {formatDateStamp(e.date)}
                </time>
                <div>
                  <Link
                    href={`/build/${e.slug}`}
                    className="text-[18px] font-semibold tracking-tight text-fg hover:underline"
                  >
                    {e.title}
                  </Link>
                  <p className="mt-1 max-w-2xl text-[14px] text-fg-muted">{e.summary}</p>
                  {e.tags.length ? (
                    <p className="mt-2 text-[12px] text-fg-subtle">{e.tags.join(" · ")}</p>
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
