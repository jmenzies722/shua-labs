import { ArrowUpRight, Handshake, Package, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { CatalogItem } from "@/lib/types";

/**
 * Catalog items as cards, matching the rest of the site.
 *
 * This was a dense Notion-style table, which was the right answer for a different design and
 * the wrong one here — a table reads as a spreadsheet next to the card grids on every other
 * tab. Cards also survive a phone without horizontal scrolling, which the table did not.
 */

const KIND_ICON: Record<string, LucideIcon> = {
  product: Package,
  project: Wrench,
  engagement: Handshake,
};

const KIND_LABEL: Record<string, string> = {
  product: "Product",
  project: "Open source",
  engagement: "Engagement",
};

export function CatalogTable({ items }: { items: CatalogItem[] }) {
  if (items.length === 0) {
    return <p className="text-center text-[15px] text-fg-subtle">Nothing here yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const href = item.checkoutUrl ?? item.href;
        const isBuy = Boolean(item.checkoutUrl);
        const Icon = KIND_ICON[item.kind];

        const body = (
          <>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-bg-raised text-fg-subtle">
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-fg-subtle">{KIND_LABEL[item.kind]}</p>
              </div>
              <span className="shrink-0 text-[15px] font-medium tabular-nums text-fg">
                {item.priceLabel}
              </span>
            </div>

            <p className="mt-4 flex-1 text-[15px] leading-[1.6] text-fg-muted">{item.oneLiner}</p>

            <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span className="rounded-pill bg-bg-raised px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-fg-muted">
                {item.status}
              </span>
              {href ? (
                <span className="ml-auto inline-flex items-center gap-1.5 text-[14px] text-fg-body">
                  {isBuy ? "Buy" : item.kind === "engagement" ? "Enquire" : "Open"}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              ) : (
                <span className="ml-auto text-[14px] text-fg-subtle">Soon</span>
              )}
            </div>
          </>
        );

        const shell =
          "group flex flex-col rounded-2xl border border-line bg-bg-panel p-6 transition-colors";

        if (!href) return <div key={item.id} className={shell}>{body}</div>;

        return (
          <a
            key={item.id}
            href={href}
            className={`${shell} hover:border-line-strong hover:bg-bg-raised ${
              isBuy ? "lemonsqueezy-button" : ""
            }`}
          >
            {body}
          </a>
        );
      })}
    </div>
  );
}
