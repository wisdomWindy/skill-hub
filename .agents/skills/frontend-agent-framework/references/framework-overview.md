# Framework Overview

This framework exposes one default entry skill plus stage-specific subskills:

- the main `frontend-agent-framework` skill routes work
- `subskills/` own stage execution
- `references/` hold durable workflow, policy, and template material

All implementation work is tracked under `docs/requests/<request-id>/`.

This framework separates three independent control dimensions:

- goal: what counts as done for the request
- loop: how the main skill keeps re-evaluating progress and gates
- workflow: whether execution stays single-threaded or scales out into parallel work units

It also treats proactive workflow design as a first-class concern:

- trigger: what event or condition starts work
- context: what information sources the workflow can rely on
- steerability: how humans inspect and redirect work in progress
- handoff: where results are delivered for review or downstream action

The canonical request lifecycle is:

`intake -> requirement-analysis -> requirement-splitting -> spec -> plan -> execute -> verify -> review -> complete`

For page-oriented requests, insert the optional design stage before spec:

`intake -> requirement-analysis -> requirement-splitting -> page-design -> spec -> plan -> execute -> verify -> review -> complete`

For code-architecture-sensitive requests, insert the optional architecture design stage before spec:

`intake -> requirement-analysis -> requirement-splitting -> architecture-design -> spec -> plan -> execute -> verify -> review -> complete`

When a request is both page-oriented and code-architecture-sensitive, the combined design path is:

`intake -> requirement-analysis -> requirement-splitting -> page-design -> architecture-design -> spec -> plan -> execute -> verify -> review -> complete`

The lifecycle above is the delivery path. The main `frontend-agent-framework` skill controls that path through a loop orchestrator:

`observe state -> decide next action -> dispatch one stage or gate recovery action -> observe result -> iterate`

In this framework:

- `subskills/` own stage execution only
- `requirement-analysis` is the explicit需求理解阶段 for PRD-driven work and fixes scope, non-goals, ambiguity, risk, and splitting strategy before decomposition begins
- `requirement-analysis` is also the front-loaded human-confirmation stage for PRD-driven work: needs, questions, rules, ambiguous content, fuzzy content, and product decisions that require a person must be resolved, blocked, or explicitly classified there before downstream automatic approval begins
- `requirement-analysis` is the source-grounding gate: it separates source-backed facts, code-fact-backed constraints, confirmed decisions, safe source-derived consequences, missing-source items, and out-of-scope adjacent ideas before downstream artifacts can use them
- `requirement-splitting` is the source-preserving decomposition stage for PRD-driven work and feeds `page-design`, `architecture-design`, and `spec`
- for PRD-driven work that has been split into module files, downstream delivery runs one split module at a time inside the same request
- each split module must complete its own `page-design? -> architecture-design? -> spec -> plan -> execute -> verify -> review` chain before the next split module starts
- repeated semantic logic is architecture-sensitive: when scoped work touches duplicated production rules, validation, adapter / mapper normalization, payload construction, option building, permission checks, state derivation, status mapping, or helper behavior, the workflow must decide shared ownership before implementation
- `architecture-design` must record reuse candidates and extract / reuse / keep-separate / defer decisions; safe duplicated semantic rules should be owned once instead of copied locally
- split-module downstream artifacts live under `docs/requests/<request-id>/module-runs/<module-id>/`
- direct-change, bugfix, and other non-split downstream delivery uses the same `page-design? -> architecture-design? -> spec -> plan -> execute -> verify -> review` chain at request level
- direct-change, bugfix, and other non-split downstream artifacts live directly under `docs/requests/<request-id>/design|spec|plan|execution|verification|review`
- direct-change and bugfix work use `intake` or `bugfix-intake` as their source-normalization and human-confirmation gate before request-level downstream stages
- `spec` and `plan` approval flags are set by framework automatic approval checks, not by user approval prompts
- `spec` and `plan` automatic approval must reject ungrounded behavior, tasks, or acceptance criteria instead of filling missing details from convention, sample content, neighboring modules, or preferred design taste
- the goal contract is established in request/spec artifacts and proved by verification/review artifacts
- completion can require `architecture reuse compliance: pass` and `architecture reuse assessment: pass` when shared extraction or repeated semantic logic is relevant
- the main skill owns loop control, gate recovery, and rollback routing
- workflow-style parallelization is optional execution scale, not a second lifecycle and not a default
- proactive workflows must make trigger, context, steerability, and handoff explicit in repository artifacts
- `verify -> execute`, `review -> execute`, and `execute -> spec/plan` are loop re-entry paths, not a second lifecycle
- `state.json.loop` is the durable loop audit trail for iteration count, blocking gate, and re-entry reason

## Sample Request Reference

The repository includes a finished sample request at:

`docs/requests/prd-material-delivery-config-center/`

Use this sample to understand:

- the expected request directory shape
- the quality bar for stage artifacts
- how a request looks after it reaches `complete`

Do not treat the sample as reusable downstream content for a new request.
For a new request, only reuse the structure and quality baseline, then rewrite the request-specific artifacts from the current PRD and clarifications.
