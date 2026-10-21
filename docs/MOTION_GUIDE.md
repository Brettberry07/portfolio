# Motion and 3D behavior guide

**Read only when implementing animations, scrolling, or WebGL.** Motion for React owns HTML/UI animation. Brett's October refinement explicitly adds Lenis for scroll smoothing; GSAP remains excluded.

## Ownership boundaries

| Owner | Controls | Avoid |
|---|---|---|
| Motion (`motion/react`) | HTML/CSS transforms, opacity, scroll progress, project-card selection, press/hover states | Mutating Three mesh transforms directly through DOM animation |
| React Three Fiber / Three.js | Cameras, meshes, shader uniforms, 3D pointer response, idle rotation, scene controls in `useFrame` | Using separate uncoordinated timelines on the same 3D transform |
| CSS | Static layout, focus styles, simple color transitions, native smooth anchor scroll | Excessive layout-triggering animations |

## Motion APIs

- Install `motion` and use `import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"` in **client** components.
- For a simple presentational motion element in a Next.js server component, consider `motion/react-client` when appropriate; don't accidentally import client-only hooks into a server component.
- Use `whileInView` with an explicit initial pose and scalar targets for entrances. Never combine `initial={false}` with offset keyframe arrays: that renders the final layout, then jumps backward when the observer fires. Shared `useRevealViewport` observes only the upper 62% of viewport height (resize-aware pixel margin; IntersectionObserver percentages use width). Content remains readable before entry; no opacity-zero gates.
- Shared entrances move 18px over 1.05s with a gradual `[0.4,0,0.2,1]` curve. Heading statements share one stationary `RevealSequence` with 160ms overlap; 45% of the entire heading must enter the reading area first, keeping the second statement clear of the bottom edge. Portrait scale is only 0.985 → 1; prose waits for its own reading-area cue on mobile. Timeline markers inherit their entry’s trigger. Avoid nested observers/transform animations on an already moving ornament. Projects’ heading leads the explorer; the hero supporting statement follows the name by 160ms.
- Entrances run once; reverse scrolling does not reset them. Reduced-motion CSS immediately removes transforms, including on live preference changes. The root no-JS style restores the final pose, including clipped text lines. Keep hero scroll transforms unchanged.
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

- `SmoothScroll` wraps server-rendered children in `ReactLenis root`. `autoRaf: false`; one Motion `frame.setup` callback advances Lenis before `useScroll` reads the native position. Cleanup cancels the callback and the provider destroys its instance.
- Wheel smoothing uses restrained interpolation; touch stays native (`syncTouch: false`). Reduced motion disables wheel interception and the frame callback; Lenis makes anchor jumps immediate. Textareas retain native input/scroll behavior.
- Same-page anchors preserve real hashes/history, keyboard focus and CSS scroll-padding offsets. Without JavaScript, native anchors remain functional. Disable CSS smooth scrolling while Lenis is active to prevent competing interpolation.
- Sticky navigation uses section intersection/scroll tracking, not a permanent rerender on every scroll frame.
- Keep browser deep links and back/forward navigation functioning.
- No mandatory snapping or scroll-jacking. Preserve normal browser navigation and user interruption of animated jumps.

### Hero continuity

The stationary hero-sized target supplies one `useScroll` progress value (0–1, hero top to hero bottom). At 0 / 40 / 75 / 100%, scale maps to 1 / 1.04 / 1.01 / 0.98. Rotation leads the motion: X changes 4° and Y 10°, halved on mobile. Right/up translation increases during the retreat and exit. R3F reads all values directly in `useFrame`, without per-frame React state, allocations or an additional spring. Lenis already smooths the native scroll position. Idle motion never changes scale.

Keep canvas HTML ancestors stationary. The earlier rotated wrapper changed `getBoundingClientRect`; R3F's debounced measurement resized the camera after scrolling stopped. Preserve `resize={{ scroll: false, offsetSize: true, debounce: 0 }}` and page-width camera breakpoints. The model's base scale is 12% smaller, with responsive right-weighted framing. The stationary hero boundary clips both WebGL and poster before About, with a short feather over its final 4% to soften the edge. No sculpture can cross the About divider, heading or portrait. The poster uses the matching 12% reduction. The latest user-requested hero refinement supersedes the previous overflow/no-mask direction. Reduced motion keeps a static scene and the same section boundary.

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
