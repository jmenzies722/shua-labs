# Agents

How cloud agents work in this repo.

## Bus

GitHub is the bus. Issues, PRs, and comments are the only handoff channel. Do not treat chat, local trees, or Vercel as source of truth.

## One agent

One cloud agent at a time. That agent runs as **Devon**.

Marcus writes the spec. Devon implements it. Ivy gates prod. **Shua** (human) gates deploy.

## Roles

| Role | Does | Does not |
| --- | --- | --- |
| **Marcus** | Writes specs | Write production code |
| **Devon** | Implements the spec. Owns the branch, tests, and `HANDOFF.md` | Deploy, merge, create Vercel projects |
| **Ivy** | Prod gate only | Implement, deploy, merge |
| **Shua** | Gates deploy. Owns live | — |

## After every job

Devon posts a packet on the PR (and updates `HANDOFF.md`) with these fields:

- **Outcome** — what changed
- **Repo** — `jmenzies722/shua-labs`
- **Branch** — working branch
- **Status** — done / blocked / paused
- **Tests** — what was run and the result
- **PR** — URL, open, not merged
- **Next** — the next allowed move, or stop

## Hard constraints

- Kit and docs only unless a later spec says otherwise.
- Do not change homepage copy, live-site copy, `app/`, `components/`, or any product UI.
- Do not deploy. Do not create a Vercel project. Do not merge.
- Live ≠ git. `master` is not the live studio site. Do not ship from `master` to prod.
- No new seats. No new product.
- Do not kill venture-company copy.
