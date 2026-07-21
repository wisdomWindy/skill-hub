# Authoring Guide

- Use the main skill only for routing and stage control.
- Keep subskills stage-scoped and execution-only.
- Keep policy references durable and team-wide.
- Keep template references schema-oriented, not process-oriented.
- Use `references/policies/policy-index.md` before choosing, adding, renaming, or removing policy files; it defines policy ownership and stage-specific loading.
- Use `references/policies/constraint-model.md` before adding or changing constraints; it defines the single-source, allowed redundancy, verdict registry, and conflict-resolution model.
- Do not add a policy reference directly to every subskill; route it through `policy-index.md`, then add only stage-local hooks where the policy creates concrete work or blockers.
- Do not reintroduce mixed skills that combine routing, standards, and formatting.
- Do not copy finished sample request content into a new active request; reuse structure and quality level only.
- When using `docs/requests/prd-material-delivery-config-center/` as a reference, rewrite all request-specific artifacts from the new requirement source before moving to later stages.
