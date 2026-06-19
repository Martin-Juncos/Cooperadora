# Impeccable Design Rules

Use these rules when polishing or reviewing UI in this project.

## Color

- Body text should be high contrast against the background.
- Avoid pale gray text on tinted backgrounds.
- Use existing CSS variables in `:root` before adding new colors.
- Keep income/expense color roles clear and consistent.
- Do not make the palette decorative or one-note.

## Typography

- Keep labels short and clear.
- Use readable body text sizes; avoid tiny helper text.
- Keep headings proportional to the small form surface.
- Avoid dramatic hero-scale typography inside the app card.
- Prevent long text from overflowing on mobile.

## Layout

- Preserve the compact single-form workflow.
- Use cards only for the main form/login surfaces, not nested decorative panels.
- Maintain stable field spacing and predictable tab behavior.
- Prefer simple grid/flex layout already present in `styles.css`.
- Test around the existing `420px` breakpoint.

## Forms

- Labels must remain visible.
- Required fields must match the active tab.
- Inputs should have visible focus states.
- Loading/disabled submit states must remain clear.
- Field order should follow the user's real data-entry flow.

## Motion

- Avoid adding motion unless it improves clarity.
- If motion is added, respect `prefers-reduced-motion`.
- Do not gate content visibility on animation.

## Anti-Patterns

- No nested cards.
- No decorative glass effects.
- No huge soft shadows on bordered elements.
- No gratuitous gradients.
- No over-rounded cards or inputs.
- No generic marketing layout patterns for this operational tool.
- No UI copy that explains obvious controls.

## Acceptance Check

Before finishing a UI change, ask:

- Can a user register a movement faster and with less doubt?
- Is the form still legible on a phone?
- Did the change preserve the existing business rules?
- Does it still feel like a trustworthy administrative tool?
