# Verification Templates

## Required Artifact Paths

- `docs/requests/<request-id>/verification/verification.md` and `verification/evidence/` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/verification/verification.md` and `verification/evidence/` for split PRD-driven work

## `verification/verification.md` or `module-runs/<module-id>/verification/verification.md`

Required top-level sections:

- delivery unit identifier
- acceptance coverage
- user intent compliance
- change-chain integrity
- removal cleanup compliance
- spec constraint compliance
- source grounding compliance
- expert frontend engineering compliance
- architecture reuse compliance
- production code quality compliance
- functional-programming compliance
- frontend styling compliance
- API contract conformance
- TypeScript context compliance
- summary

Required fields for each acceptance item:

- acceptance item id
- verification method
- result
- evidence reference
- follow-up if failed
- handoff status

`user intent compliance` is required when the spec contains a user intent contract. It must include:

- result (`pass` or `fail`)
- literal compliance result
- practical-goal compliance result
- forbidden-interpretation checks
- evidence that complexity, risk, ambiguity, or responsibility was not merely relocated
- follow-up if failed

`change-chain integrity` is required when implementation modifies or removes existing code. It must include:

- result (`pass` or `fail`)
- changed feature chain
- pre-change chain review evidence
- post-change chain validation evidence
- checked entrypoints, files, imports, exports, callers, consumers, side effects, state, tests, and mocks
- test references to changed or removed production code treated as adaptation targets, not production owners
- missing required links found or ruled out
- stale extra links found or ruled out
- neighboring feature impact found or ruled out
- follow-up if failed

`removal cleanup compliance` is required when implementation removes a call, request, branch, field, control, or side effect. It must include:

- result (`pass` or `fail`)
- removed behavior
- checked imports, helpers, constants, types, request wrappers, state, tests, mocks, and comments
- retained helpers and their remaining real production callers
- test-only references found and adapted, not used as retention evidence
- evidence reference
- follow-up if failed

`spec constraint compliance` must include:

- result (`pass` or `fail`)
- checked constraints
- evidence reference
- follow-up if failed

`source grounding compliance` must include:

- result (`pass` or `fail`)
- checked source-grounding labels from spec and plan
- implementation behavior that was confirmed to map back to source-backed, code-fact-backed, confirmed-decision, or safe source-derived items
- ungrounded behavior, neighboring-module expansion, sample-content expansion, or convention-based expansion found or ruled out
- evidence reference
- follow-up if failed

`architecture reuse compliance` is required when the scoped work touches business rules, validation, filtering, sorting, option building, permission checks, payload construction, status mapping, adapter / mapper normalization, view-model construction, helper logic, or state derivation. It must include:

- result (`pass` or `fail`)
- reuse candidates checked
- Anti-DRY matrix verified: semantic owner, layer, production use-site count, change stability, and variation axes
- extraction / reuse / keep-separate / defer decisions verified
- shared owner, dependency direction, public API, and side-effect boundary checks
- commonality classification and target owner checks
- dependency injection / strategy / adapter boundary checks for business-specific variation
- migrated production callers, tests, mocks, imports, and exports
- JSDoc `@see` / `@example` traceability for promoted shared APIs
- duplicate legacy paths found or ruled out
- premature abstraction, God utils, business-entity imports in shared utilities, environment side effects, and merged mega-interfaces found or ruled out
- behavior-equivalence evidence
- follow-up if failed

`expert frontend engineering compliance` is required when the scoped work adds or changes user-facing frontend behavior, state flow, data flow, component composition, frontend architecture, or production integration. It must include:

- result (`pass` or `fail`)
- user journey integrity checks
- state ownership and data lifecycle checks
- async correctness checks for loading, dedupe, cancellation, stale responses, race semantics, idempotency, and retry when applicable
- interaction resilience checks for keyboard, focus, semantic controls, disabled states, destructive confirmations, permissions, and feedback when applicable
- performance and rendering boundary checks
- evolution safety checks for migration, compatibility, rollback, cleanup trigger, or dual-path behavior when applicable
- testability and diagnostic evidence
- follow-up if failed

`functional-programming compliance` is required when the scoped work includes business rules, validation, data transformations, payload construction, state derivation, adapter / mapper normalization, or side-effect orchestration. It must include:

- result (`pass` or `fail`)
- pure rules or transformations checked
- immutable input handling checked
- side-effect boundary checks
- adapter / mapper / `fromDetail` semantic-normalization checks
- hidden mutation or hidden side effects found or ruled out
- readability of functional composition
- evidence reference
- follow-up if failed

`production code quality compliance` is required when production code was added or changed. It must include:

- result (`pass` or `fail`)
- type-first contract checks, including precise type / interface ownership and branded type or equivalent nominal distinctions when needed
- fail-fast checks for abnormal, empty, nullable, invalid, timeout, rejected, partial-success, and impossible states
- strict null checks for `null` / `undefined` distinction and proper use of `??` / `?.`
- naming checks for booleans, callback props, internal event handlers, and function verbs
- no magic variable checks, including helper dependency inputs and configuration constant ownership
- maintainability-first performance checks, including justification for memoization, caching, debounce, throttle, virtualization, `useMemo` / `useCallback`, computed caching, or watcher optimization
- pure function / immutable data checks, including any approved exception for classes or mutable owners
- boundary UI state checks for list empty states, async loading states, and form input error states
- evidence reference
- follow-up if failed

`frontend styling compliance` is required when the scoped work adds or changes authored styling. It must include:

- result (`pass` or `fail`)
- Tailwind CSS-style utility class conformance
- class length and inline reviewability check
- check that overlong class values were not hidden in constants, maps, computed properties, helpers, or imported variables
- evidence reference
- follow-up if failed

`API contract conformance` is required when the scoped work touches backend integration. It must include:

- result (`pass` or `fail`)
- authoritative contract source checked
- request and response shape conformance
- backend-owned TypeScript type reuse, when available
- non-TypeScript contract translation with backend field names preserved, when applicable
- adapter / mapper semantic-normalization boundary checks
- request-layer ownership for transport, errors, loading, and side effects
- evidence reference
- follow-up if failed

`TypeScript context compliance` is required when the scoped work is TypeScript-affecting. It must include:

- result (`pass` or `fail`)
- governing `tsconfig` checked
- materially relevant `extends` chain checked
- relevant compiler options checked
- relevant declarations or generated type sources checked
- confirmation that implementation did not rely on guessed aliases, globals, generated types, or module resolution
- evidence reference
- follow-up if failed
