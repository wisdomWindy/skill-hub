# State Machine

The lifecycle stage is the delivery state. The loop is the control mechanism that decides how the workflow advances, recovers gates, or re-enters a prior stage.
The goal contract defines completion. Workflow-style parallelization, when used, only affects execution scale and does not add new states.
The active delivery unit is either the active split module or the request itself.
For PRD-driven requests that finished `requirement-splitting`, stages after splitting apply to the active split module identified by `state.json.module_flow.current_module_id`.
For direct-change, bugfix, and other non-split requests, stages after intake apply to the request-level delivery unit and use request-level downstream artifact paths.
`state.json.speed_profile` controls context breadth and artifact density only; it does not create a lifecycle stage and does not waive gates.

## Stages

- intake
- requirement-analysis
- requirement-splitting
- page-design
- architecture-design
- spec
- plan
- execute
- verify
- review
- complete

## Loop States

- running
- blocked
- complete

## State Metadata

- `speed_profile.level` must be one of `S0 trivial`, `S1 local`, `S2 scoped`, or `S3 broad`.
- `speed_profile.context_budget` must describe the intended context breadth: `narrow`, `scoped`, or `full`.
- `speed_profile.artifact_density` must describe whether downstream artifacts use `compact` or `full` density.
- Missing `speed_profile` on legacy requests should be backfilled before the next stage decision.
- If a later stage discovers broader impact than the current profile covers, update `speed_profile` upward before continuing or rolling back.
- Do not downgrade `speed_profile` to avoid required analysis, verification, or review.

## Required Gates

- requirement-analysis artifact before `requirement-splitting` for PRD-driven requests
- page design artifact for the active delivery unit before `spec` when that delivery unit is page-oriented
- architecture design artifact for the active delivery unit before `spec` when that delivery unit is code-architecture-sensitive
- requirement-splitting artifacts before `page-design`, `architecture-design`, or `spec` for PRD-driven requests
- raw snapshot plus Markdown-normalized snapshot before `spec` for every requirement-splitting module that required Markdown normalization
- framework-approved active-delivery-unit spec before `plan`
- framework-approved active-delivery-unit plan before `execute`
- active-delivery-unit execution artifact before `verify`
- active-delivery-unit verification artifact before `review`
- active-delivery-unit review artifact with no blockers before advancing to the next module or `complete`

## Loop Decision Table

| Current condition | Loop action | Result |
| --- | --- | --- |
| Stage exit criteria satisfied and next gate satisfied | advance stage | enter the next lifecycle stage |
| PRD-driven request has no requirement-analysis artifact yet | dispatch stage | enter `requirement-analysis` after `intake` and before `requirement-splitting` |
| PRD-driven request has no requirement-splitting artifacts yet | dispatch stage | enter `requirement-splitting` before `page-design`, `architecture-design`, or `spec` |
| PRD-driven request has a normalized module missing either raw or normalized companion snapshot | recover gate | stay before `spec`, restore the missing companion artifact, then re-check the gate |
| Current split module passes `review` and pending split modules remain | advance stage | mark the current module completed, update module queues, promote the next pending module to `current_module_id`, and enter its first required downstream stage |
| Current split module passes `review` and no pending split modules remain | complete | mark the current module completed, clear `current_module_id`, set `stage=complete`, and set `loop.state=complete` |
| Non-split request passes `review` | complete | set `stage=complete` and set `loop.state=complete` |
| Gate missing but recoverable from repository state, artifacts, or evidence | recover gate | stay in the same lifecycle position, repair the prerequisite, then re-check the gate |
| Gate missing and depends on human confirmation or external resource | front-load or block | route to `requirement-analysis`, `intake`, or `bugfix-intake` when the confirmation belongs upstream; set `loop.state=blocked` only when that front-loaded gate cannot be recovered |
| Execute discovers architecture-design is materially incompatible with actual code constraints or repository reality | re-enter architecture-design | route to `architecture-design`, then continue the same lifecycle run |
| Verification fails but implementation can continue under the framework-approved plan | re-enter execute | route to `execute` immediately and continue the loop |
| Review finds blockers but implementation can continue under the framework-approved plan | re-enter execute | route to `execute` immediately and continue the loop |
| Request reaches completion conditions | complete | set `stage=complete` and `loop.state=complete` |

## Goal and Workflow Constraints

- The request may reach `complete` only when the goal contract is satisfied and verified.
- For split PRD-driven requests, `complete` additionally requires that every module listed in `state.json.module_flow.modules` has completed `review` successfully.
- For direct-change, bugfix, and other non-split requests, `complete` requires request-level `review` to pass with no blockers.
- Loop iterations do not themselves prove completion.
- Workflow-style parallel execution does not create additional lifecycle states or bypass gates.
- `speed_profile` does not create additional lifecycle states or bypass gates; it only narrows irrelevant context and allows compact artifacts for low-risk requests.
- A proactive workflow must declare its trigger, minimum context, and handoff path before the team treats it as reliable automation.
- `spec_approved` and `plan_approved` are automatic framework-approval flags. They must be set by the relevant stage after artifact quality, source traceability, scope alignment, and policy checks pass, not by user approval prompts in `spec` or `plan`.

## Re-entry Rules

- `resume_request`: re-enter the loop for an in-flight request that already has `state.json`
- `gate_recovery`: re-enter after a previously blocking gate was satisfied
- `architecture_design_invalidated`: route back to `architecture-design`
- `requirement_changed`: route back to `spec` or `plan`
- `verification_failed`: route back to `execute`
- `review_blocked`: route back to `execute`
- `manual_reopen`: re-enter a previously completed request after an explicit reopen decision
- Every re-entry above must increment `loop.iteration` when the main orchestrator starts the next decision cycle.

## Rollback Rules

- Requirement change during execute: back to `spec` or `plan` with `reentry_reason=requirement_changed`
- Architecture design invalidated during execute: back to `architecture-design` with `reentry_reason=architecture_design_invalidated`
- If upstream requirement content changes enough to alter request scope, non-goals, major dependencies, or the splitting basis, back to `requirement-analysis` with `reentry_reason=requirement_changed`
- If upstream requirement content changes enough to alter module boundaries, back to `requirement-splitting` with `reentry_reason=requirement_changed`
- Verification failure: back to `execute` with `reentry_reason=verification_failed`
- Blocking review finding: back to `execute` with `reentry_reason=review_blocked`
- `execute -> architecture-design -> spec -> plan -> execute` repeats until architecture design is stable against actual code constraints or a real blocking gate is reached
- `execute -> verify -> execute -> verify` repeats until verification passes or a real blocking gate is reached
- These rollback paths are same-run loop continuations unless a real blocking gate requires waiting.

## Artifact Roots

- Split PRD-driven active module: `docs/requests/<request-id>/module-runs/<module-id>/`
- Direct-change, bugfix, or non-split active delivery unit: `docs/requests/<request-id>/`

Downstream relative paths are the same under either root:

- `design/page-design.md`
- `design/architecture-design.md`
- `spec/spec.md`
- `spec/clarifications.md`
- `plan/plan.md`
- `plan/task-board.md`
- `execution/changelog.md`
- `verification/verification.md`
- `review/review.md`
