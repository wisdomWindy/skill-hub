# API Contracts Policy

## Scope

This policy defines stable standards for integrating backend contracts into frontend code, including conventional API documents, protobuf-driven interfaces, and backend-owned type declarations.

## Standards

- Keep request success criteria explicit and testable.
- Keep error ownership consistent between the request layer and the UI layer.
- Preserve backend field semantics unless a deliberate mapping boundary is required.
- Avoid casual remapping when direct use of the backend contract is sufficient.
- Reuse authoritative backend-provided types when they exist instead of duplicating local definitions.

## Contract Source Priority

- Treat the backend contract as the source of truth for request and response structure.
- If the backend provides TypeScript declarations for the interface contract, prefer those backend-owned TypeScript types directly.
- Do not re-declare or locally fork backend-owned TypeScript interface types unless an explicit adapter boundary requires a separate frontend shape.
- If the backend does not provide TypeScript declarations but provides another formal contract source such as protobuf, IDL, OpenAPI, JSON schema, or documented field tables, translate that contract into TypeScript-usable types while preserving the original backend field names.
- When translating a non-TypeScript backend contract into local TypeScript types, keep the backend field names unchanged and express the field types using valid TypeScript types.

## Conventional API Document Rules

- For conventional API docs, record the endpoint purpose, request method, path, request parameters, body shape, response shape, success criteria, and error shape in spec artifacts when they materially affect frontend behavior.
- Preserve documented backend optionality, nullability, enum domains, pagination contracts, and status semantics.
- Record ambiguous or undocumented contract areas as clarifications instead of guessing from UI needs alone.

## Protobuf Contract Rules

- Treat protobuf definitions as authoritative for field names, field optionality semantics, nested structures, enums, and repeated fields.
- When the project already has generated TypeScript or repository-approved protobuf-to-TypeScript output, reuse it instead of hand-writing parallel types.
- When only `.proto` or other protobuf-derived schema definitions exist, derive the frontend-facing TypeScript types from that source while preserving backend field names unless a deliberate adapter boundary is approved.
- Record any protobuf-to-frontend normalization boundary explicitly, especially when default values, enum rendering, timestamp conversion, numeric precision, or repeated-field absence semantics affect UI behavior.

## Type and Mapping Rules

- If a direct backend contract can be consumed safely, prefer direct use over unnecessary remapping.
- Introduce an adapter or mapper boundary only when the frontend needs semantic normalization, UI-specific value shaping, compatibility isolation, or cross-endpoint aggregation.
- When an adapter boundary exists, keep the raw backend contract and the adapted frontend shape clearly separated.
- Data-semantic normalization for frontend controls must happen in the adapter or mapper layer, not in component `computed`, `watch`, or template fallback branches.
- Do not rename backend fields for local taste when the value still represents the same backend concept; rename only at an explicit adapter boundary where the frontend shape truly differs.

## Request Layer Rules

- Keep transport concerns, authentication headers, serialization, retry policy, and protocol quirks in the request or service layer rather than scattering them through UI code.
- Define where request errors are handled, transformed, surfaced, or suppressed.
- Make loading, empty, success, and failure states traceable back to request-layer outcomes and contract semantics.
- Keep side effects such as cache writes, analytics, or optimistic updates explicit in the boundary that owns them.

## Spec Requirements

- The spec must record which backend contract source is authoritative for each material integration point: backend TypeScript declaration, protobuf, OpenAPI-style doc, field table, or another approved contract source.
- The spec must record whether each integration point uses direct contract consumption or an adapter boundary.
- The spec must record any UI-relevant contract semantics such as required fields, nullable fields, enum ranges, default values, pagination protocol, time or number formatting expectations, and error-state semantics.

## Plan Requirements

- The plan must decompose API integration work into contract reading, type reuse or type translation, request-layer changes, adapter or mapper work when needed, UI consumption changes, and verification work.
- The plan must not treat "connect backend API" as a single opaque task when multiple endpoints, payloads, adapters, or UI surfaces are involved.

## Verification and Review Requirements

- Verification must confirm that implemented request and response handling matches the approved contract source.
- Review must check that backend-owned TypeScript types were reused when available, and that non-TypeScript contracts were translated with backend field names preserved.
- Review must check that semantic normalization lives in the adapter boundary rather than leaking into presentation code.

## Non-Goals

- This policy does not prescribe a single backend package layout for every repository.
- This policy does not define business-specific API modules.
