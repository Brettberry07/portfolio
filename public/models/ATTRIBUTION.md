# Hero sculpture

- **Source mesh:** Abstract loop sculpture, by Innerscene (source credits: “Innerscene, adapted from MakeHuman CC0 assets”; mesh metadata identifies original Innerscene sculpture geometry).
- **Source page:** https://www.innerscene.com/tools/library/3d-parts/abstract-loop-sculpture-6a4b97e1
- **Source download:** https://www.innerscene.com/api/library/abstract-loop-sculpture-6a4b97e1/download
- **License:** CC0 1.0 Universal — https://creativecommons.org/publicdomain/zero/1.0/
- **Retrieved:** 2026-10-20. Source explicitly allows commercial use, modification and redistribution.
- **Original:** 1,165,896 bytes; GLB with 2K embedded textures, 6,976 triangles including the footing.
- **Optimized:** `hero-architecture.glb`, 158,676 bytes. `scripts/optimize-sculpture.py` removes textures and unused image data, repacks binary buffers and assigns a neutral material. Source mesh geometry is retained.
- **Portfolio composition:** footing omitted from rendering; twelve instances of the acquired asymmetric loop share geometry. Depth, spacing, rotation, matte-charcoal materials and studio lighting are art-directed in `SculptureCanvas.tsx`. ~82,944 rendered triangles, DPR capped at 1.5. No external texture/HDRI request.
- **Static fallback:** `public/images/hero-poster.webp`, a transparent screenshot exported from this portfolio’s R3F canvas and encoded as WebP. It is not a third-party reference screenshot.

The stacked-form and twisted-form sculptures evaluated during acquisition are not shipped. All project cover artwork is original SVG/CSS concept artwork, visibly labeled; it is not a project screenshot or deliverable.

## Refinement — requested replacement blocked (2026-10-20)

The requested assets were inspected through Sketchfab's normal model pages and download buttons:

- **Primary:** [Abstract Cubes, Andyleth](https://sketchfab.com/3d-models/abstract-cubes-134b55951b9545898009732180ff8ceb). Five supplied sculptures; 8,093 triangles / 3,828 vertices. Public metadata confirms downloadable and [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Fallback:** [Brutalist Sculpture, tblunden](https://sketchfab.com/3d-models/brutalist-sculpture-757f03aaf76a41899f5864d79b2198ce). Page reports approximately 2.6K triangles / 1.3K vertices; CC BY 4.0.

**Neither asset is installed.** Both official Download 3D Model buttons open a Sketchfab sign-in dialog in the available browser session; the supported `/v3/models/{id}/download` endpoints return HTTP 401 (authentication required). Download formats cannot be confirmed before authenticated access. No viewer data, download controls or authentication were bypassed.

**Manual step:** Sign in to Sketchfab, open the primary source page, select **Download 3D Model**, and download the supplied glTF/GLB archive if offered (otherwise the original source archive). Place the untouched archive in `public/models/source/abstract-cubes/` or attach it to the chat. The next implementation can inspect the actual mesh and formats, select/recompose supplied geometry, optimize a GLB, replace the hero file and poster, and add accessible on-site credit: “Abstract Cubes by Andyleth, CC BY 4.0; materials/composition modified,” linked to the source and license. Use the specified fallback only if the primary geometry is unsuitable.

Per the user's explicit fallback instruction, the already-cleared Innerscene mesh remains temporarily. It is now larger, matte charcoal, directionally lit and framed beneath foreground typography, with restrained pointer/idle movement and Motion scroll exit. Its geometry remains rounded; the requested sharp architectural replacement is still outstanding. Its revised transparent poster was exported from the updated canvas.
