# Requirement Splitting Templates

## Required Artifact Paths

- `docs/requests/<request-id>/analysis/requirement-analysis.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`
- `docs/requests/<request-id>/requirements/modules/<module-id>.md`

## `requirements/requirement-map.md`

Required sections:

- request summary
- analysis carry-forward
- splitting principles
- source inventory
- source grounding carry-forward
- markdown normalization notes
- module list
- module dependency and sequencing notes
- module execution sequence
- page-design candidates
- spec carry-forward checklist
- open questions and unresolved ambiguities

### `analysis carry-forward`

Document what the preceding `requirement-analysis` stage fixed as upstream constraints for splitting, including:

- confirmed scope
- non-goals
- frontend / server responsibility split
- ambiguity notes that still remain open
- dependencies that affect module boundaries
- any request-level routing or sequencing signal that splitting must preserve

### `module list`

For each module or functional unit, include:

- module ID
- module name
- module type
  - page
  - form workflow
  - table/list workflow
  - detail/display block
  - interaction flow
  - cross-module rule
- source section mapping
- grounding labels inherited from requirement analysis
- one-sentence scope summary
- execution order
- whether `page-design` is required before `spec`
- whether `architecture-design` is required before `spec`
- downstream consumer notes for `spec` and `plan`
- frontend-owned work, server-owned work, shared contract work, and external-interface pending items inherited from requirement analysis
- downstream run artifact root

### `source grounding carry-forward`

Document how splitting preserves the requirement-analysis source grounding matrix.

For each module, list:

- source-backed items carried into the module
- code-fact-backed constraints carried into the module
- confirmed decisions carried into the module
- safe source-derived consequences carried into the module
- missing-source items that remain blocked, external-interface pending, or non-blocking
- out-of-scope adjacent ideas that must not enter this module

Do not split a new module, behavior, field, interaction, or acceptance obligation solely from convention, neighboring-module similarity, or preferred design structure.

### `markdown normalization notes`

Document any upstream content that required format conversion before splitting, including:

- original format type
- raw content retention location
- converted Markdown form
- whether the conversion was exact or required structured textual fallback
- source-trace note for the converted content

### `spec carry-forward checklist`

For every split module, explicitly list upstream details that downstream stages must preserve, such as:

- form fields and validation rules
- table columns and operation rules
- display fields and formatting rules
- interaction triggers and outcomes
- loading, empty, error, success, disabled, and visibility rules
- workflow branches and state transitions
- frontend / server responsibility boundary and API / DTO / permission / state contract obligations

### `module execution sequence`

For split PRD-driven requests, define:

- the exact sequential execution order
- the first module that should become `state.json.module_flow.current_module_id`
- whether each module starts at `page-design`, `architecture-design`, or `spec`
- any strict dependency that prevents a later module from starting before an earlier module passes `review`

## `requirements/modules/<module-id>.md`

Required sections:

- module identifier
- module name
- source snapshot
- markdown-normalized snapshot
- source-trace references
- source grounding
- business intent
- user-visible scope
- forms, tables, displays, and interactions
- workflow and state rules
- dependencies and impacted neighbors
- frontend / server responsibility boundary
- page-design routing decision
- downstream spec obligations
- open questions

### `source snapshot`

Rules:

- preserve the upstream content for the module as literally as practical
- do not rewrite explicit field, column, interaction, or rule detail into vague summaries
- if the source is already structured by module, copy the matching module content with minimal normalization
- if the source is scattered, consolidate it here but retain traceability back to original sections
- this section is mandatory even when a Markdown-normalized snapshot also exists; do not replace it with the normalized version

### `markdown-normalized snapshot`

Rules:

- if the original content contains formats that Markdown cannot express reliably, convert them into Markdown-recognizable structures before handing them to downstream stages
- prefer Markdown tables, images, links, headings, and bullet lists
- when exact visual structure cannot be preserved, provide an equivalent structured textual representation and record that fallback explicitly
- this section is a companion copy for downstream consumption, not a replacement for the raw snapshot

### `source grounding`

For this module, list every material carried-forward item with its grounding label and source reference.

Downstream `spec` may only use items labeled `source-backed`, `code-fact-backed`, `confirmed-decision`, or safe `source-derived`.
