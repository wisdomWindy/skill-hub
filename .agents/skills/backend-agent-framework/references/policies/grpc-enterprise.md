# gRPC Enterprise Policy

## Scope

This policy defines enterprise-grade standards for backend requests that expose, consume, version, or operationally depend on gRPC and protobuf contracts.

## Standards

- Treat protobuf as the authoritative RPC contract boundary rather than a generated side artifact.
- Record service purpose, method semantics, caller ownership, deadline behavior, retry ownership, auth propagation, and error mapping when material.
- Preserve backward-compatible field and enum evolution unless the spec explicitly authorizes a controlled compatibility break.
- Make metadata, streaming, and side-effect semantics explicit instead of assuming HTTP-like behavior.

## Contract Evolution Rules

- Additive evolution is the default: prefer adding fields, messages, or methods over mutating published semantics in place.
- Record reserved field numbers, reserved enum values, and rename boundaries when fields are removed or repurposed.
- Preserve tolerance for unknown fields and mixed-version callers when multi-service rollout or rollback can overlap.

## Call Semantics Rules

- Record deadline or timeout ownership, propagation rules, and failure behavior at every material call boundary.
- Make retry ownership explicit between caller, client middleware, and server-side workflow; do not let retries stack implicitly.
- Document status-code mapping, domain-error mapping, and whether error details or metadata carry contractually relevant meaning.

## Metadata and Identity Rules

- Record how authn, authz context, trace identifiers, tenant identity, idempotency keys, and request metadata are propagated.
- Do not hide security-critical or routing-critical semantics in undocumented metadata keys.

## Streaming and Resource Rules

- When streaming is in scope, document stream lifecycle, backpressure, ordering expectations, partial-failure behavior, and cancellation handling.
- Record message size, concurrency, and flow-control assumptions when they materially affect correctness or operability.

## Verification and Review Requirements

- Verification should include protobuf compatibility, deadline behavior, retry ownership, status mapping, and metadata propagation evidence when gRPC materially affects correctness.
- Verification should include streaming, cancellation, or backpressure evidence when streaming is material.
- Review should check that proto ownership, mixed-version compatibility, auth propagation, and failure semantics are explicit and justified.

## Non-Goals

- This policy does not prescribe one code generator, interceptor stack, or service mesh.
- This policy does not require gRPC for every internal service boundary.
