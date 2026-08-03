"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  complete,
  runCommand,
  type ConsoleLine,
} from "@/lib/console-commands";

const BANNER: ConsoleLine[] = [
  { text: "shua labs console", tone: "strong" },
  { text: "every answer here is read from the same data the page renders.", tone: "dim" },
  { text: "type `help` to start.", tone: "dim" },
  { text: "" },
];

interface Block {
  input?: string;
  lines: ConsoleLine[];
}

/**
 * Full-screen console.
 *
 * Opens on `~` or the nav button, closes on Escape. Commands resolve through
 * lib/console-commands against live data — this is a second view of the site's
 * own dataset rather than a scripted demo, which is the only version worth
 * showing to someone evaluating whether you can build things.
 */
export function Console({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [blocks, setBlocks] = React.useState<Block[]>([{ lines: BANNER }]);
  const [value, setValue] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Focus on open; lock the page behind it.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  // Keep the newest output in view.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [blocks]);

  const submit = React.useCallback(() => {
    const input = value;
    const result = runCommand(input);

    if (result.clear) {
      setBlocks([]);
    } else {
      setBlocks((b) => [...b, { input, lines: result.lines }]);
    }

    if (input.trim()) {
      setHistory((h) => [...h, input.trim()]);
    }
    setHistoryIndex(null);
    setValue("");

    if (result.close) onClose();
    if (result.navigate) {
      onClose();
      router.push(result.navigate);
    }
  }, [value, onClose, router]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setValue((v) => complete(v));
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        const next =
          historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(next);
        setValue(history[next]);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === null) return;
        const next = historyIndex + 1;
        if (next >= history.length) {
          setHistoryIndex(null);
          setValue("");
        } else {
          setHistoryIndex(next);
          setValue(history[next]);
        }
      }
    },
    [submit, history, historyIndex, onClose]
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Console"
      className="term-scanlines fixed inset-0 z-[60] flex flex-col bg-black/97 animate-fade-in backdrop-blur-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[11px] tracking-[0.12em] text-fg-subtle">
          shua@labs — console
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[11px] text-fg-subtle transition-colors hover:text-fg"
        >
          [ esc to close ]
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          {blocks.map((b, i) => (
            <div key={i} className="mb-4 last:mb-0">
              {b.input !== undefined && (
                <div className="font-mono text-[13px] text-fg">
                  <span className="text-fg-faint">$ </span>
                  {b.input}
                </div>
              )}
              {b.lines.map((l, j) => (
                <pre
                  key={j}
                  className={cn(
                    "whitespace-pre-wrap font-mono text-[13px] leading-[1.75]",
                    l.tone === "dim" && "text-fg-subtle",
                    l.tone === "strong" && "font-semibold text-fg",
                    !l.tone && "text-fg-muted"
                  )}
                >
                  {l.text === "" ? " " : l.text}
                </pre>
              ))}
            </div>
          ))}

          {/* Prompt */}
          <div className="flex items-center font-mono text-[13px]">
            <span className="text-fg-faint">$&nbsp;</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Console input"
              className="flex-1 bg-transparent text-fg caret-transparent outline-none"
            />
            <span className="term-cursor -ml-[0.58em]" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Opens the console on `~` from anywhere on the page. */
export function useConsoleHotkey(onOpen: () => void) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (typing) return;
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);
}
