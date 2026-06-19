# Frontend Design Skill Routing

Use this reference to choose the smallest useful skill combination.

## Quick Routes

| User asks for | Use |
| --- | --- |
| "mejorar la UI", "pulir", "hacer mas profesional" | `ui-ux-pro-max` + `impeccable` |
| "se ve generico", "que tenga mejor gusto", "anti-slop" | `design-taste-frontend` |
| "audita la interfaz", "review de UX", "que problemas ves" | `ui-ux-pro-max` + `impeccable` |
| "redisenar toda la pagina" | `design-taste-frontend` + `ui-ux-pro-max` + `impeccable` |
| "prototipo", "variantes", "3 direcciones", "mockup" | `huashu-design` + `design-taste-frontend` |
| "mobile", "responsive", "no entra en celular" | `ui-ux-pro-max` |
| "formulario mas claro", "campos", "errores", "feedback" | `ui-ux-pro-max` + `impeccable` |
| "slides", "animacion", "infografia" | `huashu-design` |

## Route Details

### Existing Form UX

Use when changing Entrada/Salida fields, required states, labels, layout, mobile spacing, or feedback.

1. Load `skills/ui-ux-pro-max/SKILL.md`.
2. Load `skills/ui-ux-pro-max/references/priority-checklist.md`.
3. If the change is visual polish, also load `skills/impeccable/SKILL.md`.
4. Keep business fields and IDs stable.

### Visual Polish

Use when the app works but feels rough.

1. Load `skills/impeccable/SKILL.md`.
2. Load `skills/impeccable/references/design-rules.md`.
3. If the design risks looking generic, load `skills/taste-skill/SKILL.md`.

### Anti-Slop Redesign

Use when the request is broad or aesthetic.

1. Load `skills/taste-skill/SKILL.md`.
2. Load `skills/taste-skill/references/anti-slop.md`.
3. Declare the design read.
4. Set local dials.
5. Then load `ui-ux-pro-max` for accessibility/form checks.
6. Finish with `impeccable` polish.

### High-Fidelity Prototype Or Variants

Use when the user wants visual directions, prototypes, mockups, slides, or animation.

1. Load `skills/huashu-design/SKILL.md`.
2. Load `skills/huashu-design/references/workflow.md`.
3. If the request is visually vague, also load `taste-skill`.
4. Present 3 distinct directions before deep implementation when ambiguity is high.

## Conflict Resolution

- Product usability beats visual novelty.
- Existing repo constraints beat external skill defaults.
- The Google Sheets payload contract is not a design surface.
- Accessibility and legibility beat motion and effects.
- If two skills disagree, choose the route that best supports fast, accurate movement registration.

## Final Verification

Before closing frontend design work:

- Test Entrada and Salida visibility.
- Confirm labels remain visible.
- Confirm active tab state is clear.
- Confirm mobile width around `420px`.
- Confirm no horizontal scroll.
- Confirm `node --check script.js` if JS changed.
- State any browser or Google Sheets checks that could not be performed.
