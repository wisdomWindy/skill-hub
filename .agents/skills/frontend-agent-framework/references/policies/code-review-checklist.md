# Code Review Checklist Policy

## Scope

Use this policy when production code is added or changed.

This policy makes human code-review standards visible before implementation. `plan` owns the review contract, `execute` follows that contract, and `review` verifies that the implementation satisfied it.

## Plan Contract

Before `execute`, the plan must translate these review concerns into concrete implementation and verification tasks:

- Robustness: identify external data boundaries, nullable fields, optional chaining / null checks, API exception handling, rejected promise handling, and abnormal states that must not fail silently.
- Maintainability: identify functions at risk of exceeding 150 lines or mixing responsibilities, split strategy, and magic numbers that need meaningful constants under the narrowest stable owner.
- Performance and memory: identify high-frequency events such as resize, scroll, input, mousemove, drag, polling, subscriptions, watchers, or effects; record the approved debounce, throttle, cancellation, dedupe, or no-optimization decision; define cleanup / dispose / unmount obligations for side effects.
- Project convention consistency: identify the technology-stack anchors that implementation must follow, including component library, styling scheme, directory structure, import alias / relative path style, state management, request wrappers, and approved framework / library choices.

If any item needs a human product or technology decision, route back to the front-loaded confirmation gate before plan approval.

## Execute Contract

Implementation must follow the plan's checklist contract. If execution discovers missing robustness, maintainability, performance, memory, or technology-stack decisions, stop and roll back to `plan` instead of guessing or fixing ad hoc.

Do not change the technology stack, component library, styling scheme, directory convention, request wrapper, or state-management approach unless the approved spec and plan explicitly authorize it.

## Review Blockers

Treat these as blockers:

- External data lacks required optional chaining, null checks, value validation, or explicit abnormal-state handling.
- API calls lack exception handling, rejected promise handling, or an approved error boundary.
- A production function exceeds 150 lines while mixing responsibilities, or any function mixes orchestration, request, transformation, rendering, side effects, and validation enough to block reviewability.
- Magic numbers remain without meaningful, narrow-owner constants.
- High-frequency events lack the approved debounce, throttle, cancellation, dedupe, or no-optimization rationale.
- Subscriptions, timers, event listeners, requests, watchers, effects, or external resources lack cleanup / dispose / unmount handling.
- Implementation violates technology-stack anchoring: component library, styling scheme, directory layout, import style, state management, request wrapper, framework, or library choices drift from approved artifacts or local code conventions.
- Unauthorized technology-stack changes must be marked as failed, acknowledged as unacceptable, and rewritten instead of accepted.
