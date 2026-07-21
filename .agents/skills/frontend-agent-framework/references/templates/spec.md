# Spec Templates

## Required Artifact Paths

- `docs/requests/<request-id>/spec/spec.md` and `spec/clarifications.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/spec/spec.md` and `spec/clarifications.md` for split PRD-driven work

## `spec/spec.md` or `module-runs/<module-id>/spec/spec.md`

When `requirements/requirement-map.md` exists, treat it as a required upstream input for PRD-driven requests and preserve its module boundaries, source traceability, and carry-forward checklist in the spec.
When `design/page-design.md` or `module-runs/<module-id>/design/page-design.md` exists, treat it as a required upstream input and carry its layout, hierarchy, styling, and interaction decisions into the spec instead of redefining them from scratch.
When `design/architecture-design.md` or `module-runs/<module-id>/design/architecture-design.md` exists, treat it as a required upstream input and carry its module boundaries, file structure, dependency direction, function structure, data structures, and type decisions into the spec instead of redefining them from scratch.
The acceptance criteria must function as the request's operational goal contract: concrete, observable, and preferably machine-checkable rather than subjective.
The spec must not expand source material. Every material behavior, field, interaction, state rule, API contract, dependency, acceptance criterion, and implementation constraint must be source-backed, code-fact-backed, confirmed, or safely source-derived.

Required sections:

- delivery unit identifier
- background and goals
- in scope
- out of scope
- trigger and start conditions
- requirement split summary
- source grounding and traceability
- user intent contract
- user flow
- page and module design
- frontend styling constraints
- function-complete behavior breakdown
- expert frontend engineering constraints
- production code quality constraints
- functional-programming constraints
- architecture reuse and shared ownership constraints
- design constraints
- project bootstrap and scaffold decision
- change axes and pattern decision
- code context and impact assumptions
- API and data contracts
- frontend / server responsibility boundary
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

## `source grounding and traceability`

For each material spec item, record:

- spec item
- grounding label: `source-backed`, `code-fact-backed`, `confirmed-decision`, or safe `source-derived`
- source artifact and section, code fact, or confirmation owner
- upstream requirement-analysis or requirement-splitting reference when applicable
- downstream plan obligation

Rules:

- Do not write `missing-source` items as approved behavior.
- Do not turn adjacent modules, sample request content, or conventions into requirements without confirmation.
- `source-derived` items must explain why every plausible interpretation leads to the same spec, plan, implementation, and verification result.
- If the source is missing for material behavior, put it in `spec/clarifications.md` and roll back to the front-loaded confirmation gate when it affects scope, behavior, data semantics, permissions, state flow, frontend/server responsibility, API contract meaning, validation, acceptance, or user intent.

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

## `frontend / server responsibility boundary`

Required when requirement analysis or requirement splitting identified server-owned work, shared contract work, or external-interface pending items.

Document:

- frontend-owned tasks this spec is allowed to implement
- server-owned tasks this spec depends on but must not implement
- shared API / DTO / enum / error-code / permission / workflow-state contract obligations
- external-interface pending items and whether they block frontend implementation
- adapter / mapper / fromDetail boundaries used to isolate frontend semantics from backend contract semantics

Do not convert server-owned responsibilities into frontend implementation requirements. If the frontend can only proceed with a mock, adapter placeholder, feature flag, or assumption, state that explicitly.

## `functional-programming constraints`

Required when the scoped work includes business rules, validation, filtering, sorting, grouping, payload building, detail-to-form mapping, adapter / mapper normalization, view-model construction, or state derivation.

Document:

- rules and transformations that should be pure functions
- data inputs that must be treated as immutable, such as props, backend DTOs, store snapshots, function arguments, and adapter inputs
- approved side-effect boundaries, such as request layer, command function, event handler, store action, or lifecycle hook
- semantic normalization boundaries, especially adapter / mapper / `fromDetail`
- derived state that should not be duplicated as writable state
- whether functional utility libraries or higher-order abstractions are rejected or approved

## `expert frontend engineering constraints`

Required when the scoped work adds or changes user-facing frontend behavior, state flow, data flow, component composition, frontend architecture, or production integration.

Document:

- end-to-end user journey: entrypoints, preconditions, visible states, success, failure, retry, cancellation, and handoff
- state ownership: source state, derived state, form state, server state, route state, cache state, and persistence boundaries
- data lifecycle: backend DTO, adapter / mapper, view model, form model, payload, and response handling
- async correctness: loading owner, dedupe, cancellation, stale response handling, race semantics, idempotency, and retry semantics
- interaction resilience: keyboard, focus, semantic controls, disabled states, destructive confirmations, permission-denied behavior, and actionable feedback
- performance and rendering boundary: render scope, large-list strategy, expensive derivation, bundle impact, and reactive fan-out risk
- evolution safety: extension seams, compatibility boundary, feature flag or migration need, rollback surface, and cleanup trigger
- testability and observability: deterministic units, component interaction coverage, integration seams, useful errors, and debuggable evidence

## `production code quality constraints`

Required when the scoped work adds or changes production code.

Document the required pre-code reasoning order and the concrete constraints that downstream `plan`, `execute`, `verify`, and `review` must enforce:

- type-first contract: data `type` / `interface` ownership, backend type reuse, branded type or equivalent nominal distinction for confusable identifiers when useful, and forbidden broad typing such as unapproved `any`
- fail-fast and clear handling: explicit handling for abnormal, empty, nullable, invalid, timeout, rejected, partial-success, and impossible states
- strict null handling: where `null` and `undefined` have distinct semantics, where `??` / `?.` are appropriate, and where validation must not be replaced by fallback display logic
- maintainability before micro-optimization: readable implementation preference and any approved reason for memoization, caching, debounce, throttle, virtualization, `useMemo`, `useCallback`, computed caching, or watcher-based optimization
- pure functions over classes: deterministic business rules, validators, formatters, transformers, payload builders, status mappers, and state derivation should prefer pure functions and immutable data unless a framework or lifecycle reason justifies a class
- naming and expression rules: booleans use `is` / `has` / `should` / `can`; props callbacks use `on`; internal event handlers use `handle`; data functions use precise verbs such as `get` / `fetch` / `set` / `update` / `transform` / `format` / `check` / `validate`
- no magic variables: helper inputs must come from parameters, dependency injection, or clearly owned local closure state; real configuration constants must live under the narrowest stable domain owner
- boundary UI states: lists need empty state, async operations need loading state, and form inputs need visible error state with concrete copy when the scoped work touches those surfaces

Do not let this section duplicate the functional-programming section. This section owns production-code quality gates; the functional-programming section owns transformation purity, immutability, and side-effect placement in detail.

## `architecture reuse and shared ownership constraints`

Required when the scoped work touches business rules, validation, filtering, sorting, grouping, option building, permission checks, payload construction, status mapping, adapter / mapper normalization, view-model construction, helper logic, or state derivation.

Document:

- existing equivalent production logic found in the scoped feature chain or nearby domain modules
- Anti-DRY decision matrix result, including business semantics, layer, production use-site count, change stability, and variation axes
- shared logic owner: existing helper, new domain helper, hook, mapper, adapter, or explicit local owner
- extraction / reuse / keep-separate / defer decision for each candidate
- reason for keeping separate when logic appears similar
- commonality classification: technical / infrastructure, business / domain, UI / design-system, or configuration / constants
- dependency direction and why the chosen owner does not create cycles or reverse feature ownership
- public API shape for shared functions or hooks
- dependency injection, strategy, getter, adapter, or thin-wrapper boundary for business-specific variation
- migration scope for in-scope callers
- behavior-equivalence verification required downstream
- JSDoc traceability requirement for promoted shared APIs, including `@see` or representative `@example` references

Rules:

- Behavior-preserving extraction based on duplicated production code facts is allowed as an architecture improvement when it is inside the approved change chain and passes the Anti-DRY abstraction matrix.
- Do not introduce user-visible behavior changes under the cover of refactoring.
- Do not defer an approved safe extraction merely because the duplicate appears in another module.
- Do not extract when similarity is only syntactic, when semantics differ, when layers differ, when fewer than three stable production use sites exist without an approved exception, or when variation axes exceed the benefit of abstraction.
- Do not create broad generic `utils` modules when a domain-specific owner is clearer.
- Do not make shared code depend on feature-module private entities, environment side effects, or broad merged interfaces.

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
If a detail is not in source, code facts, or confirmed decisions, the spec must not invent it to make the behavior look complete.

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
- grounding status and required source
