# Shua Labs

**Build. In the open.**

The website for [Shua Labs](https://github.com/jmenzies722/shua-labs) — Josh Menzies' builder brand. Open-source products and tools for developer and AI enablement, and the expertise to put them to work.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run typecheck
```

## Editing content

The site is data-driven — adding or changing content is a one-object edit:

- `data/projects.ts` — the gallery (each project's category, tier, tags, and detail drawer content)
- `data/categories.ts` — the category sections (AI Enablement, Developer Tools, Open Source)
- `data/offers.ts` — the consulting offers
- `data/principles.ts` — the brand principles band
- `data/journey.ts` — the changelog / timeline

The full UI/UX spec lives in [`DESIGN_PROMPT.md`](./DESIGN_PROMPT.md).

## License

[MIT](./LICENSE)
