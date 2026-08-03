import Link from "next/link";
import { RegistryCard } from "@/components/registry/RegistryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TermLink } from "@/components/TermLink";
import { bySlug, registryCounts } from "@/lib/registry";

/**
 * Homepage band pointing at /registry.
 *
 * Shows one of each kind — an agent, a server, a tool — because the point is
 * that the registry holds three different KINDS of thing, not that it holds
 * many things.
 */
export function RegistryTeaser() {
  const counts = registryCounts();
  const featured = ["ward", "mcp-sync", "shua-brain"]
    .map(bySlug)
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <section id="registry" className="term-section border-t border-line">
      <div className="container max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="registry"
            title={
              <>
                The tooling behind it,{" "}
                <span className="text-fg-subtle">catalogued.</span>
              </>
            }
            lead={`${counts.agents} agents, ${counts.servers} MCP servers, and ${counts.tools} tools that stop them silently rotting. Agent entries are generated from the registry file on the machine that runs them, so this page cannot drift from reality.`}
            className="max-w-2xl flex-1"
          />

          <TermLink href="/registry" className="shrink-0 font-mono text-[13px]">
            browse the registry
          </TermLink>
        </div>

        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => (
            <li key={entry.slug} className="bg-bg">
              <RegistryCard entry={entry} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
