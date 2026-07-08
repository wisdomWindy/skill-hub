# Structural Patterns

Use this reference when the main difficulty is how modules or objects should be composed, wrapped, adapted, or exposed.

## Adapter

- Use when an existing API shape is incompatible with the shape required by the current feature.
- Common frontend cases: normalizing backend responses, wrapping third-party SDKs, bridging legacy utilities into current service contracts.
- Avoid when the mismatch is trivial and local.
- Review risk: leaking raw upstream quirks past the adapter boundary.

## Bridge

- Use when abstraction and implementation must vary independently.
- Common frontend cases: decoupling business actions from transport, editor commands from rendering engines, UI orchestration from platform capabilities.
- Avoid when only one side varies in practice.
- Review risk: abstracting two dimensions before they truly exist.

## Composite

- Use when tree-shaped objects should be handled uniformly at leaf and container levels.
- Common frontend cases: menu trees, folder trees, page blocks, nested form sections, rule groups.
- Avoid when the structure is shallow or leaf/container behavior is fundamentally different.
- Review risk: pretending all nodes are equivalent when domain rules differ sharply.

## Decorator

- Use when behavior should be layered dynamically without changing the wrapped unit's core responsibility.
- Common frontend cases: adding logging, timing, permission checks, retries, caching, analytics, or UI capability wrappers.
- Avoid when a direct helper or explicit composition is clearer.
- Review risk: wrapper stacks that hide the real execution path.

## Facade

- Use when a subsystem is too noisy and callers need a narrower entrypoint.
- Common frontend cases: page-level service facades, SDK wrapper facades, editor orchestration helpers.
- Avoid when the facade becomes a god object.
- Review risk: pushing unrelated responsibilities into one convenience layer.

## Flyweight

- Use when many fine-grained objects share most intrinsic state and memory pressure or setup cost is real.
- Common frontend cases: virtualized large lists, map markers, repeated editor glyph metadata.
- Avoid unless scale pressure is demonstrated.
- Review risk: complexity added for performance that was never measured.

## Proxy

- Use when access to a target needs controlled indirection.
- Common frontend cases: lazy loading, virtual proxy for expensive views, cache proxy, permission proxy, request dedupe proxy.
- Avoid when the indirection does not add clear access semantics.
- Review risk: hiding latency, caching, or auth behavior where callers cannot reason about it.
