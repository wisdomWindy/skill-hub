# Backend Runtime Pattern Variants

Use this reference when the request lives in backend runtime code where operational behavior matters as much as business logic.

## Retry Wrapper

- Treat higher-order retry helpers or middleware as backend-friendly Decorator variants.
- Use when transient failures need controlled retry with explicit ownership.
- Avoid when retry semantics differ materially across call sites and need local handling.

## Idempotency Gate

- Treat request dedupe or command dedupe layers as specialized Proxy or Guard variants.
- Use when duplicate delivery, callback replay, or repeated submission is possible.

## Outbox or Reliable Publish Boundary

- Treat this as a consistency pattern for separating persistence success from downstream publication.
- Use when a transaction must coordinate with async emission safely.

## Work Queue Consumer Loop

- Treat structured consumer loops as backend-friendly Template Method or State variants.
- Use when consumers share polling, ack, retry, and poison-message flow but differ in business step bodies.

## Timeout Budget Wrapper

- Treat timeout-aware wrappers as boundary decorators that preserve execution budgets and failure semantics.
- Use when outbound calls or internal workflows need explicit latency budgets.

## Saga or Compensation Flow

- Treat multi-step compensation logic as an orchestration pattern, often combining State, Command, and Strategy ideas.
- Use when partial failure recovery spans multiple systems and a single transaction is unavailable.
