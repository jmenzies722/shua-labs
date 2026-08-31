import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getResearch, research } from "@/content/research";
import { siteMeta } from "@/content/social";
import { formatDateStamp } from "@/lib/utils";

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const entry = getResearch(params.slug);
  if (!entry) return { title: "Not found" };
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/research/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: "article",
      publishedTime: entry.date,
    },
  };
}

export default function ResearchEntryPage({ params }: { params: { slug: string } }) {
  const entry = getResearch(params.slug);
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
          <p className="label-text mb-4">Research · {entry.status}</p>
          <div className="mb-4 flex flex-wrap gap-3 font-mono text-[11px] text-fg-subtle">
            <time dateTime={entry.date}>{formatDateStamp(entry.date)}</time>
            <span>·</span>
            <span>{entry.readingTime}</span>
            <span>·</span>
            <span>{entry.category}</span>
          </div>
          <h1 className="display-section mb-6">{entry.title}</h1>
          <p className="body-lg mb-10">{entry.summary}</p>

          <div className="prose-lab space-y-5 border-t border-line pt-8 text-[16px] leading-[1.7] text-fg-muted">
            {entry.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <Link href="/research" className="mt-12 inline-block text-[13px] text-fg-muted hover:text-fg">
            ← All research
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
