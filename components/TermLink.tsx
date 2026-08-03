import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Text link with a trailing arrow that nudges right on hover.
 *
 * The underline carries the affordance rather than colour. In a monochrome
 * palette a coloured link is not available, and dropping the underline too
 * would leave nothing at all distinguishing a link from body text.
 */
export interface TermLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  external?: boolean;
}

export const TermLink = React.forwardRef<HTMLAnchorElement, TermLinkProps>(
  ({ href, external, className, children, ...rest }, ref) => {
    const isExternal = external ?? /^https?:\/\//.test(href);
    const glyph = isExternal ? "↗" : "→";

    const inner = (
      <>
        {children}
        <span className="arrow" aria-hidden>
          {glyph}
        </span>
      </>
    );

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={cn("term-link", className)}
          {...rest}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} ref={ref} className={cn("term-link", className)} {...rest}>
        {inner}
      </Link>
    );
  }
);
TermLink.displayName = "TermLink";
