import type { LucideIcon } from "lucide-react";

/**
 * The page glyph that replaces Notion's emoji.
 *
 * Emoji carry a vendor's colour palette into a design that has its own, and at 64px they are the
 * loudest thing on a charcoal page. A monochrome icon in a bordered tile stays subordinate to the
 * title, scales cleanly, and does not change appearance between macOS and Windows.
 */
export function PageIcon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-grid h-12 w-12 place-items-center rounded-lg border border-line bg-bg-panel text-fg-muted"
    >
      <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} aria-hidden />
    </span>
  );
}

/** The small inline version used in table rows and list items. */
export function RowIcon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-md border border-line bg-bg-panel text-fg-subtle"
    >
      <Icon className="h-3 w-3" strokeWidth={1.75} aria-hidden />
    </span>
  );
}
