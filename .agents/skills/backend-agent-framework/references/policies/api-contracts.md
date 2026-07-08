# API Contracts Policy

## Scope

This policy defines stable standards for backend contract ownership and integration, including inbound HTTP/RPC APIs, outbound service calls, message events, callbacks, and storage-adjacent schemas.

## Standards

- Keep contract success criteria explicit and testable.
- Preserve published contract semantics unless a deliberate compatibility boundary is approved.
- Reuse authoritative contract definitions when they exist instead of duplicating local forks.
- Keep authentication, authorization, idempotency, retry, timeout, and error semantics explicit at the owning boundary.

## Contract Source Priority

- Treat the published backend contract as the source of truth for request, response, event, and schema structure.
- If the system already provides authoritative generated or shared contract types, prefer those types directly.
- Do not re-declare or locally fork authoritative contract types unless an explicit adapter boundary requires a separate internal shape.
- If the contract source is OpenAPI, protobuf, IDL, JSON schema, field tables, or another formal contract source, preserve original field names and semantic meaning when translating it into implementation-facing types.

## Inbound Contract Rules

- Record method, path, protocol, auth mode, payload shape, response shape, status semantics, error semantics, and rate or quota behavior when they materially affect behavior.
- Preserve documented optionality, nullability, enum domains, pagination or cursor semantics, and backward-compatibility requirements.
- Record ambiguous or undocumented contract areas as clarifications instead of guessing from implementation convenience.

## Outbound Contract Rules

- Treat outbound dependency contracts with the same rigor as inbound APIs.
- Record timeout, retry, fallback, dedupe, and circuit-break or compensation behavior when material.
- Keep compatibility assumptions and upgrade or version dependencies explicit.

## Event and Callback Rules

- Treat event payloads, ordering assumptions, delivery semantics, deduplication needs, replay behavior, and consumer idempotency as first-class contract concerns.
- Record callback authenticity, retry model, duplication risk, timeout budget, and failure handling at the contract boundary.

## Data and Schema Rules

- If a database or storage schema change is in scope, record ownership, migration direction, backward/forward compatibility, rollout sequencing, and rollback limits.
- Keep schema naming, type meaning, and nullability semantics stable unless the spec explicitly authorizes a migration boundary.

## Adapter and Mapping Rules

- Introduce an adapter or mapper boundary only when the system needs semantic normalization, compatibility isolation, aggregation, or anti-corruption handling.
- When an adapter boundary exists, keep the raw contract and the adapted internal shape clearly separated.
- Do not rename stable external fields for local taste when the value still represents the same published concept.

## Spec Requirements

- The spec must record which contract source is authoritative for each material integration point.
- The spec must record whether each integration point uses direct contract ownership or an adapter boundary.
- The spec must record compatibility, versioning, timeout, retry, idempotency, error, migration, and observability semantics that materially affect behavior.

## Plan Requirements

- The plan must decompose contract work into contract reading, type reuse or translation, boundary ownership changes, compatibility or migration work, verification, and rollback checks.
- The plan must not treat "connect API" or "hook up event" as a single opaque task when multiple boundaries are involved.

## Verification and Review Requirements

- Verification must confirm that implemented request, response, event, callback, and schema handling matches the approved contract source.
- Review must check that published contract semantics were preserved and that compatibility boundaries are explicit and justified.

## Non-Goals

- This policy does not prescribe a single transport library or storage engine.
- This policy does not define business-specific endpoint layout.
