# Spec Templates

## Required Artifact Paths

- `docs/requests/<request-id>/spec/spec.md` and `spec/clarifications.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/spec/spec.md` and `spec/clarifications.md` for split PRD-driven work

## `spec/spec.md` or `module-runs/<module-id>/spec/spec.md`

When `requirements/requirement-map.md` exists, treat it as a required upstream input for PRD-driven requests and preserve its module boundaries, source traceability, and carry-forward checklist in the spec.
When `design/page-design.md` or `module-runs/<module-id>/design/page-design.md` exists, treat it as a required upstream input and carry its layout, hierarchy, styling, and interaction decisions into the spec instead of redefining them from scratch.
When `design/architecture-design.md` or `module-runs/<module-id>/design/architecture-design.md` exists, treat it as a required upstream input and carry its module boundaries, file structure, dependency direction, function structure, data structures, and type decisions into the spec instead of redefining them from scratch.
The acceptance criteria must function as the request's operational goal contract: concrete, observable, and preferably machine-checkable rather than subjective.

Required sections:

- delivery unit identifier
- background and goals
- in scope
- out of scope
- trigger and start conditions
- requirement split summary
- user intent contract
- user flow
- page and module design
- frontend styling constraints
- function-complete behavior breakdown
- design constraints
- project bootstrap and scaffold decision
- change axes and pattern decision
- code context and impact assumptions
- API and data contracts
- context and dependency sources
- edge cases
- acceptance criteria
- human review and handoff
- risks

## `user intent contract`

Required when the request or requirement-analysis artifact contains intent that can be superficially satisfied.

Document:

- literal request
- practical goal
- success criteria
- forbidden interpretations
- acceptable approaches
- verification and review checks

Do not leave practical intent as chat-only context.

## `API and data contracts`

For every material backend integration in scope, describe:

- contract source
  - backend TypeScript declaration
  - protobuf
  - OpenAPI or conventional API document
  - field table or other approved source
- endpoint purpose
- request method and path when applicable
- request parameters or body shape
- response shape
- field semantics that affect UI behavior
- required, optional, nullable, repeated, enum, or default-value semantics when material
- error, empty, loading, and success semantics that the frontend must honor
- whether the frontend uses the backend contract directly or through an adapter or mapper boundary
- if an adapter exists, what semantic normalization happens there

Typing rules that the spec must preserve:

- if the backend provides TypeScript declarations, use them as the preferred contract types
- if the backend does not provide TypeScript declarations, preserve backend field names and express field types using valid TypeScript types
- if the source contract is protobuf, state whether generated types already exist or whether TypeScript-facing types will be derived from protobuf definitions

## `function-complete behavior breakdown`

This section is required whenever the scoped work includes concrete frontend behavior. Describe the same behavior granularity that downstream `plan` must preserve.

At minimum, break down each scoped page, module, panel, drawer, modal, card, form, table, display block, or workflow into the subfunctions that together make the approved feature complete.

When applicable, include:

- forms: purpose, field list, required/optional semantics, control expectations, validation expectations, editable/disabled/hidden states, submission behavior, success/failure/loading outcomes, and any input-normalization semantics that implementation would otherwise need to guess
- tables: purpose, column intent, row actions, batch actions, state handling, and display expectations
- display content: field groups, layout intent, formatting expectations, and visibility rules
- interactions: trigger, preconditions, UI change, side effect, confirmation, pending/loading behavior, and completion conditions
- workflows: start, steps, branch conditions, state transitions, retry/rollback path, and handoff points

For text input controls, the spec must not stop at PRD-explicit constraints only. It must explicitly state the effective input semantics whenever implementation would otherwise need to infer them, including when relevant:

- whether values are preserved raw, trimmed, or otherwise normalized
- how whitespace-only input is handled
- how values that become empty after normalization are handled
- whether length validation counts the raw value or the normalized value
- how leading whitespace, trailing whitespace, consecutive whitespace, line breaks, pasted content, and illegal characters are handled
- when validation and error presentation are triggered, such as during input, on blur, or on submit

If any material detail is unknown, record it in `spec/clarifications.md` and reference the approved assumption or open question directly from the spec.
If the source module files already contain explicit fields, columns, interactions, states, or workflow rules, the spec must carry them forward instead of collapsing them into higher-level prose.

## `frontend styling constraints`

This section is required when the scoped work adds or changes authored styling.

At minimum, describe:

- styling must use Tailwind CSS-style utility classes
- no new scoped CSS, CSS modules, Sass/Less blocks, inline style objects, or non-utility semantic class names may be used for authored styling
- `class`, `className`, and class-binding values must stay reviewable inline and must not exceed the project's normal formatter line width or require multi-line wrapping
- overlong class values must not be moved into constants, maps, computed properties, helper functions, or imported variables
- conditional class bindings may only express small state toggles; long base styles must be reduced, split into smaller markup, or moved into a smaller component boundary

## `project bootstrap and scaffold decision`

This section is required when the scoped work starts a project, app, package, or frontend surface from scratch.

At minimum, describe:

- whether a suitable project-type scaffold or starter already exists
- which scaffold or starter will be used by default
- if no scaffold will be used, why it is unsuitable, unavailable, or intentionally rejected
- what approved deviations from the chosen scaffold are allowed during implementation
- which bootstrap choices are fixed upstream and must not be re-decided in `plan` or `execute`

## `spec/clarifications.md` or `module-runs/<module-id>/spec/clarifications.md`

Required sections:

- question
- answer
- final decision
- affected spec area
