# Architecture Design Template

## Required Artifact Path

- `docs/requests/<request-id>/design/architecture-design.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/design/architecture-design.md` for split PRD-driven work

## `design/architecture-design.md` or `module-runs/<module-id>/design/architecture-design.md`

Required sections:

- delivery unit identifier
- architecture objective
- architecture scope and triggers
- upstream inputs and assumptions
- module boundary design
- file and directory structure
- code relationship and dependency direction
- responsibility split
- function design and public entrypoints
- functional boundaries and side-effect model
- state ownership and data flow
- data structures and type strategy
- contract and adapter boundaries
- pattern decisions and rejected alternatives
- readability and maintenance guardrails
- architecture risks
- open architecture questions

### `functional boundaries and side-effect model`

Required when the design includes business rules, validation, data transformation, payload construction, state derivation, adapter / mapper boundaries, or side-effect orchestration.

Document:

- pure functions or pure transformation modules
- command / action / request / lifecycle boundaries where side effects are allowed
- immutable data-flow expectations
- derived state that should not be duplicated as writable state
- rejected functional abstractions or libraries if direct code is clearer
