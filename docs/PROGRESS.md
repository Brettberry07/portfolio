# Current checkpoint

**Updated:** 2026-10-20 · **Phase:** 3D, motion and depth refinement complete.

**Design:** Preserved editorial typography, cream/black/orange identity, navigation, project selector, seven case studies and original Contact. About now has orange architectural accents, tonal layering and a larger portrait contour. A substantial organic boundary connects Ways I Work to Projects. Experience includes a prominent genuine résumé download, a larger left-cropped learning silhouette, four readable skill categories and a responsive vector halftone transition into Contact.

**3D:** Brett's supplied **Complex Geometric Frames And Curved Lines Model by Omer**, CC BY 4.0. Retained five rectangular frames, removed curved components, recomposed an interlocking matte-charcoal knot. Optimized GLB: **106,236 bytes / 4,512 triangles**. Oversized desktop composition and dedicated tablet/mobile cameras; three real-scene WebP fallbacks. Source, modifications, hashes and reproducible importer: `public/models/ATTRIBUTION.md`. Prior download blocker resolved.

**Motion:** Fixed the scroll-stop jump: a rotated HTML wrapper changed measured canvas bounds, triggering R3F's debounced camera resize. Canvas ancestors are now stationary; one hero-relative Motion progress drives scene scale/rotation/translation through `useFrame`. Lenis runs only from Motion `frame.setup` with `autoRaf:false`. Native touch and reduced-motion wheel input, live preference changes, anchor offsets, focus and history verified. No duplicate springs or stop-triggered scale targets.

**Verified:** `npm run check` passes strict lint, types and production build; **16/16 Playwright tests pass**. Installed CLI baseline/final screenshots reviewed at **1440×900, 768×1024, 390×844**. Repeated small wheel inputs/stops/reversals retain fixed camera/canvas dimensions and continuous scale; frame samples attached to tests. Verified touch swipe, keyboard/project routes, anchors/history, reduced motion, no-JS/WebGL fallback and editable honest Contact state. Résumé browser download matches supplied PDF SHA-256. No runtime/console errors; upstream Three.Clock deprecation warning remains. Artifacts: ignored `output/playwright/depth-*` and `test-results/`.

**Remaining:** Real portrait and approved project media/public links; contact provider credentials before real delivery. Contact component/styles/API/props and global tokens unchanged; no message sent, deployment or fabricated assets.

**Merge repair:** Removed obsolete `sections/Projects.tsx`, accidentally restored by a modify/delete conflict when merging main. The live homepage uses `projects/ProjectSelector.tsx`; no dependency download is needed. Active source, assets and dependencies otherwise match premerge commit `749dc66`. Bounded scroll-regression frame sampling for slow software WebGL. Repeated `npm run check` and all **16 browser tests pass**; desktop/mobile CLI review and asset requests remain clean.
