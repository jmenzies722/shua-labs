# Handoff

Updated: 2026-08-19

## Current state

- **Job 1** is add this Cursor bridge kit. Kit files only.
- Honesty-pass copy is **paused**. Do not rewrite homepage or live-site copy.
- The live studio tree is **not in git**. Prod is a dirty CLI deploy.
- Live ≠ git. Do not treat `master` as the live studio site. Do not ship from `master` to prod.
- Do not kill venture-company copy.
- Do not start a new Vercel project.
- No new seats. No new product.

## Repo

- https://github.com/jmenzies722/shua-labs
- Stack: Next.js App Router, TypeScript, Tailwind. Site content is data-driven (`data/`).
- Live studio is a separate dirty tree. This git repo is not that tree.

## This job (Job 1)

Add, if missing:

- `.cursor/agents/`
- `.cursor/rules/`
- `AGENTS.md`
- `HANDOFF.md`

Do not touch `app/`, `components/`, homepage copy, or any product UI.

## Packet

- **Outcome:** Cursor bridge kit added (agents, rules, `AGENTS.md`, `HANDOFF.md`). No product/UI/copy changes.
- **Repo:** `jmenzies722/shua-labs`
- **Branch:** `feat/cursor-bridge-kit`
- **Status:** done — PR open, not merged
- **Tests:** kit paths exist; `git diff` vs `master` is kit files only
- **PR:** https://github.com/jmenzies722/shua-labs/pull/1 (open, not merged)
- **Next:** Ivy reviews the kit. Shua gates any later deploy. Honesty-pass copy stays paused. Do not merge this PR unless Shua says so.
