# Asset register and acquisition

This register covers **production assets**. Inspiration screenshots in `docs/references/` must never be copied into the published site.

| Asset | Intended path | Status | Source / license / notes |
|---|---|---|---|
| Hero architectural frames | `public/models/geometric-frames.glb` | Implemented | Brett-supplied Omer OBJ; CC BY 4.0; five alternating white/orange rectangular frames and both black curved surfaces, 30,740 triangles, 580,596 bytes. Original arrangement retained. Attribution and reproduction: `public/models/ATTRIBUTION.md` |
| Hero poster/fallback | `public/images/hero-poster{,-tablet,-mobile}.webp` | Implemented | Three responsive transparent renders exported from the portfolio's actual canvas; same source attribution applies |
| Brett portrait | `public/images/about-brett.jpg` | Missing | User-supplied only; clean replaceable portrait slot remains |
| Résumé | `public/resume/brett-berry-resume.pdf` | Implemented | Brett's supplied current PDF; 55,171 bytes, one page; exact byte match to original |
| Seven project hero images | `public/images/projects/{slug}.*` | Missing | User-supplied or license-cleared; respect confidential clients |
| Geometric / organic motifs | CSS/SVG in homepage sections and project art | Implemented | Original lightweight decorative artwork; no third-party reference images copied |
| Experience trade globe / double AA batteries | `src/components/sections/ExperienceIllustrations.tsx` | Implemented | Original inline SVG line art authored for Brett’s October 21 experience brief. Supplied globe image used only as a composition reference; no reference bitmap published. |
| Toolkit technology icons | `src/components/sections/Toolkit.tsx`, `public/icons/toolkit/*.svg` | Implemented | Ten SVG marks supplied by Brett in chat (Next.js, Python, TypeScript, PostgreSQL, JavaScript, Tailwind CSS, SQL, C++, Rust, Rails), cleaned of empty carrier groups/IDs and normalized to currentColor. Original path geometry/viewBoxes retained; masks inherit the category palette. Supplied markup carries SVGRepo identifiers; individual source URLs/license metadata were not provided. Seven remaining glyphs use the existing ISC-licensed `lucide-react` dependency. |
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

The current hero uses Omer's full premade geometry under CC BY 4.0. On 2026-10-21 Brett supplied the OBJ again with a reference showing white parallel frames and a black winding line. The 3.81 MB OBJ is reduced to a 580 KB GLB by discarding unused UV/material data and indexing vertices. All seven polygon components and their relative placement remain; only independent free-form B-spline metadata is excluded. The scene uses alternating porcelain/orange frame materials, a charcoal line and studio lighting. The source archive remains outside the public directory.

The previous Andyleth Abstract Cubes (CC BY 4.0, 42.7 KB selected stepped mesh) and Innerscene loop (CC0, 159 KB) remain documented as superseded assets. Neither is the current hero.

Inter Tight and DM Mono are self-hosted WOFF2 fonts with SIL Open Font License files in `public/fonts/`. Seven distinct project motifs are original SVG/UI concepts and explicitly labeled: search graph, terminal, freight routes, battery analytics, fulfillment workflow, meeting phone and traffic intersection. No portrait or project screenshots were fabricated. The résumé is Brett's actual supplied PDF; approved public profile links remain in the footer. Contact retains its existing honest unconfigured state.
