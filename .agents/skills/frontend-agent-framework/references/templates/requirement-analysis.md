# Requirement Analysis Templates

## Required Artifact Paths

- `docs/requests/<request-id>/analysis/requirement-analysis.md`

## `analysis/requirement-analysis.md`

Required sections:

- analysis summary
- user intent contract
- source inventory and reading stance
- confirmed scope
- out-of-scope and non-goals
- confirmed decisions and invariants
- system boundaries and ownership
- source-backed behavior inventory
- developer-facing behavior details
- implicit requirements and hidden assumptions
- workflow and dependency assessment
- ambiguity and clarification register
- risk and constraint assessment
- blocker classification and handling stance
- confirmation-reduction notes
- splitting strategy
- downstream stage signals

The artifact must be written as a developer-facing requirement refinement, not a source summary.
It should preserve enough field, state, workflow, permission, dependency, failure, and risk detail that downstream developers can draft `spec` with fewer product follow-up questions.
Reducing follow-up questions means exposing hidden or unclear points concretely; it does not mean deleting uncertain content.

### `user intent contract`

Required when the user request can be satisfied superficially but violated in substance, especially requests using words such as simplify, shorten, optimize, clean up, adjust, align, normalize, reduce, avoid, or fix.

Document:

- stated request: the user's literal wording
- practical goal: what complexity, risk, ambiguity, review cost, or behavior problem the user wants addressed
- success criteria: observable conditions that prove the practical goal is met
- forbidden interpretations: solutions that satisfy the words but violate the goal
- acceptable approaches: solution shapes that preserve the goal
- downstream checks: how `spec`, `plan`, `verify`, and `review` must preserve this intent

### `source inventory and reading stance`

Document:

- the raw requirement source used as the primary authority
- referenced documents, tables, prototypes, forms, API docs, or local files that materially affect scope
- repository or project baseline documents read for boundary judgment
- the precedence rule when multiple sources conflict
- any unread sources, why they were not read, and what remains unconfirmed because of that

### `confirmed scope`

Document:

- what request outcome is explicitly in scope
- which business surfaces, pages, flows, or modules are affected
- which source-backed constraints must survive every downstream stage

### `out-of-scope and non-goals`

Document:

- adjacent asks that are not part of the current request
- tempting cleanup or redesign directions that must not be silently absorbed downstream
- assumptions that are intentionally not being promoted into scope

### `source-backed behavior inventory`

Preserve the major behavior clusters already present in the source, including when relevant:

- forms and validation groups
- tables, columns, and operations
- display blocks and field groups
- interaction triggers and outcomes
- workflow branches and state transitions

Do not rewrite explicit upstream behavior into abstract summaries that would force downstream stages to rediscover the source.

When the source contains tables, state enums, permission matrices, interface fields, acceptance bullets, or flow diagrams, preserve their execution-relevant detail as tables or structured lists.
Do not collapse them into generic sentences such as "support list management", "support audit", or "support synchronization".

### `developer-facing behavior details`

Document the execution-relevant details a developer would otherwise need to ask product about:

- roles, ends, menus, permission boundaries, read-only/writeable states
- list columns, filters, sort rules, pagination, exports, row actions
- form fields, validation, requiredness, default values, editability, readonly conditions
- detail-page blocks, tabs, display groups, status blocks, reason entries
- operation triggers and outcomes for create, edit, submit, audit, reject, terminate, delete, import, export, upload, parse, download, synchronize
- state machines, node transitions, reverse-flow rules, resubmission rules, locked states
- error, empty, loading, async, timeout, retry, partial-success, and failure-handling rules when source-backed
- data source, source of truth, front-end DTO expectations, and adapter / mapper / fromDetail normalization boundaries
- audit snapshot, log, traceability, history, reason text, and approval comment requirements

This section may be detailed. Its purpose is to reduce downstream rediscovery, not to be a short overview.

### `implicit requirements and hidden assumptions`

Expose requirements that are not written as explicit product bullets but are implied by flows, data dependencies, permissions, or cross-system behavior.

For each item, document:

- source clue: the exact source behavior or dependency that implies the issue
- hidden question: what a developer would likely need to ask
- current stance: confirmed, inferred but needs confirmation, external-interface pending, or non-blocking
- impact: affected page, flow, data model, state machine, permission, adapter, or regression scope
- handling: how downstream stages should carry it without silently inventing behavior

Do not use this section to invent business behavior. Use it to make uncertainty and implications visible.

### `confirmed decisions and invariants`

Document:

- product or requirement decisions that are already fixed upstream
- confirmed constraints that later `spec` must not silently reopen
- requirement-level invariants such as release scope, role policy, mode coverage, or source-of-truth rules

Do not mix confirmed decisions with open questions.

### `system boundaries and ownership`

Document:

- which systems, repositories, services, or databases directly own the scoped work
- which systems are read-only references, external dependencies, or reused existing capabilities
- cross-system boundaries that downstream design must preserve

If the request spans multiple projects or systems, this section is required.

### `workflow and dependency assessment`

Document:

- upstream dependencies
- cross-module or cross-flow couplings
- user-visible sequencing constraints
- external systems, roles, or approvals that shape delivery order

### `ambiguity and clarification register`

Document:

- source contradictions
- missing decisions
- unclear boundaries
- questions that must remain visible to downstream stages

Do not guess missing business semantics just to make the analysis read cleanly.
Do not remove ambiguous content to make the artifact look more certain.
Every ambiguity should include why it matters to development and which downstream module or artifact must carry it.

### `risk and constraint assessment`

Document:

- change-risk areas
- likely regression-sensitive neighbors
- source constraints that narrow implementation freedom
- delivery risks that may influence splitting or later design stages

For each material risk, prefer a table with:

- risk
- source / trigger
- affected systems, pages, or modules
- likely failure mode
- downstream handling or verification signal

Avoid generic risk entries such as "interface risk" or "status risk" without impact and handling.

### `blocker classification and handling stance`

Classify unresolved items into:

- `业务阻塞`: missing decisions that block `spec` because they affect flow, data model, permissions, state machine, audit rules, or ownership boundaries
- `外部接口待补`: external API, topic, auth, or field details that may be deferred only when requirement meaning is already stable and downstream can reserve adapters / config / DTO boundaries
- `非阻塞`: items that do not block mainline `spec` drafting and may be resolved in design or pre-implementation

Do not collapse all unresolved items into one generic TODO list.

### `confirmation-reduction notes`

Document how this analysis reduces product follow-up during development:

- confirmed items that downstream `spec` must not reopen
- concrete hidden questions that have been surfaced instead of left implicit
- areas where developers can proceed using a stated adapter / config / DTO boundary
- areas where developers must stop for product or external-system confirmation
- source-backed risk checks that must become acceptance or regression coverage later

This is not a summary section. It is a handoff checklist for the next stage.

### `splitting strategy`

Document:

- whether downstream work should be split into modules
- the proposed basis for that split
  - page
  - form workflow
  - table/list workflow
  - detail/display block
  - interaction flow
  - cross-module rule
- what should stay together
- what should not be merged

This section defines the rationale for the next `requirement-splitting` stage; it does not replace that stage's actual module artifacts.

### `downstream stage signals`

Document:

- request areas likely to require `page-design`
- request areas likely to require `architecture-design`
- parts that may proceed directly toward `spec` after splitting
- any special sequencing concern that `requirement-splitting` must preserve
