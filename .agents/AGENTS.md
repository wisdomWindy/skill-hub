# Agent Workflow Constitution

This repository uses a strict request workflow for frontend delivery in Codex/Codex App.

## Default Entrypoint

- Use `frontend-agent-framework` as the single default entry skill.
- New requirement: let the main skill decompose the request into the full lifecycle and start from `intake`.
- Existing request: resume from `docs/requests/<request-id>/state.json`, let the main skill recover the current stage, and continue orchestrating from there.

## Non-Negotiable Gates

- Never start coding before a request workspace exists under `docs/requests/<request-id>/`.
- Never let a PRD-driven request enter `page-design`, `spec`, or `plan` before durable requirement-splitting artifacts exist.
- Never implement before approved `spec/spec.md` and `plan/plan.md` exist.
- Never declare work complete before `verification/verification.md` and `review/review.md` both exist and pass.
- When requirements change, update request artifacts first and roll the request back to `spec` or `plan`.

## Skill Architecture

- The main skill owns lifecycle decomposition, loop control, progression control, gate checks, and stage routing.
- The main skill also owns the goal contract and decides whether workflow-style parallel scale is justified.
- Stage subskills own stage-local execution rules only.
- Policy and template material lives under `frontend-agent-framework/references/` and is loaded on demand.
- Legacy top-level `workflow-*`, `policy-*`, and `templates-*` skills are removed and should not be reintroduced.

## Request Lifecycle

The canonical request lifecycle is:

`intake -> requirement-splitting -> spec -> plan -> execute -> verify -> review -> complete`

For page-oriented requests, insert the design stage before spec:

`intake -> requirement-splitting -> page-design -> spec -> plan -> execute -> verify -> review -> complete`

The main skill advances this lifecycle through a control loop:

`observe state -> decide next action -> dispatch one stage or gate recovery action -> observe result -> iterate`

Within this repository:

- goal decides what counts as done
- loop decides how the orchestrator keeps re-evaluating
- workflow decides whether execution should stay serial or fan out in parallel
