# Agents

How cloud agents work in this repo — the public lab surface for Shua Labs.

## What Shua Labs is

An independent AI lab building software, systems, and companies in public. Not a single SaaS product. The website is the canonical public home; social distributes; GitHub proves.

## Brand constraints

Read [docs/BRAND.md](./docs/BRAND.md) before changing UI.

Hard rules:

- Warm near-black public craft (`#0b0b0a` / `#f2f0ea`), Syne + DM Sans + IBM Plex Mono — depth via grain/bloom/surface ladder, not chroma
- No purple gradients, cream-terracotta kits, or flat white Notion skins
- Soft elevated panels and list rows; atmospheric grain ok, neon glow not
- Content lives in `content/` — do not scatter project data through JSX
- Mark placeholders explicitly; empty is honest
- YouTube stays deferred until founder authorizes; do not invent live social URLs

## Architecture

- App Router routes: `/` `/work` `/build` `/build/[slug]` `/research` `/research/[slug]` `/about`
- Typed content: `content/{types,projects,build-log,research,social}.ts`
- Layout chrome: `components/layout/`
- Homepage sections: `components/sections/`
- Design tokens: `app/globals.css` + `tailwind.config.ts`

## Testing requirements

Before claiming done:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Inspect every required route. Respect `prefers-reduced-motion`. Do not invent customers or live YouTube/Instagram URLs.

## Bus

GitHub is the bus. Issues, PRs, and comments are the handoff channel.

## Roles (Devon kit)

| Role | Does | Does not |
| --- | --- | --- |
| **Marcus** | Writes specs | Write production code |
| **Devon** | Implements. Owns branch, tests, `HANDOFF.md` | Deploy without founder ask |
| **Ivy** | Prod gate | Implement |
| **Shua** | Gates deploy. Owns live | — |

Production deploys from `master` → `shua-labs.vercel.app`. Founder-authorized merge ships.

## After every job

Post on the PR / update `HANDOFF.md`:

- Outcome · Repo · Branch · Status · Tests · PR · Next
