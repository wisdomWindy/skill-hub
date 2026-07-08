# MySQL Enterprise Policy

## Scope

This policy defines enterprise-grade standards for backend requests that read from, write to, or migrate MySQL data.

## Standards

- Treat MySQL as a transactional system with explicit ownership, not as an incidental storage detail.
- Record transaction boundaries, lock scope, isolation assumptions, and rollback limits when material.
- Require index-awareness for new or changed high-volume query paths.
- Treat schema migration sequencing and rollback feasibility as first-class delivery concerns.

## Data Modeling Rules

- Keep table ownership, primary key strategy, unique constraints, nullability, and default-value semantics explicit.
- Prefer additive, backward-compatible schema evolution unless the spec explicitly authorizes a breaking boundary and rollout plan.
- Record whether soft delete, archive, partitioning, or sharding assumptions materially affect the change.

## Query and Index Rules

- For changed read or write paths, document the dominant query predicates, ordering, and expected cardinality when performance matters.
- Add or adjust indexes only with a stated query purpose; avoid index growth with no named consumer path.
- Treat full-table scans, wide range scans, lock amplification, and N+1 write/read loops as review triggers when data volume could matter.

## Transaction and Lock Rules

- Keep transaction scope as small and explicit as practical.
- Document cross-row, cross-table, or long-running transactional work that can raise lock contention risk.
- Record whether the design relies on optimistic control, pessimistic locking, unique constraints, or idempotent retries for conflict handling.

## Migration Rules

- Every material schema change must record migration direction, rollout order, backfill or dual-write needs, and rollback limits.
- Prefer expand -> migrate -> contract style rollout when compatibility across mixed application versions matters.
- If a migration is practically irreversible, record that constraint explicitly in spec, plan, and release readiness.

## Verification and Review Requirements

- Verification should include migration rehearsal evidence when schema change risk is material.
- Verification should include query-plan, index-fit, or lock-risk evidence when performance or contention risk is material.
- Review should check that transaction, lock, and migration assumptions are explicit rather than implicit.

## Non-Goals

- This policy does not prescribe one ORM, query builder, or migration framework.
- This policy does not define business-specific schema names.
