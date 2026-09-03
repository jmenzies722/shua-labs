# Shua Labs

Independent AI lab in New York. Building software, systems, and companies in public.

**Live:** [shua-labs.vercel.app](https://shua-labs.vercel.app)

> Building what’s next with AI.

This repo is the **public site** — brand, work, build log, research.  
How the lab actually picks and builds ideas lives in private [`company-os`](https://github.com/jmenzies722/company-os) (`idea → score → pick → build`).

---

## What’s here

| Route | Purpose |
| --- | --- |
| `/` | Lab homepage |
| `/work` | Experiments and projects |
| `/build` | Build log (notes + live GitHub commits) |
| `/research` | Research notes |
| `/about` | Lab + founder |

Content is typed under `content/`. Don’t invent traction — empty is honest. YouTube stays off until it ships.

---

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm test
npm run typecheck
npm run lint
npm run build
```

Stack: Next.js 14 · TypeScript · Tailwind · Framer Motion · Vercel.

Push to `master` → production on Vercel.

---

## Content

| File | Owns |
| --- | --- |
| `content/projects.ts` | Work + featured build |
| `content/build-log.ts` | Curated log entries |
| `content/research.ts` | Research notes |
| `content/social.ts` | Site meta + social go-live flags |

Social: set `href` + `live: true` only when the channel exists. Brand: [`docs/BRAND.md`](docs/BRAND.md).

---

## License

[MIT](./LICENSE)
