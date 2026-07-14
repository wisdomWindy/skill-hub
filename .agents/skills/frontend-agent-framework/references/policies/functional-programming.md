# Functional Programming Policy

## Scope

This policy defines practical functional-programming standards for frontend work. Apply it during specification, planning, execution, verification, and review when the scoped work includes business rules, data transformation, validation, filtering, sorting, view-model shaping, state derivation, or side-effect coordination.

## Core Rules

- Prefer pure functions for deterministic business rules, validation rules, data shaping, filtering, sorting, grouping, formatting decisions, and view-model construction.
- Keep side effects at explicit boundaries: request layers, event handlers, lifecycle hooks, command functions, store actions, analytics, cache writes, and persistence adapters.
- Do not hide side effects inside helpers that appear to compute values. A function that mutates state, performs I/O, writes cache, logs analytics, or triggers navigation must be named and placed as a command or effect boundary.
- Treat inputs as immutable by default. Do not mutate props, backend DTOs, shared module state, function arguments, or imported constants while computing derived values.
- Framework-owned mutation is allowed only at clear ownership points, such as assigning to a local `ref`, store action, reducer-like update, or explicit command handler.
- Prefer composable transformation steps over large mixed functions that combine branching, mutation, rendering preparation, and I/O.
- Keep functional code readable. Avoid dense point-free style, excessive currying, clever reducer chains, or pipeline abstractions that make debugging harder.
- Do not introduce a functional utility library or abstraction layer unless the approved spec or plan states the concrete duplication, composition, or type-safety problem it solves.

## Frontend Application Rules

- Put data-semantic normalization in adapter / mapper / `fromDetail` boundaries, not in component `computed`, `watch`, or template fallback branches.
- Use component `computed` only for view-local derivations when semantic normalization has already happened upstream.
- Keep validators, option filters, display mappers, status-to-label/color functions, payload builders, and detail-to-form mappers deterministic when practical.
- Prefer returning new arrays and objects from transformations instead of mutating existing values in place.
- Prefer explicit inputs over hidden globals, module-level mutable caches, or helpers that read unrelated reactive state.
- Separate query-style functions from command-style functions. Query functions return values; command functions perform effects and should make that effect obvious by name and placement.
- For asynchronous flows, separate the pure decision logic from the async transport or UI effect. The request or command layer may orchestrate effects, but the rules it uses should remain testable.

## Spec Requirements

When functional-programming choices materially affect implementation shape, the spec must record:

- which rules or transformations should be pure functions
- where side effects are allowed to live
- which data shapes must be treated as immutable inputs
- which derived state should not be duplicated as writable state
- where adapter / mapper / `fromDetail` normalization owns semantic conversion
- any rejected functional abstraction or library use

## Plan Requirements

The plan must turn functional constraints into concrete tasks when applicable:

- pure helper extraction for rules and transformations
- side-effect boundary tasks
- immutable update tasks
- adapter / mapper normalization tasks
- tests for deterministic helpers and transformation pipelines
- review checks for hidden mutation or hidden side effects

## Verification and Review Requirements

- Verification must confirm deterministic rules and transformations behave as expected, preferably with focused tests or direct evidence.
- Verification must confirm side effects happen only at approved boundaries when the scoped work depends on that separation.
- Review must treat hidden mutation, hidden side effects, duplicated derived state, and unreadable clever functional chains as maintainability defects.
- Review must not demand functional style where direct imperative code is clearer, local, and side-effect ownership is already explicit.

## Non-Goals

- This policy does not require a purely functional codebase.
- This policy does not prohibit framework state, event handlers, lifecycle hooks, or store mutations.
- This policy does not require new functional libraries.
- This policy does not override project conventions when the approved spec explicitly accepts an existing local pattern.
