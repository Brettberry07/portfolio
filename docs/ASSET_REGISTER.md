# Asset register and acquisition

This register is for **production assets only**; visual inspiration screenshots in `docs/references/` must never be copied into the published site.

| Asset | Intended path | Status | Source / license / notes |
|---|---|---|---|
| Hero architectural sculpture | `public/models/hero-architecture.glb` | Implemented | Innerscene Abstract loop sculpture, CC0; 159 KB GLB, 12 shared mesh instances. See `public/models/ATTRIBUTION.md` |
| Hero poster/fallback | `public/images/hero-poster.webp` | Implemented | Transparent render exported from the actual portfolio canvas |
| Brett portrait | `public/images/about-brett.jpg` | Missing | User supplied only |
| Resume | `public/resume/brett-berry-resume.pdf` | Missing | User-supplied current PDF only |
| Seven project hero images | `public/images/projects/{slug}.*` | Missing | User supplied or license-cleared; respect confidential clients |
| Small geometric motifs | CSS/SVG in About, project art and Experience | Implemented | Original geometric artwork; quiet static organic accent beside the portrait slot |
| Studio HDRI (optional) | `public/hdr/neutral-studio.hdr` | Optional | e.g. CC0 from Poly Haven, record exact source |

## Sourcing / optimization rules

1. Current priority: the user-specified Abstract Cubes by Andyleth, then Brutalist Sculpture by tblunden, both CC BY 4.0. Normal downloads require Sketchfab authentication; neither is installed. Retain the existing cleared mesh until an authorized archive is supplied. Exact source and manual steps: `public/models/ATTRIBUTION.md`.
2. Document asset origin, author, source URL, licensing (including attribution), original size, optimization performed, and final size.
3. Prefer `.glb`/glTF for interactive objects; use `gltfjsx` when mesh-level React control is useful.
4. Compress model/texture payloads; use reasonable DPR and a static WebP fallback on constrained devices.
5. Never use the 3rd-party Dribbble reference screenshots as public portfolio assets.
6. Reserve visual slots at their correct aspect ratios; a missing real portrait is not permission to fabricate one.
7. Don't ship unoptimized HD images or >multi-megabyte models without measuring performance and offering a fallback.

## Input checklist

- [ ] Portrait photograph
- [ ] Resume PDF
- [ ] One to three media assets per project
- [ ] Links/GitHub/demo for relevant projects
- [ ] A hero 3D asset or approved procedural sculptural direction
- [ ] Sources/licenses recorded for downloaded assets

## Implementation provenance — 2026-10-20

The current user request prioritizes a premade asset over the register’s earlier procedural preference. The acquired CC0 loop mesh is re-composed into a ribbed architectural sculpture; texture stripping reduces 1,165,896 bytes to 158,676 bytes. Exact author/source/license, transformations and reproduction script are recorded in `public/models/ATTRIBUTION.md`. Inter Tight (variable, Latin) and DM Mono (Latin) are self-hosted WOFF2 files; their SIL Open Font License files are in `public/fonts/`. No portrait, résumé or project screenshots have been fabricated. Approved public profile links now appear in the footer; Contact remains unchanged.

## Refinement assets

The updated hero poster depicts the retained loop mesh in matte charcoal. Seven project motifs are distinct original SVG/UI concept illustrations: search graph, syntax/terminal, freight routes, battery analytics, fulfillment workflow, meeting phone, and traffic intersection. They are labeled as concepts. Neither requested Sketchfab model was installed; both official downloads require sign-in.
