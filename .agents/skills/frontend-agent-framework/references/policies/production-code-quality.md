# Production Code Quality Policy

Use this policy before writing or accepting production frontend code.

The goal is to make implementation logic predictable, type-checkable, explicit about failure, and maintainable at senior frontend quality.

## Pre-Code Reasoning Order

Before writing production code, reason in this order and record material decisions in `spec`, `plan`, `execution/changelog.md`, `verification`, or `review` as appropriate:

1. Type-first contract.
2. Fail-fast and clear handling.
3. Maintainability before micro-optimization.
4. Pure functions and immutable data before classes or hidden mutation.

## Type-First Contract

- Define or reuse the data `type` / `interface` before writing implementation that depends on that data.
- Types must be precise enough to let compilation catch business mistakes when the repository uses TypeScript.
- Use branded types or equivalent nominal wrappers when structurally identical IDs or tokens can be confused, such as `UserId` and `ProductId`.
- Preserve backend-owned type ownership. Reuse generated, protobuf, or backend-owned TypeScript contract types when available.
- If the project is not TypeScript-first, use the strongest local typing mechanism available, such as JSDoc or existing runtime schema conventions, and record the limitation.
- Do not use `any`, broad `Record<string, unknown>`, loose optional fields, or type assertions to silence type problems unless the plan records why a narrower contract is impossible.

## Fail-Fast And Clear

- Handle abnormal, empty, nullable, invalid, timeout, rejected, partial-success, and impossible states explicitly.
- Do not silently return default success, swallow errors, ignore rejected promises, or hide invalid data with a generic fallback.
- Error messages should preserve enough context for users, developers, or logs to identify the failing boundary without leaking sensitive data.
- Guard clauses are preferred when they make invalid preconditions obvious.
- In business logic, distinguish `null` and `undefined` when they have different semantics.
- Use `??` and `?.` defensively for nullable access, but do not use them to erase required validation or contract violations.

## Maintainability Before Micro-Optimization

- Prefer the clearest readable implementation unless there is evidence of large-list rendering, expensive computation, unstable callback identity, or measurable interaction lag.
- Do not introduce memoization, caching, debouncing, virtualization, `useMemo`, or `useCallback` as a default habit.
- In React code, use `useMemo` / `useCallback` only when the approved plan or code facts identify a real performance or referential-stability reason. Add a short dependency-rationale comment when the dependency list is non-obvious.
- In Vue or other frameworks, apply the same rule to computed caching, watchers, manual cache maps, throttling, debouncing, and virtualization.
- Do not trade readable control flow for clever micro-optimization unless the performance issue is part of the approved scope or discovered as a real blocker.

## Pure Functions Over Classes

- Prefer pure functions for deterministic rules, validation, formatting, transformation, payload building, status mapping, and state derivation.
- Prefer immutable updates through structural copying, framework-approved state update helpers, or Immer when the repository already uses it or the plan explicitly approves it.
- Do not introduce classes for simple stateless business logic, data transformation, validators, or mappers.
- Classes are allowed only when existing project convention, framework API, lifecycle ownership, encapsulated state, or polymorphic behavior makes them the clearest option.
- Keep requests, navigation, analytics, cache writes, persistence, and state writes outside pure helpers.

## Naming And Expression Rules

- Boolean variables and boolean-returning values must start with `is`, `has`, `should`, or `can`.
- Do not name booleans `loading`, `error`, `disabled`, `valid`, `visible`, or similar bare adjectives; use names such as `isLoading`, `hasError`, `isDisabled`, `isValid`, or `isVisible`.
- Props or component callback inputs must use the `on` prefix, such as `onSubmit` or `onValueChange`, unless an established framework convention requires a different external name.
- Internal event handlers must use the `handle` prefix, such as `handleClick` or `handleFormSubmit`.
- Data retrieval functions should use `get` or `fetch`.
- Data update functions should use `set` or `update`.
- Transformation and presentation functions should use `transform` or `format`.
- Predicate and validation functions should use `check`, `validate`, `is`, `has`, `should`, or `can` according to return semantics.
- Function verbs must describe the effect precisely. Do not use vague verbs such as `process`, `handle`, `do`, `manage`, or `deal` for non-event functions.

## No Magic Variables

- Production functions must get their data from parameters, explicit dependency injection, or clearly owned local closure state.
- Do not let helpers read unrelated module state, ambient mutable variables, route state, store state, or request context implicitly.
- Closures are allowed only when the closure owner is obvious and local to the component, hook, command, or factory that intentionally creates it.
- Configuration constants must be centralized under the narrowest stable domain owner when they represent real rules, thresholds, endpoint names, enum mappings, feature flags, or shared constraints.
- Do not use centralized constants to hide one-off literals, overlong Tailwind class strings, or values with no shared domain meaning.

## Boundary UI States

- Any data list rendering must define an empty state with visible placeholder and user-facing copy.
- Any asynchronous operation must define a loading state, such as skeleton content, disabled submit button, pending indicator, or equivalent project-approved feedback.
- Any form input must define an error state with visible error styling and concrete error copy.
- Empty, loading, and error states must be tied to explicit state ownership and termination conditions, not inferred ad hoc in the template.

## Verification And Review

- Verification must record `production code quality compliance: pass|fail` when production code was added or changed.
- Review must record `production code quality assessment: pass|fail` when production code was added or changed.
- Treat missing type-first contracts, silent failure, unclear null handling, misleading names, implicit magic dependencies, unjustified micro-optimization, or missing required UI boundary states as blockers.
