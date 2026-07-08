# Code Context Template

## Conditional Artifact Path

- `docs/requests/<request-id>/artifacts/code-context.md`

Create this artifact when existing-code understanding is material to the request, especially for bugfix, refactor, cross-module change, pattern decision, or structure-sensitive review work.

## `artifacts/code-context.md`

Required sections:

- context requirement
- graph availability check
- installation or bootstrap record
- fallback record
- relevant entrypoints
- key symbols and modules
- dependency and side-effect boundaries
- impact scope
- open follow-up checks

### `context requirement`

Must include:

- why structural code understanding is needed
- which stage first required it
- whether code graph is required or only preferred

### `graph availability check`

Must include:

- repository graph status (`available` or `missing`)
- detection method
- tool or runtime found
- check timestamp or iteration context

### `installation or bootstrap record`

Must include:

- attempted (`yes` or `no`)
- installer or bootstrap method
- result (`pass`, `fail`, or `not_needed`)
- output summary
- next step

### `fallback record`

Must include:

- fallback used (`yes` or `no`)
- fallback method
- why fallback was needed
- residual confidence or remaining blind spots

### `relevant entrypoints`

List:

- user-facing entrypoints
- internal execution entrypoints
- important event or async triggers when material

### `key symbols and modules`

List:

- directly affected modules
- key exported symbols
- important callers or consumers when material

### `dependency and side-effect boundaries`

Describe:

- ownership boundaries
- important adapters or service layers
- side-effect locations
- cross-module notification or shared-state boundaries

### `impact scope`

Describe:

- likely changed files or symbol clusters
- likely verification surface
- likely regression-sensitive neighbors

### `open follow-up checks`

List any remaining structural uncertainty that later stages must revisit.
