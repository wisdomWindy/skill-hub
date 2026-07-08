# Kafka Enterprise Policy

## Scope

This policy defines enterprise-grade standards for backend requests that publish to, consume from, replay, or operationally depend on Kafka topics.

## Standards

- Treat Kafka as a durable contract boundary with explicit ownership over topic semantics, keying, retry, and replay behavior.
- Record topic purpose, producer key semantics, partition assumptions, consumer group ownership, and delivery guarantees when material.
- Assume duplicate delivery, retry, and lag are normal operational conditions that the design must account for.
- Make dead-letter, poison-message, backpressure, replay, and recovery behavior explicit rather than implicit.

## Producer Rules

- Record why the chosen key exists and what ordering or locality property it is meant to preserve.
- Document whether producer idempotence, batching, compression, or transactional publish is required for correctness.
- Do not publish payloads whose schema evolution path is undocumented when multiple consumers exist or may exist.

## Consumer Rules

- Record consumer group ownership, offset commit semantics, retry policy, and terminal failure behavior.
- Explicitly state whether the consumer is at-most-once, at-least-once, effectively-once, or dedupe-protected.
- Document whether order matters per partition, per key, or not at all.

## Retry, DLQ, and Replay Rules

- Record retry budget, backoff, DLQ routing, poison-message detection, and replay operator path when material.
- If replay can cause duplicate side effects, document the idempotency or reconciliation strategy explicitly.
- Treat "manual fix later" as a follow-up risk, not as a replacement for failure-path design.

## Lag and Capacity Rules

- Record acceptable lag expectations and what happens when lag exceeds operational tolerance.
- Document any dependency on partition count, consumer concurrency, or rebalancing behavior when throughput matters.

## Verification and Review Requirements

- Verification should include duplicate-delivery, retry/DLQ, and replay-path evidence when Kafka materially affects correctness.
- Review should check that keying, ordering, consumer ownership, and failure semantics are explicit and justified.

## Non-Goals

- This policy does not prescribe one schema registry, client library, or topic naming convention.
- This policy does not require Kafka for every asynchronous workflow.
