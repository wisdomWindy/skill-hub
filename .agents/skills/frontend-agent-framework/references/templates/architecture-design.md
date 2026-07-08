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
- state ownership and data flow
- data structures and type strategy
- contract and adapter boundaries
- pattern decisions and rejected alternatives
- readability and maintenance guardrails
- architecture risks
- open architecture questions
