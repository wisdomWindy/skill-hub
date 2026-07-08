# Redis Enterprise Policy

## Scope

This policy defines enterprise-grade standards for backend requests that use Redis for caching, locking, throttling, coordination, or ephemeral state.

## Standards

- Treat Redis as an explicit system boundary with named ownership, not as an invisible helper.
- Record key format, TTL policy, invalidation trigger, and consistency expectation for every material Redis use.
- Distinguish cache, lock, rate-limit, dedupe, and coordination use cases; do not blur them under one generic "redis access" task.
- Make fallback behavior explicit when Redis is unavailable, stale, evicted, or inconsistent.

## Key Design Rules

- Key namespace, tenant or environment scoping, and collision avoidance must be explicit.
- Record what dimensions are encoded in keys and which are intentionally excluded.
- Avoid keys whose semantics depend on undocumented string concatenation conventions.

## TTL and Invalidation Rules

- TTL choice must reflect business staleness tolerance, not local convenience.
- Record whether invalidation is write-through, write-behind, event-driven, time-based, or manual.
- Treat unbounded TTL or "forever cache" as a design decision that requires justification.

## Consistency and Failure Rules

- Record whether consumers require read-after-write consistency, eventual consistency, or stale-read tolerance.
- For cache aside or dual-read patterns, document miss, stale, and race behavior.
- For locks or dedupe keys, document lease timeout, renewal behavior, owner identity, and failure-release semantics.

## Capacity and Hotspot Rules

- Record hotspot, penetration, breakdown, and avalanche risks when traffic concentration is plausible.
- Document degradation behavior when Redis latency spikes, memory pressure rises, or key churn becomes pathological.

## Verification and Review Requirements

- Verification should include TTL, invalidation, fallback, and consistency evidence when Redis semantics materially affect behavior.
- Review should check that key design, ownership, and failure semantics are explicit and locally understandable.

## Non-Goals

- This policy does not prescribe one client library or serialization format.
- This policy does not require Redis for every cache or coordination problem.
