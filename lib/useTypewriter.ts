"use client";

import * as React from "react";

export interface TypedLine {
  /** Rendered text. */
  text: string;
  /** Dim the line — used for output rows versus the typed command. */
  dim?: boolean;
  /** Render the "$ " prompt glyph before the text and type it character by character. */
  prompt?: boolean;
  /** Extra pause in ms after this line lands. */
  pauseAfter?: number;
}

interface Options {
  /** ms per character for prompt lines. */
  charMs?: number;
  /** ms between non-typed output lines. */
  lineMs?: number;
  /** Skip all animation and show the finished state immediately. */
  instant?: boolean;
}

interface State {
  /** Lines fully rendered so far, plus the partially typed one at the end. */
  visible: { text: string; dim?: boolean; prompt?: boolean }[];
  /** True once every line has landed. */
  done: boolean;
}

/**
 * Drives the hero boot sequence.
 *
 * Prompt lines type character by character; output lines appear whole, which is
 * how a real shell behaves — you type the command, the program prints the
 * result. Typing the output too would read as a chat UI, not a terminal.
 *
 * Under `instant` (reduced motion, or a re-mount) it jumps straight to the
 * finished frame rather than animating faster. A sped-up animation still moves,
 * which is the thing the preference is asking you not to do.
 */
export function useTypewriter(lines: TypedLine[], opts: Options = {}): State {
  const { charMs = 26, lineMs = 130, instant = false } = opts;

  const finished = React.useMemo<State>(
    () => ({
      visible: lines.map((l) => ({
        text: l.text,
        dim: l.dim,
        prompt: l.prompt,
      })),
      done: true,
    }),
    [lines]
  );

  const [state, setState] = React.useState<State>(() =>
    instant ? finished : { visible: [], done: false }
  );

  React.useEffect(() => {
    if (instant) {
      setState(finished);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    async function run() {
      const acc: State["visible"] = [];

      for (const line of lines) {
        if (cancelled) return;

        if (line.prompt) {
          acc.push({ text: "", dim: line.dim, prompt: true });
          const index = acc.length - 1;
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return;
            acc[index] = {
              text: line.text.slice(0, i),
              dim: line.dim,
              prompt: true,
            };
            setState({ visible: [...acc], done: false });
            await wait(charMs);
          }
        } else {
          acc.push({ text: line.text, dim: line.dim });
          setState({ visible: [...acc], done: false });
          await wait(lineMs);
        }

        if (line.pauseAfter) await wait(line.pauseAfter);
      }

      if (!cancelled) setState({ visible: [...acc], done: true });
    }

    void run();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [lines, charMs, lineMs, instant, finished]);

  return state;
}
