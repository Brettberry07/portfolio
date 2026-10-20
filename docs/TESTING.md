# Testing and visual QA

## Commands after Phase 1

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npx playwright install chromium   # first time / if necessary
npm run test:e2e
```

Expected scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test:e2e`, `check` (lint + typecheck + build). `npm run dev` runs the dev server; Playwright config should start/reuse an isolated web server as needed.

## Agent browser inspection — optional low-context tool

Microsoft's Playwright CLI is useful for quick agent-driven browser checks, separate from repeatable Playwright Test specs:

```bash
npm install -g @playwright/cli@latest
playwright-cli install --skills=agents -g
playwright-cli open http://localhost:3000
playwright-cli screenshot
```

These **global installs are optional** and may require permission. Alternatively Codex can run Playwright Test through the project's dev dependencies. Use CLI help when flags change; don't guess tool capabilities.

## Minimum viewport matrix

- 390×844 mobile portrait
- 430×932 large mobile
- 768×1024 tablet
- 1440×900 desktop
- Optional 1920×1080 large desktop

Capture full-page screenshots with useful descriptive filenames in `test-results/` (ignored by Git). Do not commit screenshots unless asked. Use consistent state and wait for fonts/canvas to settle before comparing.

## Functional smoke checks

- Homepage loads without console errors; `BRETT BERRY` and tagline visible.
- Nav links point to real anchors; no hidden/overlapping controls.
- R3F Canvas renders (or exhibits a deliberate fallback when WebGL is unavailable).
- Motion animated element mounts; scroll-linked Motion behavior does not error on load/scroll.
- At all widths: no unintended horizontal overflow; text legible; click/tap targets usable.
- Reduced motion: no persistent spinning, excessive parallax, or scroll trap.

Later phases: project switching via click/keyboard/swipe; all seven routes; contact error/success with mocked provider; server-side form validation; image/asset fallbacks; résumé link when provided.

## Performance guidance

Avoid treating raw FPS numbers as universal pass/fail; evaluate on an actual mid-range phone when feasible. WebGL must not block reading content. Optimize compressed GLB textures and model poly counts, reduce DPR under load, keep canvas isolated and asset downloads lazy, inspect `next build` output and network transfers.

## Portfolio v1 verification

The current suite covers the full homepage, animated/still WebGL, real poster fallback, no-JavaScript content and safe form, selector click/keyboard navigation, contact unconfigured UI, all seven case routes and unknown-project 404. Local tests reuse port 3000 because Next 16 permits a single dev process per checkout; CI defaults to 3100, configurable with `PLAYWRIGHT_PORT`. CLI visual review at 1440×900 and 390×844 also checks mobile swipe, selected-list autoscroll, long project titles and footer layout. Contact API invalid/unconfigured/anti-spam status checks were exercised with real local HTTP requests, without sending email.
