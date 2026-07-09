# Verification Templates

## Required Artifact Paths

- `docs/requests/<request-id>/verification/verification.md` and `verification/evidence/` for non-split work
- `docs/requests/<request-id>/module-runs/<module-id>/verification/verification.md` and `verification/evidence/` for split PRD-driven work

## `verification/verification.md` or `module-runs/<module-id>/verification/verification.md`

Required top-level sections:

- delivery unit identifier
- acceptance coverage
- user intent compliance
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
