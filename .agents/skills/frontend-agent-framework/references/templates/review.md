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
- user intent assessment
- change-chain integrity assessment
- removal cleanup assessment
- clean-code assessment
- frontend styling assessment
- design-pattern assessment
- code-context structural assessment
- merge readiness summary

`user intent assessment` is required when the spec contains a user intent contract. It must include:

- result (`pass` or `fail`)
- literal request compliance
- practical goal compliance
- forbidden interpretations found or ruled out
- required follow-up if failed

`change-chain integrity assessment` is required when implementation modifies or removes existing code. It must include:

- result (`pass` or `fail`)
- changed feature chain reviewed
- pre-change flow and reference analysis sufficiency
- post-change chain cleanliness
- missing links, stale extra links, duplicate paths, conflict paths, or orphan symbols found
- test references to changed or removed production code adapted rather than treated as production owners
- neighboring feature impact found or ruled out
- required follow-up if failed

`removal cleanup assessment` is required when implementation removes a call, request, branch, field, control, or side effect. It must include:

- result (`pass` or `fail`)
- orphan imports, helpers, constants, types, request wrappers, state, tests, mocks, or comments found
- retained helpers and their remaining real production callers
- test-only references found and adapted, not used as retention evidence
- required follow-up if failed

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
