# Asset register and acquisition

This register covers **production assets**. Inspiration screenshots in `docs/references/` must never be copied into the published site.

| Asset | Intended path | Status | Source / license / notes |
|---|---|---|---|
| Hero architectural frames | `public/models/geometric-frames.glb` | Implemented | Brett-supplied Omer OBJ; CC BY 4.0; five sharp rectangular frames, 4,512 triangles, 106,236 bytes. Curved parts removed. Attribution and reproduction: `public/models/ATTRIBUTION.md` |
| Hero poster/fallback | `public/images/hero-poster{,-tablet,-mobile}.webp` | Implemented | Three responsive transparent renders exported from the portfolio's actual canvas; same source attribution applies |
| Brett portrait | `public/images/about-brett.jpg` | Missing | User-supplied only; clean replaceable portrait slot remains |
| Résumé | `public/resume/brett-berry-resume.pdf` | Implemented | Brett's supplied current PDF; 55,171 bytes, one page; exact byte match to original |
| Seven project hero images | `public/images/projects/{slug}.*` | Missing | User-supplied or license-cleared; respect confidential clients |
| Geometric / organic motifs | CSS/SVG in homepage sections and project art | Implemented | Original lightweight decorative artwork; no third-party reference images copied |
| Studio HDRI | Not required | Omitted | Local procedural studio lighting avoids an external HDRI download |

## Sourcing and optimization

1. The user supplied Omer's **Complex Geometric Frames And Curved Lines Model** archive. It contains usable rectangular frame geometry. Only the five sharp frame components are imported; the two curved surface components and B-spline are excluded. The earlier authenticated-download blocker is resolved by the supplied archive.
2. Record origin, author, source URL, license/attribution, original size, modifications and final size. Current exact sources, hashes and importer command: `public/models/ATTRIBUTION.md`.
3. Prefer optimized GLB/glTF, reasonable DPR, lazy WebGL and a static WebP fallback. The active GLB needs no textures. Geometry is shared where the scene repeats frames.
4. Preserve proper aspect ratios and accessible content without WebGL. Missing portrait/project media is not permission to fabricate them.
5. Do not publish third-party inspiration screenshots or unnecessarily large assets.

## Input checklist

- [ ] Portrait photograph
- [x] Résumé PDF
- [ ] One to three approved media assets per project
- [ ] Public links/GitHub/demo for relevant projects
- [x] User-supplied hero 3D asset with suitable rectangular geometry
- [x] Model sources/licenses recorded

## Implementation provenance — 2026-10-20

The current hero uses Omer's premade frame geometry under CC BY 4.0. The 3.81 MB OBJ is reduced to a 106 KB GLB by excluding curved components, unused UV/material data and indexing vertices. Five frames retain their source geometry; the scene applies matte charcoal materials, architectural composition and studio lighting. The source archive is retained outside the public directory, supplied by Brett.

The previous Andyleth Abstract Cubes (CC BY 4.0, 42.7 KB selected stepped mesh) and Innerscene loop (CC0, 159 KB) remain documented as superseded assets. Neither is the current hero.

Inter Tight and DM Mono are self-hosted WOFF2 fonts with SIL Open Font License files in `public/fonts/`. Seven distinct project motifs are original SVG/UI concepts and explicitly labeled: search graph, terminal, freight routes, battery analytics, fulfillment workflow, meeting phone and traffic intersection. No portrait or project screenshots were fabricated. The résumé is Brett's actual supplied PDF; approved public profile links remain in the footer. Contact retains its existing honest unconfigured state.
