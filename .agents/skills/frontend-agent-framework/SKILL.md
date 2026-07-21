---
name: frontend-agent-framework
description: Use when working in this repository's local `.agents` workflow. This is the default entry skill that orchestrates the full request lifecycle, builds the stage task flow, enforces lifecycle gates, and routes execution to the matching stage subskill or subagent.
---

# Frontend Agent Framework

Use this as the default entry skill for this repository's local workflow.

This main skill is the lifecycle orchestrator. It owns preflight checks, stage planning, state-machine enforcement, and stage dispatch. It does not perform stage-local work itself, but it is responsible for driving the request through every required stage in order.

## Goal

Keep the repository-local workflow in control through one default entry skill that decomposes the request into lifecycle stages, advances the request through each stage in order, and runs an explicit loop orchestrator that uses focused stage subskills for the stage-local work.

## What This Skill Owns

- Establish and preserve the request goal contract so "done" is explicit and checkable.
- Establish the proactive workflow contract: trigger, context, steerability, and handoff.
- Enforce the canonical lifecycle with optional `page-design` and `architecture-design` inserted before `spec` when required:
  `intake -> requirement-analysis? -> requirement-splitting? -> page-design? -> architecture-design? -> spec -> plan -> execute -> verify -> review -> complete`
- Build or recover the active request's lifecycle execution path.
- For PRD-driven requests that were split into module files, enforce sequential module delivery within the same request:
  one module completes `page-design? -> architecture-design? -> spec -> plan -> execute -> verify -> review` before the next module starts.
- For direct-change, bugfix, and other non-split work, enforce the same downstream lifecycle at the request-level delivery unit:
  `page-design? -> architecture-design? -> spec -> plan -> execute -> verify -> review`.
- Run the loop orchestrator:
  `observe state -> decide next action -> dispatch one stage or gate recovery action -> observe result -> iterate`
- Decide whether workflow-style parallel execution is justified, while keeping it separate from the lifecycle and loop.
- Decide whether the request should remain reactive user-driven work or be framed as a proactive workflow with explicit start conditions.
- Block stage skipping when required automatic approvals or artifacts are missing.
- Keep request decisions, transitions, and evidence in repository artifacts instead of chat-only state.
- Enforce specification-driven development so implementation follows framework-approved repository artifacts instead of ad hoc coding decisions.
- Enforce front-loaded human confirmation: needs, questions, rules, and product decisions that require a person must be handled in requirement analysis or source normalization before downstream stages proceed.
- Enforce TDD for testable behavior changes unless the current task is explicitly non-testable and that exception is recorded.
- Enforce clean-code discipline so shipped changes remain readable, low-surprise, and maintainable.
- Enforce expert frontend engineering discipline so user journeys, state ownership, async correctness, interaction resilience, performance boundaries, evolution safety, and evidence are designed before implementation.
- Enforce production-code-quality discipline so production code is type-first, fail-fast, explicit about nullability and boundary states, readable before micro-optimized, and named consistently.
- Enforce expert frontend architecture discipline so repeated semantic rules are discovered, evaluated against Anti-DRY abstraction criteria, owned once only when the abstraction is stable and safe, and intentionally kept separate when abstraction would couple different semantics, layers, or unstable change points.
- Enforce meaningful-constant discipline so constants carry domain meaning, correctness constraints, necessary snapshots, material simplification, or real reuse instead of merely renaming one-off values.
- Enforce functional-programming discipline so business rules and data transformations prefer pure, composable, immutable code while side effects stay explicit.
- Enforce change-chain integrity so code modification or removal is preceded by feature-flow and reference analysis, and followed by a clean-chain validation.
- Enforce design-pattern discipline so abstractions are introduced only when they solve a real change, dependency, or behavior-selection problem.
- Enforce user-intent fidelity so implementations satisfy the request's practical goal, not just a superficial reading of the words.
- Enforce source-grounding discipline so downstream artifacts preserve only source-backed, code-fact-backed, confirmed, or narrowly source-derived content instead of expanding the request from convention, neighboring modules, sample content, or preferred design taste.
- Enforce repository-context discipline by preferring code graph for structural code understanding when existing-code analysis is material to the request.
- Enforce backend API contract discipline so frontend integration preserves contract sources, type ownership, field semantics, and explicit adapter boundaries.
- Enforce frontend/backend responsibility separation during requirement analysis so downstream frontend work does not absorb server-owned changes or hide backend dependencies.
- Enforce TypeScript context discipline so TS-affecting work reads the governing `tsconfig` and relevant declaration sources before coding, without falling into repository-wide declaration-file sweeps.
- Enforce frontend styling discipline so authored styles use Tailwind CSS-style utility classes, keep class values reviewable inline, and do not hide overlong class strings behind constants or computed values.

## Built-In Constitution

This skill carries its own workflow constitution and does not require `.agents/AGENTS.md` to exist.

- Default entrypoint: use this skill as the single workflow entrypoint.
- New requirement: decompose the request into the full lifecycle and start from `intake`.
- Direct-change requirement: when the user gives a stable frontend change, cleanup, modification, or removal request without a PRD, route it through `intake`, create a request-level delivery unit, skip `requirement-analysis` and `requirement-splitting`, and enter the first required downstream stage.
- PRD-driven requirement: after `intake`, always run `requirement-analysis` before `requirement-splitting`.
- Human confirmation rule: for PRD-driven work, all needs, questions, rules, ambiguous content, fuzzy content, and product decisions that require human confirmation must be surfaced and resolved or explicitly classified in `requirement-analysis` before `requirement-splitting`.
- Human confirmation rule: for direct-change and bugfix work that does not enter `requirement-analysis`, the equivalent confirmation gate is `intake` or `bugfix-intake`; unresolved human decisions, ambiguous content, and fuzzy content must be captured before entering `page-design`, `architecture-design`, `spec`, or `plan`.
- Source-grounding rule: every material behavior, field, interaction, state rule, API contract, dependency, task, and acceptance criterion must trace to an authoritative source, scoped code fact, confirmed decision, or safe source-derived consequence; otherwise it must be recorded as missing-source, clarification, blocker, external-interface pending, or out-of-scope.
- Automatic approval rule: `spec` and `plan` are approved by framework standards, not by user approval prompts; set the approval flags only after the stage artifact satisfies the relevant template, policy, source-traceability, and gate checks.
- Page-oriented requirement: after `requirement-splitting`, insert `page-design` before `spec` when layout, styling, or interaction structure is a material part of the request.
- Code-architecture-sensitive requirement: after `requirement-splitting`, insert `architecture-design` before `spec` when code module design, file structure design, code relationship design, function design, data structure design, or type design is a material part of the request.
- Code-architecture-sensitive requirement: also insert `architecture-design` when the request touches logic that may duplicate existing business rules, validation, adapter / mapper normalization, payload construction, option building, permission checks, state derivation, status mapping, or helper behavior across production modules.
- If a request is both page-oriented and code-architecture-sensitive, run `page-design` before `architecture-design`, then enter `spec`.
- PRD-driven requirement: after `requirement-analysis`, always run `requirement-splitting` before `page-design`, `architecture-design`, or `spec`.
- Defect input: normalize the bug through `bugfix-intake` before entering the standard lifecycle.
- Existing request: resume from `docs/requests/<request-id>/state.json`, recover the current stage, and continue orchestrating from there.
- Existing request: preserve or repair `state.json.loop`, resume the active loop, and continue orchestrating from there.
- Never start coding before a request workspace exists under `docs/requests/<request-id>/`.
- Never enter `requirement-splitting` for a PRD-driven request before a durable `requirement-analysis` artifact exists.
- Never enter `requirement-splitting` for a PRD-driven request before requirement analysis distinguishes frontend-owned work, server-owned work, shared contract work, external-interface pending work, and blocker ownership when the requirement touches data, APIs, permissions, workflows, or cross-system behavior.
- Never enter `page-design`, `architecture-design`, `spec`, or `plan` for a PRD-driven request before durable requirement-splitting artifacts exist.
- Never let a later split module enter downstream stages while an earlier split module has not yet passed `review`.
- Never let code-architecture-sensitive work enter `spec` without a durable `architecture-design` artifact.
- Never let repeated semantic logic across production modules proceed as local copy-paste when the approved change touches that logic; first record an extract / reuse / keep-separate / defer decision with evidence.
- Never enter `spec` for a PRD-driven request when any requirement-splitting module that needed Markdown normalization is missing either its raw snapshot or its Markdown-normalized snapshot.
- Never allow ambiguous or fuzzy requirement content to pass into `spec` or `plan` as an implementation assumption when it affects scope, behavior, data semantics, permissions, state flow, API contract meaning, validation rules, acceptance criteria, or user intent; confirm it in the front-loaded gate first.
- Never request user approval for `spec` or `plan`; if those stages expose a decision that truly needs a person, roll back to `requirement-analysis` or the appropriate source-normalization gate instead of pausing inside `spec` or `plan`.
- Never implement before the active delivery unit's framework-approved spec and plan artifacts exist.
- Never write production code before type contracts, null/edge/failure handling, naming expectations, boundary UI states, and performance tradeoffs have been reasoned through for the scoped change.
- Never implement TypeScript-affecting code before recovering the governing `tsconfig` and the declaration or generated type sources that materially affect the scoped files.
- Never violate applicable source, intent, expert-frontend-engineering, styling, constants, architecture, production-code-quality, functional-programming, API-contract, TypeScript-context, clean-code, or design-pattern policies; `references/policies/policy-index.md` defines policy ownership and `references/policies/constraint-model.md` defines verdict and conflict resolution.
- Never modify or remove existing code before reviewing the affected feature flow, file reference relationships, callers, side effects, and downstream consumers enough to understand what each touched symbol owns.
- Never treat a modification or removal as complete until the post-change feature flow and reference chain have been rechecked for missing links, orphan links, stale callers, unintended side effects, and collateral impact on neighboring features.
- Never treat test-file imports or references as real production owners for code that the approved request requires modifying or removing; update or remove the tests to match the requested behavior instead of preserving obsolete production code for tests.
- For greenfield work that starts a project, app, package, or frontend surface from scratch, never bypass scaffold selection; prefer the matching project-type scaffold or starter when one exists, and record any justified deviation before implementation.
- Never declare work complete before the Completion Rule passes.
- Never treat loop progress as proof of completion; only the goal contract and verification evidence can prove the request is done.
- When requirements change, update request artifacts first and roll the request back to `spec` or `plan`.
- When execution proves the current `architecture-design` decisions are materially unfit for actual code constraints, update request artifacts first and roll the request back to `architecture-design`.
- The main skill owns lifecycle decomposition, progression control, gate checks, and stage routing.
- The main skill owns the goal contract and decides whether workflow-style parallel scale is justified.
- The main skill owns proactive workflow design choices such as trigger shape, context boundary, and human handoff points.
- Stage subskills own stage-local execution rules only.
- Policy and template material lives under `references/` and is loaded on demand.
- Bugfix defect retrieval should use source-system tools when available and fall back to manual bug context capture when unavailable.
- Loop state is controlled by the main skill only; stage subskills must not reset or reinterpret it.
- Goal, loop, and workflow are separate dimensions: goal decides when work is done, loop decides how the orchestrator keeps re-evaluating, and workflow decides whether parallel scale is warranted.
- A strong workflow is defined by explicit trigger conditions, sufficient context, visible progress, and clear human intervention points.

If a repository also provides `.agents/AGENTS.md`, treat it as an optional local override only when it does not weaken these built-in rules.

## Preconditions

- Read `references/framework-overview.md` and `references/state-machine.md` before dispatching.
- Read `references/policies/policy-index.md` before selecting policy files for a stage or gate.
- Read `references/policies/constraint-model.md` before evaluating hard gates, resolving policy conflicts, or declaring completion.
- If `.agents/AGENTS.md` exists, read it as a repository-local override layer after reading this skill.
- For existing work, read `docs/requests/<request-id>/state.json` before choosing a stage.
- For existing work, require `state.json.loop` to exist; if it is missing or malformed, repair it before continuing.
- For existing work, recover the current goal contract from `request.md`, the active delivery unit's spec artifact, and verification expectations before resuming execution.
- For split PRD-driven work, recover `state.json.module_flow` and `state.json.module_flow.current_module_id` before choosing the next downstream stage.
- For direct-change, bugfix, or other non-split work, treat the request itself as the active delivery unit and use request-level downstream artifact paths.
- For new work, require either a readable PRD document, a stable PRD reference, or a stable direct-change instruction with enough repository scope and expected outcome to form a goal contract before intake begins.
- Acceptable PRD-driven inputs include a Feishu/Lark PRD link, a document ID, or a local PRD file path.
- Acceptable direct-change inputs include a user instruction that identifies the target page, component, file, behavior, cleanup, removal, or expected observable result well enough to write `request.md` and `artifacts/prd-snapshot.md`.
- For bugfix work, accept a readable bug report or a stable bug reference before bugfix intake begins.
- Acceptable bugfix inputs include a Feishu/Lark project key plus defect/work item ID, a defect detail link, an exported defect document, or a local bug report file path.
- When a stable Feishu/Lark defect reference is provided and compatible tools exist, prefer automatic defect retrieval before asking the user for manual restatement.
- For TypeScript-affecting work, identify the governing `tsconfig` chain and the relevant declaration sources before making stage decisions that depend on type, alias, ambient-global, or generated-contract understanding.
- Do not create downstream artifacts before intake is complete.

## Dispatch Model

Follow this order:

1. Classify whether the request is a PRD-driven requirement, direct-change request, bugfix, or in-flight request.
2. If the input is a defect or bug report, first route it through `bugfix-intake` to create the standard request workspace.
3. If the request is a PRD-driven requirement, route it through `requirement-analysis` after `intake`.
4. If the request is a direct-change request, keep `module_flow=null`, skip `requirement-analysis` and `requirement-splitting`, and use the request as the active delivery unit.
5. After `requirement-analysis`, route the same PRD-driven request through `requirement-splitting`.
6. If `requirement-splitting` produced module files, select exactly one current module from `state.json.module_flow.current_module_id`.
7. If no `module_flow.current_module_id` exists, treat the request itself as the active delivery unit.
8. If the current delivery unit is page-oriented, insert `page-design` between the current stage and the next design-or-spec stage.
9. If the current delivery unit is code-architecture-sensitive, insert `architecture-design` before `spec`.
10. Build or recover the lifecycle path from the canonical sequence, inserting `page-design` and `architecture-design` only when their gates require them and skipping PRD-only analysis/splitting only for direct-change, bugfix, or non-split work.
11. Validate lifecycle gates against this skill's built-in constitution and `references/state-machine.md`.
12. Load only the subskill for the current stage.
13. After the current stage finishes, determine whether the current delivery unit can advance, must roll back, or has completed its closed loop.
14. If the current split module passed `review`, advance `state.json.module_flow` to the next pending module and enter that module's first required downstream stage.
15. If a non-split delivery unit passed `review`, set `stage=complete` and `loop.state=complete`.
16. Continue stage-by-stage until the request reaches `complete` or a required gate blocks progress.

This workflow must be executed strictly in the defined lifecycle order.
Do not skip, merge, reorder, or bypass stages unless the rollback rules explicitly allow it.
If a required gate is not satisfied, stop and do not continue to the next stage.
When a gate is not satisfied, identify the blocking reason and obtain the information, approval, artifact, evidence, or other required resource needed to satisfy that gate before attempting the stage transition again.

## Goal Contract

Every request must have an explicit goal contract. The goal contract defines what "done" means for this request and must be concrete enough that downstream verification can confirm it without relying on taste or intuition alone.

Goal rules:

- Capture the initial goal in `request.md` during intake.
- Refine the goal into observable acceptance criteria in the active delivery unit's spec artifact.
- Translate that goal into execution and verification work in the active delivery unit's plan and verification artifacts.
- If the request only describes a subjective improvement such as "better", "cleaner", or "more elegant", obtain or derive a more checkable completion condition before heavy execution begins.
- The loop exists to drive work toward the goal contract; the loop itself is not the goal.
- For split PRD-driven requests, the request goal is complete only after every in-scope module has independently completed its downstream lifecycle and passed review.

## Proactive Workflow Contract

When the request describes a repeatable or operational workflow rather than a one-off edit, define the workflow contract explicitly before heavy execution.

Workflow contract rules:

- Define what event or condition starts the workflow.
- Define which repositories, documents, tools, and data sources provide the minimum viable context.
- Define how a human can observe, redirect, pause, or stop the workflow if it starts drifting.
- Define where the workflow hands results back to people or downstream systems.
- Prefer narrow, concrete triggers over vague requests such as "look around and see what matters".
- Prefer auditable evidence and visible artifacts over hidden automation.

## Loop Orchestration Model

The main skill runs a single explicit control loop for the request. The lifecycle stages stay the same; the loop is the control mechanism that advances or re-enters those stages.

1. Observe: read `state.json`, inspect artifacts, approvals, lifecycle gates, and the active delivery unit.
2. Decide: choose exactly one next action from `dispatch_stage`, `recover_gate`, `request_frontloaded_confirmation`, `wait_external`, or `complete`.
3. Dispatch: load only the one subskill that matches the current lifecycle stage when the action is `dispatch_stage`.
4. Observe result: verify the stage exit criteria or the recovered gate result, then re-check the lifecycle gates.
5. Iterate: update `state.json.loop` and begin the next decision cycle.

Loop rules:

- Process only one current action per loop iteration.
- After each completed stage or recovered gate, re-enter the loop and decide again.
- Treat `requirement-analysis` and `requirement-splitting` as full lifecycle stages with their own exit criteria and loop re-entry, not as intake footnotes.
- For split PRD-driven requests, treat `review -> next module` as a same-run loop continuation, not as a new request.
- After `execute`, `verify`, or `review`, continue looping immediately unless the request is truly blocked or has reached `complete`.
- Unless the request is truly `blocked` or has reached `complete`, do not stop the workflow or emit a terminal completion-style response; continue the next loop action in the same active workflow run.
- The loop stops only when `stage=complete` with `loop.state=complete`, or when a real external blocking gate requires waiting.
- If a gate can be satisfied by gathering repository context, repairing missing artifacts, or repairing missing state, do that recovery work inside the loop before stopping.
- Rollback is a valid loop re-entry path, not an exception outside the workflow.
- The loop never authorizes stage skipping, stage merging, or bypassing approval gates.
- This framework's loop is state- and gate-driven orchestration, not a wall-clock polling timer.

## Workflow Scale Model

Workflow-style parallelization is optional horizontal scale. It is not the lifecycle, not the loop, and not the completion condition.

Workflow rules:

- Default to one active main-skill path through the lifecycle.
- Use workflow-style parallel execution only when the framework-approved plan identifies multiple independent work units whose cost and context split justify parallelism.
- Do not use workflow-style parallel execution for trivial edits, tightly coupled changes, or single-thread tasks that fit comfortably in one context.
- When a workflow is proactive, trigger clarity matters before scale; do not parallelize a poorly scoped trigger.
- If parallel execution is used, it must still report back into the same request artifacts, gates, and loop state.
- Workflow selection changes execution scale only; it does not waive approvals, verification, review, or state-discipline rules.

## Orchestration Rules

- Decompose every request into the full lifecycle stage sequence, even when only one immediate stage is active.
- Normalize bugfix inputs into the same request workspace structure used by PRD-driven requests.
- Normalize direct frontend change, cleanup, modification, and removal inputs into the same request workspace structure, then run the request-level downstream lifecycle without PRD-only analysis and splitting stages.
- For PRD-driven requirements, force a durable `requirement-analysis -> requirement-splitting` pass before any design, specification, or planning work begins.
- Do not force direct-change requests through `requirement-analysis` or `requirement-splitting` unless the instruction expands into a PRD-like multi-module requirement that needs source-preserving decomposition.
- Treat requirement analysis as the explicit需求理解阶段: it must fix scope, non-goals, ambiguity visibility, fuzzy-content handling, dependency awareness, and splitting rationale before module decomposition begins.
- Treat requirement analysis as the source-grounding gate: it must separate source-backed facts, code-fact-backed constraints, confirmed decisions, safe source-derived consequences, missing-source items, and out-of-scope temptations before module decomposition begins.
- Treat requirement analysis as the frontend/backend responsibility separation stage when the request depends on data, APIs, permissions, workflows, backend validation, persistence, async jobs, or cross-system behavior; it must state what frontend implements, what server must provide or change, what is shared contract work, and what blocks frontend progress.
- Treat requirement splitting as source-preserving normalization: it must split modules and functional units without inventing behavior, implementation, or UX detail that is not grounded in the source.
- For page-oriented requests, treat page design as a required upstream input to `spec`, not as an implementation detail.
- For code-architecture-sensitive requests, treat `architecture-design` as a required upstream input to `spec`, not as an implementation detail.
- Treat repeated semantic logic as architecture-sensitive even when the user asks for a small change; if the touched rule already appears in multiple production modules, the framework must decide whether abstraction is justified before `spec`, `plan`, or `execute`, including extract, reuse, keep-separate, or defer.
- Treat lifecycle stages as delivery stages and the loop as control flow; do not invent a second lifecycle.
- Treat the goal contract as the source of truth for "done"; do not substitute chat satisfaction or elapsed loop count.
- Treat trigger design as the source of truth for "when should this workflow start"; do not replace it with vague polling or manual intuition when a specific event exists.
- Execute the current stage completely through its designated subskill before attempting the next stage.
- After each stage, re-read the request state and evaluate whether the next gate is satisfied.
- If the next gate is already satisfied, continue automatically to the next stage.
- For PRD-driven requirements, do not allow `spec` to rediscover modules directly from the raw PRD when `requirement-splitting` artifacts are expected; first repair or regenerate the split artifacts.
- For PRD-driven requirements, do not let `requirement-splitting` silently invent scope, non-goals, or splitting rationale that should already have been fixed in `requirement-analysis`; first repair or regenerate the analysis artifact.
- For PRD-driven requirements, do not allow `spec` to start when a normalized module lacks either the raw snapshot or the Markdown-normalized snapshot; first recover the missing companion artifact and then re-check the gate.
- For PRD-driven requirements with split modules, do not let `spec`, `plan`, `execute`, `verify`, or `review` span multiple modules at once; downstream work must stay scoped to the active module.
- If `execute` discovers that the approved `architecture-design` is materially incompatible with actual code constraints, repository structure, dependency boundaries, function organization, or type/data-shape reality, route immediately back to `architecture-design` and continue the same workflow run through `architecture-design -> spec -> plan -> execute` without waiting for a new user prompt.
- If `verify` fails and the failure can be addressed by implementation work defined by the framework-approved spec and plan, route immediately back to `execute` and continue the loop without waiting for a new user prompt.
- If `review` finds blocking issues that can be addressed by implementation work defined by the framework-approved spec and plan, route immediately back to `execute` and continue the loop without waiting for a new user prompt.
- If the next gate depends on human confirmation, route to `requirement-analysis`, `intake`, or `bugfix-intake` as the front-loaded confirmation gate; only stop there when the decision cannot be recovered from sources or repository context.
- If the next gate can be satisfied by gathering repository-local context, artifacts, or evidence, obtain that prerequisite first and then continue the lifecycle.
- When a gate fails, first attempt loop-local recovery for missing state, missing artifacts, or missing repository evidence before declaring the request blocked.
- Use workflow-style parallelization only as an execution-scale choice after planning, never as a replacement for lifecycle control.
- Prefer workflows that are observable and steerable: the team must be able to inspect progress, verify evidence, and intervene before completion claims are accepted.
- For `spec` and `plan` approval gates, use framework automatic approval: validate the artifact against this skill's templates, policies, source traceability, active delivery unit scope, and state-machine gates, then set the relevant approval flag without asking the user.
- For `spec` and `plan` approval gates, reject any behavior or task that lacks a source-grounding label and traceable authority; roll back to the appropriate front-loaded gate instead of filling the gap.
- Do not use structured approval UI or free-text confirmation for `spec` or `plan`; human confirmation belongs in requirement analysis or source normalization before downstream artifacts are authored.
- Unless the user explicitly requests another language, request artifacts should follow the user's working language; for this repository's current workflow, `spec` / `clarifications` / `plan` / `task-board` should default to Chinese.
- Treat the framework-approved spec and plan as the authoritative implementation contract for all downstream stages.
- Require the framework-approved spec and framework-approved plan to stay aligned at the same function-complete behavior granularity for the scoped work; if one artifact is materially coarser, finer, or contradictory, route back to repair the artifacts before downstream execution continues.
- Require `plan/plan.md` to reach function-complete task decomposition for scoped work so downstream execution does not infer missing fields, columns, interactions, states, or flow steps ad hoc.
- Require downstream `requirement-splitting`, `spec`, and `plan` to preserve the frontend/backend responsibility split fixed during requirement analysis; frontend implementation may consume contracts and adapters, but must not silently implement server-owned persistence, validation, permission, workflow, or data-production responsibilities.
- Use the active delivery unit artifact root consistently:
  - split PRD-driven module: `docs/requests/<request-id>/module-runs/<module-id>/`
  - direct-change, bugfix, or non-split request: `docs/requests/<request-id>/`
- For existing-code modification or removal, require the plan and execution record to identify the affected feature chain, involved files, symbol reference relationships, callers, side effects, and downstream consumers before editing; after editing, verification and review must confirm the chain is still coherent, with no missing required step and no stale extra step.
- For modification or removal decisions, treat test-only references to the target code as empty references for ownership and retention decisions; the tests are part of the adaptation surface and must be updated, replaced, or removed according to the approved behavior.
- For greenfield work that starts a project, app, package, or frontend surface from scratch, require the scaffold or starter decision to be made in repository artifacts before implementation; when a suitable project-type scaffold exists, treat it as the default starting point unless the artifacts record why it is unsuitable or unavailable.
- Do not let execution, verification, or review invent behavior that is not justified by the framework-approved spec and plan.
- Do not let execution, verification, or review leave duplicated semantic logic in place when the approved architecture decision requires extraction or reuse, and do not let them introduce wrong abstractions when Anti-DRY criteria require keeping logic separate.
- Do not let execution, verification, or review satisfy only the literal words of a request while violating the user's practical goal or using a forbidden interpretation recorded upstream.
- For behavior that can be covered by tests, plan and execute the work using a red -> green -> refactor loop.
- Apply durable policies through `references/policies/policy-index.md`: load the owning policy files for the current stage, touched code, and risk surface, then use `constraint-model.md` for required verdicts and conflicts.

## Loop State Contract

`docs/requests/<request-id>/state.json` must include a top-level `loop` object with this shape:

```json
{
  "iteration": 1,
  "state": "running",
  "last_completed_stage": null,
  "pending_gate": null,
  "reentry_reason": "new_request"
}
```

Field rules:

- `iteration`: increment once each time the main skill re-enters the top-level decision loop.
- `iteration` must increase whenever the main skill finishes one top-level action and starts the next loop decision, including re-entry from `verify`, `review`, or gate recovery.
- `state`: only `running`, `blocked`, or `complete`.
- `last_completed_stage`: the most recent stage whose exit criteria were fully satisfied.
- `pending_gate`: the currently blocking gate name, or `null` when no blocking gate is active.
- `reentry_reason`: only `new_request`, `resume_request`, `gate_recovery`, `architecture_design_invalidated`, `requirement_changed`, `verification_failed`, `review_blocked`, or `manual_reopen`.

State rules:

- Do not redefine the top-level `status` field in this skill.
- `loop.state=blocked` is only for real external blocking gates after internal recovery was attempted.
- `loop.state=complete` is only valid when `stage=complete`.
- Only the main skill may create, reset, or reinterpret `loop`; stage subskills may preserve it but must not redefine it.

For split PRD-driven requests after `requirement-splitting`, `state.json` must also include `module_flow`.

`module_flow` rules:

- `execution_mode` must be `sequential`
- `current_module_id` identifies the only split module allowed to progress through downstream stages
- `pending_module_ids` stays ordered by the planned module delivery sequence
- `completed_module_ids` contains only modules that already passed `review`
- each module entry records source module path, page-design need, architecture-design need, and status
- each module entry also records its own approval state; do not reuse another module's approvals
- when a module finishes `review` without blockers, set `modules.<current-module-id>.status=completed`
- then remove that module from `pending_module_ids` and append it to `completed_module_ids`
- if pending modules remain, promote the next module to `current_module_id`, set `modules.<next-module-id>.status=in_progress`, and set `stage` to that next module's first required downstream stage
- if no pending modules remain, set `current_module_id=null`, set `stage=complete`, and set `loop.state=complete`
- `stage=complete` is only valid after `pending_module_ids` is empty

For direct-change, bugfix, and other non-split requests, `module_flow` remains `null`.
Use top-level `approvals.spec_approved` and `approvals.plan_approved` for non-split approval gates.
Approval fields are framework-owned automatic gates, not user-approval prompts.
When a non-split request passes `review` without blockers, set `stage=complete` and `loop.state=complete`.

## Active Delivery Unit Artifact Roots

Stage subskills must resolve paths from the active delivery unit before reading or writing downstream artifacts.

- Split PRD-driven module root: `docs/requests/<request-id>/module-runs/<module-id>/`
- Direct-change, bugfix, or non-split request root: `docs/requests/<request-id>/`

Path mapping:

- `design/page-design.md`
- `design/architecture-design.md`
- `spec/spec.md`
- `spec/clarifications.md`
- `plan/plan.md`
- `plan/task-board.md`
- `execution/changelog.md`
- `verification/verification.md`
- `verification/evidence/`
- `review/review.md`

For split PRD-driven work, approvals live under `state.json.module_flow.modules.<module-id>.approvals`.
For direct-change, bugfix, and other non-split work, approvals live under top-level `state.json.approvals`.
In both scopes, approvals record that the framework accepted `spec` or `plan` against its standards; they do not mean a person approved the artifact at that stage.

## Sequential Stage Execution

Execute every stage in full, in order, one at a time.
At each stage boundary, update `docs/requests/<request-id>/state.json` before entering the next stage, then return to the loop controller.

For split PRD-driven requests, execute every downstream stage for the current module in full before moving to the next module.
For direct-change, bugfix, and other non-split requests, execute every downstream stage once at request level before completing the request.

1. When a stage starts, complete all required work for that stage through its subskill.
2. Before advancing, verify that the current stage's exit criteria are fully satisfied.
3. Update `state.json` to reflect the stage transition while preserving the current `loop` object.
4. Re-read `state.json`, update loop metadata in the main skill, increment `loop.iteration`, and continue only if the next gate is satisfied.
5. Never leave a stage partially done and then proceed to a later stage.
6. If `verify` or `review` sends the request back to `execute`, treat that as an immediate continuation of the same workflow, not as a stopping point.
7. If `verify` or `review` returns the request to `execute`, continue that re-entry in the same active workflow run unless a real blocking gate interrupts progress.
8. If the current split module passes `review`, mark it `completed`, update the module queues, then either promote the next pending module or finish the request in the same active workflow run.
9. If a non-split request passes `review`, set `stage=complete`, set `loop.state=complete`, and finish the request in the same active workflow run.

Forbidden examples:

- Doing verify or review work while `state.json` still says `execute`
- Writing implementation code while `state.json` still says `spec` or `plan`
- Skipping the `state.json` update at a stage boundary
- Resetting or deleting `state.json.loop` inside a stage subskill
- Writing one split module's implementation while `state.json.module_flow.current_module_id` points to another module

## Stage Routing

- New PRD-driven requirement with a readable PRD document or stable PRD reference: load `subskills/intake/SKILL.md`
- New direct-change request with a stable user instruction and enough repository scope to form a goal contract: load `subskills/intake/SKILL.md`
- Bug or defect input with a readable bug report or stable bug reference: load `subskills/bugfix-intake/SKILL.md`
- Existing PRD-driven request with `stage=requirement-analysis`: load `subskills/requirement-analysis/SKILL.md`
- Existing PRD-driven request with `stage=requirement-splitting`: load `subskills/requirement-splitting/SKILL.md`
- Page-oriented request with `stage=page-design`: load `subskills/page-design/SKILL.md`
- Code-architecture-sensitive request with `stage=architecture-design`: load `subskills/architecture-design/SKILL.md`
- Existing request with `stage=spec`: load `subskills/spec/SKILL.md`
- Existing request with `stage=plan`: load `subskills/plan/SKILL.md`
- Existing request with `stage=execute`: load `subskills/execute/SKILL.md`
- Existing request with `stage=verify`: load `subskills/verify/SKILL.md`
- Existing request with `stage=review`: load `subskills/review/SKILL.md`

If a request is already at `stage=complete`, do not resume implementation flow unless the requirement changed and the request is explicitly rolled back.

## Reference Loading

Load only what is needed:

- Workflow overview: `references/framework-overview.md`
- State machine and rollback rules: `references/state-machine.md`
- Framework authoring constraints: `references/authoring-guide.md`
- Policy routing and ownership: `references/policies/policy-index.md`
- Constraint model and verdict registry: `references/policies/constraint-model.md`
- Feishu/Lark bug retrieval rules: `references/bugfix-feishu-project.md`
- Durable policy details: load only the specific `references/policies/*.md` files routed by `policy-index.md` for the current stage and touched risk surface.
- Pattern catalog: `references/patterns/*.md`
- Artifact shape requirements: `references/templates/*.md`
- Requirement analysis artifact shape: `references/templates/requirement-analysis.md`
- Code-context artifact template: `references/templates/code-context.md`
- Bugfix intake artifact shape: `references/templates/bugfix-intake.md`
- Page design artifact shape: `references/templates/page-design.md`
- Architecture design artifact shape: `references/templates/architecture-design.md`
- Execution artifact shape: `references/templates/execution.md`

## Hard Gates

Use `references/policies/policy-index.md` as the single-source map for policy ownership and loading. Use `references/policies/constraint-model.md` for allowed redundancy, conflict resolution, and verdict registration.

Non-bypassable gate categories:

- Workspace and state gates: never code before the request workspace exists; never skip state recovery; never read or write the wrong active delivery-unit artifact root.
- Upstream requirement gates: PRD-driven work needs `requirement-analysis` before `requirement-splitting`; direct-change and bugfix work must resolve human decisions, ambiguity, fuzzy content, and source grounding in their front-loaded gate.
- Design gates: page-oriented work requires page design; architecture-sensitive work requires architecture design; invalidated architecture must roll back before execution continues.
- Approval gates: `spec` and `plan` use framework automatic approval only; execution requires framework-approved spec and plan.
- Source and intent gates: implementation must map to source-grounded spec / plan items and preserve the user intent contract without unapproved expansion or forbidden interpretations.
- Existing-code gates: modification and removal require pre-change chain review, post-change chain validation, dependency-closure cleanup, and test adaptation when tests reference changed or removed production code.
- Code-quality gates: apply the relevant policies for production-code-quality, clean-code, functional-programming, frontend-architecture, design-patterns, frontend-components, api-contracts, and typescript-context.
- Review blocker gates: do not pass review with missing required verdicts, unresolved blockers, misleading names, hidden side effects, wrong abstraction, hidden mutation, contract drift, styling violations, or skipped TypeScript context recovery.
- Completion gates: do not complete until verification and review artifacts exist and every applicable verdict in the constraint-model registry explicitly records `pass`.
- Recovery gates: when a gate fails, repair the missing prerequisite or roll back to the owning stage; mark `blocked` only for a real unresolved external or human-confirmation gate after internal recovery was attempted.

## Required State Discipline

- Read `docs/requests/<request-id>/state.json` before acting on any existing request.
- Treat `state.json` as the source of truth for `stage`, approvals, artifact status, and loop metadata.
- Treat `state.json.module_flow` as the source of truth for which split module is currently active.
- If `state.json` and filesystem artifacts disagree, repair the state or missing artifacts before continuing.
- If `loop` is missing on a legacy request, backfill it before continuing the workflow.

## Responsibilities

The main skill owns:

- request classification
- lifecycle decomposition
- goal preservation
- loop control
- workflow scale decisions
- stage-to-stage progression control
- gate checking
- stage dispatch

Stage actions belong only to subskills.

## Escalation Rules

- If a stage uncovers missing product decisions, record them in repository artifacts instead of silently filling the gap.
- If a requirement changes during execution, stop coding, set loop re-entry reason to `requirement_changed`, and route back to `spec` or `plan`.
- If upstream requirement meaning changes enough to alter request scope, non-goals, key dependencies, or the basis for splitting, route back to `requirement-analysis` before continuing toward `requirement-splitting` or downstream stages.
- If the requirement change alters split-module boundaries or sequencing, route back to `requirement-splitting` and regenerate `module_flow`.
- If execution shows the current `architecture-design` is materially unreasonable, infeasible, or contradicted by actual code constraints, stop coding, set loop re-entry reason to `architecture_design_invalidated`, and route back to `architecture-design`, then continue `architecture-design -> spec -> plan -> execute` in the same active workflow run.
- If verification fails, set loop re-entry reason to `verification_failed` and route back to `execute`.
- If review finds blockers, set loop re-entry reason to `review_blocked` and route back to `execute`.
- After routing back from `verify` or `review`, continue the `execute -> verify` loop in the same active workflow run until verification passes or a real blocking gate is reached.
- If execution discovers the spec is incomplete, ambiguous, or contradicted by reality, stop and route back to `spec` or `plan` before continuing implementation.
- If TDD cannot be applied to a behavior change, record the reason and the fallback verification method in repository artifacts before continuing.
- If execution or review finds a clean-code violation severe enough to endanger readability, safe change, or future extension, treat it as a real workflow issue and route it through the normal execute/review loop instead of deferring it as cosmetic feedback.
- If the need for a pattern is discovered during execution, record and approve that design decision through spec or plan artifacts before cementing the abstraction in code.
- If an existing-code request depends on structural understanding and no usable code graph is present, attempt automatic graph installation or bootstrap first, then record detection status, installation or bootstrap result, and fallback status in `artifacts/code-context.md`.
- If a stage exits with more implementation work required and no real external block exists, do not pause for a fresh user prompt; update loop metadata and immediately dispatch the next stage.

## Completion Rule

Treat a request as complete only after all of the following are true:

- the goal contract is satisfied by observable results
- implementation matches the framework-approved spec and plan
- verification evidence exists for every acceptance criterion
- review records no unresolved blocking issues
- every applicable verification and review verdict in `references/policies/constraint-model.md` explicitly records `pass`
- missing verdicts are treated as failures, not implied passes
- when module splitting applies, every module in `state.json.module_flow.modules` is marked `completed`
- `state.json.stage` is `complete`
- `state.json.loop.state` is `complete`

## Non-Goals

- Do not duplicate stage instructions in this file.
- Do not expose policy or template references as top-level skills.
- Do not invent another request lifecycle beside the repository-owned one.
- Do not perform stage-local authoring, implementation, verification, or review inside the main skill body.
