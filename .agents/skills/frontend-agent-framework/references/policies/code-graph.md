# Code Graph Policy

## Scope

This policy defines how the workflow should use a code graph capability to reconstruct code structure, symbol relationships, and impact scope. Treat code graph as a preferred context-recovery tool for existing-code work, not as a new lifecycle stage.

## Core Rules

- When the request depends on understanding existing code structure, prefer code graph over plain text search when code graph is available.
- If code graph is not yet available in the repository, attempt automatic installation or bootstrap first, then continue with graph-based analysis when successful.
- If automatic installation fails because the environment lacks permissions, network access, toolchain support, or a compatible installer, record that failure and fall back to repository-local search and manual context reconstruction.
- The workflow must never block solely because code graph is unavailable when a reasonable fallback exists.
- Code graph use is a capability layer for context recovery, impact analysis, and review evidence. It does not replace spec, plan, verification, or review artifacts.

## When Code Graph Is Required

Treat code graph as the preferred first choice when any of the following are true:

- The request is a bugfix in existing code and root cause is not already obvious from one local file.
- The request changes behavior across multiple modules, hooks, services, or UI layers.
- The request requires identifying call sites, consumers, providers, ownership boundaries, or side-effect propagation.
- The request includes clean-code or design-pattern decisions whose validity depends on actual dependency or collaboration structure.
- The request includes refactoring, architecture cleanup, or shared-rule deduplication in an existing codebase.

## When Lightweight Search Is Enough

Plain text search can remain the first tool when:

- The request is mostly new greenfield code with little integration into existing systems.
- The request is isolated to styling, copy, or obvious one-file behavior.
- The affected area is already known and the dependency surface is trivially small.

## Automatic Installation Rule

When code graph is required or strongly beneficial and the current project does not expose a usable code graph, the workflow should:

1. Detect whether an existing graph setup already works.
2. If not, attempt automatic installation or bootstrap using the repository or team-preferred code graph tooling.
3. If installation succeeds, build or refresh the graph before deeper code-context analysis.
4. If installation fails, record the reason and continue with fallback analysis instead of silently skipping context gathering.

Automatic install is the workflow default. However, the runtime environment may still enforce external permission or network controls that cannot be bypassed by skill text alone.

## Output Contract

When code graph is used, record a durable context artifact at `docs/requests/<request-id>/artifacts/code-context.md` using `references/templates/code-context.md`.
Use the same artifact even when graph bootstrap fails and the workflow falls back to text search, so the availability check, installation attempt, and fallback reason are preserved in one place.

## Review Value

Use code graph evidence to strengthen:

- spec constraints about boundaries and ownership
- plan task splitting and impact scope
- execute-stage refactor safety
- review-stage clean-code and design-pattern judgments

## Non-Goals

- This policy does not mandate a single vendor or tool implementation.
- This policy does not require code graph for trivial changes.
- This policy does not justify blocking completion when graph bootstrap fails but manual analysis is still possible.
