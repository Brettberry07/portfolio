# Hero sculpture

- **Source mesh:** Abstract loop sculpture, by Innerscene (source credits: “Innerscene, adapted from MakeHuman CC0 assets”; mesh metadata identifies original Innerscene sculpture geometry).
- **Source page:** https://www.innerscene.com/tools/library/3d-parts/abstract-loop-sculpture-6a4b97e1
- **Source download:** https://www.innerscene.com/api/library/abstract-loop-sculpture-6a4b97e1/download
- **License:** CC0 1.0 Universal — https://creativecommons.org/publicdomain/zero/1.0/
- **Retrieved:** 2026-10-20. Source explicitly allows commercial use, modification and redistribution.
- **Original:** 1,165,896 bytes; GLB with 2K embedded textures, 6,976 triangles including the footing.
- **Optimized:** `hero-architecture.glb`, 158,676 bytes. `scripts/optimize-sculpture.py` removes textures and unused image data, repacks binary buffers and assigns a neutral material. Source mesh geometry is retained.
- **Portfolio composition:** footing omitted from rendering; twelve instances of the acquired asymmetric loop share geometry. Depth, spacing, rotation, satin-metal materials and studio lighting are art-directed in `SculptureCanvas.tsx`. ~82,944 rendered triangles, DPR capped at 1.5. No external texture/HDRI request.
- **Static fallback:** `public/images/hero-poster.webp`, a transparent screenshot exported from this portfolio’s R3F canvas and encoded as WebP. It is not a third-party reference screenshot.

The stacked-form and twisted-form sculptures evaluated during acquisition are not shipped. All project cover artwork is original SVG/CSS concept artwork, visibly labeled; it is not a project screenshot or deliverable.
