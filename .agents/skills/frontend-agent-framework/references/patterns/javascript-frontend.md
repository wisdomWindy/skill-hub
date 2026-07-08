# JavaScript and Frontend Pattern Variants

Use this reference when the request lives in JavaScript-heavy frontend code where classical pattern names need adaptation.

## Publish-Subscribe

- Treat this as an Observer variant with an event broker between publishers and subscribers.
- Use when producers and consumers should not know each other directly.
- Common frontend cases: event bus notifications, cross-module analytics events, plugin ecosystems.
- Avoid when direct dependency wiring is clearer and safer.
- Review risk: uncontrolled global event traffic and lifecycle leaks.

## Module

- Use when state and helper functions should be hidden behind a small explicit public surface.
- Common frontend cases: service modules, feature-scoped utilities, isolated stateful helpers.
- Avoid when module state quietly becomes process-wide mutable global state.
- Review risk: fake encapsulation with too many exports or hidden side effects.

## Lazy Singleton

- Use when one shared resource should be initialized on first access instead of at startup.
- Common frontend cases: analytics SDK init, expensive parser cache, websocket manager.
- Avoid when startup order must stay explicit.
- Review risk: surprising first-use latency or hidden global coupling.

## Cache Proxy

- Use when repeated expensive reads should be memoized or de-duplicated behind an access layer.
- Common frontend cases: request dedupe, selector cache, expensive formatting cache.
- Avoid when cache invalidation rules are unclear.
- Review risk: stale data hidden behind a “transparent” wrapper.

## Virtual Proxy

- Use when an expensive object, asset, or view should be represented cheaply until it is really needed.
- Common frontend cases: image placeholders, deferred editor startup, on-demand panel loading.
- Avoid when the load path is simple enough to express directly.
- Review risk: partial readiness states that callers cannot reason about.

## AOP-Style Function Decoration

- Treat higher-order functions that add logging, retries, timing, permission checks, or tracing as JavaScript-friendly Decorator variants.
- Use when cross-cutting concerns should wrap existing behavior without rewriting it.
- Avoid when stacking wrappers obscures the true execution path.
- Review risk: debugging difficulty from invisible wrapper order.
