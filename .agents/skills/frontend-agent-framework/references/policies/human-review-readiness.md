# Human Review Readiness Policy

## Scope

Use this policy for any delivery unit that changes production code, tests, mocks, contracts, or generated-facing files.

This policy defines whether the result is likely to pass a strict human code review. It complements clean-code and production-code-quality: those policies define code quality; this policy defines reviewability, diff hygiene, local convention fit, and evidence quality.

## Core Rules

- Optimize for reviewer trust: a reviewer should understand what changed, why it changed, how risk is bounded, and how it was verified without reconstructing the whole task from chat history.
- Keep the diff scoped to the approved request. Do not mix unrelated cleanup, broad formatting, speculative refactors, or opportunistic renames with the requested behavior.
- Match local project style before inventing structure. Read nearby owning files, sibling modules, existing helpers, naming, API wrappers, stores, components, tests, and error-handling patterns before implementing.
- Make the changed path reviewable end to end: entrypoint, state owner, adapter / request / helper layer, UI consumer, tests, and cleanup must be obvious from code or execution evidence.
- Prefer boring, idiomatic code that fits the repo over clever abstractions, novel helper layers, or framework-shaped indirection.
- Every changed file must earn its diff. If a file changed only because of formatting, import reorder churn, or speculative cleanup, remove that change unless it is explicitly in scope.

## Pre-Review Self-Check

Before leaving `execute`, perform a self-review pass as if reviewing another developer's PR:

1. Inspect the changed files and owned symbols.
2. Confirm every changed hunk maps to an approved task, source-grounded behavior, cleanup requirement, or required test adaptation.
3. Confirm local conventions were followed for naming, component shape, hooks / composables, request modules, stores, adapter boundaries, tests, and error handling.
4. Remove or fix review blockers before verification: dead code, unused imports, stale comments, commented-out code, debug logs, console noise, temporary names, misleading abstractions, duplicated paths, broad `any`, unsafe assertions, hidden side effects, and unrelated formatting churn.
5. Confirm the final diff is small enough and structured enough for a reviewer to reason about changed behavior without avoidable file jumps.
6. Record evidence: commands run, tests not run with reason, manual checks, risk areas, and remaining accepted risks.

## Human Review Blockers

Treat these as blockers:

- Unrelated changes, broad formatting churn, or drive-by refactors mixed into the request.
- Diff hunks that cannot be mapped to approved spec / plan tasks or required cleanup.
- Code that violates nearby project conventions without an approved reason.
- Debug code, console logs, commented-out code, stale TODOs, temporary names, placeholder copy, or leftover experimental branches.
- New or retained dead code, orphan helpers, unused imports, unused exports, stale tests, stale mocks, or obsolete comments.
- Overly broad types, `any`, unsafe assertions, magic fallbacks, silent failures, or swallowed promises that make reviewer confidence depend on trust instead of evidence.
- A change that is locally correct but hides risk in another layer, such as adapter bypass, state duplication, request side effects, unowned cache invalidation, or incomplete test adaptation.
- Unreviewable abstraction: new files, managers, factories, strategies, wrappers, or shared utilities that add indirection without a concrete approved owner and reviewer-visible payoff.
- Test or verification evidence that does not exercise the changed behavior, or missing verification without a clear reason and fallback check.

## Review-Ready Evidence

For a code-changing delivery unit, the final artifacts must let a human reviewer answer:

- What behavior changed?
- Which files and symbols own the change?
- Why is each non-obvious hunk necessary?
- What local convention or existing pattern was followed?
- What risks were considered and bounded?
- What tests, type checks, lint checks, or manual checks prove the change?
- What was intentionally not changed?

## Non-Goals

- This policy does not require a literal PR description file.
- This policy does not require broad cleanup outside the approved scope.
- This policy does not replace automated tests, clean-code review, source grounding, or architecture review.
- This policy does not force every small change into heavy documentation; small changes still need a concise diff-hygiene and evidence record.
