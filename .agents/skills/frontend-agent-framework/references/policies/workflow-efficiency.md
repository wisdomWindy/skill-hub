# Workflow Efficiency Policy

## Scope

Use this policy to reduce frontend-agent-framework execution latency without weakening functional correctness, code quality, performance safety, verification, review, or source-grounding gates.

Speed comes from narrowing context and artifact depth, not from skipping required decisions.

## Speed Profile

Every request should carry a speed profile in `state.json.speed_profile` after intake or bugfix-intake:

- `S0 trivial`: one localized behavior or cleanup, no new business rule, no API contract change, no shared abstraction, no user-facing flow redesign.
- `S1 local`: one page / component / hook / composable / request path, limited existing-code chain, simple business logic, no cross-module behavior ownership.
- `S2 scoped`: multiple files or one feature chain, material state / adapter / API / validation / removal cleanup / reuse decision.
- `S3 broad`: PRD-driven, multi-module, cross-system, architecture-sensitive, migration-heavy, or unclear requirement boundaries.

Choose the lowest safe profile. If evidence shows wider impact, upgrade the profile immediately and record why. Do not downgrade profile to save time after risk has been found.

## Quality Invariants

All profiles must preserve:

- source grounding and user-intent fidelity
- exact business requirements and business logic needed by execute
- applicable spec / plan automatic approval gates
- pre-change and post-change chain checks for modification or removal
- TypeScript, API, styling, clean-code, architecture, design-pattern, production-code-quality, human-review-readiness, verify, and review gates when applicable

Efficiency may change artifact density, context breadth, and command selection. It may not remove an applicable pass/fail verdict.

## Context Budget Rules

- Prefer targeted `rg`, direct imports, local callers, code graph evidence, and existing `artifacts/code-context.md` over broad repository scans.
- Do not reread unchanged large artifacts in full when a prior artifact already contains the needed source-grounded excerpt; read the relevant section or cite the existing artifact.
- Do not load every policy file. Use `policy-index.md` and the speed profile to load only triggered policies.
- Do not load pattern catalogs for Level 0 direct-code work with no real pattern signal.
- Do not scan all `.d.ts`, generated types, routes, stores, or components by default. Follow the scoped TypeScript / API / reference closure required by the approved task.
- For code graph, prefer it when structural impact is material; otherwise use direct `rg` import/caller checks and record that code graph was unnecessary.

## Artifact Density Rules

- `S0` and `S1` may use compact artifacts: required sections remain present, but non-applicable sections may be one-line `不适用：<reason>`.
- `S0` plans may use a single task and a minimal Mermaid flowchart when the behavior chain is genuinely single-path.
- `S0` / `S1` pattern decisions should use Level 0 direct code with a short no-signal rationale when no candidate signal exists; never enumerate unrelated patterns.
- `S0` / `S1` reviews should focus on changed hunks and applicable verdicts rather than restating every policy.
- `S2` and `S3` require fuller artifacts because speed risk is dominated by missed business logic, missed impact, or wrong abstraction.

## Parallelism Rules

- Parallelize independent read-only context gathering, searches, and verification commands when available.
- Do not parallelize tightly coupled lifecycle stages, state transitions, or edits to the same artifact.
- Do not use subagents, workflow-scale parallelization, or broad background exploration for `S0` / `S1` unless the approved plan proves independent work units with real payoff.

## Fast Path Rules

For `S0` / `S1` direct-change and bugfix work:

- skip PRD-only `requirement-analysis` and `requirement-splitting`
- skip `page-design` unless layout, visual hierarchy, styling system choice, or interaction structure changes materially
- skip `architecture-design` unless module boundaries, dependency direction, shared abstraction ownership, or cross-file collaboration changes materially
- keep `spec`, `plan`, `execute`, `verify`, and `review`, but write compact artifacts and use scoped evidence

For `S2` / `S3`, use the normal full-depth workflow.

## Blockers

Treat these as efficiency failures:

- spending broad context on unrelated modules when the target closure is known
- generating long boilerplate sections instead of concise `不适用` entries
- repeating the same policy text across artifacts instead of citing the approved decision
- running expensive repository-wide checks when scoped checks are sufficient and approved
- using speed as a reason to skip business logic detail, chain cleanup, tests, verification, or review
