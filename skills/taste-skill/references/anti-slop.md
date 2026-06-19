# Anti-Slop Reference

Use this reference when a UI change needs stronger taste, less generic output, or a redesign/polish pass.

## Read The Brief First

Before changing visuals, identify:

- surface: form, login, header, feedback, mobile layout
- audience: staff or collaborators registering money movements
- tone: institutional, sober, practical, trustworthy
- constraints: small static app, no build step, Google Sheets contract
- existing assets: current CSS variables, colors, layout, copy

If the design read is unclear, ask one focused question. Otherwise proceed.

## Three Dials

### DESIGN_VARIANCE

- `1-3`: familiar, conservative, administrative
- `4-6`: refined but still conventional
- `7-10`: expressive, asymmetrical, brand/marketing oriented

Default here: `3`.

### MOTION_INTENSITY

- `1-2`: static, only state feedback
- `3-5`: subtle transitions and reveal polish
- `6-10`: cinematic or scroll-driven motion

Default here: `2`.

### VISUAL_DENSITY

- `1-3`: spacious, editorial
- `4-6`: balanced product UI
- `7-10`: dense dashboard or cockpit

Default here: `5`.

## Anti-Defaults

Avoid these unless the user explicitly asks and the product context supports them:

- AI purple/blue gradients.
- Generic centered hero sections.
- Three equal cards with icon + title + paragraph.
- Glassmorphism as decoration.
- Huge soft shadows plus 1px borders.
- Emoji as icons.
- Hand-drawn SVG illustrations.
- Over-rounded cards and inputs.
- Random accent colors that do not match existing tokens.
- Decorative stats or fake metrics.

## Taste Fix Priority

Apply improvements in this order:

1. Clarify hierarchy: what should the user see first?
2. Tighten spacing: group related fields, separate unrelated actions.
3. Improve contrast: text, labels, disabled states, status colors.
4. Refine typography: sizes, weights, line-height, wrapping.
5. Improve interaction states: focus, hover, active, disabled, loading.
6. Reduce noise: remove decoration that does not help the task.
7. Add motion only if it makes state changes clearer.

## Cooperadora-Specific Taste

Good taste in this app means:

- fewer doubts when choosing Entrada vs Salida
- form fields ordered by the real workflow
- money and date inputs easy to complete on mobile
- copy that is direct and institutional
- colors that support meaning, not decoration
- no visual choices that make the form feel like a landing page

## Final Check

Before finishing a taste-driven change, ask:

- Did the UI become clearer, not just prettier?
- Did the change respect existing business rules?
- Did it avoid generic AI visual reflexes?
- Can someone use it quickly on a phone?
- Is the design still appropriate for a school cooperative?
