---
name: frontend-design-orchestrator
description: "Use as the first local skill for frontend design work in this repository when a task may involve UI polish, redesign, visual quality, UX review, responsive layout, accessibility, forms, prototypes, style directions, or anti-slop decisions. Orchestrates the local skills impeccable, huashu-design, ui-ux-pro-max, and design-taste-frontend so agents choose the right design workflow without overloading context."
---

# Frontend Design Orchestrator

Coordinate the local frontend design skills for the `Cooperadora` project.

This skill decides which local design skill to load and in what order. It does not replace the specialized skills; it routes the task.

## Setup

1. Read `AGENTS.md`.
2. Inspect the affected files before choosing a design path:
   - `index.html`
   - `styles.css`
   - `script.js` if interaction behavior changes
3. Read `references/routing.md`.
4. Load only the downstream skill(s) needed for the current task.

## Local Skill Map

- `impeccable`: production-grade UI craft, polish, critique, audit, visual hierarchy, accessibility, responsive behavior, motion restraint.
- `huashu-design`: high-fidelity HTML-native prototypes, visual directions, variants, slides, animation demos, infographics, 5-dimensional review.
- `ui-ux-pro-max`: structured UI/UX checklist for accessibility, touch targets, forms, feedback, responsive layout, typography, color, performance, navigation, charts.
- `design-taste-frontend`: anti-slop taste layer; read the brief, set design dials, avoid generic AI defaults, improve layout/typography/spacing/motion taste.

## Selection Rules

- For ordinary UI improvements in the existing app, start with `ui-ux-pro-max`.
- For final visual polish or critique, add `impeccable`.
- For avoiding generic/AI-looking design choices, add `design-taste-frontend`.
- For prototypes, variants, slides, animations, or 5-dimensional design review, use `huashu-design`.
- For large redesigns, sequence: `design-taste-frontend` -> `ui-ux-pro-max` -> `impeccable`.
- For vague design requests, sequence: `design-taste-frontend` -> `huashu-design`.
- For form clarity, sequence: `ui-ux-pro-max` -> `impeccable`.

## Cooperadora Defaults

Default product read:

`Small administrative money-movement form for school cooperative staff; sober, institutional, practical, mobile-friendly.`

Default constraints:

- static HTML/CSS/vanilla JS
- no new frontend framework
- no build step
- no decorative redesign that harms data entry
- preserve Google Sheets payload contract
- preserve IDs/classes used by `script.js`

## Workflow

1. Classify the task: bug, form UX, polish, redesign, prototype, review, accessibility, responsive.
2. Pick the minimum downstream skill set.
3. Read only the selected skill `SKILL.md` files and directly relevant references.
4. Apply the chosen workflow.
5. Verify:
   - UI still supports Entrada and Salida flows
   - mobile width around `420px` still works
   - focus, labels, required states, and submit feedback remain clear
   - `node --check script.js` passes if JavaScript changed

## Do Not

- Do not load every design skill by default.
- Do not combine conflicting visual directions without choosing one.
- Do not introduce dependencies or design systems just because a source skill mentions them.
- Do not convert this app into a landing page aesthetic.
- Do not edit Apps Script or payload contracts for purely visual tasks.
