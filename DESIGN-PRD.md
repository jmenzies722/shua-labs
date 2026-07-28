# Design PRD — Shua Labs

For Claude Design. Return a self-contained page (styles, fonts, everything inlined).

---

## 1. Goal & user

Three people land here and they want different things:

- **An employer / hiring manager** — can this person do the job, and is there proof? *Primary.*
- **A buyer** — what can I get today, and what does it cost?
- **Josh** — what's stuck, and what's earning? (private, behind auth)

**Primary action:** an employer finishes the overview page believing he builds production AI
infrastructure, and clicks through to GitHub or email.

---

## 2. Information architecture

| Route | Must communicate |
|---|---|
| `/` **Overview** | Who he is · what he builds · proof · one way to contact |
| `/catalog` | What's buyable, what's free, what he can be hired for — one comparable shelf |
| `/registry` | The agents / MCP servers / tooling behind the work (exists, restyle only) |
| `/dashboard` | Private ops: product pipeline + revenue. Behind basic auth, `noindex` |

Nav is a slim top bar on public routes. The dashboard keeps a left rail — it's an app.

---

## 3. Layout — section by section

**`/` Overview**

1. **Statement** — full-width, generous top space. Mono eyebrow (name · discipline · location),
   then the hero line. **This is the one accent moment: `--grad-brand` on the headline via
   `background-clip: text`.** Nowhere else on the page.
2. **Prose** — narrow measure (~62ch), three short paragraphs. Deliberately plain after the hero.
3. **What I work on** — three rows, `dt` left (240px) / `dd` right. Hairline dividers, not cards.
4. **Stack** — inline mono chips.
5. **Selected work** — list, not a grid. Each: name, status badge, one line, link out.
   **Must render an honest empty state** (see §7).
6. **Close** — one oversized link to `/catalog`.

**`/catalog`** — page title, a property strip (counts), then one table per group:
Products → Open source → Engagements. Columns: Name · Type · Status · Price · action.
Hairline rows, no zebra, no vertical rules. Row hover reveals the action.

**`/dashboard`** — pipeline stage counters across the top, then a stalled-first list, then
revenue KPIs and a per-stream table. Dense. Tabular figures throughout.

---

## 4. Design tokens — use exactly these

```css
/* Backgrounds */
--bg:         #06070d;                    /* page — deep blue-black */
--surface:    rgba(255,255,255,.02);      /* raised panel */
--surface-2:  rgba(255,255,255,.05);      /* card */
--hairline:   rgba(255,255,255,.09);      /* all borders */

/* Text — never pure white */
--fg:         #f2f3fb;   /* headings */
--fg-body:    #e7e9f3;   /* prose */
--fg-muted:   #c8cce4;   /* secondary */
--fg-dim:     #8b93b8;   /* meta, labels */

/* Accent — violet system */
--accent:     #7c6cff;   /* ALL interactive: buttons, links, active nav, focus ring */
--accent-lo:  #a78bfa;
--accent-sky: #38bdf8;
--grad-brand: linear-gradient(120deg,#a78bfa 0%,#7c6cff 40%,#38bdf8 100%);
--grad-mark:  linear-gradient(135deg,#7c6cff,#38bdf8);
--glow:       rgba(124,108,255,.5);

/* Semantic */
--ok:   #34d399;   --info: #38bdf8;
--radius: 0.75rem;
```

**Rules, non-negotiable:**
- Flat `--accent` violet for anything interactive. **`--grad-brand` only on the hero headline
  and the wordmark** — never on buttons, never as surface decoration.
- Borders are hairline white-alpha. **Depth comes from surface alpha steps and accent glow,
  never hard shadows.**
- One primary button per view.

**Type**
- Display: **Space Grotesk 600**, tracking `-0.01` to `-0.03em`
- Body: **Inter** 400–500
- Mono: **JetBrains Mono** — labels, statuses, prices, metrics. This is brand texture, not code styling.
- Hero `clamp(40px,6.4vw,76px)` / lh 1.02 · section `text-3xl` · body `text-base` · meta `text-sm`

**Layout** — container `max-w-6xl mx-auto px-6`; section rhythm `py-24` (`py-16` mobile); 8px grid, prefer `gap-*`.

---

## 5. Components (shadcn/ui — return code that maps to these)

| Section | Components |
|---|---|
| Nav | plain `<nav>` + `Button variant="ghost"` |
| Hero | heading + `Button` (primary, one) |
| Focus rows | `<dl>` + hairline dividers |
| Stack chips | `Badge variant="outline"` |
| Selected work | `Card` (flat, hairline) or list + `Badge` for status |
| Catalog | `Table` + `Badge` for type/status |
| Dashboard | `Card` for KPIs, `Table` for streams, `Progress` for stage counters |

---

## 6. Copy — use verbatim, this is the voice

**Eyebrow:** `JOSH MENZIES · PLATFORM & AI INFRASTRUCTURE · NEW YORK, NY`

**Hero:** *I build the platforms AI agents actually run on.*

**Sub:** And I show my work — the reasoning as well as the code. If a design has a limit, the write-up says where it breaks.

**Prose:**
> Most AI agent demos fall over the moment they meet real traffic. There's no cost ceiling, no way to see what the agent actually did, and no path from a laptop to production that anyone would sign off on. That gap is the work I care about.
>
> I come at it from infrastructure rather than from prompting: AWS, Terraform, containers, CI/CD — the boring parts that decide whether a system survives its first bad week. Everything I build starts as something I needed, which is why the tooling here is opinionated rather than general.
>
> I publish the reasoning as well as the code. If a design has a limit, the write-up says where it breaks.

**Focus rows:**
- **Agent infrastructure** — Runtimes, gateways, and spend controls for AI agents — the layer between a model and a production system.
- **Platform engineering** — Internal tooling and paved paths that make the correct thing the easy thing for other engineers.
- **Cloud and IaC** — AWS architecture as code, least-privilege by default, with the cost consequences made visible up front.

**Catalog intro:** Everything here started as something I needed. The open-source tools are the proof, the products are those tools packaged so you can run them without me, and the engagements are the same work done for you.

**Primary CTA:** `See the catalog`

Anti-hype rule: state what it does, never how amazing it is. No "revolutionary", no "10x", no "transforms your workflow".

---

## 7. States & responsive

**Empty states are load-bearing — design them, don't skip them.** This site enforces an honesty
rule: nothing renders as shipped/buyable unless it genuinely is. So these are the *normal* state
right now, not edge cases:

- **Selected work, empty:** "Nothing marked as shipped yet." — must look composed, not broken.
- **Catalog, no products:** the Products group is hidden entirely; only Open source and
  Engagements render.
- **Nothing buyable:** property strip reads "None — checkout opening soon" instead of a count.
- **Dashboard, no revenue:** every KPI shows `—`, with a block explaining the first entry.

**Responsive:** single column under 768px; catalog tables scroll horizontally inside their own
container — the page body must never scroll sideways. Dashboard rail collapses to a drawer.

**Interaction**
- Visible violet focus ring on everything focusable. Non-negotiable.
- Hover: `translateY(-1..2px)` + violet glow. No bounce, no parallax.
- Motion: fade-up on load only. **Any reveal animation must fail visible** — content must never
  be able to stay at `opacity: 0` if an observer doesn't fire.
- Full `prefers-reduced-motion` support.
- WCAG AA contrast — verify `--fg-dim` on `--bg` specifically.

---

## 8. Output contract

Return a **single self-contained page**: all CSS inlined, fonts inlined or linked from Google
Fonts, no external asset dependencies, no build step. It must render correctly opened directly
in a browser so it can be imported to Vercel by public URL.

Prioritize `/` (Overview). Include `/catalog` if you can; the dashboard is lowest priority.
