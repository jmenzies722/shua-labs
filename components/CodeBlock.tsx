"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
  className?: string;
}

/**
 * Code block. Square hairline box, no syntax highlighting.
 *
 * Highlighting is deliberately absent: it would introduce the only colour on
 * the site, and these snippets are read for shape rather than parsed line by
 * line.
 */
export function CodeBlock({
  code,
  language,
  caption,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Copy is non-critical — fail silently rather than throwing a dialog.
    }
  }, [code]);

  return (
    <figure className={cn("group/codeblock", className)}>
      {caption && (
        <figcaption className="mb-2 flex items-center gap-2 font-mono text-[11px] text-fg-faint">
          {language && (
            <span className="border border-line px-1.5 py-0.5 uppercase tracking-[0.1em]">
              {language}
            </span>
          )}
          <span>{caption}</span>
        </figcaption>
      )}

      <div className="relative overflow-hidden border border-line bg-bg-panel">
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute right-2.5 top-2.5 inline-flex h-7 items-center gap-1.5 border border-line bg-bg px-2.5 font-mono text-[11px] text-fg-muted transition-colors duration-200 hover:border-line-hi hover:text-fg"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" aria-hidden="true" />
              copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              copy
            </>
          )}
        </button>

        <pre className="overflow-x-auto p-4 pr-24 font-mono text-[12.5px] leading-[1.7] text-fg/90">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
