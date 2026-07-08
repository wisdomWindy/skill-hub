# Design Patterns Policy

## Scope

This policy defines how design patterns should be selected, justified, and reviewed in this framework. Treat patterns as tools for managing change, collaboration, extension, and complexity, not as mandatory decorations.

## Core Rules

- Start from the approved spec, then identify the concrete change axis, extension pressure, or collaboration problem before selecting a pattern.
- Use the lightest structure that solves the actual problem in the approved plan.
- Prefer direct code when the behavior is stable, local, and unlikely to vary.
- Require an explicit justification in spec or plan before introducing a named pattern layer.
- If a pattern does not improve readability, replaceability, testability, dependency direction, or safe extension, treat it as unjustified abstraction.
- Adapt patterns to backend realities; do not force heavyweight hierarchies when a simpler module, function, pipeline, or adapter boundary solves the same problem.

## Pattern Decision Triggers

Evaluate pattern use when the request shows one or more of these signals:

- The same business rule or branching logic is expanding in multiple flows.
- Behavior must switch by provider, version, state, event type, environment, or feature flag.
- Object or module creation logic is scattered or tightly coupled to consumers.
- A boundary must adapt incompatible APIs, legacy contracts, storage engines, or queue providers.
- Side-effect coordination or notifications are spreading across modules.
- A workflow or async pipeline needs ordered fallback, delegation, or staged handling.

## Anti-Rules

- Do not introduce a pattern just because a book names a similar shape.
- Do not add a pattern to prepare for hypothetical futures that the approved plan does not support.
- Do not hide simple domain behavior behind factories, managers, handlers, or strategies with only one real variant.
- Do not keep a pattern after review if it adds ceremony without reducing coupling or conditional complexity.

## Required Pattern Decision Record

When a pattern is introduced, the spec or plan must state:

- the concrete problem being solved
- the chosen pattern name or nearest pattern family
- why simpler direct code is insufficient
- what variation, extension, or dependency boundary the pattern isolates
- what signs would indicate the pattern is unnecessary or overbuilt

## Review Standards

Treat the following as explicit review checks:

- Is there a real change axis or repeated collaboration problem behind the pattern?
- Is the chosen pattern the simplest viable fit?
- Did the pattern reduce branching, coupling, scattered creation, or hidden dependency knowledge?
- Would removing the pattern make the code clearer without losing important flexibility?

## Non-Goals

- This policy does not require every request to use a design pattern.
- This policy does not replace clean-code, architecture, testing, or API-contract policies.
