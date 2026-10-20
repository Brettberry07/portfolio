# Architecture — targeted reference

**Read only for architectural or shared-code changes.** `docs/DESIGN_SPEC.md` is the visual source of truth; this document covers code boundaries.

## Framework and rendering

- Next.js App Router, compatible current React versions, TypeScript strict, current stable Tailwind setup.
- Server components by default; use client components only around stateful navigation, Motion, and WebGL.
- Render text/SEO content as semantic HTML on the server. Decorative WebGL is isolated with a client-only dynamic import (`ssr: false` in a client wrapper where required) and meaningful CSS/image fallback.
- Prefer native smooth anchor navigation where appropriate, no third-party smooth-scroll engine initially.
- Use typed static local data rather than CMS/auth/database for a portfolio.

## Target structure (created by Codex in Step 1 and expanded later)

```text
src/
  app/
    layout.tsx                  # metadata, fonts, global layout
    page.tsx                    # homepage composition (later)
    globals.css                 # design tokens and minimal resets
    projects/[slug]/page.tsx    # dedicated case studies (later)
    api/contact/route.ts       # optional contact server route (later)
  components/
    layout/                     # floating navigation and footer
    sections/                   # Hero, About, Projects, Experience, Contact
    projects/                   # selector, layered card, case-study sections
    three/                      # Canvas wrapper, hero sculpture, accents, fallback
    motion/                     # optional client-only Motion section helpers
    ui/                         # few small reusable primitives
  content/
    projects.ts                 # single canonical project data source
    experience.ts               # verified experience data
    site.ts                     # nav, hero copy, social placeholders
  lib/
    utils.ts                    # small utilities
    validation.ts               # form schema in later phase
public/
  models/                       # original source and optimized models with attribution log
  images/                       # Brett portrait and user-supplied screenshots
  resume.pdf                    # only once actual resume is supplied
scripts/                         # optional asset optimizers
tests/                         # Playwright smoke and responsive checks
```

These are **intended directories**, not evidence that they already exist. Phase 1 needs only a small subset.

## Data contracts

Create a typed `Project` record with: `id`, `slug`, `title`, `summary?: string`, `category?: string`, `role?: string`, `technologies: string[]`, `status: 'draft' | 'verified'`, `heroImage?: string`, `overview?: string`, `problem?: string`, `approach?: string`, `solution?: string`, `results?: string`, `links?: { label: string; href: string }[]`. Keep the seven canonical names and slugs in a single array. Conditional rendering handles absent fields; do not print `[TODO]` or fabrications publicly.

Keep `Experience` records factual, with `company`, `role`, `dates`, `highlights`, and source confirmation status. Content may be omitted from live UI until verified.

## Scene and asset boundaries

- WebGL only where it adds value. Hero scene first; minor section ornaments should be lightweight and can share geometry style via CSS/SVG if appropriate.
- Procedure-based architectural sculpture is acceptable. A pre-made GLB with verified usage rights is also acceptable; don't assume models exist.
- Control DPR and antialiasing for mobile; pause/reduce scene updates when out of view where possible.
- Do not import `three`/Canvas into server-only files, or let client components accidentally wrap all page content.
- Use `next/image` for actual raster imagery and define sizes where possible.

## Contact security plan (later phase)

Use a server-side endpoint/action and Resend, Zod input validation, honeypot, rate limiting appropriate to deployment, no keys in client, robust failure reporting, and a real result before declaring success. Do not produce a fake delivery demo.

## Fonts and tokens

Prefer Inter Tight display, Inter body, DM Mono/IBM Plex Mono for sparse labels. Use Next/font when practical; if setup is offline, provide a safe system fallback and record why. Style tokens: `--ink: #171717`, `--paper: #F6F6F3`, `--white: #fff`, `--muted: #858585`, `--line: #D7D7D2`, `--charcoal: #222222`, `--orange: #FFAC42`, `--blue: #657BFF`.
