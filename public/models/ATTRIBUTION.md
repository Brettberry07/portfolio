# Hero sculpture attribution

## Active asset — geometric rectangular frames

**Complex Geometric Frames And Curved Lines Model**, by **Omer (utopiandigital)**.
Source: https://sketchfab.com/3d-models/complex-geometric-frames-and-curved-lines-model-287051b7796d4a94b5970f79cd4fc8e5
License: **Creative Commons Attribution 4.0 International (CC BY 4.0)** — https://creativecommons.org/licenses/by/4.0/

Brett supplied the authorized `Complex Geometric Frames and Curved Lines Model.zip` on 2026-10-20. Sketchfab's official public model metadata confirms the author and CC Attribution 4.0 license; commercial use and modification are allowed with attribution. The ZIP contains a single OBJ; the referenced MTL is absent. No authentication or download controls were bypassed.

- **Original:** ZIP 3,813,606 bytes; OBJ 3,813,390 bytes; 30,740 triangulated surface faces plus an independent Rhino B-spline definition.
- **Retained geometry:** five sharp rectangular frame components, **4,512 triangles / 3,120 indexed vertices**. Source frame geometry, normals and relative depth positions are retained in the GLB. Bounds: approximately 159.598 × 149.721 × 270 source units, centered at the origin.
- **Removed:** two curved polygon components (13,760 and 12,468 triangles) and the separate free-form B-spline. No curved decorative geometry is imported into the hero.
- **Optimization:** discard unused UVs/source material references; index matching position/normal vertices; export binary glTF. No external textures or HDRI are required.
- **Web asset:** `public/models/geometric-frames.glb`, **106,236 bytes** (97.2% smaller than the supplied OBJ, primarily from excluding curved geometry). Meshes are `Frame-01` through `Frame-05`. The first has 1,504 triangles; each other frame has 752.
- **Portfolio changes:** matte charcoal physically based material, studio lighting, scaling/rotation/repositioning of source frames into an interlocking architectural composition, responsive camera framing and restrained continuous scroll transforms. These are adaptations of Omer's supplied frame geometry, not a new model claimed as original.
- **Fallback:** `public/images/hero-poster.webp`, `hero-poster-tablet.webp` and `hero-poster-mobile.webp` are transparent renders exported from the actual portfolio canvas, not copied third-party reference images.
- **On-site credit:** “Geometric frames by Omer · CC BY 4.0 · Adapted,” with links to source and license. Keep this credit when publishing or redistributing the adapted asset/poster.

Reproduce from the unzipped authorized source:

```sh
node scripts/import-geometric-frames.mjs '/path/to/Complex Geometric Frames and Curved Lines Model.obj'
```

The importer explicitly filters Rhino free-form curve metadata before OBJLoader parsing: the `parm` keyword would otherwise be mistaken for an OBJ point primitive. It verifies the expected connected-component structure before removing the two curves.

**Source integrity (SHA-256):**

- ZIP: `1c5750d3f49f0c296c4a354d9503a9a52a5f25913107d5a68646db6cebe963ae`
- OBJ: `30fe9a597133d07bf3c9a663c10879511a837c825cde5a081326a6661a798986`
- GLB: `0995e02208e9bf87f75dddc913f3b7d04ed74037fde3079aab39c6c1860230bd`

## Earlier assets retained in the repository

- **Abstract Cubes**, by **Andyleth**, https://sketchfab.com/3d-models/abstract-cubes-134b55951b9545898009732180ff8ceb — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Brett supplied the FBX archive. `scripts/import-abstract-cubes.mjs` extracts the 1,031-triangle stepped sculpture (`Cube-04`), centers it, strips textures and applies charcoal material. `public/models/abstract-cubes.glb`: 42,676 bytes. Superseded by Omer's open rectangular geometry; not the active hero.
- **Abstract loop sculpture**, by **Innerscene**, https://www.innerscene.com/tools/library/3d-parts/abstract-loop-sculpture-6a4b97e1 — [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). `public/models/hero-architecture.glb`: 158,676 bytes. Original 1,165,896-byte textured GLB optimized by `scripts/optimize-sculpture.py`. Superseded; not the active hero.

All project cover artwork is original SVG/CSS concept artwork, visibly labeled; it is not a project screenshot or deliverable. Reference images in documentation are never published as portfolio assets.
