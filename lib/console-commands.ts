import { stackLayers } from "@/data/stack";
import { allEntries, registryCounts } from "@/lib/registry";

/**
 * The console command engine.
 *
 * Pure functions over the same data the page renders, deliberately kept out of
 * the React component: every answer the console gives is derived from a real
 * source, so the CLI cannot claim something the page contradicts. It is a
 * second view of one dataset, not a scripted demo.
 */

export interface ConsoleLine {
  text: string;
  tone?: "dim" | "strong";
}

export interface CommandResult {
  lines: ConsoleLine[];
  /** Set when the command should navigate. */
  navigate?: string;
  /** Set when the command clears the buffer. */
  clear?: boolean;
  /** Set when the command closes the console. */
  close?: boolean;
}

const dim = (text: string): ConsoleLine => ({ text, tone: "dim" });
const strong = (text: string): ConsoleLine => ({ text, tone: "strong" });
const plain = (text: string): ConsoleLine => ({ text });
const blank = (): ConsoleLine => ({ text: "" });

/** Two-column layout so output lines up without a table. */
function row(label: string, value: string, width = 16): string {
  return label.padEnd(width) + value;
}

const COMMANDS: {
  name: string;
  args?: string;
  help: string;
  run: (args: string[]) => CommandResult;
}[] = [
  {
    name: "help",
    help: "list every command",
    run: () => ({
      lines: [
        strong("available commands"),
        blank(),
        ...COMMANDS.map((c) =>
          dim(row(`${c.name}${c.args ? " " + c.args : ""}`, c.help, 22))
        ),
        blank(),
        dim("tab completes · ↑/↓ recalls history · esc closes"),
      ],
    }),
  },
  {
    name: "status",
    help: "what's real, right now",
    run: () => {
      const c = registryCounts();
      return {
        lines: [
          strong("registry"),
          dim(row("agents", String(c.agents))),
          dim(row("mcp servers", String(c.servers))),
          dim(row("harness tools", String(c.tools))),
          dim(row("public", String(c.open))),
        ],
      };
    },
  },
  {
    name: "projects",
    help: "everything public right now",
    run: () => {
      const open = allEntries().filter((e) => e.availability === "public");
      return {
        lines: [
          strong(`${open.length} public`),
          blank(),
          ...open.flatMap((e) => [
            plain(row(e.name, e.kind, 28)),
            dim("  " + e.summary),
          ]),
          blank(),
          dim("open <slug> to view a detail page"),
        ],
      };
    },
  },
  {
    name: "registry",
    args: "[--public]",
    help: "agents, servers and tools",
    run: (args) => {
      const onlyPublic = args.includes("--public");
      const entries = allEntries().filter(
        (e) => !onlyPublic || e.availability === "public"
      );
      return {
        lines: [
          strong(`${entries.length} entries${onlyPublic ? " (public only)" : ""}`),
          blank(),
          ...entries.map((e) =>
            dim(
              `${e.name.padEnd(24)}${e.kind.padEnd(8)}${e.availability}`
            )
          ),
        ],
      };
    },
  },
  {
    name: "stack",
    help: "the stack, by architectural layer",
    run: () => ({
      lines: stackLayers.flatMap((l) => [
        strong(l.name),
        dim("  " + l.role),
        ...l.items.map((i) =>
          plain("  " + i.name + (i.note ? dimNote(i.note) : ""))
        ),
        blank(),
      ]),
    }),
  },
  {
    name: "whoami",
    help: "the short version",
    run: () => ({
      lines: [
        strong("Josh Menzies — AI platform engineer, New York"),
        blank(),
        plain("Building the developer-experience and infrastructure layer"),
        plain("underneath AI-assisted engineering teams."),
        blank(),
        dim("github.com/jmenzies722"),
        dim("linkedin.com/in/josh-m01"),
        dim("jmenzies722@gmail.com"),
      ],
    }),
  },
  {
    name: "open",
    args: "<slug>",
    help: "open a registry detail page",
    run: (args) => {
      const slug = args[0];
      if (!slug) return { lines: [dim("usage: open <slug>")] };
      const entry = allEntries().find((e) => e.slug === slug);
      if (!entry) {
        return {
          lines: [
            plain(`no registry entry "${slug}"`),
            dim("run `projects` for the list"),
          ],
        };
      }
      return {
        lines: [dim(`opening /registry/${slug} …`)],
        navigate: `/registry/${slug}`,
      };
    },
  },
  { name: "clear", help: "clear the buffer", run: () => ({ lines: [], clear: true }) },
  { name: "exit", help: "close the console", run: () => ({ lines: [], close: true }) },
];

/** Trailing note rendered inline; kept plain so the whole line stays one tone. */
function dimNote(note: string): string {
  return `  — ${note}`;
}

export const COMMAND_NAMES = COMMANDS.map((c) => c.name);

export function runCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const [name, ...args] = trimmed.split(/\s+/);
  const cmd = COMMANDS.find((c) => c.name === name);

  if (!cmd) {
    return {
      lines: [
        plain(`command not found: ${name}`),
        dim("run `help` for the list"),
      ],
    };
  }
  return cmd.run(args);
}

/** Longest common prefix completion, the way a real shell behaves. */
export function complete(partial: string): string {
  const matches = COMMAND_NAMES.filter((n) => n.startsWith(partial));
  if (matches.length === 0) return partial;
  if (matches.length === 1) return matches[0];
  let prefix = matches[0];
  for (const m of matches) {
    while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}
