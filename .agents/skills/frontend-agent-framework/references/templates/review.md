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
- frontend styling assessment
- design-pattern assessment
- code-context structural assessment
- merge readiness summary

`clean-code assessment` must include:

- result (`pass` or `fail`)
- key findings
- required follow-up if failed

`frontend styling assessment` is required when the scoped work adds or changes authored styling. It must include:

- result (`pass` or `fail`)
- Tailwind CSS-style utility class conformance
- class length and inline reviewability findings
- findings for any constants, maps, computed properties, helpers, or imported variables that hide overlong class values
- required follow-up if failed

`design-pattern assessment` must include:

- result (`pass` or `fail`)
- key findings
- required follow-up if failed
