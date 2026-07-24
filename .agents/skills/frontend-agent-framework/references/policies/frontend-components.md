# Frontend Components Policy

## Scope

This policy defines durable component and interaction standards for frontend implementation work.

## Standards

- Prefer established templates and existing shared components before building page-local variants.
- Keep component names and responsibilities explicit.
- For Vue SFC extraction / keep-inline decisions, use `vue-component-extraction.md`; this policy owns general component consistency and styling mechanics only.
- Keep form, list, modal, and drawer patterns consistent within the product.
- Avoid inline styling when a shared style system or utility class can express the same intent.
- Author new or changed styles only with Tailwind CSS-style utility classes.
- Do not add new scoped CSS, CSS modules, Sass/Less blocks, inline `style` objects, or non-utility semantic class names for authored styling.
- Keep `class`, `className`, and framework class-binding values short enough to review inline. A class value that exceeds the project's normal formatter line width or requires multi-line wrapping is too long.
- Do not move an overlong utility class value into constants, maps, computed properties, helper functions, or imported variables to bypass the class-length rule.
- Conditional class bindings are allowed only for small state toggles. If the base utility list is long, reduce the styling, split the markup, or extract a smaller component boundary instead of hiding the class string elsewhere.
- Maintain responsive and accessible interaction baselines for user-facing flows.

## Non-Goals

- This policy does not lock the repository to volatile one-off component choices.
- This policy does not define request lifecycle behavior.
