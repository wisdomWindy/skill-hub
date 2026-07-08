# Spec Constraints Policy

## Scope

This policy defines the design constraints that must be decided or explicitly bounded in `spec/spec.md` before planning and implementation proceed. These constraints turn maintainability and abstraction concerns into upstream spec commitments instead of downstream cleanup wishes.

## Core Rule

- Treat clean-code and design-pattern decisions as spec-level constraints whenever they materially affect module boundaries, behavior variation, dependency direction, side-effect placement, or future extension safety.

## Required Spec Constraint Categories

### 1. Responsibility and Boundary Constraints

- The spec must state the intended responsibility split for the main changed modules, components, hooks, services, or utilities.
- The spec must identify boundaries that must stay explicit, such as page orchestration vs business logic, UI rendering vs data shaping, command logic vs side effects, adapter boundary vs raw upstream contract.
- If the request touches an already tangled area, the spec must say whether the change is allowed to preserve the existing structure temporarily or must improve the boundary as part of the work.

### 2. Naming and Domain Language Constraints

- The spec must capture important domain terms and any names that must remain stable for user-facing semantics, business concepts, or cross-module understanding.
- If the current code uses misleading vocabulary that would affect the new work, the spec must call that out as a refactor requirement or accepted limitation.
- This does not require the spec to micro-name every symbol, but it must define the terminology that downstream implementation should preserve.

### 3. Duplication and Rule Ownership Constraints

- The spec must identify business rules, validation rules, or state transitions that must have one clear ownership point.
- If the request expands an area where logic is already duplicated, the spec must state whether deduplication is required as part of delivery.
- If duplication is temporarily accepted, the spec must define why and where the duplication boundary ends.

### 4. Side-Effect and Dependency Constraints

- The spec must state where important side effects belong: API calls, persistence, analytics, subscriptions, cache writes, global coordination, or cross-module notifications.
- The spec must identify dependencies that should be adapted, wrapped, isolated, or kept out of view-level code.
- If a feature depends on hidden shared state or event fan-out, the spec must make that explicit instead of letting implementation discover it accidentally.

### 5. Variation and Pattern Constraints

- The spec must identify real variation axes such as behavior by type, state, role, environment, provider, or workflow stage.
- The spec must state whether each major variation axis should use direct branching, remain intentionally simple, or be isolated by an approved pattern family.
- If a named pattern is justified, the spec must record the problem being solved, the pattern family, and what simpler alternative was rejected.
- If a named pattern is not justified, the spec should say so explicitly when that decision avoids future overengineering.

### 6. Complexity and Readability Constraints

- The spec must identify parts of the request where control flow, state transitions, or orchestration could become hard to read.
- The spec must define any readability guardrails that downstream code should preserve, such as explicit state transitions, limited branching surfaces, or one clear entrypoint per workflow step.
- When a request can be solved in a simpler direct form, the spec should prefer that and forbid speculative abstraction.

### 7. Project Bootstrap and Scaffold Constraints

- When the scoped work starts a project, app, package, or frontend surface from scratch, the spec must state whether a suitable project-type scaffold or starter already exists.
- If a suitable scaffold exists, the spec must treat scaffold reuse as the default and record which scaffold will be used.
- If the work will not use an available scaffold, the spec must record why the scaffold is unsuitable, unavailable, or too costly to adapt.
- The spec must identify any approved deviations from the chosen scaffold, such as removed modules, replaced libraries, or structure changes that implementation is allowed to make.
- The spec must not leave greenfield bootstrap strategy implicit for downstream plan or execute to guess.

## Downstream Contract

- `plan` must turn these spec constraints into concrete tasks, abstraction boundaries, and verification points.
- `execute` must implement within these constraints instead of inventing a different design shape.
- `review` must judge code against these declared constraints, not against vague taste alone.

## Non-Goals

- This policy does not replace detailed clean-code or design-pattern guidance.
- This policy does not force every spec to include heavyweight architecture prose.
- This policy does not require pattern use; it requires explicit decisions about whether pattern use is warranted.
