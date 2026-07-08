# Creational Patterns

Use this reference when the main difficulty is how objects, services, or module instances are created and selected.

## Singleton

- Use when the system truly needs one shared instance with one lifecycle or one coordination point.
- Common frontend cases: app-wide configuration registry, SDK bootstrap guard, shared event bridge, shared cache with explicit ownership.
- Avoid when plain module scope, dependency injection, or explicit instance passing is enough.
- Review risk: hidden global state and difficult test isolation.

## Factory Method

- Use when consumers should depend on an abstract creation contract while subclasses or environment-specific providers decide what concrete instance to create.
- Common frontend cases: environment-specific service creators, renderer creators, upload provider creators.
- Avoid when creation logic is simple and local.
- Review risk: hierarchy added only to wrap one constructor call.

## Abstract Factory

- Use when a family of related products must vary together while staying compatible.
- Common frontend cases: theme-specific component suites, environment bundles, platform-specific adapters created as a set.
- Avoid when only one object varies or when the product family is not actually coupled.
- Review risk: overbuilding many interfaces for one current variant.

## Builder

- Use when constructing a complex object or payload involves many ordered optional steps and direct constructors become unreadable.
- Common frontend cases: complex request payload assembly, editor state export, report configuration assembly.
- Avoid when a plain object literal or helper function is clearer.
- Review risk: fluent builder ceremony around shallow data.

## Prototype

- Use when cloning configured instances is cheaper or clearer than reconstructing them from scratch.
- Common frontend cases: duplicating widget configs, template blocks, form schemas, chart presets.
- Avoid when clone semantics are subtle, shared references are dangerous, or the object can be built directly.
- Review risk: accidental shallow-copy bugs and hidden shared mutable state.
