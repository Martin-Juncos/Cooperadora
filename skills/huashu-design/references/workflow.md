# Huashu Workflow Reference

Use this reference when a task asks for high-fidelity design, prototypes, visual directions, slides, motion, infographics, or design review.

## Core Philosophy

- Work as a designer using HTML as the medium.
- Match the artifact to the task: a slide should not feel like a web page; an app prototype should not feel like a brochure.
- Start from existing context, assets, and constraints.
- When context is missing, show assumptions early instead of pretending certainty.

## Asset-First Rule

If the design includes a recognizable brand, product, institution, or visual identity:

1. Ask whether the user has official assets.
2. Prefer existing repo assets and screenshots.
3. If external facts or assets are needed, verify them from authoritative sources.
4. Do not guess colors, logos, product screenshots, or release status from memory.
5. If assets are unavailable, use clearly labeled placeholders.

## Vague Request Fallback

When the user says something broad like "make it beautiful", "design this", "give me a style", or gives no strong visual direction:

1. Define the artifact and audience.
2. Produce 3 distinct visual directions:
   - safe and conventional
   - refined and product-appropriate
   - more distinctive or expressive
3. Make the differences visible in layout, density, color, typography, and interaction, not only in labels.
4. Let the user choose or combine directions before doing deep implementation.

## Junior Designer Mode

- State assumptions before committing to a big implementation.
- Show partial structure early when the risk of misunderstanding is high.
- Prefer placeholders over low-quality fake assets.
- Iterate from structure to content to details.

## Variants

Use variants when exploring:

- visual direction
- color strategy
- information density
- interaction model
- mobile layout
- motion behavior

Keep variants comparable: same content, different design decisions.

## Five-Dimensional Review

Score each dimension from 0 to 10 and include concrete reasoning:

- Philosophy fit: does the design match the product, audience, and context?
- Visual hierarchy: can users see what matters first?
- Execution detail: spacing, alignment, typography, states, and polish.
- Functionality: does the interface support the real task?
- Originality: does it avoid generic AI/default design reflexes?

End with:

- Keep: what is already working.
- Fix: highest-impact issues.
- Quick Wins: small changes with visible payoff.

## Anti-Slop Rules

- Avoid filler content.
- Avoid decorative stats, icons, and gradients.
- Avoid generic SaaS layouts for operational tools.
- Avoid fake screenshots, fake data, or fake claims.
- Avoid using animation as a substitute for clarity.
- Avoid overly rounded cards and nested card structures.
- Avoid visual choices that erase the actual domain.

## Cooperadora Adaptation

This repository is a real administrative form for cooperative money movements.

Design choices should:

- reduce doubt while entering movements
- make Entrada and Salida states unmistakable
- preserve audit-relevant fields
- keep form completion fast
- remain readable on phones
- feel institutional, not promotional
