# Backend Components Policy

## Scope

This policy defines durable component and module standards for backend implementation work.

## Standards

- Prefer established templates and existing shared runtime helpers before building request-local variants.
- Keep module names and responsibilities explicit.
- Avoid mixing controller, service, repository, job, adapter, mapper, and serializer concerns in one module.
- Keep boundary modules honest: if a file owns retries, mapping, metrics, auth, or persistence, its name and placement should reveal that.
- Maintain consistency in how the repository represents handlers, services, repositories, jobs, consumers, grpc servers or clients, deployment manifests, and migrations.

## Anti-Mixing Triggers

- One file both parses transport input and writes to the database
- One file both owns business rules and third-party SDK quirks
- One file both runs cron flow and exposes reusable domain helpers
- A mapper silently performs network or persistence side effects
- One file both owns protobuf transport quirks and core business rules
- One file both owns Kubernetes rollout manifests and runtime business policy decisions

## Non-Goals

- This policy does not lock the repository to one framework or DI style.
- This policy does not define request lifecycle behavior.
