import type { JourneyEntry } from "@/lib/types";

/**
 * Public changelog. Newest first.
 *
 * HONESTY RULE: real, verifiable milestones only. Dates come from commits, not
 * from memory. An entry may not claim something shipped unless it is public.
 * Entries are never deleted when the strategy changes — a changelog that edits
 * its own past is a brochure. Superseded decisions stay, and the entry that
 * superseded them sits above.
 */
export const journey: JourneyEntry[] = [
  {
    date: "2026-08-04",
    title: "Registry audit — two real tools surfaced, four scaffolds archived",
    detail:
      "A full pass over every GitHub repo found claude-max and claude-setup — public, installable, on-brand — sitting unlisted. Both are on the registry now. platform-eng-lab, helix-platform, agentlint, and luminatra got archived instead of featured; archiving is reversible, nothing was deleted.",
  },
  {
    date: "2026-08-03",
    title: "Site rebuilt as an evidence ledger",
    detail:
      "Consulting surface deleted. The gallery is now the seven CONTROL PLANE services, each showing its ship gate — public repo, architecture diagram, working demo, written post. Empty boxes render on purpose.",
  },
  {
    date: "2026-08-03",
    title: "shua-gateway M0 — pass-through proxy on disk",
    detail:
      "Service 1 exists: auth middleware, credential swap, unbuffered relay, tests, Docker. The repo is still private, so the ship gate has not been passed and the ledger shows it as 0 of 4.",
  },
  {
    date: "2026-08-02",
    title: "Charter set — a publishing surface, not a business",
    detail:
      "Shua Labs is where CONTROL PLANE work lands when it passes a ship gate. It has no customers, offers, or prices. Consulting was archived and Sequa was killed the same day.",
  },
  {
    date: "2026-07-25",
    title: "Registry opened",
    detail:
      "A public index of the agents, MCP servers, and harness tooling behind this work — generated from the live agent definitions rather than hand-maintained.",
  },
  {
    date: "2026-06-23",
    title: "AWS Architect MCP — source opened",
    detail:
      "First tool open-sourced under MIT: an MCP server that designs AWS architectures and emits the Terraform, IAM, and cost estimates to ship them.",
  },
  {
    date: "2026-06-22",
    title: "Locked the consulting practice",
    detail:
      "Three offers — Audit, Build, Fractional — priced against the 2026 market. Superseded and archived on 2026-08-02; kept here because the changelog does not edit its own past.",
  },
  {
    date: "2026-06-21",
    title: "Opened the repo",
    detail: "shua-labs went public under MIT.",
  },
];
