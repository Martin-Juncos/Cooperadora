# UI UX Pro Max Priority Checklist

Use this checklist for UI/UX review and implementation in `Cooperadora`.

## 1. Accessibility

- Normal text contrast should be at least 4.5:1.
- Large text contrast should be at least 3:1.
- Focus states must be visible.
- Labels must use `for` and match input IDs.
- Do not rely on color alone to communicate meaning.
- Keep `aria-label` and `aria-selected` aligned with visual state.

## 2. Touch And Interaction

- Buttons and inputs should be at least about 44px tall.
- Clickable controls need enough spacing to avoid mistaps.
- Primary actions must show disabled/loading feedback during async work.
- Do not rely on hover-only states.
- Use native controls where they already solve the interaction well.

## 3. Forms And Feedback

- Keep visible labels; placeholders are not labels.
- Required fields must match active movement type.
- Reveal conditional fields only when needed.
- Place error or recovery messaging near the affected flow when possible.
- Confirm successful submission clearly.
- Avoid overwhelming the form with explanatory text.

## 4. Layout And Responsive

- Preserve `viewport` mobile support.
- Avoid horizontal scroll.
- Keep field order aligned with real data entry.
- Use the existing compact card layout unless there is a clear UX reason.
- Test around the existing `420px` breakpoint.
- Text must wrap or truncate intentionally without breaking controls.

## 5. Typography And Color

- Keep body input text readable on mobile.
- Keep labels visually distinct from values.
- Use existing CSS variables before adding colors.
- Preserve income/expense semantics.
- Avoid raw one-off colors unless they become a named variable.

## 6. Performance And Stability

- Do not add heavy libraries for small UI improvements.
- Avoid layout shifts when toggling Entrada/Salida fields.
- Reserve stable dimensions for controls that change text.
- Keep third-party scripts limited to what the app needs.

## 7. Animation

- Use animation only when it clarifies state.
- Keep durations short, roughly 150-300ms.
- Respect `prefers-reduced-motion` if adding motion.
- Avoid animating layout properties such as width/height for routine UI.

## 8. Navigation And Orientation

- The login/app state switch must remain obvious.
- The active tab must be visually and semantically clear.
- Logout must remain reachable.
- Do not introduce navigation patterns that complicate this single-flow app.

## 9. Charts And Data

- Only add charts if the product need is explicit.
- Provide readable labels, legends, and exact values.
- Avoid color-only meaning.
- Keep data visualizations secondary to movement registration unless the scope changes.

## Cooperadora Acceptance Check

Before finishing, answer:

- Can a non-technical user complete Entrada and Salida without guessing?
- Is the active movement type unmistakable?
- Are all audit-relevant fields preserved?
- Does the layout remain comfortable on a phone?
- Did the change avoid new dependencies and unnecessary visual noise?
