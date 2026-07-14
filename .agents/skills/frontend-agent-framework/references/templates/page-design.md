# Page Design Template

## Required Artifact Path

- `docs/requests/<request-id>/design/page-design.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/design/page-design.md` for split PRD-driven work

## `design/page-design.md` or `module-runs/<module-id>/design/page-design.md`

Required sections:

- delivery unit identifier
- page objective
- target users or scenarios
- source and upstream constraints
- layout structure
- visual hierarchy
- section breakdown
- styling direction
- Tailwind CSS-style styling constraints
- class length and structure strategy
- interaction skeleton
- state and feedback model
- responsive behavior
- accessibility and keyboard considerations
- component reuse and split strategy
- design risks
- open UI questions

### `source and upstream constraints`

Document which upstream artifacts shaped this design:

- PRD snapshot or bugfix source
- requirement module, if split
- requirement-analysis decisions, if present
- existing page or component constraints
- product or design-system constraints that must not be re-decided in spec or execute

### `layout structure`

Document:

- page regions
- primary and secondary content hierarchy
- form, table, detail, modal, drawer, card, or toolbar placement
- empty, loading, error, readonly, disabled, and permission-limited layout states when relevant

### `Tailwind CSS-style styling constraints`

Required when the page design adds or changes authored styling.

Document:

- styling must use Tailwind CSS-style utility classes
- no new scoped CSS, CSS modules, Sass/Less, inline style objects, or non-utility semantic class names
- conditional class bindings may only express small state toggles
- any existing project style or component convention that constrains utility choices

### `class length and structure strategy`

Required when layout or styling complexity could produce long class values.

Document:

- where markup should be split into smaller components or subcontainers
- where visual complexity should be reduced
- how class values remain reviewable inline
- confirmation that overlong class values must not be hidden in constants, maps, computed properties, helpers, or imports

### `interaction skeleton`

Document:

- user entrypoints
- click, submit, select, hover, focus, keyboard, and navigation behaviors that shape the spec
- confirmation, cancellation, retry, and disabled behaviors
- loading start and end conditions when visible in UI

### `state and feedback model`

Document:

- empty state
- loading state
- error state
- success feedback
- validation feedback
- permission or readonly state
- pending async operation state

### `component reuse and split strategy`

Document:

- existing shared components or templates to prefer
- page-local components that should be extracted
- component boundaries needed to keep Tailwind class values short and readable
- boundaries that should not be extracted because they would hide simple local behavior
