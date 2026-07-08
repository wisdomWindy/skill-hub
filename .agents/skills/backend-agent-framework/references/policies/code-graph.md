# Code Graph Policy

## Scope

This policy defines how the workflow should use a code graph capability to reconstruct code structure, symbol relationships, and impact scope. Treat code graph as a preferred context-recovery tool for existing-code work, not as a new lifecycle stage.

## Core Rules

- When the request depends on understanding existing backend code structure, prefer code graph over plain text search when code graph is available.
- If code graph is not yet available in the repository, attempt automatic installation or bootstrap first, then continue with graph-based analysis when successful.
- If automatic installation fails, record that failure and fall back to repository-local search and manual context reconstruction.
- The workflow must never block solely because code graph is unavailable when a reasonable fallback exists.

## When Code Graph Is Required

Treat code graph as the preferred first choice when any of the following are true:

- The request is a bugfix in existing code and root cause is not already obvious from one local file.
- The request changes behavior across multiple modules, services, repositories, or async boundaries.
- The request requires identifying call sites, consumers, producers, ownership boundaries, or side-effect propagation.
- The request includes clean-code or design-pattern decisions whose validity depends on actual dependency or collaboration structure.

## When Lightweight Search Is Enough

Plain text search can remain the first tool when:

- The request is mostly new greenfield code with little integration into existing systems.
- The request is isolated to obvious one-file behavior.
- The affected area is already known and the dependency surface is trivially small.

## Output Contract

When code graph is used, record a durable context artifact at `docs/requests/<request-id>/artifacts/code-context.md` using `references/templates/code-context.md`.
