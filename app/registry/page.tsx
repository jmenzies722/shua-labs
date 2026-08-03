import type { Metadata } from "next";
import { RegistryCard } from "@/components/registry/RegistryCard";
import { KIND_META, KIND_ORDER, byKind, registryCounts } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Registry — Shua Labs",
  description:
    "Agents, MCP servers, and the tooling that stops them silently rotting. Catalogued, versioned, and validated on every push.",
  openGraph: {
    title: "Registry — Shua Labs",
    description:
      "Agents, MCP servers, and the tooling that stops them silently rotting.",
    type: "website",
  },
};

export default function RegistryPage() {
  const counts = registryCounts();

  const stats = [
    { n: counts.agents, l: "agents" },
    { n: counts.servers, l: "MCP servers" },
    { n: counts.tools, l: "harness tools" },
    { n: counts.open, l: "public" },
  ];

  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
          Shua Labs · Registry
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl">
          The catalogue, and the
          <br />
          checks that keep it true.
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.5] text-fg-muted">
          Most AI setups are a folder of prompts nobody has looked at in months.
          This is the same thing with a manifest, a validator, and a health check
          — so when it breaks, something says so.
        </p>
      </header>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="bg-bg-panel px-5 py-4">
            <dt className="sr-only">{s.l}</dt>
            <dd>
              <span className="block font-mono text-[26px] font-semibold tabular-nums tracking-tight text-fg">
                {s.n}
              </span>
              <span className="mt-0.5 block text-[12.5px] text-fg-subtle">
                {s.l}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-10 rounded-2xl border border-line bg-bg-panel p-6 md:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-fg-subtle">
          The problem this exists for
        </p>
        <p className="mt-3 max-w-3xl text-[16px] leading-[1.55] text-fg-muted">
          <strong className="font-semibold text-fg">
            AI dev configuration rots silently.
          </strong>{" "}
          Model IDs go stale. MCP servers die. Environment variables get
          referenced but never exported. None of it raises an error you would
          notice — you find out weeks later, if ever. A single audit of this
          machine turned up 24 definitions pinned to a dead model generation, a
          server that had been down for weeks, two editors wired to a variable
          nobody had ever set, and a live credential in plaintext.
        </p>
      </section>

      {KIND_ORDER.map((kind) => {
        const entries = byKind(kind);
        if (entries.length === 0) return null;
        const meta = KIND_META[kind];

        return (
          <section key={kind} className="mt-16" id={kind}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-fg">
                {meta.plural}
              </h2>
              <span className="font-mono text-[12px] tabular-nums text-fg-subtle">
                {entries.length}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-[1.5] text-fg-muted">
              {meta.blurb}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <RegistryCard entry={entry} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-20 border-t border-line pt-8">
        <p className="max-w-2xl text-[14.5px] leading-[1.55] text-fg-subtle">
          Agent entries on this page are generated from the registry file on the
          machine that runs them, and CI fails if the two fall out of step. The
          site cannot claim something the registry no longer says.
        </p>
      </section>
    </div>
  );
}
