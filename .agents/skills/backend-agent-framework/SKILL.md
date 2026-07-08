---
name: backend-agent-framework
description: Use when working in this repository's local `.agents` workflow for backend development. This is the default entry skill that orchestrates the full request lifecycle, enforces lifecycle gates, and routes work to the matching backend stage subskill.
---

# Backend Agent Framework

Use this as the default entry skill for repository-local backend workflow.

This main skill is the lifecycle orchestrator. It owns preflight checks, state-machine enforcement, module sequencing, gate recovery, and stage dispatch. It does not perform stage-local work itself.

## Goal

Keep the repository-local backend workflow in control through one default entry skill that decomposes work into lifecycle stages, advances the request through each stage in order, and runs an explicit loop orchestrator with focused stage subskills.

## What This Skill Owns

- Establish and preserve the request goal contract so "done" is explicit and checkable.
- Establish the proactive workflow contract: trigger, context, steerability, and handoff.
- Enforce full-scope delivery by default: requirement splitting is for decomposition and ordered execution, not for handing priority selection back to the user.
- Enforce autonomous progression by default: once a request enters the lifecycle, continue through every non-blocked stage in the same active run.
- Enforce the canonical lifecycle:
  `intake -> requirement-analysis -> requirement-splitting -> spec -> plan -> execute -> verify -> review -> complete`
- Enforce the optional structure-design lifecycle for backend-structural requests:
  `intake -> requirement-analysis -> requirement-splitting -> architecture-design -> spec -> plan -> execute -> verify -> review -> complete`
- For PRD-driven requests, convert split requirement modules into ordered downstream execution units and run them sequentially.
- Run the loop orchestrator:
  `observe state -> decide next action -> dispatch one stage or gate recovery action -> observe result -> iterate`
- Enforce specification-driven development, TDD, clean-code, design-pattern, code-context, and backend contract discipline.
- Enforce backend reliability concerns such as contract fidelity, idempotency, retry boundaries, observability, migration safety, and rollback readiness.
- Enforce backend safety concerns such as authentication, authorization, secret handling, sensitive-data exposure, and abuse-surface checks.
- Enforce Chinese repository artifacts by default.

## Built-In Constitution

This skill carries its own workflow constitution and does not require `.agents/AGENTS.md` to exist.

- Default entrypoint: use this skill as the single workflow entrypoint.
- New requirement: decompose the request into the full lifecycle and start from `intake`.
- Backend-structural requirement: after `requirement-splitting`, insert `architecture-design` before `spec` when interface surfaces, service boundaries, workflow orchestration, persistence models, async topology, or cross-service integration shape is a material part of the request.
- PRD-driven requirement: after `intake`, always run `requirement-analysis`, then `requirement-splitting`, before `architecture-design` or `spec`.
- PRD-driven requirement: unless the source itself defines phases, milestones, or optional scope branches, treat all in-scope modules as one ordered queue of downstream module lifecycles and execute them from first to last without asking the user to reprioritize.
- Default approval mode: `spec` and `plan` approvals are implicit inside the same active workflow run unless the user explicitly asks for a checkpoint or a real blocking decision remains unresolved.
- Defect input: normalize the bug through `bugfix-intake`, then route it to `architecture-design` or `spec` based on whether the fix changes backend structure.
- Existing request: resume from `docs/requests/<request-id>/state.json`, recover the current stage, and continue orchestrating from there.
- Existing PRD-driven split request: preserve or repair `state.json.module_execution`, recover `active_module_id`, and continue the current module lifecycle before advancing to the next module.
- Never start coding before a request workspace exists under `docs/requests/<request-id>/`.
- Never enter `requirement-splitting` for a PRD-driven request before durable requirement-analysis artifacts exist.
- Never enter `architecture-design`, `spec`, or `plan` for a PRD-driven request before durable requirement-splitting artifacts exist.
- Never implement a split module before that module's approved `modules/<module-id>/spec/spec.md` and `modules/<module-id>/plan/plan.md` exist.
- Never declare a split module complete before that module's `verification/verification.md`, `review/review.md`, and `release/release-readiness.md` all exist and pass.
- Never declare the whole request complete before every split module has completed its full downstream lifecycle.
- Never declare work complete before the active verification artifact explicitly records `规格约束符合性: 通过`.
- Never declare work complete before the active review artifact explicitly records `整洁代码评估: 通过` and `设计模式评估: 通过`.
- Never declare work complete before verification and review explicitly record security checks for auth/authz, secret handling, sensitive data, and abuse surfaces as `通过` or `不适用`.
- Never treat loop progress as proof of completion.
- Never stop merely because one task, one module, or one stage summary was completed when the next lifecycle action is already known and unblocked.
- Never turn module decomposition into a new prioritization question unless the source explicitly offers mutually exclusive rollout choices or a real blocking ambiguity prevents ordering.
- When requirements change, update request artifacts first and roll the request back to `spec`, `plan`, `requirement-splitting`, or `requirement-analysis`.
- The main skill owns lifecycle decomposition, progression control, gate checks, and stage routing.
- Stage subskills own stage-local execution rules only.
- Policy and template material lives under `references/` and is loaded on demand.
- Loop state is controlled by the main skill only; stage subskills must not reset or reinterpret it.
- Goal, loop, and workflow are separate dimensions: goal decides when work is done, loop decides how the orchestrator keeps re-evaluating, and workflow decides whether parallel scale is warranted.

## Preconditions

- Read `references/framework-overview.md` and `references/state-machine.md` before dispatching.
- If `.agents/AGENTS.md` exists, read it as a repository-local override layer after reading this skill.
- For existing work, read `docs/requests/<request-id>/state.json` before choosing a stage.
- For existing work, require `state.json.loop` to exist; if it is missing or malformed, repair it before continuing.
- For existing PRD-driven split work, recover the active module from `state.json.module_execution.active_module_id` and use the corresponding module workspace under `docs/requests/<request-id>/modules/<module-id>/`.
- For existing work, recover the current goal contract from `request.md`, the active scope spec, and the active scope verification expectations before resuming execution.
- For new work, require a readable PRD document or a stable PRD reference before intake begins.
- For bugfix work, require a readable bug report or a stable bug reference before bugfix intake begins.
- Do not create downstream artifacts before intake is complete.

## Dispatch Model

Follow this order:

1. Classify whether the request is a new requirement, a bugfix, or an in-flight request.
2. If the input is a defect or bug report, first route it through `bugfix-intake`.
3. If the request is a PRD-driven requirement, route it through `requirement-analysis` after `intake`.
4. After requirement analysis, route PRD-driven work through `requirement-splitting`.
5. If the request is backend-structural, insert `architecture-design` between `requirement-splitting` and `spec`.
6. Build or recover the lifecycle execution path:
   - bugfix or non-split work:
     `intake|bugfix-intake -> architecture-design? -> spec -> plan -> execute -> verify -> review -> complete`
   - PRD-driven split work:
     `intake -> requirement-analysis -> requirement-splitting -> [module-1 full lifecycle] -> [module-2 full lifecycle] -> ... -> complete`
7. For PRD-driven split work, initialize or recover `state.json.module_execution`:
   - choose deterministic `module_order`
   - choose `active_module_id`
   - map each module to its downstream entry stage: `architecture-design` or `spec`
   - keep downstream artifacts isolated under `docs/requests/<request-id>/modules/<module-id>/`
8. Validate lifecycle gates against this skill's built-in constitution and `references/state-machine.md`.
9. Load only the subskill for the current stage.
10. After the current stage finishes, determine whether the next stage of the active module can start immediately, whether the module should advance to its next stage, or whether control should move to the next module.
11. Continue stage-by-stage in the same active run until the active module and then the whole request reach `complete`, or a required gate truly blocks progress.

When requirement splitting yields multiple modules or functional units, do not collapse them back into one shared downstream `spec/plan/execute` track. Execute `模块 A` full lifecycle, then `模块 B` full lifecycle, and continue in dependency-aware source order until all modules are accepted.

## Goal Contract

Every request must have an explicit goal contract.

- Capture the initial goal in `request.md` during intake.
- Refine the goal into observable acceptance criteria in the active scope spec.
- Translate that goal into execution and verification work in the active scope plan and verification artifacts.
- If the request only describes a subjective improvement such as "better", "cleaner", or "more elegant", obtain or derive a more checkable completion condition before heavy execution begins.
- The loop exists to drive work toward the goal contract; the loop itself is not the goal.

## Proactive Workflow Contract

When the request describes a repeatable or operational workflow rather than a one-off edit, define the workflow contract explicitly before heavy execution.

- Define what event or condition starts the workflow.
- Define which repositories, documents, tools, and data sources provide the minimum viable context.
- Define how a human can observe, redirect, pause, or stop the workflow if it starts drifting.
- Define where the workflow hands results back to people or downstream systems.

## Loop Orchestration Model

The main skill runs a single explicit control loop for the request.

1. Observe: read `state.json`, inspect artifacts, approvals, module queue, and lifecycle gates.
2. Decide: choose exactly one next action from `dispatch_stage`, `recover_gate`, `request_approval`, `wait_external`, or `complete`.
3. Dispatch: load only the one subskill that matches the current lifecycle stage.
4. Observe result: verify the stage exit criteria or the recovered gate result, then re-check lifecycle gates.
5. Iterate: update `state.json.loop` and begin the next decision cycle.

Loop rules:

- Process only one current action per loop iteration.
- After each completed stage or recovered gate, re-enter the loop and decide again.
- After each completed stage, prefer immediate dispatch of the next unblocked stage over returning control to the user.
- Treat `requirement-analysis` as a full lifecycle stage with its own exit criteria and loop re-entry.
- Treat `requirement-splitting` as a full lifecycle stage with its own exit criteria and loop re-entry.
- For split work, treat review pass on the active module as a module-boundary event: if more modules remain, immediately advance `active_module_id` and enter that next module's entry stage.
- After `execute`, `verify`, or `review`, continue looping immediately unless the request is truly blocked or has reached `complete`.
- `request_approval` is an exception path, not the default path.
- If a gate can be satisfied by gathering repository context, repairing missing artifacts, or repairing missing state, do that recovery work inside the loop before stopping.

## Module Execution Model

For PRD-driven split requests, downstream execution is module-scoped and sequential.

- Top-level request artifacts remain under `docs/requests/<request-id>/`.
- Requirement artifacts remain under:
  - `docs/requests/<request-id>/requirements/requirement-analysis.md`
  - `docs/requests/<request-id>/requirements/requirement-map.md`
  - `docs/requests/<request-id>/requirements/modules/<module-id>.md`
- Each split module gets its own downstream workspace:
  - `docs/requests/<request-id>/modules/<module-id>/design/architecture-design.md`
  - `docs/requests/<request-id>/modules/<module-id>/spec/spec.md`
  - `docs/requests/<request-id>/modules/<module-id>/plan/plan.md`
  - `docs/requests/<request-id>/modules/<module-id>/execution/changelog.md`
  - `docs/requests/<request-id>/modules/<module-id>/verification/verification.md`
  - `docs/requests/<request-id>/modules/<module-id>/review/review.md`
  - `docs/requests/<request-id>/modules/<module-id>/release/release-readiness.md`
- `state.json.stage` always reflects the current stage of `module_execution.active_module_id`.
- `state.json.module_execution` records module order, active module, completed modules, and each module's entry stage and current downstream status.
- `requirement-analysis` creates the durable analysis baseline for scope, ambiguity, and split strategy.
- `requirement-splitting` creates the module queue.
- `review` on the active module advances to the next module automatically when the current module passes.
- The full request reaches `complete` only when `completed_modules` covers every ordered module.

## Workflow Scale Model

Workflow-style parallelization is optional horizontal scale.

- Default to one active main-skill path through the lifecycle.
- Treat split modules as an ordered queue of independent downstream lifecycles inside the same request, not as user-selected optional work items.
- Use workflow-style parallel execution only when the approved plan identifies multiple independent work units whose cost and context split justify parallelism.
- If parallel execution is used, it must still report back into the active module's artifacts plus the shared request state and gates.

## Orchestration Rules

- Decompose every request into the full lifecycle stage sequence, even when only one immediate stage is active.
- Normalize bugfix inputs into the same request workspace structure used by PRD-driven requests.
- For PRD-driven requirements, force a durable requirement-splitting pass before any design, specification, or planning work begins.
- For PRD-driven requirements, force a durable requirement-analysis pass before requirement-splitting so the source scope, hidden constraints, ambiguity set, and split axis are explicit.
- Requirement analysis must explicitly settle source-of-truth reading scope, confirmed decisions, project and data boundaries, mode-specific flow differences, acceptance/regression baseline, and blocker classification before decomposition starts.
- Treat requirement splitting as source-preserving normalization.
- After requirement splitting, derive a deterministic downstream ordering from source order, dependency order, and rollout constraints.
- After requirement splitting, run one module through `architecture-design? -> spec -> plan -> execute -> verify -> review` to acceptance before starting the next module.
- Do not merge multiple split requirement files back into one shared downstream `spec`, one shared `plan`, or one shared `task-board`.
- Execute the current stage completely through its designated subskill before attempting the next stage.
- After each stage, re-read the request state and evaluate whether the next gate is satisfied.
- If `verify` fails and the failure can be addressed by implementation work defined by the approved spec and plan, route immediately back to `execute`.
- If `review` finds blocking issues that can be addressed by implementation work defined by the approved spec and plan, route immediately back to `execute`.
- Do not ask the user "which part first" merely because the request was decomposed into multiple modules, services, endpoints, jobs, or schemas.
- Apply `references/policies/clean-code.md`, `references/policies/design-patterns.md`, `references/policies/spec-constraints.md`, `references/policies/code-graph.md`, `references/policies/api-contracts.md`, `references/policies/backend-architecture.md`, `references/policies/backend-components.md`, `references/policies/testing.md`, `references/policies/mysql-enterprise.md`, `references/policies/redis-enterprise.md`, `references/policies/kafka-enterprise.md`, `references/policies/grpc-enterprise.md`, and `references/policies/k8s-enterprise.md` as durable downstream rules.

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
- `state`: only `running`, `blocked`, or `complete`.
- `last_completed_stage`: the most recent stage whose exit criteria were fully satisfied.
- `pending_gate`: the currently blocking gate name, or `null`.
- `reentry_reason`: only `new_request`, `resume_request`, `gate_recovery`, `requirement_changed`, `verification_failed`, `review_blocked`, or `manual_reopen`.

For PRD-driven split requests, `state.json` should also include a top-level `module_execution` object with this shape:

```json
{
  "mode": "sequential",
  "active_module_id": "module-a",
  "module_order": ["module-a", "module-b"],
  "pending_modules": ["module-a", "module-b"],
  "completed_modules": [],
  "module_states": {
    "module-a": {
      "requirement_file": "requirements/modules/module-a.md",
      "workspace": "modules/module-a",
      "entry_stage": "architecture-design",
      "current_stage": "architecture-design",
      "status": "in_progress"
    }
  }
}
```

## Sequential Stage Execution

Execute every stage in full, in order, one at a time.

1. When a stage starts, complete all required work for that stage through its subskill.
2. Before advancing, verify that the current stage exit criteria are fully satisfied.
3. Update `state.json` to reflect the stage transition while preserving the current `loop` object.
4. Re-read `state.json`, increment `loop.iteration`, and continue only if the next gate is satisfied.
5. Never leave a stage partially done and then proceed to a later stage.
6. If `verify` or `review` sends the request back to `execute`, treat that as an immediate continuation of the same workflow.
7. For split requests, never start downstream work for `module N+1` before `module N` has passed `review` and `release-readiness`.
8. For split requests, after the current module passes review, advance immediately to the next module's `entry_stage`; only when no pending module remains may the request enter `complete`.

## Stage Routing

- New requirement with a readable PRD document or stable PRD reference: load `subskills/intake/SKILL.md`
- Bug or defect input with a readable bug report or stable bug reference: load `subskills/bugfix-intake/SKILL.md`
- Existing PRD-driven request with `stage=requirement-analysis`: load `subskills/requirement-analysis/SKILL.md`
- Existing PRD-driven request with `stage=requirement-splitting`: load `subskills/requirement-splitting/SKILL.md`
- Existing request with `stage=architecture-design`: load `subskills/architecture-design/SKILL.md` for `module_execution.active_module_id` when present
- Existing request with `stage=spec`: load `subskills/spec/SKILL.md` for `module_execution.active_module_id` when present
- Existing request with `stage=plan`: load `subskills/plan/SKILL.md` for `module_execution.active_module_id` when present
- Existing request with `stage=execute`: load `subskills/execute/SKILL.md` for `module_execution.active_module_id` when present
- Existing request with `stage=verify`: load `subskills/verify/SKILL.md` for `module_execution.active_module_id` when present
- Existing request with `stage=review`: load `subskills/review/SKILL.md` for `module_execution.active_module_id` when present

## Reference Loading

Load only what is needed:

- Workflow overview: `references/framework-overview.md`
- State machine and rollback rules: `references/state-machine.md`
- Framework authoring constraints: `references/authoring-guide.md`
- Feishu/Lark bug retrieval rules: `references/bugfix-feishu-project.md`
- Durable standards: `references/policies/*.md`
- Pattern catalog: `references/patterns/*.md`
- Artifact shape requirements: `references/templates/*.md`

## Hard Gates

- Never code before the request workspace exists.
- Never implement before the active scope's approved spec and plan exist.
- Stage approval may be implicit inside the same active run when the stage artifact meets exit criteria and no explicit manual checkpoint is active.
- Never let backend-structural work enter `spec` without an `architecture-design` artifact when backend shape is a material requirement.
- Never declare a module complete before its verification, review, and release-readiness artifacts all exist and pass.
- Never declare the whole request complete before every in-scope split module has completed its own downstream lifecycle.
- Never treat missing compliance verdicts as implied pass results.
- Do not bypass the local workflow by jumping straight to code.
