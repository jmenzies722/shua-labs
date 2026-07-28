import type { ReactNode } from "react";

/**
 * Notion's tag pill.
 *
 * Small radius, desaturated background, dark text of the same hue. The restraint is the point:
 * Notion tags read as metadata, not as alerts. Saturated status colours make every row shout
 * and the page becomes unreadable at a glance.
 */

export type TagColor =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

const STYLES: Record<TagColor, string> = {
  gray: "bg-tag-gray text-tag-grayText",
  brown: "bg-tag-brown text-tag-brownText",
  orange: "bg-tag-orange text-tag-orangeText",
  yellow: "bg-tag-yellow text-tag-yellowText",
  green: "bg-tag-green text-tag-greenText",
  blue: "bg-tag-blue text-tag-blueText",
  purple: "bg-tag-purple text-tag-purpleText",
  pink: "bg-tag-pink text-tag-pinkText",
  red: "bg-tag-red text-tag-redText",
};

export function Tag({
  color = "gray",
  children,
}: {
  color?: TagColor;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md px-[7px] py-[2px] text-[12px] font-medium leading-[18px] ${STYLES[color]}`}
    >
      {children}
    </span>
  );
}

/** Stage → colour. Cool for early, warm as it approaches money, green when it's live. */
export const STAGE_COLORS: Record<string, TagColor> = {
  idea: "gray",
  validated: "blue",
  building: "purple",
  packaged: "yellow",
  priced: "orange",
  live: "green",
  retired: "gray",
};

/** Catalog kind → colour. */
export const KIND_COLORS: Record<string, TagColor> = {
  product: "orange",
  project: "blue",
  engagement: "purple",
};
