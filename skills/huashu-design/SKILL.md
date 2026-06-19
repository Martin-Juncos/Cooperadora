---
name: huashu-design
description: "Use when the user wants high-fidelity HTML-native design work: interactive prototypes, visual mockups, design variants, HTML slides, motion demos, infographics, style directions, design critique, or 5-dimensional review. Adapted locally from alchaincyf/huashu-design. Do not use for backend-only work, Apps Script-only changes, or routine form logic unless the task is about visual design or prototype quality."
---

# Huashu Design

Create high-fidelity HTML-native design artifacts with a designer mindset.

This local skill is inspired by `alchaincyf/huashu-design` and adapted for the `Cooperadora` repository. Use it for design exploration and visual artifacts, not as an installer or as a reason to add heavy tooling.

## Setup

1. Read `AGENTS.md`.
2. Inspect existing UI context:
   - `index.html`
   - `styles.css`
   - `script.js` if interactions change
3. Read `references/workflow.md` before doing prototype, variant, animation, slide, infographic, or design-review work.
4. Preserve the repository stack unless explicitly requested: static HTML, global CSS, vanilla JS.

## Use This Skill For

- high-fidelity HTML prototypes
- clickable app or web mockups
- design variants and style directions
- HTML-native presentation slides
- timeline or motion demos
- infographics and data visualization layouts
- visual critique or 5-dimensional review
- turning a vague design request into 3 concrete visual directions

## Do Not Use This Skill For

- Google Sheets payload changes
- Apps Script-only logic
- login configuration
- backend/data contract work
- small bug fixes with no visual design decision
- production rebuilds that would require React, bundlers, or extra infrastructure

## Local Register

For this project, treat Huashu as a high-fidelity design mode for an operational tool:

- make data entry clearer, faster, and calmer
- avoid spectacle unless the user asks for a prototype/demo artifact
- use real project constraints and business rules
- keep trust and legibility above novelty

## Workflow

1. State the intended artifact: prototype, variant set, slide, animation, infographic, review, or polish pass.
2. Gather existing context and assets first; do not invent brand identity from nothing.
3. If the request is vague, present 3 distinct directions before implementing a final visual route.
4. Use honest placeholders when assets or data are missing.
5. Build in HTML/CSS/JS using existing repo conventions.
6. For design reviews, score across:
   - philosophy fit
   - visual hierarchy
   - execution detail
   - functionality
   - originality
7. Verify responsive behavior and interaction states.

## Guardrails

- Do not add fake metrics, fake data, or decorative content to fill space.
- Do not use weak hand-drawn SVGs as a fallback for real assets.
- Do not default to purple gradients, emoji iconography, glass effects, or generic SaaS cards.
- Do not treat a production app change as a throwaway prototype.
- Do not hide required fields, business rules, or audit-relevant information for visual drama.
- Do not export video, GIF, PDF, or PPTX unless the user explicitly asks.

## Verification

For UI/prototype changes:

- check the page in browser when possible
- test mobile width around the existing `420px` breakpoint
- verify labels, required states, focus states, and submit states
- ensure Entrada/Salida rules still work if the form changes
- run `node --check script.js` if JavaScript changes

For review-only work:

- lead with actionable findings
- separate Keep, Fix, and Quick Wins
- avoid vague aesthetic comments without a concrete change
