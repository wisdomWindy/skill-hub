# Plan Executable Contract Policy

## Scope

Use this policy when authoring or approving `plan/plan.md` and `plan/task-board.md`.

The plan is an execution contract, not a directional outline. `execute` should be able to implement from the approved plan without guessing business requirements, business rules, product behavior, file ownership, symbol names, data shapes, sequencing, error handling, or verification work.

## Required Precision

A plan is executable only when it identifies:

- Scope: exact in-scope behavior, out-of-scope behavior, accepted assumptions, and blockers.
- Business requirements: every business feature point, actor, user goal, business object, business term, precondition, trigger, result, and acceptance expectation.
- Business logic: business rules, decision tables, condition branches, priority rules, calculation / derivation formulas, validation rules, status transitions, permissions, visibility rules, editable / disabled rules, idempotency rules, and cross-field or cross-step dependencies.
- Files and symbols: target files, owners, functions, components, hooks / composables, stores, request modules, adapters / mappers, tests, mocks, and generated or contract-facing files.
- Data contracts: relevant types / interfaces, request payloads, response fields, form models, view models, null / undefined semantics, normalization boundaries, and field mapping rules.
- State and flow: entrypoints, triggers, state owners, loading start / stop, success, failure, retry, cancel, disabled, empty, error, permission, and rollback paths.
- Implementation steps: ordered subtasks precise enough that execute can perform them without inventing missing behavior or structure.
- Dependency and cleanup closure: imports, exports, callers, side effects, helper ownership, removed behavior cleanup, and test adaptation.
- Verification: exact tests, type checks, lint checks, manual checks, evidence files, and commands not run with reasons.
- Review contract: code-review checklist contract, human-review-readiness evidence, and remaining risks.

## Approval Blockers

Do not set plan approval when:

- Any task says "按现有逻辑", "按常规", "处理相关逻辑", "完善交互", "补充校验", "优化代码", or equivalent vague wording without concrete files, symbols, behavior, and verification.
- Execute would need to infer a business feature point, business rule, condition branch, field meaning, column meaning, API shape, state transition, validation rule, visibility rule, permission rule, style approach, error message, or cleanup target.
- Any business term, status, operation, rule, validation, calculation, permission, visibility condition, editable condition, or exception path is named but not defined.
- A planned edit lacks its owning file or symbol.
- A changed behavior lacks before / after semantics.
- A branch, failure path, loading boundary, or empty / error state is possible but omitted.
- A removal or modification lacks pre-change impact analysis or post-change chain validation.
- A test or verification item lacks the command, target behavior, expected result, or fallback evidence.
- A task cannot be traced back to source-grounded spec items.

If precise information cannot be recovered from approved artifacts or repository context, roll back to `spec` or the front-loaded confirmation gate instead of approving the plan.
