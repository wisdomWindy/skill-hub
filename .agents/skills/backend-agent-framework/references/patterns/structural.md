# Structural Patterns

Use this reference when the main difficulty is how modules or services should be composed, wrapped, adapted, or exposed.

## Adapter

- Use when an existing API, event, or storage shape is incompatible with the shape required by the current feature.
- Common backend cases: third-party API adaptation, legacy contract normalization, queue payload translation.

## Bridge

- Use when abstraction and implementation must vary independently.
- Common backend cases: decoupling domain services from transport or storage drivers.

## Decorator

- Use when behavior should be layered dynamically without changing the wrapped unit's core responsibility.
- Common backend cases: logging, tracing, retries, caching, metrics, permission checks.

## Facade

- Use when a subsystem is too noisy and callers need a narrower entrypoint.
- Common backend cases: orchestration facades over multiple integrations or subsystems.

## Proxy

- Use when access to a target needs controlled indirection.
- Common backend cases: lazy clients, caching proxies, permission proxies, dedupe proxies.
