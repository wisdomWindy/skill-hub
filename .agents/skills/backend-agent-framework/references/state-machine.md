# State Machine

The lifecycle stage is the delivery state. The loop is the control mechanism that decides how the workflow advances, recovers gates, or re-enters a prior stage.
The goal contract defines completion. Workflow-style parallelization, when used, only affects execution scale and does not add new states.
For PRD-driven split requests, the lifecycle is evaluated against the current `module_execution.active_module_id`, and the request advances to the next module only after the current module passes review and release readiness.

## Stages

- intake
- requirement-analysis
- requirement-splitting
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

## Required Gates

- architecture design artifact before `spec` for backend-structural requests
- requirement-analysis artifact before `requirement-splitting` for PRD-driven requests
- requirement-splitting artifacts before `architecture-design` or `spec` for PRD-driven requests
- raw snapshot plus Markdown-normalized snapshot before `spec` for every requirement-splitting module that required Markdown normalization
- `module_execution.active_module_id` and that module's workspace path before any downstream module stage
- `spec_approved` before `plan`
- `plan_approved` before `execute`
- verification artifact before `review`
- review artifact with no blockers before advancing to the next module or `complete`
- release readiness artifact with `result=pass` before advancing to the next module or `complete`

## Loop Decision Table

| Current condition | Loop action | Result |
| --- | --- | --- |
| Stage exit criteria satisfied and next gate satisfied | advance stage | enter the next lifecycle stage |
| Stage exit criteria satisfied and the only missing approval is a default implicit stage approval | recover gate | set the approval flag, advance immediately, and continue the same run |
| PRD-driven request has no requirement-analysis artifact yet | dispatch stage | enter `requirement-analysis` before `requirement-splitting` |
| PRD-driven request has requirement-analysis artifact but no requirement-splitting artifacts yet | dispatch stage | enter `requirement-splitting` before `architecture-design` or `spec` |
| PRD-driven request finished requirement splitting and has a valid `module_execution` queue | advance stage | enter the first pending module's `entry_stage` |
| PRD-driven request has a normalized module missing either raw or normalized companion snapshot | recover gate | stay before `spec`, restore the missing companion artifact, then re-check the gate |
| Gate missing but recoverable from repository state, artifacts, or evidence | recover gate | stay in the same lifecycle position, repair the prerequisite, then re-check the gate |
| Gate missing and depends on an explicit user checkpoint, unresolved human decision, or external resource | block | set `loop.state=blocked`, set `loop.pending_gate`, wait for recovery |
| Verification fails but implementation can continue under the approved plan | re-enter execute | route to `execute` immediately and continue the loop |
| Review finds blockers but implementation can continue under the approved plan | re-enter execute | route to `execute` immediately and continue the loop |
| Current module review passes and more pending modules remain | advance module | mark current module complete, activate the next pending module, and enter its `entry_stage` |
| Review passes but release readiness artifact is missing or failed | recover gate | stay before completion, write or repair release readiness evidence, then re-check the gate |
| All modules are complete and completion conditions are met | complete | set `stage=complete` and `loop.state=complete` |

## Goal and Workflow Constraints

- The request may reach `complete` only when the goal contract is satisfied and verified.
- For split requests, every in-scope module must reach downstream acceptance before the whole request may reach `complete`.
- Loop iterations do not themselves prove completion.
- Workflow-style parallel execution does not create additional lifecycle states or bypass gates.

## Re-entry Rules

- `resume_request`: re-enter the loop for an in-flight request that already has `state.json`
- `gate_recovery`: re-enter after a previously blocking gate was satisfied
- `requirement_changed`: route back to `spec`, `plan`, `requirement-splitting`, or `requirement-analysis`
- `verification_failed`: route back to `execute`
- `review_blocked`: route back to `execute`
- `manual_reopen`: re-enter a previously completed request after an explicit reopen decision

## Rollback Rules

- Requirement change during execute: back to `spec` or `plan` with `reentry_reason=requirement_changed`
- If upstream requirement content changes enough to alter scope judgment, split axis, or module boundaries, back to `requirement-analysis` or `requirement-splitting` with `reentry_reason=requirement_changed`
- Verification failure: back to `execute` with `reentry_reason=verification_failed`
- Blocking review finding: back to `execute` with `reentry_reason=review_blocked`
- `execute -> verify -> execute -> verify` repeats until verification passes or a real blocking gate is reached
- For split requests, rollback applies to the active module by default; only requirement-boundary changes send the whole request back to `requirement-analysis` or `requirement-splitting`
