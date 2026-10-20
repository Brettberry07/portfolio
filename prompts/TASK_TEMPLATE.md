# Reusable focused Codex task prompt

```text
GOAL
[One concrete outcome, e.g. rebuild the selected project-card transition.]

READ ONLY
[AGENTS.md is automatic; reference one relevant doc section and named source files.
Do not ask for a full-repository scan.]

REQUIREMENTS
- [2–5 observable behaviors]

CONSTRAINTS
- Preserve [existing behavior/design/content].
- Only modify [component / related source files].
- Motion owns DOM/UI scroll animation; R3F controls 3D transforms; no ownership conflict.
- Keep mobile, keyboard, and reduced-motion behavior intact.

DONE WHEN
- Targeted checks pass.
- Playwright screenshot at desktop 1440×900 and mobile 390×844 shows the intended result.
- No obvious regressions; summarize changed files and blockers.
```

For major architecture changes, planning may be longer. For routine visual tweaks, keep requests small, include screenshots, and avoid restating the entire design specification.
