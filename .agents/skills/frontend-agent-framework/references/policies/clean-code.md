# Clean Code Policy

## Scope

This policy defines durable clean-code standards for frontend work. Apply it during planning, execution, verification, and review. Treat these rules as maintainability constraints, not as style-only preferences.

## Application Model

- Apply these rules when introducing or changing production code, shared utilities, hooks, components, module boundaries, and test code that explains behavior.
- Use the approved spec and plan to decide what behavior should exist; use this policy to decide how that behavior should be expressed in code.
- Escalate to a blocking issue when the implementation materially harms readability, change safety, or future extension cost.
- Do not use this policy to force speculative abstraction, cosmetic churn, or refactors that are unrelated to the approved request.
- Before modifying or removing existing code, inspect the affected feature flow, file reference relationships, callers, side effects, and downstream consumers so the change is made against the whole owned chain instead of a single visible line.
- After modifying or removing existing code, re-check the changed chain for missing required links, orphan links, stale callers, stale side effects, and collateral impact on neighboring features.
- When removing behavior, remove the now-unused dependency closure owned by that behavior: imports, helper functions, constants, types, request wrappers, reactive state, computed values, watchers, tests, mocks, and comments that no longer serve another caller.
- Test-file imports or references to code that the approved request changes or removes are empty references for production ownership decisions. Update, replace, or remove the tests to fit the approved behavior instead of retaining obsolete production code for test compatibility.

## Severity Guide

- Blocking: misleading names, hidden side effects, duplicate business rules that can drift, oversized mixed-responsibility modules, ambiguous control flow, or code structure that makes planned verification unreliable.
- Blocking: existing-code modification or removal performed without enough feature-flow and reference-chain analysis to prove what the touched code owns and what other features may be affected.
- Blocking: post-change chain validation finds a missing required step, orphan reference, stale caller, obsolete side effect, or extra code path that no longer has a real owner.
- Blocking: deleted behavior that leaves unused imports, dead helpers, orphan request wrappers, stale constants, obsolete computed/watch state, or comments/tests that describe behavior no longer present.
- Blocking: production code retained solely because test files still import or reference it after the approved behavior requires that code to change or be removed.
- Non-blocking: local naming improvements, light extraction opportunities, optional polish, or cleanup that improves clarity but is not required for safe delivery.

## Principles

### 1. Intention-Revealing Names

- Prefer names that reveal domain meaning, ownership, and effect.
- Apply when adding or changing variables, functions, components, hooks, files, exported APIs, and test names.
- Treat misleading names, vague placeholders, and unexplained abbreviations as defects when they obscure behavior.
- Do not rename stable external API fields, backend contracts, or framework-required identifiers just for local preference; instead isolate them behind clearer local adapters when needed.

### 2. Single Responsibility and Focused Units

- Keep each function, component, hook, and module focused on one clear reason to change.
- Apply when a unit starts mixing orchestration, data shaping, rendering, side effects, validation, and persistence concerns.
- Split code when a reader must hold multiple unrelated concerns in mind to understand one unit.
- Do not fragment cohesive logic into many tiny wrappers when that makes the behavior harder to follow than a focused local implementation.

### 3. One Level of Abstraction Per Unit

- Keep high-level intent and low-level mechanics from being interleaved in the same function or module where practical.
- Apply when orchestration code is mixed with parsing details, DOM manipulation, transport details, or formatting minutiae.
- Prefer top-level flow that reads like the use case, with lower-level details extracted into clearly named helpers.
- Thin glue code may legitimately bridge two nearby abstraction levels when extraction would only add indirection.

### 4. Duplication Must Be Reduced at the Rule Level

- Remove duplication that repeats business rules, branching logic, normalization logic, validation logic, or state transitions.
- Apply when the same behavior must be changed in multiple places or when two copies can drift independently.
- Prefer consolidating the rule once there is evidence of shared meaning, not just shared syntax.
- Do not create premature abstractions for minor incidental similarity such as two short lines that happen to look alike but are governed by different domain reasons.

### 5. Explicit Control Flow and Dependency Boundaries

- Make data flow, dependency ownership, and mutation boundaries obvious.
- Apply when logic depends on hidden globals, cross-module writes, implicit shared state, or hard-to-trace helper side effects.
- Prefer passing needed inputs explicitly, isolating boundary adapters, and keeping state ownership close to the feature that changes it.
- Do not over-inject stable framework primitives or obvious local dependencies just to satisfy a pattern mechanically.

### 6. Side Effects Must Be Named and Contained

- Separate queries from commands where practical, and make command-style side effects explicit in naming and placement.
- Apply when a function both computes and mutates, both validates and performs I/O, or both reads and silently rewrites shared state.
- Side effects are acceptable when the unit exists to perform them, but they must be easy to locate and reason about.
- Hidden side effects inside apparently pure helpers are blocking because they make debugging and review unreliable.

### 7. Errors and Edge Cases Must Stay Readable

- Express happy path, guard clauses, and failure handling so the dominant control flow is obvious.
- Apply when nested branching, sentinel values, retry logic, or mixed success/error conventions make behavior hard to predict.
- Prefer one coherent error strategy per boundary and clear guard clauses over deeply nested condition trees.
- Do not force a uniform error pattern across unrelated libraries when a local adapter can normalize them more cleanly.

### 8. Comments Explain Why, Not What

- Prefer clearer code, names, and structure before adding comments.
- Apply when the reason for a workaround, tradeoff, protocol quirk, or non-obvious constraint would otherwise be lost.
- Delete or rewrite stale comments, commented-out code, and comments that merely narrate obvious steps.
- Concise comments are encouraged when they preserve important context that cannot be made obvious from code alone.

### 9. Keep Interfaces Small and Honest

- Keep argument lists, return shapes, and exported surfaces as small as the current use case allows.
- Apply when a function accumulates flags, optional branches, loosely related parameters, or a bloated configuration object.
- Prefer grouping truly related data, extracting explicit domain objects, or splitting commands from queries.
- Do not generalize an interface for hypothetical callers that do not exist in the approved plan.

### 10. Leave the Area Clearer Than You Found It

- When touching existing code, improve the immediate area enough that readability, naming, and local structure do not get worse.
- Apply during feature work, bug fixes, and review-driven re-entry loops.
- Prefer small opportunistic improvements tied to the changed area: remove dead code, tighten names, collapse duplication, add missing test clarity, and isolate risky branches.
- Do not turn the request into a broad cleanup campaign that obscures delivery progress or expands scope beyond the approved plan.

### 11. Removal Changes Must Close Their Dependency Trail

- When a request removes a call, action, branch, request, field, UI control, or side effect, trace every symbol that existed only to support that removed behavior.
- Remove unused imports, helper functions, local constants, enums, types, request wrappers, composables, computed values, watchers, refs, state fields, tests, mocks, and comments that become dead after the behavior is removed.
- Before leaving execution, search changed files and direct helper modules for the removed symbol names and helper names to prove no orphan references or orphan definitions remain.
- Keep shared helpers only when another real production caller still uses them. If the helper is retained, the execution or review evidence must identify that remaining production caller.
- Test-only references are not real callers for retaining removed or replaced production code. If only tests still reference the target, treat that as a test adaptation task, not as evidence the production symbol is still owned.
- Do not keep dead helper code as a potential future reuse point. Future reuse is not a current owner.

### 12. Modification And Removal Must Preserve The Whole Chain

- For any existing-code modification or removal, identify the functional chain before editing: user entrypoint, component or hook path, state ownership, request or adapter boundary, helper layer, emitted side effects, and downstream UI or data consumers.
- Identify the file and symbol reference chain before editing: imports, exports, callers, direct consumers, event handlers, watchers, computed values, tests, mocks, and configuration references that participate in the behavior.
- Separate production ownership references from test-only references. Tests prove expected behavior; they do not own production symbols that the request explicitly changes or removes.
- Modify or remove code at the owning layer of the behavior. Do not patch only the visible symptom while leaving the real owner, adapter, state transition, or side effect inconsistent.
- After editing, re-run a chain check across changed files and directly related helper modules to prove the remaining flow is coherent end to end.
- The final chain must be clean: no missing required step, no stale unused step, no duplicate replacement path, no orphan helper, no stale import, no obsolete state, no hidden side effect, and no unreviewed impact on neighboring features.

## Review Triggers

Treat the following as explicit clean-code review checks:

- Does each changed unit have a clear purpose and readable name?
- Is business logic duplicated in multiple places?
- Was the affected feature flow and file reference chain reviewed before modifying or removing existing code?
- After the change, is the chain still coherent end to end, with no missing required link and no stale extra link?
- Did any removed behavior leave unused imports, orphan helpers, stale request wrappers, obsolete state, or comments/tests for behavior that no longer exists?
- Was any production code kept only because tests referenced it? If yes, that is a defect; adapt the tests instead.
- Are side effects obvious and placed in the right layer?
- Does the control flow read clearly from top to bottom?
- Did the change add flags, branches, or parameters that indicate a missing abstraction?
- Did the change improve or degrade the immediate area it touched?

## Non-Goals

- This policy does not define whitespace, lint, or formatter preferences.
- This policy does not require refactoring unrelated files for aesthetic consistency.
- This policy does not justify bypassing the approved spec, plan, or verification flow.
