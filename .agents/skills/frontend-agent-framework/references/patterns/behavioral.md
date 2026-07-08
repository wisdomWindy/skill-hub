# Behavioral Patterns

Use this reference when the main difficulty is how behavior is selected, sequenced, delegated, or coordinated over time.

## Chain of Responsibility

- Use when multiple handlers should get a chance to process a request in order.
- Common frontend cases: middleware pipelines, validation pipelines, action interception, fallback upload or fetch handlers.
- Avoid when the handling order is fixed and simple enough for direct code.
- Review risk: invisible control flow and unclear stop conditions.

## Command

- Use when actions should be represented as explicit objects or records that can be queued, logged, retried, undone, or invoked uniformly.
- Common frontend cases: toolbar actions, editor operations, undo/redo actions, command palette items.
- Avoid when one direct callback is enough and no history, queueing, or abstraction benefit exists.
- Review risk: object ceremony around one-off event handlers.

## Interpreter

- Use when the feature must evaluate a small formal language or expression grammar.
- Common frontend cases: filter expressions, rule builders, mini query languages, template expression evaluators.
- Avoid when a lookup table or direct parser utility is sufficient.
- Review risk: inventing a language where configuration would do.

## Iterator

- Use when traversal should be abstracted from the underlying collection shape.
- Common frontend cases: custom paged data sources, tree traversal helpers, cursor-based datasets.
- Avoid when native array iteration already expresses the intent clearly.
- Review risk: wrapping ordinary arrays with unnecessary iterator objects.

## Mediator

- Use when many peers coordinate through a central interaction hub rather than talking to each other directly.
- Common frontend cases: complex dialog orchestration, dashboard widget coordination, editor panel interaction hubs.
- Avoid when one module can own the orchestration directly.
- Review risk: giant coordinator objects with hidden coupling.

## Memento

- Use when state snapshots must be captured and restored without exposing internal structure broadly.
- Common frontend cases: undo checkpoints, draft restoration, workflow resume points.
- Avoid when a plain serializable snapshot is enough.
- Review risk: expensive snapshotting without lifecycle control.

## Observer

- Use when one subject change should notify many dependents.
- Common frontend cases: store subscriptions, reactive view updates, shared model listeners.
- Avoid when direct calls express the dependency more clearly.
- Review risk: lifecycle leaks, hidden fan-out, and unclear subscription ownership.

## State

- Use when behavior changes materially based on lifecycle state and conditional logic is spreading.
- Common frontend cases: async request lifecycle, order workflow steps, editor mode switching, approval flow states.
- Avoid when the state space is tiny and a direct conditional remains clearer.
- Review risk: state classes or tables introduced before behavior truly branches enough.

## Strategy

- Use when interchangeable algorithms or policies should vary behind one interface.
- Common frontend cases: pricing calculations, validation strategies, ranking rules, rendering policies, feature-specific behaviors.
- Avoid when there is only one real algorithm.
- Review risk: one-method wrappers for code that does not vary.

## Template Method

- Use when multiple flows share the same high-level skeleton but differ at a few steps.
- Common frontend cases: multi-step import flows, standardized request lifecycles, base form submission sequences.
- Avoid when composition or explicit function parameters express the flow more clearly.
- Review risk: inheritance or rigid skeletons that become hard to extend locally.

## Visitor

- Use when many operations must be performed over a stable object structure without changing the structure classes each time.
- Common frontend cases: AST transforms, editor document tree analysis, schema processing.
- Avoid when the structure changes often or only one or two operations exist.
- Review risk: high ceremony and poor locality for simple traversals.
