---
name: design-taste-frontend
description: "Use when frontend work needs stronger design taste and anti-slop discipline: redesigns, landing pages, portfolios, UI polish, layout, typography, spacing, motion, density, visual hierarchy, or avoiding generic AI-looking interfaces. Adapted locally from Leonxlnx/taste-skill. Skip for backend-only, Apps Script-only, Google Sheets payload-only, login configuration, or non-visual form logic tasks."
---

# Taste Skill

Apply anti-slop frontend taste to UI work.

This local skill is inspired by `Leonxlnx/taste-skill` and adapted for the `Cooperadora` repository. Use it to prevent generic AI-looking design decisions while preserving the existing static HTML/CSS/JS architecture.

## Setup

1. Read `AGENTS.md`.
2. Inspect the relevant UI files:
   - `index.html`
   - `styles.css`
   - `script.js` if interaction behavior changes
3. Read `references/anti-slop.md` before redesign, polish, layout, spacing, typography, or motion work.
4. Preserve this repo's stack: static HTML, global CSS, vanilla JS.

## Design Read

Before changing UI, write a one-line design read for yourself:

`Reading this as: [surface] for [audience], with a [design language], leaning toward [implementation direction].`

For this repo, the default read is:

`Reading this as: a small administrative money-movement form for school cooperative staff, with a sober institutional product UI language, leaning toward simple HTML/CSS and restrained interaction polish.`

## Local Dials

Use these defaults unless the user asks for a stronger visual direction:

- `DESIGN_VARIANCE: 3` - keep structure familiar and low-risk.
- `MOTION_INTENSITY: 2` - mostly static, with only meaningful state feedback.
- `VISUAL_DENSITY: 5` - compact enough for repeated data entry, not cramped.

## When To Use

- UI feels generic or unfinished.
- A redesign or polish pass is requested.
- Layout, spacing, hierarchy, typography, or color need taste-level judgment.
- The user asks for something "better looking", "menos generico", "mas profesional", or equivalent.
- A frontend design choice could drift into common AI defaults.

## When To Skip

- Data payload changes.
- Apps Script logic.
- Google OAuth configuration.
- Field validation or business rules with no visual impact.
- Pure documentation or Git tasks.

## Workflow

1. Infer the design read.
2. Set the three dials.
3. Audit for generic AI defaults.
4. Improve the smallest coherent surface.
5. Preserve functional IDs/classes used by `script.js`.
6. Verify mobile layout, touch targets, contrast, focus states, and form flow.
7. Run `node --check script.js` if JavaScript changed.

## Local Guardrails

- Do not add dependencies for visual taste alone.
- Do not introduce Tailwind, React, icon libraries, or animation libraries unless explicitly requested.
- Do not use decorative gradients, generic glass cards, repeated feature-card grids, emoji icons, or oversized rounded corners.
- Do not over-design this operational tool into a marketing page.
- Do not hide required fields or audit-relevant information.
- Do not invent fake data, fake metrics, fake branding, or fake assets.

## Verification

For UI changes, check:

- active Entrada/Salida state is unmistakable
- all required fields remain visible and usable
- labels and input text are readable
- no horizontal overflow on mobile
- focus and disabled states remain clear
- the interface feels calmer, clearer, or more intentional than before
