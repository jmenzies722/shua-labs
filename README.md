# Shua Labs

Independent AI lab building software, systems, and companies in public.

Live: [shua-labs.vercel.app](https://shua-labs.vercel.app)

**Building what’s next with AI.**

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Vercel Analytics
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm test
npm run typecheck
npm run lint
npm run build
```

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Brand homepage |
| `/work` | Projects / experiments |
| `/build` | Build log index |
| `/build/[slug]` | Build log entry |
| `/research` | Research index |
| `/research/[slug]` | Research entry |
| `/about` | Lab + founder |
| `/registry` | Agent / MCP catalogue (legacy) |

## Content management

Typed content lives in `content/` — keep UI and content separate.

| File | Owns |
| --- | --- |
| `content/projects.ts` | Projects + featured build |
| `content/build-log.ts` | Build log entries |
| `content/research.ts` | Research notes |
| `content/social.ts` | Site meta, social, lab loop, media pack |
| `content/types.ts` | Shared TypeScript interfaces |

### Add a project

1. Append an object to `projects` in `content/projects.ts`.
2. Set `placeholder: true` if it is scaffold data.
3. Do not invent customers, traction, or live products.

### Add a Build Log entry

1. Append to `buildLog` in `content/build-log.ts`.
2. Use a unique `slug` (becomes `/build/[slug]`).
3. Keep `body` as short factual paragraphs.

### Add research

1. Append to `research` in `content/research.ts`.
2. Status vocabulary: `NOTE` | `EXPLORATION` | `REPORT` | `THESIS`.

### Social links

Edit `social` in `content/social.ts`. Keep `live: false` and `href: null` until the founder actually opens the channel. Do not link 404s.

## Brand

See [docs/BRAND.md](./docs/BRAND.md) — colors, type, motion, YouTube/Instagram rules.

## Honesty

No invented traction. Empty is valid. Company OS internals stay private (`jmenzies722/company-os`).

## Deployment

Push to `master` deploys production on Vercel → `shua-labs.vercel.app`. Preview deployments require Vercel SSO.

## Analytics

Vercel Analytics is enabled. Prefer meaningful events (`project_opened`, `github_clicked`, etc.) over invasive tracking.

## License

[MIT](./LICENSE)
