# Codex operating instructions — Brett Berry portfolio

## Mission
Build a premium, minimal, architectural portfolio for **Brett Berry**, with the tagline **“Building what's next.”** Audiences: engineering recruiters and prospective freelance clients. Prioritize distinctive design *and* clear evidence of problem-solving with clients.

## Read only what you need
- New session: read `docs/PROGRESS.md` first; for first setup, follow `prompts/STEP_01_BOOTSTRAP.md`.
- Visual/layout change: consult only the relevant heading of `docs/DESIGN_SPEC.md`.
- Code organization: consult `docs/ARCHITECTURE.md` when relevant.
- Motion/3D change: consult `docs/MOTION_GUIDE.md`.
- Copy, project facts, or images: consult `docs/CONTENT_INVENTORY.md` and `docs/ASSET_REGISTER.md`.
- Tests: consult `docs/TESTING.md`.
- Avoid whole-repo file dumps, recursive source reads, and rereading every document unless truly necessary. Locate target files by filename/search and read only the relevant portions.

## Technology decisions
Next.js App Router, React, TypeScript, Tailwind CSS, **Motion for React** (`motion/react`), Three.js, React Three Fiber, Drei. Motion owns HTML/UI transitions and scroll choreography; R3F/Three controls 3D scene transforms. **Do not install GSAP, Lenis, a CMS, or a UI kit by default.** Reconsider only if a concrete task cannot be met with this stack.

## Working method
1. State a short task-local plan and expected touched files.
2. Make the smallest coherent change; preserve existing behavior and user code.
3. Check the affected feature with lint, types, tests, and build as appropriate.
4. For visual tasks, inspect actual browser rendering at **1440×900 and 390×844** using Playwright CLI or Playwright Test screenshots, then correct the most important defects.
5. Briefly report what changed, what ran, and any limitations. Keep `docs/PROGRESS.md` concise; no pasted logs.

## Non-negotiables
- No fabricated project metrics, technologies, employer details, headshot, résumé, email address, or working URLs.
- No fake success on a contact form; genuine send or clear unconfigured state.
- Keyboard and touch access, semantic HTML, reduced-motion support, strong contrast, no horizontal overflow.
- WebGL must not be the only way to access information; use a fallback and lazy-load it.
- No generic SaaS template, random animated blobs, unnecessary dependencies, or decorative motion that competes with the work.
