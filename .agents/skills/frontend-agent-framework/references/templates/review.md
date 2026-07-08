# Review Templates

## Required Artifact Path

- `docs/requests/<request-id>/review/review.md` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/review/review.md` for split PRD-driven work

## `review/review.md` or `module-runs/<module-id>/review/review.md`

Required sections:

- delivery unit identifier
- blocking issues
- non-blocking issues
- accepted risks
- follow-up items
- clean-code assessment
- design-pattern assessment
- code-context structural assessment
- merge readiness summary

`clean-code assessment` must include:

- result (`pass` or `fail`)
- key findings
- required follow-up if failed

`design-pattern assessment` must include:

- result (`pass` or `fail`)
- key findings
- required follow-up if failed
