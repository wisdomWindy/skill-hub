# Expert Frontend Engineering Policy

Use this policy when frontend work adds or changes user-facing behavior, state flow, data flow, component composition, frontend architecture, or production integration.

The goal is to raise output from "correct implementation" to expert-level frontend engineering: coherent user journeys, explicit state ownership, resilient async behavior, accessible interaction, measurable risk control, and maintainable evolution.

## Expert Lens

Before implementation, reason through these dimensions and record material decisions in the owning artifact:

- User journey integrity: entrypoints, preconditions, visible states, success, failure, retry, cancellation, and handoff.
- State ownership: source state, derived state, form state, server state, route state, cache state, and persistence boundaries.
- Data lifecycle: backend DTO, adapter / mapper, view model, form model, payload, and response handling.
- Async correctness: loading ownership, request dedupe, cancellation, stale response handling, race conditions, idempotency, and retry semantics.
- Interaction quality: keyboard access, focus restoration, disabled states, destructive confirmations, and actionable feedback.
- Rendering and performance boundaries: render scope, large-list handling, expensive derivation, bundle impact, and unnecessary reactive fan-out.
- Evolution safety: extension seams, migration path, feature flag or compatibility boundary when needed, and rollback surface.
- Testability and observability: deterministic units, component interaction coverage, integration seams, useful errors, and debuggable evidence.

## State And Data Flow

- Define one owner for each mutable state value. Do not let the same business state be writable in component local state, store, route query, cache, and form model at the same time without an explicit synchronization rule.
- Keep derived state derived. Do not copy derived values into writable state unless the plan records why snapshot semantics are required.
- Keep backend DTO semantics out of templates. Normalize form and view semantics in adapters, mappers, or `fromDetail` boundaries.
- Make state transitions explicit for multi-step workflows, modals, drawers, uploads, approvals, and submissions.
- Treat stale async responses as a correctness risk. If multiple requests can overlap, define latest-wins, cancel, ignore-stale, or merge semantics.

## UI And Interaction Resilience

- Every touched user journey must have clear empty, loading, error, success, disabled, and permission-denied behavior when those states are possible.
- Destructive, irreversible, or externally visible actions require confirmation or an approved reason not to confirm.
- Form interactions must define validation timing, error copy, submit gating, submit loading, success handling, failure handling, and dirty-state reset.
- Focus, keyboard operation, and semantic controls must remain usable for dialogs, drawers, forms, tables, menus, and custom controls.
- Avoid UI that only works for the happy path, current data shape, or current network speed.

## Architecture And Composition

- Page containers orchestrate; business components own cohesive UI behavior; adapters / mappers own data semantics; request layers own transport; shared modules own stable mechanisms.
- Prefer vertical feature coherence over scattering one feature's rule across unrelated shared files.
- Introduce extension seams only for a current variation axis. Do not add plugin-like layers, managers, registries, or factories for hypothetical futures.
- When a feature touches multiple modules, define the dependency direction and ownership boundary before editing.
- When reusing shared code, verify that the shared API expresses the stable mechanism and the feature module supplies the changing policy.

## Performance And Scalability

- Treat performance as a design constraint only when the scoped surface has large data, frequent updates, expensive derivation, heavy rendering, or user-visible lag risk.
- Prefer reducing render scope, state fan-out, and data volume before adding memoization or caching.
- Large lists require explicit pagination, virtualization, incremental rendering, or a documented reason that the current volume is bounded.
- Avoid watchers, computed values, effects, or subscriptions that duplicate each other or create reactive loops.
- Record the reason for non-obvious cache, debounce, throttle, virtualization, prefetch, or memoization choices.

## Reliability And Rollback

- Define the failure boundary for every external dependency: API, upload, storage, route, permission, timer, third-party widget, or browser capability.
- Preserve recoverability for partial failures, retries, and interrupted workflows when the user can reasonably continue.
- For migrations or behavior replacements, keep old and new paths compatible only when the approved plan defines the compatibility window and cleanup trigger.
- Do not leave dual paths active without an owner, divergence rule, and removal plan.

## Testing And Evidence

- Pure rules, adapters, mappers, validators, payload builders, and state-transition helpers should have deterministic verification.
- User-facing interactions should have component or integration evidence covering success, failure, loading, disabled, and validation states when applicable.
- Async behavior with concurrency or stale-response risk needs evidence for the chosen race-handling semantics.
- Accessibility-sensitive UI needs evidence for focus, keyboard, semantic controls, or project-approved accessible component use.
- Verification and review must record `expert frontend engineering compliance: pass|fail` and `expert frontend engineering assessment: pass|fail` when this policy applies.

## Review Blockers

Treat these as blockers:

- Unowned mutable state, duplicated writable state, or derived state stored without snapshot justification.
- Adapter / mapper semantics bypassed by template, computed, or watcher fallback.
- Async flows with overlapping requests but no stale response, cancellation, dedupe, or idempotency decision.
- Missing empty, loading, error, disabled, permission, retry, or success behavior for a touched journey where that state is possible.
- Custom interaction that breaks focus, keyboard use, or semantic control expectations.
- Performance fix that adds cache, watcher, memoization, debounce, throttle, or virtualization without a real bottleneck or dependency rationale.
- Dual old/new behavior paths without compatibility owner, divergence rule, cleanup trigger, or rollback plan.
- Implementation that is locally correct but makes the end-to-end user journey, state lifecycle, or future change path harder to reason about.
