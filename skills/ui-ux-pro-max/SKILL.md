---
name: ui-ux-pro-max
description: "Use when the task involves UI/UX design intelligence for web interfaces: planning, building, reviewing, fixing, improving, optimizing, or checking visual structure, accessibility, responsive layout, forms, buttons, cards, navigation, typography, color, spacing, interaction states, animation, charts, or perceived product quality. Adapted locally from nextlevelbuilder/ui-ux-pro-max-skill. Not for backend-only, Apps Script-only, Google Sheets payload-only, or login configuration tasks unless the UI/UX changes."
---

# UI UX Pro Max

Apply practical UI/UX design intelligence to frontend work.

This local skill is inspired by `nextlevelbuilder/ui-ux-pro-max-skill` and adapted for the `Cooperadora` repository. Use it as a decision and review framework, not as a CLI installer.

## Setup

1. Read `AGENTS.md`.
2. Inspect the affected UI files:
   - `index.html`
   - `styles.css`
   - `script.js` when interaction logic changes
3. Read `references/priority-checklist.md` before UI review, form work, responsive fixes, accessibility fixes, or visual polish.
4. Preserve the current stack: static HTML, global CSS, vanilla JS.

## When To Use

- designing or improving form layout
- reviewing accessibility or keyboard/touch behavior
- improving mobile responsiveness
- choosing visual hierarchy, spacing, color, or typography
- refining loading, disabled, success, and error states
- improving interaction clarity
- auditing visual consistency before shipping

## When To Skip

- pure Apps Script changes
- Google Sheets column/header contract changes
- authentication parameter changes
- non-visual bug fixes
- repository tooling or Git work

## Priority Order

Follow this order when multiple UX issues compete:

1. Accessibility and contrast.
2. Touch and interaction clarity.
3. Forms and feedback.
4. Layout and responsive behavior.
5. Typography and color.
6. Performance and layout stability.
7. Animation and micro-interactions.
8. Navigation and orientation.
9. Charts and data presentation.

## Local Product Fit

This project is an operational money-movement form. Design choices should optimize:

- fast movement registration
- low ambiguity between Entrada and Salida
- readable labels and values
- touch-friendly mobile use
- trustworthy institutional tone
- clear feedback after submission

Avoid over-styled design systems, decorative effects, and broad visual rewrites unless the user explicitly asks.

## Workflow

1. Identify the UI surface and user flow affected.
2. Apply the priority order above.
3. Make the smallest coherent design change that improves the flow.
4. Keep IDs/classes used by `script.js` stable.
5. Verify responsive behavior around `420px`.
6. Run `node --check script.js` if JavaScript changed.
7. State any manual browser checks that still need to be done.

## Verification

For frontend changes, check:

- visible labels for all fields
- focus states on interactive controls
- minimum touch target size near 44px
- readable contrast
- no horizontal scroll on mobile
- clear disabled/loading submit state
- success/error feedback remains understandable
- Entrada/Salida required fields remain correct
