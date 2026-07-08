# Frontend Architecture Policy

## Scope

This policy defines stable frontend architecture standards that stage subskills may apply during spec, plan, execute, review, and verification.

## Standards

- Separate page containers, business components, and shared components by responsibility.
- Keep each file or module focused on a single clear purpose where practical.
- Split complex business logic into focused hooks or modules instead of growing page files indefinitely.
- Prefer explicit data flow and ownership over convenience coupling.
- Keep shared abstractions stable, documented, and reusable across requests.

## Non-Goals

- This policy does not define project-specific package names or directory layouts.
- This policy does not own workflow transitions or artifact formats.
