# Frontend Architecture Policy

## Scope

This policy defines stable frontend architecture standards that stage subskills may apply during spec, plan, execute, review, and verification.

## Standards

- Separate page containers, business components, and shared components by responsibility.
- Keep each file or module focused on a single clear purpose where practical.
- Split complex business logic into focused hooks or modules instead of growing page files indefinitely.
- Prefer explicit data flow and ownership over convenience coupling.
- Keep shared abstractions stable, documented, and reusable across requests.
- Before adding or changing business logic, scan the scoped feature chain and nearby modules for existing equivalent rules, validators, adapters, mappers, payload builders, formatters, status mapping, option builders, permission checks, and state-derivation helpers.
- Treat repeated business rules, repeated data normalization, repeated validation, repeated payload construction, repeated request-result adaptation, or repeated state-transition logic as architecture findings, not local style issues.
- Treat duplication as a reuse candidate, not automatic permission to abstract. Wrong abstraction is usually more expensive than tolerated duplication.
- When two production modules implement similar logic, record the candidate and evaluate it. Do not extract solely because the code looks the same.
- Extract shared logic only when the same semantic rule is stable enough, appears in three or more real production use sites, or an already-approved architecture artifact proves a smaller extraction is safer than continued duplication.
- Extract shared logic at the lowest stable ownership level that all real production callers can depend on without reversing dependency direction.
- Do not create shared abstractions for incidental syntactic similarity, one-off formatting, or hypothetical reuse; the shared unit must represent the same domain rule or stable technical boundary.
- Shared functions must keep behavior explicit, typed, and testable. Prefer pure functions for rules and transformations, and keep requests, state writes, navigation, analytics, cache writes, and UI side effects outside shared pure helpers.
- When extracting common logic, migrate all in-scope production callers and update tests as consumers of the shared contract instead of leaving duplicate legacy paths behind.
- A behavior-preserving shared extraction is allowed when it is code-fact-backed by existing duplicate production logic and inside the approved change chain; it does not require new product scope because it changes structure, not behavior.
- If the extraction would change user-visible behavior, API semantics, permissions, validation meaning, persistence, or ownership boundaries, route the decision back to `spec` or the front-loaded confirmation gate.

## Anti-DRY Decision Matrix

Keep duplication intentionally when any of these conditions is true, and record the reason in the architecture artifact:

- Different business semantics: code looks identical but represents different domain concepts, change cadence, permissions, or policy owners, such as order creation time versus user birthday.
- Different architectural layers: UI-layer helpers, service-layer helpers, request-layer adapters, and storage-layer utilities must not share code when doing so reverses or blurs dependency direction.
- Fewer than three real production use sites: two copies are candidates for observation, not automatic extraction, unless the approved architecture artifact proves the abstraction is already stable and safer.
- Unstable change points: MVP, experimental, or rapidly changing requirements should delay abstraction until the variation dimensions become clear.

When duplication is kept, name each local function by its real domain purpose and, when useful, add a short comment or artifact note that the duplication is intentional.

## Commonality Classification

Classify the commonality before choosing the target owner:

- Technical or infrastructure commonality: business-agnostic stable utilities belong under the project's shared utility or shared hook owner, such as date parsing, base64, debounce, or primitive formatting.
- Business or domain commonality: project-specific rules belong under a domain-shared service, mapper, adapter, or micro-kernel owner with explicit domain language.
- UI or design-system commonality: repeated visual or interaction structures belong in shared UI components, not generic utility functions.
- Configuration commonality: enums, status-code maps, regular expressions, feature flags, thresholds, and other real rules belong under the narrowest stable constants owner.

Do not collapse these categories into one `shared/utils` dumping ground.

## Abstraction Strategy

When extraction is approved:

- Shared layers provide mechanisms; business modules provide policies.
- Shared modules must not import business modules.
- Pass business variation through parameters, dependency injection, getters, configuration objects, higher-order functions, or strategy objects.
- Shared utility functions should accept primitives, framework-neutral values, generic type parameters, or stable shared contracts. They must not require a feature module's private `Order`, `User`, `Product`, or similar entity type.
- If module data shapes differ, map them in the business module through an adapter or thin wrapper before calling shared code. Do not create a large union type in shared code just to merge unrelated module interfaces.
- Shared pure helpers must not directly call `localStorage`, `window.location`, `fetch`, router navigation, stores, analytics, or other environment side effects. Inject those dependencies or keep the side effect at a command / request / lifecycle boundary.
- New promoted shared APIs must include concise JSDoc with `@see` or `@example` references that show the supported scenarios and known callers. For broadly shared helpers, include at least three representative examples or document why fewer real scenarios exist.

## Abstraction Anti-Patterns

Block these patterns in architecture design, execution, verification, and review:

- God utils: large unrelated collections in `shared/utils/index.ts`, catch-all `utils.ts`, or similar dumping grounds.
- Business entity imports in shared utilities: shared code depending on private feature module interfaces instead of primitives, generics, shared contracts, adapters, or injected getters.
- Environment side effects in shared utilities: direct reads or writes of browser, storage, network, routing, stores, analytics, or process globals.
- Merging interfaces for reuse: broad union types, optional mega-interfaces, or compatibility shapes created only to make unrelated modules call one helper.
- Premature abstractions: shared APIs created from two unstable call sites, MVP-only behavior, or unclear variation axes.

## Promotion Flow

Use this flow for repeated logic:

1. Detect: scan scoped and nearby production code for similar rules, helpers, adapters, mappers, payload builders, and state derivations.
2. Evaluate: identify semantic owner, layer, call-site count, variation axes, stability, dependency direction, and side-effect boundaries.
3. Classify: decide whether the commonality is technical, domain, UI, or configuration.
4. Decide: extract now, reuse existing helper, keep separate intentionally, or defer with follow-up.
5. Promote: only move stable logic to the chosen shared owner after the decision passes the matrix.
6. Trace: document callers, examples, behavior-equivalence verification, and impact surface.

## Reuse Candidate Decision Rules

For every candidate repeated rule or helper, record:

- candidate name and semantic purpose
- current production locations and callers
- evidence that the logic is semantically equivalent or intentionally different
- extraction decision: extract now, keep separate, reuse existing helper, or defer
- target owner path and dependency direction if extracted
- inputs, outputs, type ownership, and side-effect boundary
- migration plan for callers, tests, mocks, and imports
- behavior-equivalence verification method
- Anti-DRY outcome when not extracting

Default decision:

- Extract when the same semantic rule appears in three or more production places, will be touched by the approved request, has stable variation axes, and can be represented without broadening dependencies or hiding side effects.
- Reuse an existing helper when it already has the right semantic owner, API, dependency direction, and behavior contract.
- Keep separate when the rules look similar but have different domain owners, different lifecycle, different layers, different permissions, different API semantics, fewer than three stable use sites, uncertain change points, or expected independent evolution.
- Defer only when the duplicate is outside the approved change chain and touching it would create unsafe collateral scope; record the follow-up instead of silently ignoring it.

## Senior-Engineer Architecture Bar

Architecture is not senior just because it has more layers. Senior-quality frontend code should:

- make the domain rule live in one obvious owner
- keep page files orchestration-focused rather than rule-heavy
- keep adapters and mappers responsible for data semantics
- make dependency direction easy to reason about
- make shared units small enough to test and stable enough to reuse
- tolerate intentional duplication when abstraction would couple different semantics, layers, or unstable change points
- prefer injected strategy / adapter boundaries over shared code that knows feature-specific fields
- avoid broad utility dumping grounds such as `utils.ts` when a domain-specific module name is clearer
- leave a reviewer able to answer where a rule is owned, who calls it, and how behavior equivalence was proved

## Non-Goals

- This policy does not define project-specific package names or directory layouts.
- This policy does not own workflow transitions or artifact formats.
- This policy does not authorize broad cleanup outside the approved change chain.
- This policy does not require extracting incidental similarity or speculative future reuse.
