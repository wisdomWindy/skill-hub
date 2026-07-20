# Review Templates

## Required Artifact Path

- `docs/requests/<request-id>/review/review.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/review/review.md` for split PRD-driven work

## `review/review.md` or `module-runs/<module-id>/review/review.md`

Required sections:

- delivery unit identifier
- blocking issues
- non-blocking issues
- accepted risks
- follow-up items
- user intent assessment
- change-chain integrity assessment
- removal cleanup assessment
- clean-code assessment
- source grounding assessment
- architecture reuse assessment
- production code quality assessment
- functional-programming assessment
- frontend styling assessment
- API contract assessment
- TypeScript context assessment
- design-pattern assessment
- code-context structural assessment
- merge readiness summary

`user intent assessment` is required when the spec contains a user intent contract. It must include:

- result (`pass` or `fail`)
- literal request compliance
- practical goal compliance
- forbidden interpretations found or ruled out
- required follow-up if failed

`change-chain integrity assessment` is required when implementation modifies or removes existing code. It must include:

- result (`pass` or `fail`)
- changed feature chain reviewed
- pre-change flow and reference analysis sufficiency
- post-change chain cleanliness
- missing links, stale extra links, duplicate paths, conflict paths, or orphan symbols found
- test references to changed or removed production code adapted rather than treated as production owners
- neighboring feature impact found or ruled out
- required follow-up if failed

`removal cleanup assessment` is required when implementation removes a call, request, branch, field, control, or side effect. It must include:

- result (`pass` or `fail`)
- orphan imports, helpers, constants, types, request wrappers, state, tests, mocks, or comments found
- retained helpers and their remaining real production callers
- test-only references found and adapted, not used as retention evidence
- required follow-up if failed

`clean-code assessment` must include:

- result (`pass` or `fail`)
- key findings
- findings for constants introduced or moved to a broader scope, including the domain meaning, constraint, snapshot, simplification, or real reuse that justifies each non-obvious declaration
- unnecessary one-off aliases, speculative module or exported constants, synonym constants, and over-broad constant scope found or ruled out
- required follow-up if failed

`source grounding assessment` must include:

- result (`pass` or `fail`)
- whether implementation behavior maps back to framework-approved source-grounding labels
- ungrounded behavior, neighboring-module expansion, sample-content expansion, convention-based expansion, or preference-based expansion found or ruled out
- whether any missing-source item was incorrectly implemented as confirmed behavior
- required follow-up if failed

`architecture reuse assessment` is required when the scoped work touches business rules, validation, filtering, sorting, option building, permission checks, payload construction, status mapping, adapter / mapper normalization, view-model construction, helper logic, or state derivation. It must include:

- result (`pass` or `fail`)
- missed extraction or reuse opportunities found or ruled out
- whether kept-separate duplicates have real domain, layer, lifecycle, permission, API, dependency, use-site-count, instability, variation-axis, or evolution reasons
- whether shared owner, dependency direction, public API, type ownership, and side-effect boundary are appropriate
- whether Anti-DRY reasoning prevented wrong abstraction instead of blindly enforcing DRY
- whether commonality classification and target owner are correct
- whether shared code uses dependency injection, strategy, getters, adapters, or thin wrappers instead of hard-coded business fields
- whether all in-scope production callers were migrated
- duplicate legacy paths, orphan helpers, dumping-ground utility, premature abstraction, feature-entity import, environment side effect, or merged-interface findings
- JSDoc `@see` / `@example` traceability findings for promoted shared APIs
- behavior-equivalence evidence reviewed
- required follow-up if failed

`functional-programming assessment` is required when the scoped work includes business rules, validation, data transformations, payload construction, state derivation, adapter / mapper normalization, or side-effect orchestration. It must include:

- result (`pass` or `fail`)
- pure transformation and rule-boundary findings
- immutability findings
- side-effect boundary findings
- adapter / mapper / `fromDetail` semantic-normalization findings
- hidden mutation or hidden side effects found
- readability findings for composition, reducer chains, currying, or point-free style
- required follow-up if failed

`production code quality assessment` is required when production code was added or changed. It must include:

- result (`pass` or `fail`)
- type-first contract findings, including broad types, unsafe assertions, missing interfaces, or missing branded / nominal distinctions for confusable identifiers
- fail-fast findings for silent failures, swallowed errors, ignored promises, hidden invalid data, or unclear impossible-state handling
- strict null findings for blurred `null` / `undefined` semantics or fallback display logic masking data contract problems
- naming findings for booleans, callback props, internal event handlers, and function verbs
- no magic variable findings, including implicit helper dependencies and misplaced or meaningless configuration constants
- maintainability-first performance findings, including unjustified memoization, caching, debounce, throttle, virtualization, `useMemo` / `useCallback`, computed caching, or watcher optimization
- pure function / immutable data findings, including unnecessary classes or mutation-based data shaping
- boundary UI state findings for touched lists, async operations, and form inputs
- required follow-up if failed

`frontend styling assessment` is required when the scoped work adds or changes authored styling. It must include:

- result (`pass` or `fail`)
- Tailwind CSS-style utility class conformance
- class length and inline reviewability findings
- findings for any constants, maps, computed properties, helpers, or imported variables that hide overlong class values
- required follow-up if failed

`API contract assessment` is required when the scoped work touches backend integration. It must include:

- result (`pass` or `fail`)
- contract-source fidelity findings
- backend-owned type reuse findings
- non-TypeScript contract translation and backend field-name preservation findings
- adapter / mapper boundary findings
- request-layer ownership findings
- required follow-up if failed

`TypeScript context assessment` is required when the scoped work is TypeScript-affecting. It must include:

- result (`pass` or `fail`)
- governing `tsconfig` recovery findings
- relevant declaration or generated type source findings
- alias, ambient global, module resolution, JSX runtime, strictness, or generated-type assumption findings
- any guessed TypeScript context found or ruled out
- required follow-up if failed

`design-pattern assessment` must include:

- result (`pass` or `fail`)
- key findings
- required follow-up if failed
