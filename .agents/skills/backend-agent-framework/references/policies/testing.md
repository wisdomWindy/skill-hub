# Testing Policy

## Scope

This policy defines the minimum testing and verification discipline for backend requests.

## Standards

- Add test coverage when business logic, contract handling, persistence behavior, async workflow behavior, or user-critical outcomes change.
- Prefer TDD for behavior that is reasonably testable.
- Follow red -> green -> refactor for testable behavior changes unless a documented exception applies.
- Write tests from approved spec behavior and acceptance criteria rather than from ad hoc implementation details.
- Distinguish unit, integration, contract, migration, rollback, and workflow verification when they carry different risks.
- Record verification evidence, not only status claims.
- Prefer focused tests that prove requested behavior over broad but shallow checks.

## Suggested Test Mapping

- pure business rules: unit tests
- boundary integration: integration or contract tests
- schema or storage changes: migration verification and rollback checks
- async or event-driven flows: workflow or consumer verification
- compatibility-sensitive changes: contract regression checks
- MySQL changes: migration rehearsal, transaction and lock-risk verification, query-plan or index verification when material
- Redis changes: consistency verification, TTL verification, hotspot and breakdown protection checks when material
- Kafka changes: duplicate-consume verification, retry/DLQ verification, lag and replay behavior checks when material
- gRPC changes: proto compatibility, deadline and retry semantics, metadata or auth propagation, status mapping, and streaming verification when material
- Kubernetes changes: probe and readiness verification, rollout and rollback checks, graceful shutdown or drain checks, and resource or config safety checks when material

## Non-Goals

- This policy does not prescribe one exact test runner for every repository.
- This policy does not replace request-specific verification planning.
