import type { Metadata } from "next";
import { RegistryCard } from "@/components/registry/RegistryCard";
import { PageHeader, SectionHead } from "@/components/site/PageHeader";
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
    <div className="mx-auto max-w-[1120px] px-6">
      <PageHeader
        eyebrow="Shua Labs · Registry"
        title="The catalogue, and the checks that keep it true."
        description="Most AI setups are a folder of prompts nobody has looked at in months. This is the same thing with a manifest, a validator, and a health check."
        stats={stats.map((s) => ({ value: s.n, label: s.l }))}
      />


      <section className="reveal rounded-2xl border border-line bg-bg-panel p-7">
        <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
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
          <section key={kind} className="reveal mt-16 scroll-mt-20" id={kind}>
            <div className="mb-7 text-center">
              <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-fg">
                {meta.plural} <span className="text-fg-subtle">{entries.length}</span>
              </h2>
              <p className="mx-auto mt-2 max-w-[56ch] text-[15px] text-fg-muted">
                {meta.blurb}
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <RegistryCard entry={entry} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="reveal mt-20 pb-28">
        <p className="mx-auto max-w-[64ch] text-center text-[15px] leading-[1.6] text-fg-subtle">
          Agent entries on this page are generated from the registry file on the
          machine that runs them, and CI fails if the two fall out of step. The
          site cannot claim something the registry no longer says.
        </p>
      </section>
    </div>
  );
}
