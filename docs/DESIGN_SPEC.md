# Brett Berry — Portfolio Design & Implementation Specification

**Version:** 1.1 — Motion for React revision  
**Status:** Approved design direction; ready for implementation  
**Project type:** Personal portfolio + freelance-facing case-study website  
**Primary audience:** Engineering recruiters and prospective freelance clients  
**Creative direction:** Architectural / editorial / minimal / interactive  
**Hero tagline:** **Building what's next.**

---

## 1. Product brief

Create a premium, design-forward portfolio that presents **Brett Berry** as a versatile builder and problem solver who works at the intersection of software, product development, operations, and direct client collaboration. It should be memorable enough to demonstrate frontend/design skill itself, but clear enough that a recruiter or prospective client can understand the work in less than a minute.

This is **not** a standard developer portfolio with generic skill cards, progress bars, brightly colored gradients, or a template-style hero. It should feel closer to a polished independent creative studio: quiet confidence, geometric sculpture, bold type, precise spacing, and carefully choreographed movement.

**Primary goals**
1. Communicate who Brett is and what he can build.
2. Showcase breadth across seven real projects, emphasizing problem, approach, role, and impact.
3. Demonstrate visual taste and technical ability through the site itself.
4. Build credibility with professional experience and a downloadable résumé.
5. Convert interest into contact through a working email contact form.

**Design principles**
- Minimal does not mean empty: every visual element should have a purpose.
- Architectural rather than playful: structured forms, materiality, rhythm, negative space.
- Motion should clarify hierarchy and create delight, never get in the way of reading.
- The projects are the centerpiece, not a decorative 3D demo.
- The entire experience must work beautifully with touch, keyboard, and reduced motion.

## 2. Site map & navigation

### Homepage (single continuous scrolling page)
1. **Home** — large editorial hero and signature geometric 3D sculpture.
2. **About** — photo, personal introduction, approach to solving problems, interdisciplinary capabilities.
3. **Projects** — immersive numbered selector with revolving/stacking project cards.
4. **Experience** — clean vertical timeline plus résumé download.
5. **Contact** — large closing headline and functional contact form.

### Sticky primary navigation
Exactly four main items, in this order: **Home · Projects · Experience · Contact**. **About does not require a separate nav item**; it is reached naturally when scrolling below the hero. Anchors: `#home`, `#projects`, `#experience`, `#contact`. When the About section is in view, the Home navigation item can remain selected until Projects enters view.

- Desktop: compact, floating, centered, rounded dark pill with restrained separators; translucent only if it remains legible. Active item gains a subtle highlight/underline, never a neon glow.
- Mobile: all four destinations remain easy to reach via a compact adaptive nav; if width is insufficient, use a clear accessible menu rather than clipping or tiny tap targets.
- Sticky nav responds to section visibility, stays out of the content's way, and supports keyboard focus.
- Anchor jumps scroll smoothly except when reduced motion is enabled.

### Project case-study pages
Each featured project has a dedicated route: `/projects/[slug]`. The homepage's project cards lead to these pages. Each page has a clear return-to-projects control, site navigation, previous/next project links, and a closing contact invitation. The primary website remains one-page; only deeper project exploration opens a new route.

## 3. Visual system

### Palette
| Token | Value | Usage |
|---|---|---|
| `--ink` | `#171717` | Primary text, high-contrast surfaces |
| `--paper` | `#F6F6F3` | Default off-white canvas |
| `--white` | `#FFFFFF` | Elevated light surfaces |
| `--muted` | `#858585` | Supporting text, metadata |
| `--line` | `#D7D7D2` | Fine separators and borders |
| `--charcoal` | `#222222` | Project cards, dark panels |
| `--orange` | `#FFAC42` | Active project / primary interactive accent |
| `--blue` | `#657BFF` | Secondary accent / indicators and selective links |

White/off-white dominates. Use one or two **purposeful dark moments**, including a near-black contact section; dark project cards provide contrast within the light projects area. Orange is used sparingly for active project selection, small guide marks, and select CTAs. Blue should be rare and deliberate (e.g. nav active indicator or micro-details). Avoid loud rainbow gradients, multiple competing accent colors, and ornamental glassmorphism.

### Type
- Large display: **Inter Tight** or another clean, carefully kerned sans serif; very large scale, tight tracking, varied weights.
- Body/UI: **Inter** or **Manrope**; readable and neutral.
- Eyebrow labels, counters, tech tags: **IBM Plex Mono** or **DM Mono** (optional, not overused).
- Hero name must be **BRETT BERRY** and tagline **Building what's next.**
- Prefer strong typographic hierarchy and generous whitespace over numerous small cards.
- Use fluid responsive typography with `clamp()`, and adjust deliberate line breaks for narrow screens.

### Layout and motifs
- Desktop content max width approximately **1400–1480px**, with generous gutters and a flexible 12-column rhythm; full-bleed hero/transition regions allowed.
- Use thin horizontal rules, oversized project numerals, small section indices, architectural framing, and subtle geometric traces.
- Square-edged or lightly rounded content blocks; selectively rounded floating nav/project cards. No excessive pill UI.
- Small recurring 3D geometric ornaments (not full heavy scenes) echo the hero: ribbing, stepped forms, nested volumes, or suspended components.
- Carefully balance whitespace and overlapping imagery; no elements should collide accidentally.

## 4. Homepage section specifications

### 4.1 Home / hero (`#home`)
**Objective:** Immediate memorability and visual credibility. Should communicate name, tagline, and the portfolio's design language before the user scrolls.

**Desktop composition**
- Roughly full viewport height (`min-height: 90–100svh`, adjusted for actual content).
- Giant display type: `BRETT BERRY`, composed editorially and potentially partially overlapped by the sculpture where legibility remains intact.
- Tagline: `Building what's next.` prominent but secondary.
- Small supporting statement (draft; editable): “Software, product, and systems built around real problems.”
- One striking **architectural, abstract 3D sculpture**, center/right or central in composition: interlocking matte and metallic structural forms, repetition, ribbed/extruded surfaces, visually substantial silhouette. Refer to the supplied minimalist 3M sculpture and the chosen architectural design reference. Do **not** use colorful low-poly blobs, random bouncing primitives, or unrelated cute floating icons.
- A fine `SCROLL TO EXPLORE` cue and understated section index are acceptable.

**3D direction**
- Start with a real optimized GLB/glTF architectural sculpture **or** a composed procedural Three.js/R3F mesh with convincing form and materials. Use actual geometry; do not approximate the primary visual using a CSS emoji, flat illustration, or placeholder cube.
- Neutral studio lighting, physically based materials, soft contact shadow, controlled specular highlights; consider a CC0 HDRI from Poly Haven.
- Very slow continuous motion/rotation at rest. Mild pointer response on desktop, clamped to small angles. No dizzying spins.
- As scrolling leaves the hero, sculpture can subtly translate/scale/rotate while typography separates and gives way to About. Do not pin the hero for an excessive distance.
- On mobile, reposition/scale sculpture so name and tagline remain readable; reduce camera motion and visual complexity if needed.
- Provide a polished static preview fallback if WebGL isn't supported or performance is constrained.

### 4.2 About
**Objective:** Establish Brett as a real person who can understand stakeholder problems and deliver working solutions.

**Layout**
- Bright, editorial two-column composition on desktop: large user-supplied portrait and an intentionally typeset personal introduction; stack in a sensible reading order on mobile.
- Eyebrow `01 / ABOUT` (indices can be adjusted consistently across the site).
- Headline direction: **“I build at the intersection of technology and real-world problems.”** This is suggested copy, not a mandated biographical claim.
- A short, human paragraph emphasizing technical range, problem-solving, product thinking, and working directly with clients. Avoid empty buzzwords or overstating credentials.
- Compact capabilities presented in typographic rows rather than generic icon cards, e.g. **Software Engineering / Product Development / Automation & Operations / Client Collaboration**.
- User portrait must be an easy-to-replace asset, e.g. `public/images/about-brett.jpg`. Do not invent a photo or substitute an AI-generated depiction of Brett without permission.
- One quiet geometric detail/ornament can connect the section to the hero.

**Motion:** portrait mask reveal or gentle expansion; headline/paragraph enter with staggered timing. Avoid long hidden text or scroll-blocking effects.

### 4.3 Projects (`#projects`)
**Objective:** The site's signature interactive experience; the core evidence of ability and breadth.

**Visual reference:** user-supplied current portfolio screenshot. Preserve the distinctive **numbered project list on the left** and **layered/revolving stack of cards on the right**, while improving clarity, spacing, typography, polish, and mobile usability. This is **not** a conventional uniform project tile grid.

**Featured projects, initial preferred order** (titles should be verified against final project copy):
1. Querry Berry
2. Fig
3. Tariff Ninja
4. Potential Energy Tech
5. Amazeum
6. Still On
7. City of Bentonville Traffic

**Desktop interaction and layout**
- Light background, restrained geometric backdrop (a strong architectural diagonal/diamond shape may be adapted from the reference but should not overpower cards).
- Left: large section heading `SELECTED WORK` or `PROJECTS`, numbered list `01–07`, active project highlighted with orange bar/dot/arrow, clear hover/focus state. Display a short `Select a project / Drag to explore` hint where useful.
- Right: overlapping charcoal/near-black project cards arranged with perspective/depth. One active card at a clearly readable size. Adjacent cards remain partially visible at smaller scale / offset / lower opacity.
- Active card includes project title, short **verified** problem/solution summary, concise tags, project index, optional representative image/media, and a prominent `View Project` link. Secondary cards show enough identifying information to be recognizable but do not obscure the active one.
- Clicking a project in the left list smoothly brings that card forward. Dragging/swiping the cards changes the active selection; clicking an adjacent card activates it. Include keyboard-accessible previous/next controls and avoid interactions requiring drag exclusively.
- Selection changes use tasteful position/scale/opacity transforms (`~350–650ms`), with modest perspective, not dramatic tumbling.
- Ensure interactive layers never block the active card CTA or lose pointer/focus accessibility.
- Preserve readable contrast even when cards overlap. Do not obscure text behind translucent layers.

**Mobile behavior**
- List can condense into a clean horizontal set of selectable project names/indices or an accessible selector above the cards; do not force two desktop columns into a phone width.
- Active card becomes full-width, swipeable or arrow-controlled; partial neighboring cards may be visible to signal the carousel.
- Keep descriptive text legible without tiny mono type; distinguish vertical page scrolling from horizontal swipes.
- CTA remains easy to tap. No hover-dependent functionality.

**Project data model**
Use a typed local content array / content modules (or MDX for detail pages) so titles, slugs, thumbnails, copy, tags, roles, and links are edited in one place. Do not hardcode differing project names/descriptions across components. Never invent results, technologies, clients, dates, awards, or metrics; flag missing information with editable data placeholders.

### 4.4 Experience (`#experience`)
**Objective:** Build trust with a simple, credible career progression, not a bloated résumé replica.

- Bright canvas, generous section spacing, title `EXPERIENCE` and small supporting introduction.
- Vertical chronological timeline with a fine line, understated nodes, prominent company/organization names, role labels, date ranges, and 1–3 concise outcome-focused lines per item.
- Feature **verified professional roles**; do not automatically turn every project into an employment entry. Include Tariff Ninja where supported by Brett's final résumé; additional roles/engagements should come from Brett's supplied content.
- A tasteful scrollytelling effect can progressively reveal nodes/line segments, but all timeline content remains visible without animation.
- Clear `Download résumé` button linked to user-provided `/resume.pdf`, opening or downloading the PDF. Do not ship a dummy file or a dead button.
- A small architectural ornament can balance empty space without competing with the timeline.

### 4.5 Contact (`#contact`)
**Objective:** Make the next step obvious to prospective clients and recruiters.

- Full-bleed charcoal / almost-black closing section: the strongest deliberate inversion from the mostly white site.
- Large statement, e.g. **“Have something in mind? Let's build it.”**
- Functioning contact form: name, email, optional company/subject, message, submit. Clear validation, keyboard accessibility, success/error states, and a helpful confirmation message.
- Send email via a **server-side** integration (e.g. Resend with Next.js route handler/server action); never expose an email API key in client code. Do not silently simulate submission.
- Include spam protection (e.g. honeypot, per-IP rate limiting, optional Turnstile), input validation (Zod or equivalent), and safe handling of errors.
- Display real email/GitHub/LinkedIn links once provided. Do not invent URLs, accounts, or addresses.
- Footer includes name, year, and a minimal back-to-top action.

## 5. Dedicated project case-study template

Route pattern: `/projects/[slug]`. All seven featured projects need pages; if full content is missing, create an elegant, explicitly **editable draft** rather than fabricated claims.

**Page structure**
1. **Project hero** — index, title, one-sentence purpose, role, project type, optional timeframe, strong hero visual.
2. **Overview** — what the project is and who it serves.
3. **The problem** — user/client need, constraints, or opportunity.
4. **My role & approach** — what Brett specifically contributed and why those decisions were made.
5. **Solution / build** — interface screenshots, architectural diagrams, demos, or annotated visuals as appropriate.
6. **Results / learning** — tangible impact with verified numbers only; otherwise explain outcomes and lessons without made-up metrics.
7. **Tech & contributions** — short, accurate tags/stack, not overwhelming lists.
8. **Links & next steps** — live site, GitHub, demo where actually available; previous/next project and contact CTA.

**Editorial style:** varied image scales, asymmetrical but intentional grids, prominent typographic pull-quotes, thin dividers, large breathing room, a few gently animated visuals. The case study should be readable even if imagery or 3D is not available. Project-specific accent highlights are acceptable but should remain within the global orange/blue/neutral system.

## 6. Motion & interaction guidelines

- Primary style: **moderate** motion, deliberate editorial choreography, never a distracting animation showcase.
- On-scroll: opacity/translation, masks, line reveals, image expansion, gentle parallax; use 3D transitions only where they improve continuity.
- Typical UI hover transitions: **150–250ms**; project stack transitions: **350–650ms**; on-scroll reveals: **500–850ms** (values are guidelines, not rigid).
- Use GPU-friendly `transform` and `opacity` for routine animation; avoid animating layout-heavy properties.
- Smooth scrolling is welcome, but must not break native input, keyboard anchors, deep links, browser history, or mobile touch behavior.
- Scroll-triggered motion should be reversible or behave sensibly when a user scrolls up.
- Honor `prefers-reduced-motion`: turn off auto-rotation, large parallax, pinned scenes, and smooth scroll; show content without entrance dependencies.
- Do not autoplay sound or introduce cursor tricks that harm usability.

## 7. Responsive and accessibility requirements

- Design and test at approximately **375px, 430px, 768px, 1024px, 1440px**, plus intermediate widths.
- No horizontal page overflow. All links/forms/cards have comfortable touch targets.
- Use responsive re-composition rather than shrinking desktop elements until unreadable.
- Device capabilities govern 3D complexity. Prefer static/pre-rendered assets or reduced animation on low-powered mobile devices.
- Semantic sections/headings, visible keyboard focus, contrast-aware text, appropriate alt text, and labeled form fields.
- R3F Canvas is decorative or described meaningfully as appropriate; it should not trap keyboard focus or hide necessary information from assistive technologies.
- Card carousel needs keyboard access and active-item semantics; do not use hover as the only way to discover/activate projects.
- Set appropriate font loading strategy, asset dimensions, and responsive imagery to avoid layout shift.

## 8. Recommended implementation stack

**Motion for React is the default for all DOM animation and scroll choreography; GSAP is not part of the baseline stack.**

**Core:** Next.js App Router, React, TypeScript, Tailwind CSS.  
**3D:** Three.js + React Three Fiber + Drei; optimized GLB/glTF assets; optional `gltfjsx` for converted models.  
**Motion:** Motion for React (`motion/react`) is the only default HTML/UI/scroll animation library. Use `whileInView`, `useScroll`, `useTransform`, `useSpring`, gestures, and `AnimatePresence` where they make sense; native scrolling and CSS smooth anchors, with reduced-motion overrides. Do not add GSAP or Lenis without a documented, concrete requirement.  
**Content:** typed local data plus Markdown/MDX or structured modules for the seven case studies.  
**Contact:** Next.js route handler or server action, Resend or comparable transactional email provider, Zod validation, basic anti-spam/rate limiting.  
**Deployment:** Vercel or equivalent Next.js hosting.

**Architecture suggestions**
```text
app/
  page.tsx
  projects/[slug]/page.tsx
  api/contact/route.ts                  # if route-handler approach is chosen
components/
  layout/ (Navbar, Footer)
  sections/ (Hero, About, Projects, Experience, Contact)
  three/ (HeroScene, GeometryAccent, WebGLFallback)
  projects/ (ProjectSelector, ProjectCard, ProjectCaseStudy)
  ui/
content/
  projects.ts                           # canonical titles, slugs, metadata
  experience.ts
  site.ts
public/
  models/                                # license-verified, optimized GLBs
  images/                                # Brett portrait and real project visuals
  resume.pdf                             # user-supplied, not fabricated
styles/ or app/globals.css
```

**Engineering requirements**
- Only mount WebGL where needed; isolate client-side 3D and motion from server-rendered content.
- Lazy-load 3D without delaying initial typography/navigation; use an image poster/loading state rather than a blank page.
- Use Draco/Meshopt/KTX2 or other appropriate asset optimization when useful; compress textures and control device pixel ratio.
- Keep important content crawlable in actual HTML, not embedded solely inside WebGL.
- Record external asset origin, licensing, attribution obligations, and any transformation performed.
- All project links and case-study routes must actually work; avoid lorem ipsum, broken `#` targets, fake buttons, fabricated metrics, and placeholder contact success messages.
- Do not introduce authentication, a CMS, or a large component framework unless needed.

## 9. Content and asset inputs to request from Brett

These are **content dependencies**, not reasons to stop creating the layout. Use visually coherent clearly marked draft text/assets until supplied:

- Final preferred name styling and any short introductory biography.
- An actual photo for the About section.
- For each of the seven projects: approved name/spelling, purpose, context, role, technology, screenshots/media, project link(s), and measurable results if available.
- Verified job timeline, role descriptions, and professional experience dates.
- Final `resume.pdf`.
- Real contact destination email and GitHub/LinkedIn URLs.
- License-approved hero sculpture source/asset, or approval of a procedural design.

Treat all unavailable factual details as `TODO` in content data, not as permission to make them up. The visual site should still be demonstrable using neutral mock media and clearly labeled draft copy.

## 10. Build plan for Codex

Use [`docs/ROADMAP.md`](ROADMAP.md) as the **canonical implementation phase sequence**; it overrides any older milestones or wording. Follow these phases **one task at a time**:

1. **Bootstrap and validation** — repository scaffold, install Motion/R3F/Tailwind and browser QA (prompt in `prompts/STEP_01_BOOTSTRAP.md`). This is technical setup only, not the final design.
2. **Architectural hero** — compelling sculpture, editorial name/tagline, responsive lighting and fallback.
3. **Layout and About** — four-tab navigation, editorial About portrait/copy, smaller geometric accents.
4. **Projects and case studies** — numbered selector + layered cards, seven dedicated pages.
5. **Experience and contact** — timeline/résumé plus genuinely functioning email form when configured.
6. **Polish and deployment** — subtle Motion scroll choreography, accessibility, performance, SEO, final responsive verification.

**Definition of done**
- [ ] Responsive, cohesive five-section homepage and four-item sticky nav.
- [ ] Distinctive architectural hero sculpture that works or gracefully falls back on mobile.
- [ ] Real user-replaceable About portrait and concise personal positioning.
- [ ] Functional seven-project selector: desktop list + layered cards; touch/keyboard controls.
- [ ] Dedicated, linked case-study route for each of the seven projects.
- [ ] Professional vertical timeline and functional résumé download when PDF is supplied.
- [ ] Contact form genuinely sends an email when configured, validates inputs, handles errors, and resists spam.
- [ ] Smooth but restrained motion, with complete reduced-motion support.
- [ ] No broken links, fabricated content, or inaccessible hover-only actions.
- [ ] Screenshots reviewed at representative mobile and desktop sizes; production build passes.

## 11. Creative quality bar and anti-patterns

**Do:** prioritize intentional art direction, sophisticated compositing, real material/lighting quality, legible typography, carefully controlled motion, tasteful geometry, and a differentiated projects interaction.

**Do not:** produce a default SaaS landing page; scatter random feature cards; add unrequested testimonials or made-up client logos; use stock photos as Brett; fill the site with generic blobs; create the hero entirely from CSS boxes; bury projects under multiple ornamental sections; depend on mouse hover on mobile; ship with a visually impressive but nonfunctional form.

**North star:** A prospective client should think, *“This person understands design, can build technically sophisticated experiences, and knows how to turn practical problems into finished work.”*
