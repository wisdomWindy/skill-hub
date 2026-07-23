# Review Templates

## Required Artifact Path

- `docs/requests/<request-id>/review/review.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/review/review.md` for split PRD-driven work

## `review/review.md` or `module-runs/<module-id>/review/review.md`

Required sections:

- delivery unit identifier
- workflow efficiency assessment
- blocking issues
- non-blocking issues
- accepted risks
- follow-up items
- user intent assessment
- change-chain integrity assessment
- removal cleanup assessment
- clean-code assessment
- source grounding assessment
- expert frontend engineering assessment
- architecture reuse assessment
- production code quality assessment
- code review checklist assessment
- human review readiness assessment
- functional-programming assessment
- frontend styling assessment
- API contract assessment
- TypeScript context assessment
- design-pattern assessment
- code-context structural assessment
- merge readiness summary

`workflow efficiency assessment` must include:

- `speed_profile.level`
- whether review used compact changed-hunk review or full review
- whether context breadth was sufficient for the impact found
- whether any broader impact should have upgraded the profile earlier
- confirmation that speed did not skip applicable quality verdicts

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
- findings for helper / hook / mapper / utility files introduced or moved out of their owner, including real production caller count and approved boundary reason
- single-page single-caller one-function files, local catch-all `utils.ts` / `helpers.ts`, or single-caller mapper files found or ruled out
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
- whether single-use locality decisions are correct, and whether page-private logic stayed colocated unless a real boundary reason justified extraction
- whether shared code uses dependency injection, strategy, getters, adapters, or thin wrappers instead of hard-coded business fields
- whether all in-scope production callers were migrated
- duplicate legacy paths, orphan helpers, dumping-ground utility, premature abstraction, feature-entity import, environment side effect, or merged-interface findings
- JSDoc `@see` / `@example` traceability findings for promoted shared APIs
- behavior-equivalence evidence reviewed
- required follow-up if failed

`expert frontend engineering assessment` is required when the scoped work adds or changes user-facing frontend behavior, state flow, data flow, component composition, frontend architecture, or production integration. It must include:

- result (`pass` or `fail`)
- end-to-end user journey findings
- state ownership and data lifecycle findings
- async correctness findings for loading, dedupe, cancellation, stale response, race semantics, idempotency, and retry when applicable
- interaction resilience findings for keyboard, focus, semantic controls, disabled states, destructive confirmations, permissions, and feedback when applicable
- performance and rendering boundary findings
- evolution safety findings for migration, compatibility, rollback, cleanup trigger, or dual-path behavior when applicable
- testability and diagnostic evidence findings
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

`code review checklist assessment` is required when production code was added or changed. It must include:

- result (`pass` or `fail`)
- plan contract findings: whether `plan/plan.md` contains the code-review checklist contract and whether execute followed it without ad hoc guessing
- robustness findings: external data optional chaining / null checks, API exception handling, explicit abnormal-state handling, and missing guards found or ruled out
- maintainability findings: functions over 150 lines found or ruled out, giant mixed-responsibility functions found or ruled out, and magic numbers without meaningful constants found or ruled out
- performance and memory findings: high-frequency events found or ruled out, debounce / throttle decision-table conformance when applicable, and side effects without cleanup functions found or ruled out
- project convention consistency findings: component library, styling scheme, directory layout, import alias / relative path style, and technology-stack anchoring conformance
- unauthorized technology-stack changes found or ruled out; if found, result must be `fail`, the issue must be marked as a blocker, and the implementation must be rewritten instead of accepted
- required follow-up if failed

`human review readiness assessment` is required when production code, tests, mocks, contracts, or generated-facing files were changed. It must include:

- result (`pass` or `fail`)
- whether the diff is scoped, necessary, and reviewer-readable
- unrelated changes, broad formatting churn, or drive-by refactors found or ruled out
- local convention mismatches found or ruled out
- changed hunks without approved task / cleanup / test-adaptation mapping found or ruled out
- debug code, dead code, commented-out code, stale TODOs, stale comments, temporary names, unused imports / exports, stale tests, and stale mocks found or ruled out
- whether tests, type checks, lint checks, manual checks, and unrun-command reasons are sufficient for reviewer trust
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
- whether pattern-fit evaluation exists for the delivery unit, including small/local/bugfix work
- decision depth reviewed: Level 0, Level 1, Level 2, or Level 3
- selected decision: `direct code`, `reuse existing pattern`, `adapt lightweight pattern`, or `introduce pattern`
- triggered candidate signals found or ruled out at the appropriate depth
- direct-code no-signal rationale when no pattern was selected
- triggered rejected alternatives and whether the rejection is reasonable
- frontend syntax shape findings for React, Vue, TypeScript, component, hook / composable, store, request, adapter, and event boundaries
- mechanical enumeration of unrelated pattern families found or ruled out
- overbuilt pattern ceremony, fake extensibility, or missed lightweight pattern opportunities found or ruled out
- required follow-up if failed

`merge readiness summary` must include:

- final result (`merge-ready` or `not merge-ready`)
- confirmation that every applicable verification and review verdict registered in `constraint-model.md` is present and `pass`
- confirmation that `code review checklist assessment` is present and `pass` when production code changed
- confirmation that `human review readiness assessment` is present and `pass` when production code, tests, mocks, contracts, or generated-facing files changed
- blocking issues that prevent merge readiness, or `none`
- reviewer-facing evidence summary: tests, type checks, lint checks, manual checks, commands not run with reason, and accepted risks
- out-of-scope changes found or ruled out
