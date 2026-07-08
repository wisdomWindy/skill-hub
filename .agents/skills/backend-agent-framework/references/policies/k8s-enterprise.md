# Kubernetes Enterprise Policy

## Scope

This policy defines enterprise-grade standards for backend requests whose deployment, runtime behavior, scaling, or operational safety materially depends on Kubernetes.

## Standards

- Treat Kubernetes delivery shape as part of the backend contract when rollout, readiness, shutdown, or capacity behavior affects correctness.
- Record workload ownership, config and secret ownership, resource policy, probe semantics, and rollout strategy when material.
- Make startup, readiness, graceful shutdown, and rollback behavior explicit rather than leaving them to platform defaults.
- Keep runtime assumptions visible: scaling, disruption tolerance, node placement, and batch or cron execution semantics must not be implicit.

## Workload Ownership Rules

- Record whether the change targets Deployment, StatefulSet, Job, CronJob, DaemonSet, or another workload boundary, and why.
- Keep application responsibilities and platform responsibilities explicit; do not bury business correctness in opaque manifest defaults.

## Probe and Lifecycle Rules

- Define liveness, readiness, and startup probe intent separately when they are material.
- Record graceful shutdown, in-flight request drain, preStop behavior, termination grace expectations, and idempotent restart assumptions.
- Do not treat "pod restarted successfully" as proof that the service is rollout-safe.

## Resource and Scaling Rules

- Record CPU and memory requests or limits, concurrency assumptions, and autoscaling expectations when load or latency matters.
- If HPA, queue-based scaling, or cron concurrency policy materially affects behavior, document the trigger signals and safety assumptions.
- Record disruption tolerance, PodDisruptionBudget expectations, and anti-affinity or topology constraints when availability matters.

## Config and Secret Rules

- Record ownership for config maps, secrets, environment variables, and mounted runtime configuration.
- Secret rotation, missing-secret behavior, and config rollout coupling must be explicit when operationally relevant.

## Rollout and Recovery Rules

- Record rollout strategy, canary or gray-release expectations, operator checkpoints, rollback path, and mixed-version safety assumptions when material.
- If schema change, queue drain, cache warmup, or other external dependency gates the rollout, record that dependency explicitly.

## Verification and Review Requirements

- Verification should include probe behavior, readiness evidence, rollout checkpoints, rollback path, and graceful shutdown or drain evidence when Kubernetes materially affects correctness.
- Verification should include resource, scaling, config, and secret-handling evidence when those assumptions materially affect safety or availability.
- Review should check that workload choice, probe semantics, scaling assumptions, config ownership, and rollback safety are explicit and justified.

## Non-Goals

- This policy does not prescribe one Helm, Kustomize, or GitOps workflow.
- This policy does not require Kubernetes for every backend deployment.
