# Brett Berry — portfolio

A software engineering portfolio featuring Tariff Ninja, the City of Bentonville’s Highway 102 traffic study, and Still On. The homepage follows one vintage monitor from tariff classification into an illustrated road and back to a meeting reminder that leads to the handheld.

## Working on this repository

1. Read [the current checkpoint](docs/PROGRESS.md) and start the local app.
2. Update the approved project facts in `src/content/projects.ts` and public destinations in `src/content/site.ts`.
3. Run the production build and browser checks below before opening a pull request.

The homepage uses the Next.js App Router, TypeScript, Tailwind CSS, and a shadcn/ui button. Native scroll drives a shared desktop composition with pre-rendered hardware and live Canvas 2D art. Touch and reduced-motion layouts use the same project copy, stills, and native meeting demo. The seven `/projects/[slug]` routes remain available.

## Repository documents

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

Use Node 24 and npm. The repository provides the preferred patch version in `.nvmrc`.

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

Open `http://localhost:3000` after starting dev. Playwright reuses the local dev server on port 3000 or starts it when needed (CI uses 3100; override with `PLAYWRIGHT_PORT`) and tests 1440×900 and 390×844. Screenshots and failure traces are saved under ignored `test-results/`. `check` runs lint, strict type checks (including generated Next route types), and a production build; browser tests run separately. The homepage and its email, résumé, and profile links require no environment variables.

## Content policy

Never make up metrics, roles, private contact info, links, or personal photos. Use clearly labeled content TODOs and transparent missing-asset states. Do not deploy a fake contact flow. Secrets belong in `.env.local`, not Git; `.env.example` contains names and comments only.

## Official references

- [Next.js setup](https://nextjs.org/docs/app/getting-started/installation)
- [Motion for React and Next.js](https://motion.dev/docs/react-installation)
- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Playwright Test](https://playwright.dev/docs/intro)
- [Playwright CLI](https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-cli.md)


## Featured work and assets

- The homepage introduction and contact card live in `src/app/page.tsx`. The project sequence, copy, and fallback frames live in `src/components/portfolio/ProjectSections.tsx`.
- The Tariff Ninja example, the corridor geometry, and the Still On screens are labeled illustrations. Replace them with approved media when available. Bentonville results are reported as simulation outcomes.
- `src/content/site.ts` holds the canonical domain and the approved public links. The résumé PDF lives at `public/resume/brett-berry-resume.pdf`.

Regenerate the original hardware models, transparent renders, and screen coordinates with Blender 4.3 and Pillow available to Blender’s Python. Regenerate the glyph poster, traffic stills, paper grain, and share image using the installed Playwright Chromium.

```bash
blender --background --python-exit-code 1 --python scripts/render-portfolio-hardware.py
node scripts/render-portfolio-art.mjs
```

The models are in `public/models/portfolio/`. The runtime stage loads the rendered hardware and composites a single live road canvas onto the projected CRT surface. The browser does not need to load the GLBs. Earlier model credits remain in [the model attribution register](public/models/ATTRIBUTION.md).

## Production verification

```bash
npm ci
npm audit
npm run check
npm run start -- --hostname 127.0.0.1 --port 3100
# With that process running in another terminal:
PLAYWRIGHT_PORT=3100 npm run test:e2e
```

Review the desktop, tablet, and phone compositions in the [browser captures](docs/portfolio-review.webp).

The homepage uses a direct email link. For consumers of the existing `/api/contact` endpoint, the provider variables are documented in `.env.example`.
