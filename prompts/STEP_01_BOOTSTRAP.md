# Codex — Step 1 prompt: set up and verify the repository

Copy **only the text inside the fenced block** into Codex with the repository root open. This phase is the technical foundation, **not** a request to build the finished portfolio.

```text
GOAL
Bootstrap my Brett Berry portfolio repository into a clean, running, verified Next.js project. Install the correct compatible dependencies, set up the source structure, prove that Motion for React and React Three Fiber work, and run actual checks on desktop and mobile. Do not create the final visual design yet.

CONTEXT / MINIMAL READS
- First inspect the repository root, package.json (if present), and source directory layout. Do not scan or dump the whole repo.
- Follow AGENTS.md and check docs/PROGRESS.md.
- Read only the technology and palette portions of docs/DESIGN_SPEC.md, plus relevant sections of docs/ARCHITECTURE.md and docs/MOTION_GUIDE.md.
- The docs are the approved design direction, but this task concerns setup only. Do not reread all project case studies or references.
- Preserve anything already implemented, especially the existing project selector if found. Report existing code before touching it.

REPOSITORY SAFETY
- If package.json / Next.js already exist, inspect compatibility and update incrementally; do not reinstall everything blindly.
- If the repo only contains docs, scaffold Next.js with App Router, TypeScript, src/ directory, Tailwind CSS, and ESLint.
- Because this repo is nonempty, do not use create-next-app in its root if the CLI may refuse or overwrite existing docs. Scaffold into a temporary sibling directory with current CLI options (check --help), merge only needed application/config files, clean up the temporary scaffold, then install in the real root.
- Preserve .git, user files, existing images, and all markdown. Do not overwrite or delete without a reason. Do not commit node_modules.

STACK — REQUIRED
- Compatible stable Next.js App Router + React + React DOM.
- TypeScript strict, Tailwind CSS, ESLint.
- Three.js, @react-three/fiber, @react-three/drei, and @types/three where required.
- motion (Motion for React) with imports from motion/react. Do NOT install framer-motion as a separate package.
- lucide-react for occasional icons, zod for future forms.
- @playwright/test as a dev dependency for deterministic visual/browser smoke tests.
- @playwright/cli as a dev dependency if compatible, so Codex can inspect the rendered website with low-context browser commands. If installing CLI is blocked, Playwright Test screenshots are an acceptable fallback.
- npm with a committed package-lock.json; choose compatible latest stable versions rather than inventing pins. Do not bypass peer conflicts with --force or --legacy-peer-deps.
- Do NOT install GSAP, ScrollTrigger, Lenis, Blender, a CMS, database, auth system, shadcn, or a general UI component framework.

ENVIRONMENT AND SCRIPTS
1. Check node --version and npm --version against Next.js requirements. Prefer an appropriate supported Node LTS (for example Node 24 if available), creating .nvmrc to match. If Node needs upgrading and you can't do it, give the specific blocker rather than claiming setup success.
2. Create / verify .gitignore for node_modules, .next, .env.local, Playwright artifacts, generated coverage, logs, and OS files.
3. Create a sanitized .env.example with names/comments for future contact email configuration, but do not add secrets or make the form yet.
4. Add package scripts:
   dev, build, start, lint (eslint CLI, not unsupported next lint), typecheck (tsc --noEmit), test:e2e (playwright test), check (lint + typecheck + build).
5. Keep the lockfile current and check that npm ci can reproduce the dependency install.

SMALL TECHNICAL PREVIEW ONLY
- Use src/app/layout.tsx, src/app/page.tsx, src/app/globals.css with semantic markup.
- Establish CSS tokens: ink #171717, paper #F6F6F3, orange #FFAC42, blue #657BFF, plus neutral text/borders. Use restrained typography and a safe font fallback.
- Show real accessible HTML text: BRETT BERRY and “Building what's next.”
- Create one small Motion for React entrance transition AND a small scroll-linked Motion proof (useScroll / useTransform). Honor prefers-reduced-motion. Keep the effects subtle.
- Create an intentionally temporary procedural 3D architectural test shape using R3F/Three/Drei, lighting, and a small visible idle animation; mount it in a client-only component boundary compatible with Next App Router. Provide a readable static/CSS fallback when WebGL cannot run. R3F is decorative, not the sole source of content.
- A tiny test shape is acceptable in this initial validation only. The final architectural sculpture is Phase 2 and MUST NOT look like a generic placeholder cube.
- Separate the two animation ownerships: Motion for HTML transforms/scroll; R3F for 3D meshes. Do not attach multiple animation systems to the same transform.
- Create only source folders actually needed now. Leave final navbar, About, project carousel, case-study pages, experience timeline, and contact form for later phases.

BROWSER VERIFICATION
- Configure Playwright Test with a local webServer for the app and sensible startup/reuse logic.
- Add smoke checks for 1440×900 desktop and 390×844 phone (or projects for both): initial load; name/tagline visible; no horizontal overflow; no uncaught browser errors; Motion-enhanced content remains visible; 3D Canvas renders or its graceful fallback appears.
- If Chromium is missing, run npx playwright install chromium and retry. If installation or sandbox permission fails, record the exact blocker.
- Run the site, take real screenshots at both viewports, and visually inspect them. A successful build alone is not sufficient. Capture screenshots under ignored test-results/; ensure the main content is readable even without WebGL.
- Playwright CLI skill install is optional: if CLI is available and allowed, use the documented CLI/skill commands; do not require global installation or an MCP server just to complete this phase.

MANDATORY VERIFICATION
- Install dependencies in the actual repo and create package-lock.json.
- Run npm run lint, npm run typecheck, npm run build, and npm run test:e2e.
- Attempt npm ci reproducibility after lockfile creation if safe; if you run it, it will replace node_modules deterministically.
- Run or verify npm run dev so the homepage can be opened.
- Fix any errors within the scoped setup task; don't report tests as passed if they were not executed.

DONE WHEN / HANDOFF
- Dev server works; app has semantic homepage with clear architectural technical preview.
- Motion and R3F function in the browser, or a documented environment limitation is handled gracefully.
- Lint, typecheck, build, smoke browser tests pass, or every unrun/failed check is explicitly identified.
- package-lock.json, .gitignore, .env.example, tests, and the basic scripts exist.
- Update docs/PROGRESS.md to a concise real checkpoint: installed version details, verification results, blockers, and NEXT = Phase 2, architectural hero.
- If actual setup changes documentation commands, update README.md minimally.
- Finish with a brief bullet-free summary: changed files, package versions, checks passed/blocked, next action.

SCOPE LIMIT
Do not start Phase 2 or create seven case studies now. Prioritize reliable installation and real browser verification; do not spend tokens reading unrelated project files.
```
