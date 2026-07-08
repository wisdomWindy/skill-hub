# Framework Overview

This framework exposes one default entry skill plus stage-specific subskills:

- the main `backend-agent-framework` skill routes work
- `subskills/` own stage execution
- `references/` hold durable workflow, policy, and template material

All implementation work is tracked under `docs/requests/<request-id>/`.

This framework separates three independent control dimensions:

- goal: what counts as done for the request
- loop: how the main skill keeps re-evaluating progress and gates
- workflow: whether execution stays single-threaded or scales out into parallel work units

The canonical request lifecycle is:

`intake -> requirement-analysis -> requirement-splitting -> spec -> plan -> execute -> verify -> review -> complete`

For backend-structural requests, insert the optional design stage before spec:

`intake -> requirement-analysis -> requirement-splitting -> architecture-design -> spec -> plan -> execute -> verify -> review -> complete`

The lifecycle above is the delivery path. The main `backend-agent-framework` skill controls that path through a loop orchestrator:

`observe state -> decide next action -> dispatch one stage or gate recovery action -> observe result -> iterate`

In this framework:

- `subskills/` own stage execution only
- `requirement-analysis` is the durable analysis stage for PRD-driven work and captures scope, ambiguities, hidden constraints, and split strategy before decomposition
- `requirement-splitting` is the source-preserving decomposition stage for PRD-driven work and feeds ordered per-module downstream execution
- the goal contract is established in request/spec artifacts and proved by verification/review/release-readiness artifacts
- the main skill owns loop control, gate recovery, rollback routing, and module sequencing
- stage completion should auto-dispatch the next unblocked stage in the same run by default
- when PRD splitting yields multiple modules, each module gets its own downstream workspace under `docs/requests/<request-id>/modules/<module-id>/`
- the framework runs one split module through `architecture-design? -> spec -> plan -> execute -> verify -> review` before moving to the next module
- workflow-style parallelization is optional execution scale, not a second lifecycle and not a default
- `verify -> execute`, `review -> execute`, and `execute -> spec/plan` are loop re-entry paths, not a second lifecycle
- `state.json.loop` is the durable loop audit trail for iteration count, blocking gate, and re-entry reason
- `state.json.module_execution` is the durable ordered queue for split-module downstream execution
