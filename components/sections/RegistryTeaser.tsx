import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistryCard } from "@/components/registry/RegistryCard";
import { bySlug, registryCounts } from "@/lib/registry";

/**
 * Homepage band pointing at /registry.
 *
 * Shows one of each kind — an agent, a server, a tool — because the point being
 * made is that the registry holds three different KINDS of thing, not that it
 * holds many things.
 */
export function RegistryTeaser() {
  const counts = registryCounts();
  const featured = ["ward", "mcp-sync", "shua-brain"]
    .map(bySlug)
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <section id="registry" className="border-t border-line py-20 md:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
              Registry
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-fg md:text-5xl">
              Everything, catalogued —
              <br />
              and checked.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.5] text-fg-muted">
              {counts.agents} agents, {counts.servers} MCP servers, and{" "}
              {counts.tools} tools that stop them silently rotting. Agent entries
              are generated from the registry file on the machine that runs them,
              so this page cannot drift from reality.
            </p>
          </div>

          <Link href="/registry" className="shrink-0">
            <Button size="sm" variant="primary">
              Browse the registry
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => (
            <li key={entry.slug}>
              <RegistryCard entry={entry} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
