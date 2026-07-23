# Architecture Design Template

## Required Artifact Path

- `docs/requests/<request-id>/design/architecture-design.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/design/architecture-design.md` for split PRD-driven work

## `design/architecture-design.md` or `module-runs/<module-id>/design/architecture-design.md`

Required sections:

- delivery unit identifier
- architecture objective
- architecture scope and triggers
- upstream inputs and assumptions
- module boundary design
- file and directory structure
- code relationship and dependency direction
- locality and file-extraction decisions
- reuse candidate inventory
- Anti-DRY abstraction matrix
- commonality classification
- shared abstraction decisions
- dependency injection and strategy boundaries
- responsibility split
- function design and public entrypoints
- functional boundaries and side-effect model
- state ownership and data flow
- data structures and type strategy
- contract and adapter boundaries
- pattern decisions and rejected alternatives
- readability and maintenance guardrails
- architecture risks
- open architecture questions

### `reuse candidate inventory`

Required when the scoped work adds, modifies, or removes business rules, validation, filtering, sorting, option construction, status mapping, payload construction, adapter / mapper normalization, request-result shaping, state derivation, or helper logic.

Document:

- candidate rule or helper
- current production locations and callers
- real production caller count and single-use locality decision
- semantic equivalence evidence
- number of real production use sites
- variation axes, such as field names, units, timezone, precision, permissions, API semantics, lifecycle, and owner
- differences that may require keeping logic separate
- layer ownership, such as UI, service, request, adapter, storage, or shared
- source-grounding or code-fact evidence
- whether the candidate is inside the approved change chain

### `Anti-DRY abstraction matrix`

For every reuse candidate, document whether abstraction is justified.

Keep duplication intentionally when:

- business semantics differ even if code shape is identical
- candidate logic lives in different architectural layers with incompatible dependency directions
- fewer than three stable real production use sites exist and no approved architecture reason justifies early extraction
- change points are still unstable, MVP-driven, or likely to diverge
- variation axes exceed three, making a shared abstraction harder to understand than duplication

When keeping duplication, record the local domain names and why the duplication is intentional. Do not use "different modules" as the only reason.

### `commonality classification`

For every approved extraction, classify the shared unit:

- technical / infrastructure commonality
- business / domain commonality
- UI / design-system commonality
- configuration / constant commonality

Then choose the narrowest stable owner. Do not place unrelated helpers into a broad `shared/utils/index.ts`, catch-all `utils.ts`, or dumping-ground module.

### `shared abstraction decisions`

For every reuse candidate, document:

- decision: extract now, reuse existing helper, keep separate, or defer
- target owner path and module name when extracted or reused
- locality decision when the candidate has one real production caller: colocate in owning file or justify separate file
- commonality type and why the owner path matches that type
- dependency direction and why it does not create a cycle or reverse ownership
- function / hook / mapper / adapter public API
- inputs, outputs, type ownership, and side-effect boundary
- how business variation is injected through parameters, dependency injection, getters, configuration, higher-order functions, strategy objects, adapters, or thin wrappers
- caller migration plan
- tests or verification proving behavior equivalence
- JSDoc traceability plan with `@see` or `@example` references for promoted shared APIs
- rejected alternatives and why they were worse

Rules:

- Extract shared logic when the same semantic rule appears in three or more stable production use sites and the approved change touches that rule, or when an approved architecture artifact proves a smaller extraction is safer than continued duplication.
- Reuse an existing helper when its semantic owner, API, dependency direction, and behavior contract already match.
- Keep logic separate when the artifact records a real domain, layer, lifecycle, permission, API, use-site-count, change-stability, or evolution difference.
- Colocate single-use page-owned logic in the owning page, component, hook, or adapter by default. A one-caller helper may become a separate file only when the artifact records an adapter/service/request boundary, cohesive component or hook lifecycle, independent test surface, framework-required module shape, generated/contract isolation, or unavoidable readability pressure.
- Do not create a broad dumping-ground `utils` module when a domain-specific owner is available.
- Do not create one-function modules, local catch-all `utils.ts` / `helpers.ts`, or single-caller mapper files only to shorten the owning page.
- Do not hide side effects in shared pure helpers.
- Do not import feature-module private entity types into shared utilities.
- Do not merge unrelated interfaces into a broad union or optional mega-interface just to reuse a helper.

### `dependency injection and strategy boundaries`

Required when an approved extraction needs business-specific fields, environment access, side effects, or variation.

Document:

- which stable mechanism lives in shared code
- which business policy stays in the feature module
- injected getters, callbacks, strategy objects, adapters, config objects, or thin wrappers
- side effects that remain outside shared pure helpers
- why the shared API can run in tests without browser, network, router, storage, analytics, or store globals

### `pattern decisions and rejected alternatives`

Required for architecture-sensitive work where a pattern choice affects structure.

Document:

- pattern-fit decision: `direct code`, `reuse existing pattern`, `adapt lightweight pattern`, or `introduce pattern`
- decision depth: Level 0, Level 1, Level 2, or Level 3
- candidate signals found or ruled out
- chosen pattern family, existing project pattern, lightweight frontend shape, or `none`
- file boundary, dependency direction, state owner, side-effect owner, and caller impact
- why direct code is enough, or why direct code would be less maintainable
- rejected alternatives and why they were heavier, weaker, or unsafe
- overengineering guardrail: what would prove this pattern should be removed or simplified later

Rules:

- Do not force a named pattern for small changes or bug fixes when local direct code is clearer.
- Do not use this architecture-sensitive section to mechanically enumerate untriggered pattern families for Level 0 direct-code work.
- Do not keep the decision at a slogan level such as "use Strategy"; specify the concrete variation axis and the smallest frontend-native shape.
- Do not create a manager, handler, factory, adapter, facade, proxy, or strategy layer with only one real variant unless the artifact records a real dependency boundary or lifecycle reason.

### `functional boundaries and side-effect model`

Required when the design includes business rules, validation, data transformation, payload construction, state derivation, adapter / mapper boundaries, or side-effect orchestration.

Document:

- pure functions or pure transformation modules
- command / action / request / lifecycle boundaries where side effects are allowed
- immutable data-flow expectations
- derived state that should not be duplicated as writable state
- rejected functional abstractions or libraries if direct code is clearer
