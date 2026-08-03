import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import {
  AvailabilityBadge,
  ChipList,
  KindBadge,
  ReadOnlyBadge,
} from "@/components/registry/RegistryBadges";
import { allEntries, bySlug, paragraphs } from "@/lib/registry";

export function generateStaticParams() {
  return allEntries().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const entry = bySlug(params.slug);
  if (!entry) return { title: "Not found — Shua Labs" };

  return {
    title: `${entry.name} — Shua Labs Registry`,
    description: entry.summary,
    openGraph: {
      title: `${entry.name} — Shua Labs Registry`,
      description: entry.summary,
      type: "article",
    },
  };
}

function Facts({ rows }: { rows: [string, string][] }) {
  if (rows.length === 0) return null;
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div key={k} className="bg-bg-panel px-5 py-3.5">
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-fg-subtle">
            {k}
          </dt>
          <dd className="mt-1 font-mono text-[13.5px] text-fg">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function RegistryEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = bySlug(params.slug);
  if (!entry) notFound();

  const facts: [string, string][] = [];
  if (entry.version) facts.push(["Version", entry.version]);
  if (entry.model) facts.push(["Model", entry.model]);
  if (entry.costClass) facts.push(["Cost class", entry.costClass]);
  if (entry.domain) facts.push(["Domain", entry.domain]);
  if (entry.language) facts.push(["Language", entry.language]);
  if (entry.toolCount) facts.push(["Tools exposed", String(entry.toolCount)]);
  if (entry.handsOffTo?.length)
    facts.push(["Hands off to", entry.handsOffTo.join(", ")]);

  return (
    <article className="container py-14 md:py-20">
      <Link
        href="/registry"
        className="inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-subtle transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fg rounded-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Registry
      </Link>

      <header className="mt-6 max-w-3xl">
        <h1 className="font-mono text-3xl font-semibold tracking-[-0.03em] text-fg md:text-5xl">
          {entry.name}
        </h1>
        <p className="mt-4 text-[18px] leading-[1.5] text-fg-muted">
          {entry.summary}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <KindBadge kind={entry.kind} />
          <AvailabilityBadge availability={entry.availability} />
          {entry.readOnly && <ReadOnlyBadge />}
        </div>
      </header>

      {facts.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <Facts rows={facts} />
        </div>
      )}

      {/* Agents publish only their `role`, so description === summary for them —
          rendering both would just repeat the line under the title. Servers and
          tools have genuinely longer hand-written copy. */}
      {entry.description !== entry.summary && (
        <div className="mt-10 max-w-2xl space-y-4">
          {paragraphs(entry.description).map((p, i) => (
            <p key={i} className="text-[16.5px] leading-[1.6] text-fg-muted">
              {p}
            </p>
          ))}
        </div>
      )}

      {entry.capabilities && entry.capabilities.length > 0 && (
        <section className="mt-10 max-w-3xl">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.13em] text-fg-subtle">
            Capabilities
          </h2>
          <ChipList items={entry.capabilities} className="mt-3" />
        </section>
      )}

      {entry.tools && entry.tools.length > 0 && (
        <section className="mt-8 max-w-3xl">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.13em] text-fg-subtle">
            Tool scope
          </h2>
          <ChipList items={entry.tools} className="mt-3" />
          {entry.readOnly && (
            <p className="mt-3 max-w-xl text-[13.5px] leading-[1.5] text-fg-subtle">
              No Edit or Write tools, by design. A verifier that can rewrite what
              it verifies is not a verifier. The registry validator fails the
              build if a write tool is ever granted here.
            </p>
          )}
        </section>
      )}

      {/* HONESTY RULE: rendered only when `install` exists, which is only ever
          set on genuinely public, genuinely working entries. */}
      {entry.install && (
        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-fg">
            {entry.install.label}
          </h2>
          <CodeBlock
            className="mt-4"
            code={entry.install.code}
            language="bash"
          />
        </section>
      )}

      {!entry.install && entry.availability === "private" && (
        <section className="mt-12 max-w-2xl rounded-2xl border border-line bg-bg-panel p-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-subtle">
            Not distributed
          </p>
          <p className="mt-2 text-[14.5px] leading-[1.55] text-fg-muted">
            Catalogued here for completeness, not for download. This one encodes
            personal context and machine-specific paths, so it is listed without
            an install command rather than shown as something you can fetch.
          </p>
        </section>
      )}

      {entry.notes && (
        <section className="mt-8 max-w-2xl rounded-2xl border-l-2 border-line-hi bg-white/[0.03] px-5 py-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg">
            Why it is built this way
          </p>
          <p className="mt-2 text-[14.5px] leading-[1.55] text-fg-muted">
            {entry.notes}
          </p>
        </section>
      )}

      {entry.links && entry.links.length > 0 && (
        <section className="mt-10 max-w-3xl border-t border-line pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {entry.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[14px] text-fg underline underline-offset-4 transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fg rounded-sm"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
