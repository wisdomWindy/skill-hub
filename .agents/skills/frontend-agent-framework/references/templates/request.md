# Request Templates

## Required Artifact Paths

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md` as the normalized source snapshot for PRD-driven, direct-change, and bugfix work
- `docs/requests/<request-id>/analysis/requirement-analysis.md` for PRD-driven requests after requirement analysis
- `docs/requests/<request-id>/requirements/requirement-map.md` for PRD-driven requests after requirement splitting

## `request.md`

Required sections:

- request identifier
- source link or direct user instruction reference
- business summary
- goal statement
- initial done signal
- trigger condition
- initial context sources
- human handoff point
- affected area
- participating modules

## `state.json`

Required fields:

- `request_id`
- `source`
- `stage`
- `status`
- `artifacts`
- `approvals`
- `loop`
- `module_flow`（PRD 驱动需求在 requirement-splitting 之后必需）

Required shape:

```json
{
  "request_id": "...",
  "source": {},
  "stage": "requirement-analysis",
  "status": "in_progress",
  "artifacts": {},
  "approvals": {
    "spec_approved": false,
    "plan_approved": false
  },
  "module_flow": null,
  "loop": {
    "iteration": 1,
    "state": "running",
    "last_completed_stage": null,
    "pending_gate": null,
    "reentry_reason": "new_request"
  }
}
```

For PRD-driven requests, initialize `stage` to `requirement-analysis`.
For direct-change requests normalized through `intake`, initialize `stage` to the first request-level downstream stage: `page-design` when page design is required, `architecture-design` when code architecture design is required, otherwise `spec`.
For bugfix requests normalized through `bugfix-intake`, initialize `stage` to `spec` unless the main skill explicitly routes the defect through requirement splitting.
Before `requirement-analysis` finishes, no requirement-analysis artifact is assumed.
Before `requirement-splitting` finishes, `module_flow` may be `null`.
After `requirement-splitting` finishes for a PRD-driven request, `module_flow` becomes required.
For direct-change, bugfix, and other non-split requests, keep `module_flow=null` and use top-level `approvals.spec_approved` and `approvals.plan_approved`.

Loop field rules:

- keep the existing top-level `status` semantics unchanged
- `iteration` increments once per main orchestrator decision cycle
- `iteration` must continue increasing across same-run re-entries such as `verification_failed`, `review_blocked`, and `gate_recovery`
- `state` only allows `running`, `blocked`, or `complete`
- `last_completed_stage` stores the most recent fully completed lifecycle stage, or `null`
- `pending_gate` stores the active blocking gate name, or `null`
- `reentry_reason` only allows `new_request`, `resume_request`, `gate_recovery`, `architecture_design_invalidated`, `requirement_changed`, `verification_failed`, `review_blocked`, or `manual_reopen`
- `loop.state=complete` requires `stage=complete`
- `loop.state=blocked` is only for real external blocking gates after internal recovery was attempted

### `module_flow`

Required shape for PRD-driven requests after `requirement-splitting`:

```json
{
  "execution_mode": "sequential",
  "current_module_id": "module-a",
  "pending_module_ids": ["module-a", "module-b"],
  "completed_module_ids": [],
  "modules": {
    "module-a": {
      "source_module_path": "requirements/modules/module-a.md",
      "page_design_required": false,
      "architecture_design_required": false,
      "approvals": {
        "spec_approved": false,
        "plan_approved": false
      },
      "status": "in_progress"
    }
  }
}
```

Rules:

- `execution_mode` is `sequential` for split PRD-driven requests
- `current_module_id` is the only module allowed to progress through downstream stages
- `pending_module_ids` is ordered and includes the active module until it passes `review`
- `completed_module_ids` stores only modules that already passed `review`
- `modules.<module-id>.status` only allows `pending`, `in_progress`, `blocked`, or `completed`
- `modules.<module-id>.page_design_required` and `modules.<module-id>.architecture_design_required` drive downstream stage routing for that module
- `modules.<module-id>.approvals.spec_approved` and `modules.<module-id>.approvals.plan_approved` are scoped to that module only
- after a module passes `review`, set its status to `completed` before advancing queue state
- when pending modules remain after that transition, the next promoted module must be marked `in_progress`
- when no pending modules remain, set `current_module_id=null`, `stage=complete`, and `loop.state=complete`
- do not move to the next module until the current module has completed `review` without blockers
- if module boundaries change materially, regenerate `module_flow` through `requirement-splitting`

### Non-split delivery unit

For direct-change, bugfix, and other non-split requests:

- `module_flow` remains `null`
- direct-change requests must record why PRD-only requirement analysis and requirement splitting are not needed
- downstream artifacts use request-level paths:
  - `design/page-design.md`
  - `design/architecture-design.md`
  - `spec/spec.md`
  - `spec/clarifications.md`
  - `plan/plan.md`
  - `plan/task-board.md`
  - `execution/changelog.md`
  - `verification/verification.md`
  - `review/review.md`
- approval gates use top-level `approvals.spec_approved` and `approvals.plan_approved`
- after request-level `review` passes, set `stage=complete` and `loop.state=complete`

## `artifacts/prd-snapshot.md`

For direct-change requests, this artifact is still named `prd-snapshot.md` for compatibility, but it acts as a normalized source snapshot of the user's direct instruction and repository context.

Required sections:

- source summary
- key business goals
- explicit behavior constraints
- forms, tables, displays, and interactions extracted from source
- workflow and state rules extracted from source
- relevant modules or pages
- notable open questions from the upstream PRD or direct instruction

### `explicit behavior constraints`

This section must preserve explicit upstream requirement detail whenever the PRD already states it.

At minimum, extract and normalize:

- form-related constraints already present in the source
- table-related constraints already present in the source
- display-field constraints already present in the source
- interaction rules already present in the source
- loading, disabled, empty, error, success, and failure-state rules already present in the source
- workflow steps, branches, and state-transition rules already present in the source

Do not replace explicit upstream detail with vague summaries such as "contains a form" or "supports table operations" when the source already names the fields, columns, actions, validations, or state rules.

### `forms, tables, displays, and interactions extracted from source`

When applicable, organize the extracted source content by functional unit and preserve:

- page or container name
- form field names and rules
- table column names and rules
- display fields and formatting notes
- interaction triggers and outcomes

### `workflow and state rules extracted from source`

When applicable, preserve:

- start and end states
- branch conditions
- loading or pending-state rules
- success and failure outcomes
- retry, rollback, or confirmation behavior

## `requirements/requirement-map.md`

Required sections for PRD-driven requests:

- splitting summary
- source modules
- split modules and functional units
- source traceability
- module dependencies
- execution sequence
- page-design routing hint
- spec input checklist
- open questions

Requirements:

- split the normalized requirement by module, page, feature group, or workflow unit based on the source
- preserve source wording for each module snapshot instead of paraphrasing away explicit detail
- for every split module, point back to the matching source section or excerpt anchor
- explicitly mark whether the module requires page design before spec
- explicitly mark whether the module requires architecture design before spec
- define the sequential downstream execution order that the main skill must follow
- identify upstream details that must be carried into `spec` without loss, including fields, columns, displays, interactions, validations, and state rules

## `requirements/modules/<module-id>.md`

Recommended sections for each split module:

- module name
- source snapshot
- source-trace references
- business goal
- user-visible behaviors
- forms, tables, displays, and interactions from source
- workflow and state rules from source
- upstream constraints that spec must preserve
- page-design need
- architecture-design need
- execution order
- open questions
