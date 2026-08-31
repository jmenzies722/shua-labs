import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { buildLog, getBuildEntry } from "@/content/build-log";
import { siteMeta } from "@/content/social";
import { formatDateStamp } from "@/lib/utils";

export function generateStaticParams() {
  return buildLog.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const entry = getBuildEntry(params.slug);
  if (!entry) return { title: "Not found" };
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/build/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: "article",
      publishedTime: entry.date,
    },
  };
}

export default function BuildEntryPage({ params }: { params: { slug: string } }) {
  const entry = getBuildEntry(params.slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    datePublished: entry.date,
    description: entry.summary,
    author: { "@type": "Organization", name: siteMeta.name },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="section-pad border-b border-line">
        <div className="site-shell max-w-3xl">
          <p className="label-text mb-4">Build log</p>
          <time dateTime={entry.date} className="font-mono text-[12px] text-signal">
            {formatDateStamp(entry.date)}
          </time>
          <h1 className="display-section mt-4 mb-6">{entry.title}</h1>
          <p className="body-lg mb-10">{entry.summary}</p>

          <div className="space-y-5 border-t border-line pt-8 text-[15px] leading-relaxed text-fg-muted">
            {entry.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {entry.tags.length ? (
            <p className="mt-10 font-mono text-[11px] tracking-[0.12em] text-fg-subtle">
              {entry.tags.map((t) => t.toUpperCase()).join(" · ")}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-4 text-[13px]">
            {entry.github ? (
              <a href={entry.github} className="text-signal" rel="noreferrer" target="_blank">
                GitHub →
              </a>
            ) : null}
            <Link href="/build" className="text-fg-muted hover:text-fg">
              ← All entries
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
