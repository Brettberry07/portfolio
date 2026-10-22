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

## Refinement verification — 2026-10-20

- Installed Playwright CLI: baseline and final screenshots of every homepage section at 1440×900, 768×1024, and 390×844. Seven case studies captured at all three widths; no overflow. Original Contact source/styles/API and global tokens remain unchanged; baseline/final appearance reviewed.
- Interactive checks: Ways I Work hover/tap/arrows/Home/End and contextual routes; project click/keyboard/prev-next/actual touch swipe; selected mobile list stays visible after resizing.
- Current suite: 16 tests, including no-JS and responsive WebGL poster fallbacks, static reduced-motion canvas, all seven routes, anchors, honest disabled contact form and Ways I Work routes. Reduced-motion asserts no console errors, native wheel input and usable navigation.
- The oversized hero canvas is sampled through its drawing buffer for idle-motion and reduced-motion assertions. Element screenshots can scroll an oversized canvas out of view, capture animated HTML overlays and pause its renderer; compare canvas pixels directly for scene stability.
- Reviewed and fixed hero/name contrast, mobile sculpture separation, narrow Fig terminal clipping, mobile selector visibility, and reduced-motion hydration consistency. Clean reloads have zero runtime/console errors; upstream Three.Clock deprecation remains.
- Screenshots: ignored `output/playwright/refine-*` and `depth-*`; test artifacts: `test-results/`. The supplied Omer model is now integrated and visually verified at all three viewports.

## Scroll-jump regression

The hero exposes a read-only `canvas.sculptureSnapshot()` inspection function for actual Three scale/rotation/position, mapped progress, camera position/aspect and drawing-buffer dimensions. No per-frame DOM writes or React state are used. The regression test samples up to 48 frames after each of seven small wheel inputs in both directions, including the former 50ms delayed-measurement window. On slow software WebGL it samples a 1.2-second window with at least six frames, avoiding a timeout caused solely by low render throughput. It checks fixed canvas dimensions/camera, scale matching the three-stage 1 → 1.04 → 1.01 → 0.98 curve, bounded adjacent-frame changes and stable stop values. Frame records are attached as JSON. It also toggles reduced motion live to verify native input and restored animation.

CLI review additionally checks small scroll stops, screenshots in both directions, anchor offsets/hash history, genuine touch swipe, editable Contact fields, résumé downloads and desktop/tablet/mobile geometry framing. Local software WebGL plus tracing can make the frame-sampling case slow; it has a 60-second limit rather than weakening its continuity assertions.

## Full model and hero overflow — 2026-10-21

CLI review at 1440×900, 768×1024 and 390×844 verifies the complete white-frame/black-line model, perspective, readable copy and absence of the top mask. Desktop drawing-buffer bottom-edge samples at 0%, 50% and 94% hero progress stay transparent; the lower model silhouette extends past the hero with no hard cut or horizontal page overflow. Three regenerated transparent WebP posters match the responsive live scene. The reduced-motion test samples the drawing buffer over 250 ms so HTML overlays and screenshot auto-scrolling cannot cause a false motion failure.

Hero–About refinement: reviewed alternating orange frames in front-to-back depth order, the 5%-of-hero-height lift, zero added section spacer, and foreground About text at desktop/tablet/mobile widths. About's local paper wash protects contrast without restoring a mask on the model. All three fallback posters refreshed.

## Hero hierarchy and exit — 2026-10-21

The hero refinement supersedes the earlier full-model overflow checks. Review initial, mid-scroll, About, and reverse-scroll composition at 1440×900 and 390×844, plus tablet 768×1024. The scene boundary now clips with a short bottom feather; the sculpture must stay above all About content. The continuity regression also visits 40%, 75%, and 95% progress in both directions, checks the scale ceiling and stable canvas dimensions, and verifies the clipping boundary lies above the About heading. Use wheel input for those stages so Lenis owns its scroll target.

## Entrance continuity — 2026-10-21

The entrance regression samples actual computed transforms on desktop and mobile after fonts and the initial WebGL render are ready. It starts sampling in the same browser task as the trigger, so shader compilation or protocol latency cannot hide an entire compositor animation. At 80% viewport height both About heading statements must retain the same 18px resting pose. Once 45% of their stationary group enters the upper 62% reading area, positions must move monotonically to zero, with the second statement following the first. Reverse scrolling must not restart the sequence. CLI before/during/after screenshots and wheel-driven walkthroughs cover About, Projects and Experience. The complete suite also checks reduced motion, no-JS readability, project keyboard/touch navigation, and stable hero scroll/camera transforms.
