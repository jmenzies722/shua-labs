import { PRODUCT_STAGES } from "@/lib/types";
import type { Product, ProductStatus } from "@/lib/types";

/**
 * The pipeline view. Private — this is the half of the hub nobody else sees.
 *
 * It answers one question the public shelf cannot: what is stuck. A product sitting at
 * `building` for 60 days is the single most useful thing this page can tell you, and it is
 * invisible on a storefront that only shows finished goods.
 */

const STAGE_LABELS: Record<ProductStatus, string> = {
  idea: "Idea",
  validated: "Validated",
  building: "Building",
  packaged: "Packaged",
  priced: "Priced",
  live: "Live",
  retired: "Retired",
};

/** Days after which a stage is worth flagging. Packaging and pricing should be fast; building
 *  legitimately takes a while; an idea that sits unvalidated for a month is a decision avoided. */
const STALE_AFTER: Record<ProductStatus, number> = {
  idea: 30,
  validated: 21,
  building: 60,
  packaged: 14,
  priced: 7,
  live: Number.POSITIVE_INFINITY,
  retired: Number.POSITIVE_INFINITY,
};

function daysSince(iso?: string): number | null {
  if (!iso) return null;
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return null;
  return Math.floor((Date.now() - then) / 86_400_000);
}

export function Pipeline({ products }: { products: Product[] }) {
  const active = products.filter((p) => p.status !== "retired");

  if (active.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-bg-panel p-8">
        <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-fg">
          Nothing in the pipeline
        </h2>
        <p className="mt-3 max-w-[44rem] text-[15px] leading-relaxed text-fg-muted">
          Run <code className="font-mono text-[13px] text-fg">/pipeline new</code> to put an idea
          in. It walks idea → validated → building → packaged → priced → live, and writes back
          here at every stage.
        </p>
      </div>
    );
  }

  const counts = PRODUCT_STAGES.map((stage) => ({
    stage,
    count: active.filter((p) => p.status === stage).length,
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Stage counters — where the work is piled up. */}
      <ol className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-6">
        {counts.map(({ stage, count }) => (
          <li key={stage} className="bg-bg-panel px-4 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
              {STAGE_LABELS[stage]}
            </p>
            <p
              className={`mt-1 font-mono text-[24px] font-semibold tabular-nums ${
                count > 0 ? "text-fg" : "text-fg-subtle"
              }`}
            >
              {count}
            </p>
          </li>
        ))}
      </ol>

      {/* The records themselves, most-stalled first — the reason to open this page. */}
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bg-panel">
        {[...active]
          .sort((a, b) => (daysSince(b.stageSince) ?? 0) - (daysSince(a.stageSince) ?? 0))
          .map((product) => {
            const days = daysSince(product.stageSince);
            const stale = days !== null && days > STALE_AFTER[product.status];
            return (
              <li key={product.slug} className="flex flex-col gap-2 px-5 py-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                    {STAGE_LABELS[product.status]}
                  </span>
                  <span className="text-[16px] font-medium text-fg">{product.name}</span>
                  {product.verdict ? (
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                        product.verdict === "NO-GO" ? "text-amber-400" : "text-tier-free"
                      }`}
                    >
                      {product.verdict}
                    </span>
                  ) : null}
                  {days !== null ? (
                    <span
                      className={`ml-auto font-mono text-[11px] tabular-nums ${
                        stale ? "text-amber-400" : "text-fg-subtle"
                      }`}
                    >
                      {days}d in stage{stale ? " · stalled" : ""}
                    </span>
                  ) : null}
                </div>
                <p className="text-[14px] leading-snug text-fg-muted">{product.tagline}</p>
                {product.nextAction ? (
                  <p className="text-[13px] text-fg-subtle">
                    <span className="font-mono uppercase tracking-[0.08em]">next</span>{" "}
                    {product.nextAction}
                  </p>
                ) : null}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
