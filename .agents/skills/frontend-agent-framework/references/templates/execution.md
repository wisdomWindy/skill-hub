# Execution Template

## Required Artifact Paths

- `docs/requests/<request-id>/execution/changelog.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/execution/changelog.md` for split PRD-driven work

## `execution/changelog.md` or `module-runs/<module-id>/execution/changelog.md`

Required sections:

- delivery unit identifier
- framework-approved spec and plan references
- execution summary
- task-board updates
- changed files and owned symbols
- implementation decisions
- expert frontend engineering execution notes
- production code quality execution notes
- TDD evidence or documented exception
- change-chain review evidence
- removal cleanup evidence
- functional-programming execution notes
- frontend styling execution notes
- API contract and adapter execution notes
- TypeScript context recovery notes
- architecture-design conformance or invalidation notes
- code-context updates
- deviations, blockers, and rollback triggers
- verification handoff notes

### `changed files and owned symbols`

Document:

- files edited
- symbols added, changed, or removed
- behavior each changed symbol owns
- production callers retained or removed
- test files adapted because behavior changed

### `TDD evidence or documented exception`

For testable behavior changes, document:

- failing test added first
- expected failure observed
- implementation change that made it pass
- final passing command or evidence

If TDD is not applied, document:

- why the behavior is not reasonably testable in this scope
- fallback verification method
- risk accepted by the plan

### `production code quality execution notes`

Required when production code was added or changed.

Document:

- type-first order followed: data `type` / `interface` added, reused, narrowed, or intentionally left unchanged before implementation
- fail-fast and clear handling added for abnormal, empty, nullable, invalid, timeout, rejected, partial-success, or impossible states
- strict null handling decisions for `null`, `undefined`, `??`, and `?.`
- naming checks for booleans, callback props, internal event handlers, and ordinary function verbs
- no magic variables check: helper dependencies come from parameters, dependency injection, or clearly owned local closure state
- configuration constant ownership for real config/rules/thresholds/enum maps/feature flags, and confirmation that constants were not used to hide one-off values or overlong class strings
- maintainability-first performance decision, including any approved memoization, cache, debounce, throttle, virtualization, `useMemo` / `useCallback`, computed caching, or watcher optimization and its dependency rationale
- pure function / immutable data preference followed, or approved reason for class / mutable owner use
- empty, loading, and form error states implemented for touched lists, async operations, and form inputs

### `expert frontend engineering execution notes`

Required when user-facing frontend behavior, state flow, data flow, component composition, frontend architecture, or production integration was added or changed.

Document:

- user journey states implemented or intentionally unchanged
- state ownership and data lifecycle decisions followed
- async race, stale response, cancellation, dedupe, idempotency, retry, and loading decisions followed
- interaction resilience implemented for keyboard, focus, semantic controls, disabled states, destructive confirmations, permissions, and feedback when applicable
- render scope, large-list, expensive derivation, bundle, and reactive fan-out decisions followed
- migration, compatibility, rollback, cleanup trigger, or dual-path decisions followed
- testability and diagnostic evidence handed to verification

### `change-chain review evidence`

Required when implementation modifies or removes existing code.

Document:

- pre-change feature flow reviewed
- file reference chain reviewed
- callers, consumers, events, computed values, watchers, tests, and mocks checked
- side effects, request calls, state writes, and downstream UI/data consumers checked
- post-change chain validation result
- neighboring feature impact found or ruled out

### `removal cleanup evidence`

Required when implementation removes a call, request, branch, field, control, or side effect.

Document:

- removed behavior
- imports, helpers, constants, enums, types, request wrappers, state, computed, watch, tests, mocks, and comments checked
- orphan definitions removed
- retained helpers and remaining real production callers
- test-only references adapted rather than used as production ownership evidence

### `functional-programming execution notes`

Required when the scoped work includes business rules, validation, transformation, payload construction, state derivation, adapter / mapper normalization, or side-effect orchestration.

Document:

- pure helpers or transformation steps implemented
- immutable input handling
- explicit command / action / request / lifecycle side-effect boundaries
- adapter / mapper / `fromDetail` semantic-normalization locations
- rejected over-clever functional abstraction, if relevant

### `frontend styling execution notes`

Required when the scoped work adds or changes authored styling.

Document:

- Tailwind CSS-style utility class use
- class length and inline reviewability checks
- structure or component splits used to avoid overlong class values
- confirmation that long class values were not hidden in constants, maps, computed properties, helpers, or imports

### `API contract and adapter execution notes`

Required when the scoped work touches backend integration.

Document:

- authoritative contract source used
- backend-owned TypeScript types reused, if available
- non-TypeScript contract translation with backend field names preserved, if applicable
- adapter / mapper boundary and semantic normalization
- request-layer ownership of transport, errors, loading, and side effects

### `TypeScript context recovery notes`

Required when the scoped work is TypeScript-affecting.

Document:

- governing `tsconfig`
- materially relevant `extends` chain
- compiler options that affected implementation
- declaration or generated type sources read
- confirmation that repository-wide declaration sweeps were avoided unless justified

### `architecture-design conformance or invalidation notes`

Required when an architecture-design artifact exists or execution discovers architecture mismatch.

Document:

- architecture decisions followed
- actual code constraints discovered
- any mismatch that requires rollback to `architecture-design`
- evidence needed by the next architecture-design pass
