# Behavioral Patterns

Use this reference when the main difficulty is how behavior is selected, sequenced, delegated, or coordinated over time.

## Chain of Responsibility

- Use when multiple handlers should get a chance to process a request in order.
- Common backend cases: middleware pipelines, validation pipelines, fallback integration handlers.

## Command

- Use when actions should be represented as explicit objects or records that can be queued, logged, retried, or invoked uniformly.

## Mediator

- Use when many peers coordinate through a central interaction hub rather than talking to each other directly.

## Observer

- Use when one subject change should notify many dependents.
- Common backend cases: domain event listeners, lifecycle hooks, subscription fan-out.

## State

- Use when behavior changes materially based on lifecycle state and conditional logic is spreading.

## Strategy

- Use when interchangeable algorithms or policies should vary behind one interface.

## Template Method

- Use when multiple flows share the same high-level skeleton but differ at a few steps.
