# Shua Labs brand system

Source of truth for agents and humans designing Shua Labs surfaces.

## Philosophy

Shua Labs is an independent AI lab, not a single SaaS product. The brand communicates:

**RESEARCH → BUILD → SHIP → LEARN → REPEAT**

Feel: intelligent, ambitious, technical, concise, confident, curious, transparent, builder-oriented.

Avoid: corporate jargon, fake enterprise language, exaggerated claims, purple AI clichés, invented traction.

## Positioning

Primary: **Shua Labs — Building what’s next with AI.**

Supporting: An independent AI lab building software, systems, and companies in public.

## Colors (tokens)

Black and white only. No chroma accents.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` / `bg` | `#050505` | Near-black canvas |
| `--fg` / `fg` / `--signal` | `#f4f4f0` | Warm off-white primary |
| `fg-muted` | `#9a9a92` | Secondary body / labels |
| `fg-subtle` | `#6a6a64` | Metadata |
| `line` | `rgba(244, 244, 240, 0.12)` | Hairlines / grid |

Hierarchy comes from type weight, opacity, and space — not color. Primary CTAs are white fill on black. Secondary CTAs are white outline.

## Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display | Syne | Editorial headlines |
| Body | DM Sans | Primary UI copy |
| Mono | IBM Plex Mono | Timestamps, status, tags, technical labels |

## Spacing & grid

- Site measure: `1120px` (`.site-shell`)
- Section padding: `.section-pad`
- Thin borders + generous whitespace
- Background grid (72px) uses white at ~4% opacity

## Logo / wordmark

`Shua` in full white + `Labs` in muted gray. Company is the brand; founder is secondary.

## Motion

- Fast, subtle, purposeful (Framer Motion)
- Respect `prefers-reduced-motion`
- Allowed: hero entrance, section reveal, status pulse, restrained hovers
- Forbidden: WebGL spectacle, colored glow effects

## Voice

Write like a competent founder explaining to another competent builder. Lead with the fact. No hype. Mark placeholders clearly.

## Social adaptation

Same type, grid, and monochrome system across web, YouTube, and Instagram.

### YouTube thumbnails

- Large 3–6 word headline
- Shua Labs mark
- Black field, white type
- Episode/build number in mono
- No colored accents, no glowing orbs

### Instagram formats

- BUILD UPDATE
- ARCHITECTURE
- WHAT I LEARNED
- SHIPPED
- RESEARCH NOTE
- BEHIND THE BUILD

## Anti-patterns (do not ship)

- Colored accents (green, purple, neon, gradients)
- Glassmorphism cards / fake logos / testimonials / stats
- Generic SaaS pricing blocks
- Overcrowded heroes
- Invented social follower counts or live channel links
