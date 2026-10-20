# Brett Berry — portfolio

**Building what's next.** A design-led portfolio for freelance clients and software engineering recruiters, featuring architectural 3D design and seven dedicated project case studies.

> **Current state:** Full portfolio v1 implemented and browser verified: architectural WebGL hero, responsive homepage, layered project selector, seven case-study routes, experience layout, and contact integration. Factual content and email configuration remain pending; see [`docs/PROGRESS.md`](docs/PROGRESS.md).

## Working on this repository

1. Read `docs/PROGRESS.md` for the current implementation and remaining content dependencies.
2. Start the local app using the commands below.
3. Consult only the relevant design, architecture, content or testing documentation for the change.
4. Update the typed content sources with approved facts and assets; keep unknown details unpublished.

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

## Local development

Use Node **24.22.0** (`.nvmrc`) and npm. With nvm installed, run `nvm install && nvm use` first. This setup session used the isolated runtime at `~/.cache/portfolio-runtime/node-v24.22.0-darwin-arm64/bin`; prepend that directory to `PATH` to use it on this Mac.

```bash
npm ci
npx playwright install chromium
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run check
```

Open `http://localhost:3000` after starting dev. Playwright reuses the local dev server on port 3000 or starts it when needed (CI uses 3100; override with `PLAYWRIGHT_PORT`) and tests 1440×900 and 390×844. Screenshots and failure traces are saved under ignored `test-results/`. `check` runs lint, strict type checks (including generated Next route types), and a production build; browser tests run separately. No environment variables are needed to preview. Email delivery remains explicitly unavailable until all contact variables from `.env.example` are configured.

## Content policy

Never make up metrics, roles, private contact info, links, or personal photos. Use clearly labeled content TODOs and transparent missing-asset states. Do not deploy a fake contact flow. Secrets belong in `.env.local`, not Git; `.env.example` contains names and comments only.

## Official references

- [Next.js setup](https://nextjs.org/docs/app/getting-started/installation)
- [Motion for React and Next.js](https://motion.dev/docs/react-installation)
- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Playwright Test](https://playwright.dev/docs/intro)
- [Playwright CLI](https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-cli.md)


## Replacing pending content

- `src/content/projects.ts`: seven canonical records. Add approved summaries, role, category, stack, problem, approach, solution, results and permitted links. Change `status` when verified. `heroImage` enables real imagery on the case-study cover.
- `src/content/experience.ts`: approved roles in reverse chronological order; only `confirmed: true` entries render.
- `src/content/site.ts`: optional user portrait, actual résumé path, public email and public profile links. Add the actual files under `public/`; absent values retain honest pending states.
- Homepage positioning copy lives in `src/app/page.tsx`; case-study sections render the typed project fields.

## Contact delivery

Copy `.env.example` to `.env.local` and supply an actual Resend key, verified sender and recipient. Never commit credentials. Restart development after configuration and rebuild for production (the enabled form state is computed during page rendering/build). The `/api/contact` route validates input, rejects cross-origin and oversized requests, checks a honeypot and rate limits attempts before contacting Resend. Success requires a real provider acceptance ID. The current rate limiter is process-local; use shared storage before scaling across instances. Actual email delivery has not been exercised without real credentials.

## Assets and browser review

See `public/models/ATTRIBUTION.md` for the acquired CC0 sculpture and optimization. The static WebP poster is rendered from the same scene. Fonts are self-hosted with licenses alongside them. Playwright CLI captures live under ignored `output/playwright/`; repeatable smoke screenshots live under `test-results/`. No browser binaries, generated screenshots or secrets are committed.
