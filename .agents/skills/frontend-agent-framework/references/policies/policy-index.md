# Policy Index

Use this file as the entrypoint for `references/policies/`.

This file owns policy discovery, policy ownership, and stage-specific loading. It does not own verdict names, conflict resolution, or detailed rule text; those stay in `constraint-model.md` and the individual policy files.

## Loading Protocol

1. Read this file before choosing policy files for a lifecycle stage.
2. Read `constraint-model.md` when evaluating gates, verdicts, completion, conflicts, or policy changes.
3. Load only the policy files relevant to the current stage, touched code, and applicable risk surface.
4. Do not load every file in `references/policies/` by default.
5. When a policy points to another policy as an owner, defer to the owner instead of duplicating or reinterpreting the rule.

## Policy Ownership

| Policy | Owns | Load when |
| --- | --- | --- |
| `constraint-model.md` | constraint layers, allowed redundancy, verdict registry, conflict resolution, policy update procedure | checking hard gates, completing requests, changing framework constraints, resolving policy conflicts |
| `workflow-efficiency.md` | speed profile, context budget, compact artifact density, fast-path boundaries, and safe parallelism without quality loss | classifying request size, optimizing stage depth, deciding context breadth, writing compact artifacts, or when latency is a concern |
| `source-grounding.md` | source authority, grounding labels, anti-expansion rules | creating or approving any artifact, implementing against source, validating no unapproved scope expansion |
| `user-intent.md` | practical goal preservation and anti-bypass interpretation | request wording can be gamed, such as shorten, simplify, optimize, clean up, adjust, normalize, improve, reduce, avoid, or fix |
| `doc-writing.md` | artifact writing clarity | writing request, analysis, spec, plan, verification, or review artifacts |
| `plan-executable-contract.md` | plan precision, execute-readiness, no-guess implementation contract, and plan approval blockers | authoring or approving plan artifacts |
| `spec-constraints.md` | maintainability and design constraints that must appear in `spec/spec.md` | authoring or approving specs for production code, architecture, side effects, naming, variation, or bootstrap decisions |
| `expert-frontend-engineering.md` | end-to-end frontend engineering bar | user-facing behavior, state flow, data flow, component composition, frontend architecture, async behavior, or production integration changes |
| `production-code-quality.md` | type-first, fail-fast, null handling, naming, no magic variables, maintainability-first performance, boundary UI states | adding or changing production code |
| `code-review-checklist.md` | plan-stage human review contract, robustness, maintainability, performance / memory cleanup, and technology-stack anchoring | planning, executing, or reviewing production code changes |
| `clean-code.md` | readable expression, responsibility, dependency trails, deletion cleanup, meaningful constants, single-use file-extraction discipline | planning, executing, verifying, or reviewing changed production code and nearby tests |
| `human-review-readiness.md` | human PR reviewability, diff hygiene, local convention fit, self-review, and review-ready evidence | any delivery unit that changes production code, tests, mocks, contracts, or generated-facing files |
| `functional-programming.md` | pure transformations, immutable data, side-effect boundaries, readable composition | rules, adapters, mappers, validators, payload builders, state derivation, filtering, sorting, or effect orchestration |
| `frontend-architecture.md` | module boundaries, reuse decisions, Anti-DRY, shared abstraction ownership | architecture-sensitive work, repeated semantic logic, shared helper extraction, cross-module rule ownership |
| `design-patterns.md` | required pattern-fit evaluation, pattern depth levels, justified pattern selection, direct-code no-signal rationale, triggered-candidate rejection rationale, and pattern review | every delivery unit during spec/plan/verify/review; especially strategies, adapters, factories, commands, observers, facades, or other named/implicit pattern layers |
| `frontend-components.md` | component reuse and authored styling mechanics | page/component/UI changes, Tailwind utility styling, class binding reviewability |
| `vue-component-extraction.md` | Vue SFC extraction / non-extraction criteria, props / emits / slots boundaries, component owner, and extraction review blockers | Vue component extraction, page-local component splitting, SFC boundary changes, or when deciding whether a Vue section should stay inline |
| `api-contracts.md` | backend contract source priority, adapter boundaries, request/response semantics | backend integration, API payload/response handling, generated/protobuf/OpenAPI/documented contracts |
| `typescript-context.md` | scoped TypeScript compiler and declaration recovery | TypeScript-affecting work or JavaScript depending on TypeScript declarations |
| `testing.md` | test and verification discipline | planning or recording verification for behavior, regressions, edge cases, or acceptance criteria |
| `code-graph.md` | structural context recovery and impact analysis tool choice | existing-code analysis, call-site impact, refactor safety, dependency graph, root-cause analysis |

## Stage Loading Map

Use this map after reading the current stage subskill. Add or skip policy files based on the concrete request; applicability is determined by source facts, code facts, and the approved delivery-unit scope.

| Stage | Always load | Conditional policy files |
| --- | --- | --- |
| `intake` | `source-grounding.md`, `doc-writing.md`, `workflow-efficiency.md` | `user-intent.md`, `code-graph.md` |
| `bugfix-intake` | `source-grounding.md`, `doc-writing.md`, `workflow-efficiency.md` | `code-graph.md` when root-cause, caller, dependency, or impact analysis is material; `user-intent.md`, `testing.md` |
| `requirement-analysis` | `source-grounding.md`, `user-intent.md`, `doc-writing.md` | `api-contracts.md`, `typescript-context.md`, `code-graph.md` |
| `requirement-splitting` | `source-grounding.md`, `doc-writing.md` | `user-intent.md`, `frontend-architecture.md`, `api-contracts.md` |
| `page-design` | `frontend-components.md`, `doc-writing.md` | `vue-component-extraction.md` for Vue SFC / component boundary decisions; `expert-frontend-engineering.md`, `frontend-architecture.md`, `source-grounding.md` |
| `architecture-design` | `frontend-architecture.md`, `functional-programming.md`, `design-patterns.md`, `doc-writing.md` | `api-contracts.md`, `typescript-context.md`, `code-graph.md`, `frontend-components.md`, `production-code-quality.md` |
| `spec` | `source-grounding.md`, `spec-constraints.md`, `design-patterns.md`, `doc-writing.md` | `vue-component-extraction.md` when Vue component boundaries are added or changed; `workflow-efficiency.md` when compact artifact depth or context breadth is being chosen, plus all code-quality, architecture, styling, API, TypeScript, testing, intent, and human-review-readiness policies that affect the scoped work |
| `plan` | `source-grounding.md`, `testing.md`, `design-patterns.md`, `doc-writing.md`, `plan-executable-contract.md` | `vue-component-extraction.md` when Vue component boundaries are added or changed, `workflow-efficiency.md` when compact tasking, scoped verification, or parallelism is being chosen, plus the same applicable policy set approved in `spec`, plus `code-review-checklist.md` and `human-review-readiness.md` for code-changing work and `code-graph.md` when impact analysis is needed |
| `execute` | `source-grounding.md`, `clean-code.md` | `vue-component-extraction.md` when implementing Vue component extraction or inline decisions, `workflow-efficiency.md` when choosing context breadth or command scope, policies named by the approved `spec` / `plan`, `code-review-checklist.md` and `human-review-readiness.md` for code-changing work, and any policy triggered by implementation facts discovered during execution |
| `verify` | `constraint-model.md`, `testing.md`, `source-grounding.md`, `design-patterns.md` | `vue-component-extraction.md` when Vue component extraction decisions need verification, `workflow-efficiency.md` when choosing scoped verification commands, plus every policy with an applicable verification verdict in `constraint-model.md`, including `human-review-readiness.md` for code-changing work |
| `review` | `constraint-model.md`, `clean-code.md`, `source-grounding.md`, `design-patterns.md` | `vue-component-extraction.md` when reviewing Vue component extraction or non-extraction decisions, `workflow-efficiency.md` when using compact changed-hunk review, plus every policy with an applicable review verdict in `constraint-model.md`, including `code-review-checklist.md` and `human-review-readiness.md` for code-changing work |

## Cross-Policy Boundaries

- `expert-frontend-engineering.md` coordinates frontend quality across the whole user journey; it should point to more specific owners instead of duplicating their rules.
- `production-code-quality.md` sets the production implementation baseline; `code-review-checklist.md` turns human review concerns into plan-stage execution contracts and final review blockers; `clean-code.md` judges readability and dependency hygiene; `human-review-readiness.md` judges diff hygiene, local convention fit, self-review, and reviewer-ready evidence; `functional-programming.md` owns pure transformation and side-effect discipline.
- `frontend-architecture.md` owns reuse, Anti-DRY, shared abstraction decisions, and architecture-level locality; `clean-code.md` owns whether a concrete file extraction improves readability or creates needless indirection; `design-patterns.md` owns whether a specific pattern is justified.
- `frontend-components.md` owns authored styling mechanics and class-value constraints; `vue-component-extraction.md` owns concrete Vue SFC extract / keep-inline criteria; `production-code-quality.md` owns boundary UI state requirements.
- `api-contracts.md` owns backend contract semantics; `typescript-context.md` owns compiler and declaration recovery; `production-code-quality.md` owns local type precision after those sources are known.

## Integration Rules

- If a stage needs a rule, reference the owning policy instead of copying the full rule text into the stage subskill.
- If a template needs a policy, require only the artifact field or verdict that downstream stages consume.
- If a policy becomes broadly applicable, add it to this index and the `constraint-model.md` verdict registry when it creates a pass/fail gate.
- If two policies appear to overlap, prefer the narrower owner listed in `Policy Ownership`.
- If a rule needs human confirmation because it changes behavior, scope, data semantics, API meaning, permissions, or user intent, route back to the front-loaded confirmation gate instead of resolving it inside a downstream stage.
- If speed and quality appear to conflict, quality wins; use `workflow-efficiency.md` to reduce irrelevant context, duplicated writing, and unnecessary broad scans, not to skip applicable gates.
