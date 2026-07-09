# Beta Feedback Template

## Required Artifact Path

- `docs/novel-projects/<novel-id>/artifacts/beta-feedback.md`

## Required Sections

- project identifier
- feedback round summary
- feedback source matrix
- reader profile summary
- reading coverage
- collection method
- synthesis method
- strongest hooks
- repeated confusions
- boredom points
- emotional payoff gaps
- character response notes
- pacing response notes
- market-fit response notes
- blocker clusters
- non-blocking notes
- rollback recommendations
- accepted disagreements
- next revision focus

## Section Guidance

### `feedback source matrix`

For each source or cohort, record:

- source type
  - real beta reader
  - editor
  - author peer
  - internal simulation
- reader profile
- number of readers
- chapters read
- confidence level

Never merge all sources into one anonymous blob.
At least one external source is required for an industry-standard completion claim unless the user explicitly approves a simulation-only exception recorded in `artifacts/accepted-risks.md`.

### `reading coverage`

State explicitly:

- whether feedback covered the opening
- whether feedback covered major turning points
- whether feedback covered the midsection
- whether feedback covered the climax
- whether feedback covered the ending
- if coverage is partial, which conclusions are still trustworthy and which are provisional

### `synthesis method`

Explain how feedback was grouped into issue clusters:

- repeated by multiple readers
- high-severity single-reader finding
- market-fit warning
- subjective preference only

This section prevents overreacting to one isolated taste preference.

### `feedback round summary`

This section must explicitly state one of:

- external-feedback-qualified
- simulation-only-exception-approved
- simulation-only-not-qualified

If the round is not qualified, later stages must not treat the beta gate as fully passed.
If `simulation-only-exception-approved` is used, cite the matching accepted-risk id from `artifacts/accepted-risks.md`.

### `blocker clusters`

For each blocker, include:

- issue label
- evidence summary
- impacted chapters or scenes
- likely root cause
- recommended rollback stage

### `accepted disagreements`

Use this when some feedback is intentionally not acted on.
Record:

- which feedback was not adopted
- why
- what tradeoff was accepted

If the disagreement affects completion, market promise, structure, continuity, or beta qualification, it must also appear in `artifacts/accepted-risks.md`.
