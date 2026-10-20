# Brett Berry — portfolio

**Building what's next.** A design-led portfolio for freelance clients and software engineering recruiters, featuring architectural 3D design and seven dedicated project case studies.

> **Current state:** Documents only. The application, dependencies, source files, and tests have **not** yet been created or installed. Codex does that in the Step 1 prompt.

## Start in Codex

1. Copy **all Markdown files** into the matching paths at the root of your repository (keep `docs/` and `prompts/`).
2. Open the repo in Codex.
3. Copy/paste **[`prompts/STEP_01_BOOTSTRAP.md`](prompts/STEP_01_BOOTSTRAP.md)** into a fresh Codex task. It inspects the repo, creates/merges the app scaffold, installs packages, and verifies the stack.
4. Review the results and `docs/PROGRESS.md`; begin the visual hero only after setup passes.

## Confirmed creative direction

- Identity: **BRETT BERRY**, tagline **Building what's next.**
- Feel: minimal creative studio, architectural geometry, oversized editorial type.
- Mostly off-white/black, intentionally placed dark sections, tiny orange and blue accents.
- Single scrolling homepage: Home → About → Projects → Experience → Contact.
- Floating nav: Home / Projects / Experience / Contact; About is reached by scrolling.
- Main 3D geometric/architectural hero plus smaller recurring geometric accents.
- Projects: numbered list on the left, layered/revolving cards on the right (mobile: touch-first selector).
- Seven projects with **individual `/projects/[slug]` case-study pages**.
- About portrait, experience timeline with résumé link, genuine contact form.
- Restrained, responsive motion; no distracting effects.

## Target tech stack

| Area | Decision |
|---|---|
| Framework | Next.js App Router + React + TypeScript |
| Style | Tailwind CSS + CSS design tokens |
| 3D | Three.js + React Three Fiber + Drei |
| Interaction & scroll animations | **Motion for React** (`npm install motion`, `motion/react`) |
| Scrolling | Native scrolling + CSS smooth anchors with reduced-motion override |
| Content | One typed local project source + separate case-study routes |
| Forms (later) | Zod + Next.js server endpoint + Resend or similar, with anti-spam |
| Quality | ESLint, strict TypeScript, production build, Playwright Test + CLI |
| Deployment (later) | Vercel or other Next.js-compatible host |

**No GSAP or Lenis initially.** Motion covers section reveals, scroll-linked motion, project-stack transitions, and interactive UI. Use `useFrame` for real-time 3D animation; do not animate one scene transform simultaneously from competing systems. If a future effect genuinely requires another animation engine, document the need first.

## Documents (read selectively)

| File | Role |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Compact, always-on Codex rules |
| [`docs/DESIGN_SPEC.md`](docs/DESIGN_SPEC.md) | Complete visual direction, sections, interactions, acceptance criteria |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Rendering, component boundaries, project types |
| [`docs/MOTION_GUIDE.md`](docs/MOTION_GUIDE.md) | Motion + R3F recipes, ownership, reduced motion |
| [`docs/CONTENT_INVENTORY.md`](docs/CONTENT_INVENTORY.md) | Seven project titles, missing factual content, copy guardrails |
| [`docs/ASSET_REGISTER.md`](docs/ASSET_REGISTER.md) | 3D model, photos, résumé, copyright and optimization tracking |
| [`docs/REFERENCES.md`](docs/REFERENCES.md) | Reference URLs and what to take from each |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Scoped implementation phases |
| [`docs/TESTING.md`](docs/TESTING.md) | Checks and browser inspection |
| [`docs/PROGRESS.md`](docs/PROGRESS.md) | Brief durable progress checkpoint |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Fixed design/engineering choices |
| [`prompts/STEP_01_BOOTSTRAP.md`](prompts/STEP_01_BOOTSTRAP.md) | First prompt to paste into Codex |
| [`prompts/TASK_TEMPLATE.md`](prompts/TASK_TEMPLATE.md) | Short repeatable prompt pattern |

## Intended commands *after* Step 1

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

These will not work yet: no `package.json` has been created. Codex's first task creates it and records versions and actual checks.

## Content policy

Never make up metrics, roles, private contact info, links, or personal photos. Use clearly labeled content TODOs and transparent missing-asset states. Do not deploy a fake contact flow. Secrets belong in `.env.local`, not Git. Step 1 creates `.env.example` and `.gitignore` as real setup files; this documentation kit deliberately contains Markdown only.

## Official references

- [Next.js setup](https://nextjs.org/docs/app/getting-started/installation)
- [Motion for React and Next.js](https://motion.dev/docs/react-installation)
- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Playwright Test](https://playwright.dev/docs/intro)
- [Playwright CLI](https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-cli.md)
