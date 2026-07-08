# Creational Patterns

Use this reference when the main difficulty is how services, adapters, repositories, or runtime collaborators are created and selected.

## Singleton

- Use when the system truly needs one shared runtime coordinator with one lifecycle.
- Common backend cases: shared scheduler registry, one metrics emitter with explicit ownership, one connection manager bootstrap.
- Avoid when explicit instance wiring or dependency injection is enough.

## Factory Method

- Use when consumers should depend on an abstract creation contract while provider-specific logic chooses the concrete instance.
- Common backend cases: provider-specific client creators, storage backend creators, consumer handler creators.

## Abstract Factory

- Use when a family of related collaborators must vary together while staying compatible.
- Common backend cases: region-specific integration bundles, environment-specific runtime packages.

## Builder

- Use when constructing a complex request, query, or command payload involves many ordered optional steps and direct constructors become unreadable.

## Prototype

- Use when cloning configured instances is cheaper or clearer than reconstructing them from scratch.
