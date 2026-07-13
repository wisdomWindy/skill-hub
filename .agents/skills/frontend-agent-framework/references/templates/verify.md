# Verification Templates

## Required Artifact Paths

- `docs/requests/<request-id>/verification/verification.md` and `verification/evidence/` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/verification/verification.md` and `verification/evidence/` for split PRD-driven work

## `verification/verification.md` or `module-runs/<module-id>/verification/verification.md`

Required top-level sections:

- delivery unit identifier
- acceptance coverage
- user intent compliance
- change-chain integrity
- removal cleanup compliance
- spec constraint compliance
- frontend styling compliance
- summary

Required fields for each acceptance item:

- acceptance item id
- verification method
- result
- evidence reference
- follow-up if failed
- handoff status

`user intent compliance` is required when the spec contains a user intent contract. It must include:

- result (`pass` or `fail`)
- literal compliance result
- practical-goal compliance result
- forbidden-interpretation checks
- evidence that complexity, risk, ambiguity, or responsibility was not merely relocated
- follow-up if failed

`change-chain integrity` is required when implementation modifies or removes existing code. It must include:

- result (`pass` or `fail`)
- changed feature chain
- pre-change chain review evidence
- post-change chain validation evidence
- checked entrypoints, files, imports, exports, callers, consumers, side effects, state, tests, and mocks
- test references to changed or removed production code treated as adaptation targets, not production owners
- missing required links found or ruled out
- stale extra links found or ruled out
- neighboring feature impact found or ruled out
- follow-up if failed

`removal cleanup compliance` is required when implementation removes a call, request, branch, field, control, or side effect. It must include:

- result (`pass` or `fail`)
- removed behavior
- checked imports, helpers, constants, types, request wrappers, state, tests, mocks, and comments
- retained helpers and their remaining real production callers
- test-only references found and adapted, not used as retention evidence
- evidence reference
- follow-up if failed

`spec constraint compliance` must include:

- result (`pass` or `fail`)
- checked constraints
- evidence reference
- follow-up if failed

`frontend styling compliance` is required when the scoped work adds or changes authored styling. It must include:

- result (`pass` or `fail`)
- Tailwind CSS-style utility class conformance
- class length and inline reviewability check
- check that overlong class values were not hidden in constants, maps, computed properties, helpers, or imported variables
- evidence reference
- follow-up if failed
