# Asset register and acquisition

This register is for **production assets only**; visual inspiration screenshots in `docs/references/` must never be copied into the published site.

| Asset | Intended path | Status | Source / license / notes |
|---|---|---|---|
| Hero architectural sculpture | `public/models/hero-architecture.glb` or procedural scene | Not selected | Build procedurally with R3F, or source a license-checked optimized GLB |
| Hero poster/fallback | `public/images/hero-poster.webp` | Missing | Render/export from the chosen sculpture; no unlicensed screenshot |
| Brett portrait | `public/images/about-brett.jpg` | Missing | User supplied only |
| Resume | `public/resume.pdf` | Missing | User-supplied current PDF only |
| Seven project hero images | `public/images/projects/{slug}.*` | Missing | User supplied or license-cleared; respect confidential clients |
| Small geometric motifs | Procedural lightweight meshes or CSS/SVG | Planned | Echo signature architectural forms |
| Studio HDRI (optional) | `public/hdr/neutral-studio.hdr` | Optional | e.g. CC0 from Poly Haven, record exact source |

## Sourcing / optimization rules

1. First preference: procedurally designed geometric/architectural sculpture using R3F geometry and PBR materials; second: existing GLB from Sketchfab/Poly Haven/CGTrader with an explicit usable license.
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
