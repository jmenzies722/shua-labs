import { ArrowUpRight, Handshake, Package, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RowIcon } from "@/components/hub/PageIcon";

import { KIND_COLORS, Tag } from "@/components/hub/Tag";
import type { CatalogItem } from "@/lib/types";

/**
 * A Notion inline database, table view.
 *
 * Column headers in small grey caps, hairline rows, the whole row a hover target, and the
 * primary column carrying an emoji. Notion tables have no vertical rules and no zebra striping —
 * the eye tracks on row hover alone, which is why the hover state has to be present and quiet.
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
    return (
      <p className="px-2 py-3 text-[14px] text-fg-subtle">
        No items yet. <span className="text-fg-muted">Count: 0</span>
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <Th className="w-[42%]">Name</Th>
            <Th className="w-[14%]">Type</Th>
            <Th className="w-[16%]">Status</Th>
            <Th className="w-[14%] text-right">Price</Th>
            <Th className="w-[14%]" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const href = item.checkoutUrl ?? item.href;
            const isBuy = Boolean(item.checkoutUrl);
            return (
              <tr key={item.id} className="group border-b border-line hover:bg-bg-panel">
                <td className="px-2 py-2.5 align-top">
                  <div className="flex items-start gap-2">
                    <span className="mt-[1px]">
                      <RowIcon icon={KIND_ICON[item.kind]} label={KIND_LABEL[item.kind]} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-fg">{item.name}</div>
                      <div className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-fg-muted">
                        {item.oneLiner}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2.5 align-top">
                  <Tag color={KIND_COLORS[item.kind]}>{KIND_LABEL[item.kind]}</Tag>
                </td>
                <td className="px-2 py-2.5 align-top">
                  <Tag color={item.available ? "green" : "gray"}>{item.status}</Tag>
                </td>
                <td className="px-2 py-2.5 text-right align-top">
                  <span className="text-[14px] tabular-nums text-fg">{item.priceLabel}</span>
                </td>
                <td className="px-2 py-2.5 align-top">
                  {href ? (
                    <a
                      href={href}
                      className={`inline-flex items-center gap-1 text-[13px] text-accent opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 ${
                        isBuy ? "lemonsqueezy-button" : ""
                      }`}
                    >
                      {isBuy ? "Buy" : item.kind === "engagement" ? "Enquire" : "Open"}
                      {!isBuy ? <ArrowUpRight className="h-3 w-3" aria-hidden /> : null}
                    </a>
                  ) : (
                    <span className="text-[13px] text-fg-subtle">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="px-2 py-2 text-[13px] text-fg-subtle">Count {items.length}</p>
    </div>
  );
}

function Th({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-2 pb-2 text-[12px] font-normal text-fg-subtle ${className}`}
      scope="col"
    >
      {children}
    </th>
  );
}
