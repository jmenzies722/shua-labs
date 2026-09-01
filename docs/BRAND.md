# Shua Labs brand system

Source of truth for agents and humans designing Shua Labs surfaces.

## Philosophy

Shua Labs is an independent AI lab, not a single SaaS product. The brand communicates:

**RESEARCH → BUILD → SHIP → LEARN → REPEAT**

Feel: calm authority, atmospheric depth, typographic clarity, honest builder voice.

Avoid: neon accents, purple AI gradients, cream-and-terracotta SaaS kits, fake traction, flat document skins that read as internal wikis.

## Positioning

Primary: **Shua Labs — Building what’s next with AI.**

Supporting: An independent AI lab building software, systems, and companies in public.

## Visual direction

**Public craft, warm near-black.** Depth comes from a surface ladder, grain, and soft warm bloom — not chroma. This is a public lab website, not a Notion page.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0b0b0a` | Page canvas |
| `--bg-panel` | `#121211` | Lists / recessed surfaces |
| `--bg-raised` | `#1a1a18` | Panels / hover wash |
| `--fg` | `#f2f0ea` | Primary ink (warm paper) |
| `fg-muted` | `#a8a59c` | Body secondary |
| `fg-subtle` | `#6e6b63` | Labels / metadata |
| `line` | `rgba(242,240,234,0.08)` | Hairlines |
| `--bloom` | warm ivory haze | Hero atmosphere only |

No purple. No neon. Hierarchy from type scale, opacity, and elevation.

## Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display / brand | Syne | Hero brand mark + section titles |
| UI / body | DM Sans | Supporting copy, nav, buttons |
| Mono | IBM Plex Mono | Labels, dates, codes — sparse |

Brand name is a hero-level signal (`.display-brand`), not nav-only chrome. Site measure ~1080px.

## Atmosphere

- Fixed film grain overlay (low opacity, `mix-blend-mode: overlay`)
- Soft warm radial bloom behind hero content
- Subtle perspective grid fade in the hero plane
- Two slow ambient orbs (respect `prefers-reduced-motion`)

## Components

- Pill CTAs (primary filled warm paper, secondary hairline)
- `.surface-panel` / `.surface-list` with soft inset rim + depth shadow
- Blur nav that gains a hairline after scroll
- No cards in the hero; media cards only where interaction needs a container

## Motion

Deliberate and smooth — ~700–850ms ease `[0.22, 1, 0.36, 1]`, 18–24px travel, light stagger. Hover lifts are 1px, not bounce. Respect `prefers-reduced-motion`.

## Voice

Competent founder to competent builder. Empty is honest. Mark placeholders.

## Social

- GitHub: live when public
- Instagram: open when stills ship
- YouTube: deferred — keep in content model, do not surface as live until founder authorizes

## Anti-patterns

- Flat white “Notion clone” skins
- Purple/indigo gradient themes
- Cream canvas + terracotta accent kits
- Dark neon lab grids
- Fake logos / testimonials / stats
- Overcrowded heroes / invented live social links
