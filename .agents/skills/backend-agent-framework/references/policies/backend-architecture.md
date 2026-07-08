# Backend Architecture Policy

## Scope

This policy defines stable backend architecture standards that stage subskills may apply during spec, plan, execute, review, and verification.

## Standards

- Separate transport entrypoints, application orchestration, domain logic, persistence, and external integration by responsibility.
- Keep each file or module focused on one clear purpose where practical.
- Prefer explicit ownership for side effects, state transitions, persistence writes, and async coordination.
- Keep shared abstractions stable, documented, and reusable across requests.
- Make async topology visible: jobs, consumers, callbacks, schedulers, and event handlers must have clear ownership and lifecycle expectations.
- Keep MySQL, Redis, Kafka, gRPC, Kubernetes, and other infrastructure dependencies behind explicit ownership boundaries rather than scattering access semantics through business code.

## Common Responsibility Boundaries

- handler/controller: parse inbound request, auth, validation handoff, response mapping
- service/application layer: orchestrate use case flow and boundary calls
- domain module: own business rules, invariants, and state transitions
- repository/store: own persistence access and query/write semantics
- job/consumer/subscriber: own async trigger handling and execution loop
- integration adapter: own external API, queue, callback, or SDK boundary quirks
- cache boundary: own key design, TTL, invalidation, and consistency policy
- messaging boundary: own topic, key, retry, dead-letter, replay, and lag-handling semantics
- grpc boundary: own proto contract reuse, deadline propagation, metadata, status mapping, and streaming semantics
- runtime/deployment boundary: own workload type, probes, resource policy, config or secret ownership, rollout, and drain behavior

## Review Prompts

- Is the transport layer doing business logic or persistence work that belongs deeper?
- Is the domain logic scattered across handlers, jobs, and repositories?
- Are side effects owned in one obvious layer?
- Is async coordination explicit instead of hidden in helper chains?
- Are gRPC contract, retry, and deadline semantics owned at one obvious boundary?
- Are Kubernetes rollout, probe, and shutdown assumptions explicit rather than left to defaults?

## Non-Goals

- This policy does not force a single package layout for every repository.
- This policy does not define workflow transitions or artifact formats.
