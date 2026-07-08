# Requirement Analysis Templates

## Required Artifact Paths

- `docs/requests/<request-id>/analysis/requirement-analysis.md`

## `analysis/requirement-analysis.md`

Required sections:

- analysis summary
- source inventory and reading stance
- confirmed scope
- out-of-scope and non-goals
- confirmed decisions and invariants
- system boundaries and ownership
- source-backed behavior inventory
- workflow and dependency assessment
- ambiguity and clarification register
- risk and constraint assessment
- blocker classification and handling stance
- splitting strategy
- downstream stage signals

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

### `risk and constraint assessment`

Document:

- change-risk areas
- likely regression-sensitive neighbors
- source constraints that narrow implementation freedom
- delivery risks that may influence splitting or later design stages

### `blocker classification and handling stance`

Classify unresolved items into:

- `业务阻塞`: missing decisions that block `spec` because they affect flow, data model, permissions, state machine, audit rules, or ownership boundaries
- `外部接口待补`: external API, topic, auth, or field details that may be deferred only when requirement meaning is already stable and downstream can reserve adapters / config / DTO boundaries
- `非阻塞`: items that do not block mainline `spec` drafting and may be resolved in design or pre-implementation

Do not collapse all unresolved items into one generic TODO list.

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
