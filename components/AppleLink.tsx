import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Apple-style text link.
 *
 * Renders an accent-blue link with a trailing chevron (›) glyph that nudges
 * right on hover. Underline appears on hover. The glyph is rendered via the
 * `.apple-link::after` pseudo-element defined in globals.css so it can animate
 * cleanly without an extra DOM node.
 *
 * Use for "View on GitHub", "Learn more", etc. anywhere a quiet inline call-
 * to-action is needed.
 */
export interface AppleLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  external?: boolean;
}

export const AppleLink = React.forwardRef<HTMLAnchorElement, AppleLinkProps>(
  ({ href, external, className, children, ...rest }, ref) => {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={cn("apple-link", className)}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        ref={ref}
        className={cn("apple-link", className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);
AppleLink.displayName = "AppleLink";
