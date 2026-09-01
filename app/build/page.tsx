import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { getBuildFeed } from "@/lib/build-feed";
import { GITHUB_LAB_REPO } from "@/lib/github-commits";
import { formatDateStamp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Build Log",
  description:
    "Engineering changelog and founder notebook for Shua Labs — curated notes plus live GitHub commits.",
  alternates: { canonical: "/build" },
};

export const revalidate = 300;

export default async function BuildLogPage() {
  const feed = await getBuildFeed();

  return (
    <PageShell>
      <section className="section-pad border-b border-line">
        <div className="site-shell">
          <p className="label-text mb-2">Changelog</p>
          <h1 className="display-section mb-2">Build log</h1>
          <p className="body-lg mb-3">
            Curated lab notes plus recent commits from{" "}
            <a
              href={`https://github.com/${GITHUB_LAB_REPO.owner}/${GITHUB_LAB_REPO.repo}`}
              className="text-fg underline-offset-2 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              {GITHUB_LAB_REPO.owner}/{GITHUB_LAB_REPO.repo}
            </a>
            . Refreshes every few minutes.
          </p>
          <p className="mb-8 text-[13px] text-fg-subtle">
            Manual entries keep a founder notebook voice. GitHub rows are the raw shipping trail.
          </p>

          <ol className="divide-y divide-line overflow-hidden rounded-md border border-line">
            {feed.map((e) => (
              <li
                key={e.id}
                className="notion-row grid gap-1 px-4 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:px-5"
              >
                <time dateTime={e.date} className="text-[12px] text-fg-subtle">
                  {formatDateStamp(e.date)}
                </time>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] text-fg-subtle">
                    <span className="rounded bg-bg-panel px-1.5 py-0.5">
                      {e.source === "github" ? "GitHub" : "Lab note"}
                    </span>
                    {e.sha ? <span>{e.sha}</span> : null}
                    {e.tags.length ? <span>· {e.tags.join(" · ")}</span> : null}
                  </div>
                  {e.source === "github" && e.commitUrl ? (
                    <a
                      href={e.commitUrl}
                      className="text-[18px] font-semibold tracking-tight text-fg hover:underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {e.title}
                    </a>
                  ) : (
                    <Link
                      href={`/build/${e.slug}`}
                      className="text-[18px] font-semibold tracking-tight text-fg hover:underline"
                    >
                      {e.title}
                    </Link>
                  )}
                  <p className="mt-1 max-w-2xl text-[14px] text-fg-muted">{e.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
