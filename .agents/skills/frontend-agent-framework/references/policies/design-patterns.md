# Design Patterns Policy

## Scope

This policy defines how design patterns should be evaluated, selected, justified, and reviewed in this framework. Treat patterns as tools for managing change, collaboration, extension, and complexity, not as mandatory decorations.

Every delivery unit, including small changes and local bug fixes, must perform a lightweight pattern-fit evaluation. The evaluation may choose direct code, an existing project pattern, a JavaScript/frontend pattern variant, or a named pattern family. Skipping the evaluation is not allowed; forcing a pattern when direct code is clearer is also not allowed.

## Core Rules

- Start from the approved spec, then identify the concrete change axis, extension pressure, or collaboration problem before selecting a pattern.
- Always make an explicit pattern-fit decision: `direct code`, `reuse existing pattern`, `adapt lightweight pattern`, or `introduce pattern`.
- Use the lightest structure that solves the actual problem in the approved plan.
- Prefer direct code when the behavior is stable, local, and unlikely to vary.
- Require an explicit justification in spec or plan before introducing a named pattern layer.
- Require an explicit rejection reason when real pattern signals exist but direct code is chosen.
- If a pattern does not improve readability, replaceability, testability, dependency direction, or safe extension, treat it as unjustified abstraction.
- Adapt patterns to JavaScript and frontend realities; do not force heavyweight class hierarchies when a simpler module, object, function, hook, or component boundary solves the same problem.
- Do not enumerate every named pattern for every small change. If no pattern signal exists, record the absence of structural signals and choose direct code with a short rationale.
- Pattern implementations must fit frontend syntax and runtime characteristics. Prefer TypeScript types, discriminated unions, plain objects, functions, closures, hooks / composables, components, directives, stores, request modules, and event callbacks over Java / C#-style interface plus class hierarchy designs.

## Pattern Depth Levels

Use these levels to keep pattern reasoning proportional to the work:

- Level 0, direct code: one local stable behavior, no meaningful variation axis, no dependency or collaboration boundary. Record `direct code`, `none`, and the no-signal rationale.
- Level 1, local lightweight shape: a small local function, object map, state table, adapter function, command record, pipeline step, hook / composable, or component boundary inside the existing owner. Use when one signal exists but no cross-file architecture boundary is needed.
- Level 2, reused or formalized project pattern: an existing project convention, shared adapter, strategy map, request wrapper, facade, command surface, or state model already matches the problem. Prefer reuse over parallel invention.
- Level 3, structural pattern introduction: a new named pattern layer that changes module boundary, file ownership, dependency direction, shared abstraction, side-effect orchestration, or cross-file collaboration. This requires architecture-sensitive routing and durable justification.

Default to the lowest level that preserves readability and safe change. Moving upward requires a concrete signal, not preference.

## Required Pattern-Fit Evaluation

Run this evaluation for every scoped change, regardless of size:

1. Identify the smallest behavior or structure being changed.
2. Check whether the change introduces or touches any selection, adaptation, creation, sequencing, side-effect coordination, state-dependent behavior, tree handling, access control, or cross-cutting concern.
3. Check whether the existing code already uses a local project pattern that should be preserved.
4. Choose the lightest fitting structure:
   - `direct code`: one stable local behavior, no real variation axis, no hidden dependency problem
   - `reuse existing pattern`: project already has a suitable local convention or abstraction
   - `adapt lightweight pattern`: use a small function, object map, adapter function, command object, strategy map, state table, facade, or wrapper without overbuilding
   - `introduce pattern`: add a named pattern layer only when the change axis or collaboration problem is real and direct code would be less maintainable
5. Record the decision and rejected alternatives in spec or plan at the matching depth level.

For Level 0 direct code with no real signals, a short record is enough. Do not write a long checklist rejecting every pattern family.

## Pattern Candidate Signals

Evaluate candidate patterns when the request shows one or more of these signals:

- The same business rule or branching logic is expanding in multiple places.
- Behavior must switch by type, state, role, environment, or feature flag.
- Object or module creation logic is scattered or tightly coupled to consumers.
- A boundary must adapt incompatible APIs, legacy contracts, or third-party libraries.
- Side-effect coordination or notifications are spreading across modules.
- A workflow or request pipeline needs ordered fallback, delegation, or staged handling.
- A component tree or data tree must support uniform operations over nested structures.
- Access cost, async loading, caching, or permission checks need an indirection layer.
- A bug fix exposes repeated guard logic, missing adapter boundary, fragile command sequencing, stale state transitions, duplicated permission checks, or inconsistent request handling.

## Frontend Pattern Selection Matrix

Use these default mappings before inventing a custom abstraction:

- Contract or shape mismatch: consider Adapter, Facade, or a mapper boundary.
- Multiple validation, formatting, pricing, permission, rendering, or action policies: consider Strategy or a strategy map.
- State-dependent behavior that is spreading across conditionals: consider State or a state table.
- User actions that need queueing, retry, undo, logging, uniform invocation, or delayed execution: consider Command.
- Ordered fallback, validation, upload, submit, or request handling: consider Chain of Responsibility or an explicit pipeline.
- Cross-module notification with multiple consumers: consider Observer or Pub-Sub, with lifecycle ownership.
- Wrapping retries, timing, permission checks, caching, analytics, or tracing around an existing unit: consider Decorator or AOP-style function decoration.
- Hiding noisy SDK, request, editor, or subsystem details behind a narrow entrypoint: consider Facade.
- Lazy loading, access control, caching, request dedupe, or expensive object access: consider Proxy, Cache Proxy, or Virtual Proxy.
- Tree-like menus, schemas, blocks, nested forms, or rule groups: consider Composite only when leaf/container operations are truly uniform.
- Complex object or payload construction with ordered optional steps: consider Builder only when object literals or pure payload builders are no longer readable.

Load the detailed pattern catalog only for signal groups that are actually triggered. Do not load all pattern references for direct-code-only work.

## Anti-Rules

- Do not introduce a pattern just because a book names a similar shape.
- Do not add a pattern to prepare for hypothetical futures that the approved plan does not support.
- Do not hide simple domain behavior behind factories, managers, handlers, or strategies with only one real variant.
- Do not keep a pattern after review if it adds ceremony without reducing coupling or conditional complexity.
- Do not let framework conventions masquerade as pattern justification; explain the actual problem being solved.
- Do not skip pattern evaluation because the request is small, local, or a bugfix.
- Do not treat "no pattern" as a blank decision; record why direct code is the best fit.

## Frontend Adaptation Rules

- Prefer composition over inheritance for UI, hooks, composables, and modules unless inheritance is already the stable project convention.
- Prefer explicit module boundaries, functions, objects, discriminated unions, hooks, composables, components, and typed records over classical OO scaffolding where possible.
- For React, express variation through props, component composition, custom hooks, context only when needed, reducers, refs, and event handlers before introducing classes or manager objects.
- For Vue, express variation through props / emits, slots, composables, refs / computed, provide / inject only when needed, stores, directives, and SFC component boundaries before introducing classes or manager objects.
- For TypeScript, prefer `type` / `interface` contracts, discriminated unions, mapped records, generic functions, and exhaustive checks over abstract base classes or nominal interface hierarchies.
- For request and adapter work, prefer typed request modules, adapter / mapper functions, and explicit payload builders over service classes with hidden mutable state.
- For command, strategy, state, facade, proxy, and decorator variants, prefer frontend-native shapes: object maps, typed records, higher-order functions, composables / hooks, small modules, or component boundaries.
- Treat reactive subscriptions, event buses, store listeners, and UI notifications as Observer or Pub-Sub variants and review them for lifecycle safety.
- Treat feature flags, render variants, validation rules, pricing policies, and action dispatch as common Strategy or State candidates.
- Treat service wrappers, API clients, SDK bridges, and legacy compatibility layers as common Adapter, Facade, or Proxy candidates.
- Treat workflow steps, form submissions, command bars, undoable actions, and editor operations as common Command or Chain of Responsibility candidates.
- Avoid `Base*`, `Abstract*`, `I*` interface hierarchies, `*Manager`, `*Factory`, `*Handler`, and one-method class wrappers unless the project already uses that convention and the approved design records a real lifecycle, polymorphism, or dependency-boundary reason.

## Required Pattern Decision Record

For every delivery unit, the spec or plan must state:

- the concrete problem being solved
- decision depth: Level 0, Level 1, Level 2, or Level 3
- candidate signals found or ruled out
- chosen decision: `direct code`, `reuse existing pattern`, `adapt lightweight pattern`, or `introduce pattern`
- chosen pattern name, nearest pattern family, existing project pattern, or `none`
- frontend syntax shape: function, typed record, discriminated union, hook / composable, component boundary, store action, request module, adapter / mapper, higher-order function, or justified class
- why the chosen structure is the lightest sufficient fit
- why triggered alternatives were worse
- what variation, extension, dependency boundary, side-effect coordination, or behavior-selection problem the decision handles
- what signs would indicate the pattern is unnecessary, overbuilt, or now needed later

For Level 0 direct code, record only the concrete change, `Level 0`, `direct code`, `none`, the absence of real signals, and why the local implementation is safest. Do not list every untriggered pattern as a rejected alternative.

## Review Standards

Treat the following as explicit review checks:

- Is there a real change axis or repeated collaboration problem behind the pattern?
- Did the spec or plan run pattern-fit evaluation even for small/local work?
- Is the chosen pattern the simplest viable fit?
- Is the implementation shape idiomatic for the frontend stack being changed?
- Did the pattern reduce branching, coupling, scattered creation, or hidden dependency knowledge?
- Is the pattern adapted to frontend and JavaScript constraints instead of copied mechanically from classical OO examples?
- Would removing the pattern make the code clearer without losing important flexibility?
- If direct code was chosen, is the no-signal or triggered-candidate rejection explicit and reasonable without mechanical over-enumeration?

## Non-Goals

- This policy requires every request to evaluate pattern fit, but it does not require every request to use a design pattern.
- This policy does not replace clean-code, architecture, testing, or API-contract policies.
- This policy does not force formal GoF naming when a simpler equivalent structure is clearer, but the problem and intent must still be explicit.
