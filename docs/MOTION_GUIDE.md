# Motion and 3D behavior guide

**Read only when implementing animations, scrolling, or WebGL.** Use Motion for React as the **single HTML/UI animation system**. Avoid GSAP and Lenis in the initial build.

## Ownership boundaries

| Owner | Controls | Avoid |
|---|---|---|
| Motion (`motion/react`) | HTML/CSS transforms, opacity, scroll progress, project-card selection, press/hover states | Mutating Three mesh transforms directly through DOM animation |
| React Three Fiber / Three.js | Cameras, meshes, shader uniforms, 3D pointer response, idle rotation, scene controls in `useFrame` | Using separate uncoordinated timelines on the same 3D transform |
| CSS | Static layout, focus styles, simple color transitions, native smooth anchor scroll | Excessive layout-triggering animations |

## Motion APIs

- Install `motion` and use `import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"` in **client** components.
- For a simple presentational motion element in a Next.js server component, consider `motion/react-client` when appropriate; don't accidentally import client-only hooks into a server component.
- Use `whileInView` for simple reveals, with clear initial content defaults and conservative offsets.
- Use `useScroll` + `useTransform` to drive scroll progress within a section, and `useSpring` only to smooth values when useful.
- Use `AnimatePresence` only for genuinely entering/leaving content, e.g. project-specific summaries or overlay states. For the layered cards, `layout` or carefully controlled x/y/scale/opacity spring transitions are appropriate.
- Use Motion pointer and drag gestures on mobile-friendly controls, but preserve tapping, arrows, keyboard, and accessible state indications.

## Intended animations by section

**Hero:** a slow, architectural R3F model idle rotation; small pointer-driven parallax; one controlled scroll exit with type/sculpture moving in different directions. Typographic entrance can use Motion. Do not make a long pinned cinematic intro.

**About:** photo mask/scale-in, gentle copy reveal, restrained geometric accent. Text always remains visible if JS or reduced motion is disabled.

**Projects:** active list item moves/highlights; cards transition between stacked transforms (x/y/rotate/scale/opacity/depth feeling); animation ~0.35–0.65s. Never hide the active card CTA. Swipes change selected index, not the page scroll direction.

**Experience:** thin progress line and timeline nodes reveal as they enter viewport. All experience information remains available without motion.

**Contact:** dark transition via layout/background changes, not full-screen flashing; concise form feedback; no fake network success.

## Scroll behavior

- Native scroll is the default, with `scroll-behavior: smooth` only for anchor jumps where supported; disable in `prefers-reduced-motion`.
- Sticky navigation uses section intersection/scroll tracking, not a permanent rerender on every scroll frame.
- Keep browser deep links and back/forward navigation functioning.
- Avoid intercepting the wheel, scroll-jacking, or using a scroll-smoothing library until a demonstrated requirement justifies it.

## 3D performance and fallbacks

- Lazy-load the scene through a **client-only boundary**, never delay semantic hero text for WebGL.
- WebGL has a static visual fallback/preview and loading state; detect rendering failure gracefully.
- Default conservative DPR and geometry/material cost; simplify on mobile and reduced-motion devices.
- Stop idle rotation and large parallax for reduced motion, and avoid unnecessary continuous rendering if an object is static.
- Use optimized, license-cleared `.glb` assets or deliberate procedural geometry. No default spinning placeholder cube in the final design.

## Timing ranges (guidance, not hard rules)

- Hover/press: 0.15–0.25s.
- Layered project card selection: 0.35–0.65s.
- Section entrance: 0.45–0.8s.
- Scroll-linked elements should move modest distances and never prevent text from being read.

## Verification

At minimum review desktop 1440×900 and mobile 390×844 screenshots, test scroll direction changes, touch project selection, keyboard controls, and a reduced-motion emulation. Use Playwright per `docs/TESTING.md`.
