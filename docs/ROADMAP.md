# Implementation roadmap — one phase per Codex task

## Phase 1 — Bootstrap, install, validate (FIRST)

**Prompt:** `prompts/STEP_01_BOOTSTRAP.md`

- Audit repo non-destructively; scaffold Next.js App Router, TypeScript, Tailwind and ESLint.
- Install compatible Three.js, R3F, Drei, Motion for React and Playwright Test. Use npm lockfile.
- Establish design tokens, client-only WebGL boundary and an intentionally **temporary** proof-of-stack page with semantic name/tagline, an animated Motion element, and a tiny procedural geometry test. Keep the actual architectural hero for Phase 2.
- Add scripts for dev, lint, types, build, Playwright smoke checks, and setup files like `.gitignore`/`.env.example`.
- Validate actual builds and browser desktop/mobile rendering, not only installation logs.

**Done when:** `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e` have been attempted, pass or have clearly documented environment blockers; the temporary page loads with a visible WebGL demo or a deliberate fallback and a functioning Motion animation.

## Phase 2 — Signature architectural hero

Build expressive sculptural geometry (real license-cleared GLB or deliberate procedural piece), sophisticated studio light/materials, typography, responsive framing, animation, and static fallback. Match the minimalist reference and inspect screenshots on phone + desktop. Do not move on until it looks deliberate.

## Phase 3 — Base layout + About

Floating four-item nav, responsive sections, About portrait slot, concise positioning, geometric accents, footer. Keep actual photo pending; do not fabricate one.

## Phase 4 — Projects interaction + case studies

Numbered project selector on left, revolving/layered dark cards on right, Motion transitions, touch/keyboard controls, and seven `/projects/[slug]` pages using one typed data source. Respect missing factual content.

## Phase 5 — Experience + contact

Verified chronological timeline, real résumé download when provided, functioning server-side contact with validation, spam protection, email provider, and real success/error states.

## Phase 6 — Polish, accessibility, SEO, deploy

Moderate Motion scroll reveals, refined 3D assets, mobile/performance optimization, reduced-motion WebGL fallback, final browser review, metadata/OG images, complete links, production deployment.

## Gates for every phase

- Constrain work to named scope.
- Inspect the actual affected UI at 1440×900 and 390×844.
- Run the relevant checks. Clearly identify any unavailable verification.
- Verify responsive/keyboard/reduced-motion behavior as the feature develops.
- Update `docs/PROGRESS.md` as a tiny durable checkpoint, not a diary.

## Current implementation — 2026-10-20

The user explicitly requested the full implementation in one pass. Phases 2–6 now have completed UI, routing, motion, fallbacks and browser checks. Publication, factual case-study/experience content, portrait, résumé and contact delivery configuration remain pending. Use `docs/PROGRESS.md` for the durable status; the phase descriptions above remain the design/build reference.
