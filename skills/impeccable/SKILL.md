---
name: impeccable
description: Use when working on frontend UI design, redesign, polish, critique, audit, responsive layout, visual hierarchy, accessibility, typography, spacing, color, motion, UX copy, forms, empty states, or design-system consistency. Adapted locally from pbakaus/impeccable for this repository. Not for backend-only, Apps Script-only, or data-contract-only tasks unless the change affects UI.
---

# Impeccable

Design and polish frontend interfaces with production-grade care.

This local skill is inspired by `pbakaus/impeccable` and adapted for the `Cooperadora` project. Use it as a design-quality checklist and workflow, not as a dependency installer.

## Setup

1. Read `AGENTS.md`.
2. Inspect the current UI files before changing anything:
   - `index.html`
   - `styles.css`
   - `script.js` if the UI behavior changes
3. Read `references/design-rules.md` when the task involves visual redesign, responsive behavior, polish, accessibility, or form UI.
4. Preserve the current project shape: static HTML, global CSS, vanilla JS.

## Project Register

Treat this project as product UI / internal administrative tooling:

- favor clarity, legibility, and low-friction data entry
- keep the interface sober and trustworthy
- avoid marketing-page flourishes
- prioritize mobile reliability because the form may be used during real work

## Workflow

1. Define the user task in one sentence.
2. Identify whether the surface is a form, login state, header, feedback message, or responsive layout.
3. Improve only the affected UI surface.
4. Check visual hierarchy, text contrast, spacing, field labels, focus states, and mobile behavior.
5. Verify that existing IDs/classes used by `script.js` remain intact.
6. Run `node --check script.js` if JavaScript changed.
7. Manually verify the affected form flow in browser when possible.

## Commands as Local Modes

Use these modes when the user mentions them or asks for equivalent work:

- `audit`: find UI, accessibility, responsive, and clarity issues.
- `polish`: refine spacing, contrast, hierarchy, labels, focus, and final visual consistency.
- `critique`: review the UX and explain the most important weaknesses before changing code.
- `harden`: fix overflow, required states, edge cases, disabled/loading states, and mobile issues.
- `clarify`: improve visible copy without changing business meaning.
- `adapt`: improve responsive behavior across mobile, tablet, and desktop.
- `distill`: remove unnecessary UI noise and simplify the surface.
- `colorize`: adjust color roles while preserving contrast and the sober administrative tone.
- `typeset`: improve font sizing, line-height, label hierarchy, and text wrapping.

## Local Guardrails

- Do not introduce React, Tailwind, component libraries, icon libraries, or build tooling for design-only work.
- Do not replace the existing app structure unless explicitly requested.
- Do not remove accessibility attributes without replacing them with equal or better semantics.
- Do not hide required business fields for visual cleanliness.
- Do not use decorative gradients, glassmorphism, excessive shadows, nested cards, or oversized rounded corners.
- Keep changes compatible with the current Google Sheets payload contract.

## Verification

For UI changes, verify:

- page loads without console errors
- login and app views still switch correctly
- Entrada/Salida tabs still toggle fields correctly
- required fields still match the active movement type
- text does not overflow on mobile
- focus styles remain visible
- contrast remains readable
- `node --check script.js` passes if JavaScript changed
