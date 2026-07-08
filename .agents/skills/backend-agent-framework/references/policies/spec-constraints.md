# Spec Constraints Policy

## Scope

This policy defines the design constraints that must be decided or explicitly bounded in `spec/spec.md` before planning and implementation proceed.

## Core Rule

- Treat clean-code and design-pattern decisions as spec-level constraints whenever they materially affect service boundaries, behavior variation, dependency direction, side-effect placement, compatibility, async topology, persistence ownership, or future extension safety.

## Required Spec Constraint Categories

### 1. Responsibility and Boundary Constraints

- The spec must state the intended responsibility split for the main changed handlers, services, domain modules, repositories, jobs, consumers, and adapters.
- The spec must identify boundaries that must stay explicit, such as inbound contract handling vs domain logic, domain logic vs persistence, retry ownership vs business rules, and adapter boundary vs raw external contract.

### 2. Naming and Domain Language Constraints

- The spec must capture important domain terms and any names that must remain stable for published contract semantics, business concepts, or cross-module understanding.

### 3. Duplication and Rule Ownership Constraints

- The spec must identify business rules, validation rules, workflow transitions, compatibility logic, and retry or idempotency rules that must have one clear ownership point.

### 4. Side-Effect and Dependency Constraints

- The spec must state where important side effects belong: API calls, queue publish, persistence, cache writes, notifications, and observability emission.

### 5. Variation and Pattern Constraints

- The spec must identify real variation axes such as behavior by provider, contract version, workflow stage, event type, storage mode, or environment.
- If a named pattern is justified, the spec must record the problem being solved, the pattern family, and what simpler alternative was rejected.

### 6. Complexity and Readability Constraints

- The spec must identify parts of the request where control flow, state transitions, compensation logic, or async orchestration could become hard to read.
- The spec should prefer simple direct code when the behavior is stable and local.

## Downstream Contract

- `plan` must turn these spec constraints into concrete tasks, abstraction boundaries, and verification points.
- `execute` must implement within these constraints instead of inventing a different design shape.
- `review` must judge code against these declared constraints, not against vague taste alone.

## Non-Goals

- This policy does not replace detailed clean-code or design-pattern guidance.
- This policy does not require pattern use; it requires explicit decisions about whether pattern use is warranted.
