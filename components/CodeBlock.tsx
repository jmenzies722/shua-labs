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
 * Apple-quiet code block. SF Mono on #161617, copy affordance top-right.
 * No syntax highlighting — reads as a snippet, not a feature.
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
      // Silently fail — copy is non-critical.
    }
  }, [code]);

  return (
    <figure className={cn("group/codeblock", className)}>
      {caption && (
        <figcaption className="mb-2 flex items-center gap-2 text-[12px] font-mono text-fg-subtle">
          {language && (
            <span className="rounded-sm bg-white/[0.05] px-1.5 py-0.5">
              {language}
            </span>
          )}
          <span>{caption}</span>
        </figcaption>
      )}
      <div className="relative overflow-hidden rounded-xl border border-line bg-bg-raised">
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute right-3 top-3 inline-flex h-8 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-[12px] font-medium text-fg-muted transition-colors duration-200 hover:bg-white/[0.1] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
        <pre className="overflow-x-auto p-5 pr-20 text-[13px] leading-[1.6] font-mono text-fg/90">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
