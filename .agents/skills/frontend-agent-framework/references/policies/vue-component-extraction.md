# Vue Component Extraction Policy

## Scope

Use this policy when Vue SFCs, page-local Vue components, shared Vue components, slots, props / emits boundaries, or component splitting decisions are added or changed.

The goal is not "extract components whenever code looks long". The goal is to create component boundaries only when they improve ownership, readability, interaction isolation, reuse, testability, or styling reviewability.

## Decision Algorithm

Evaluate every Vue extraction candidate in this order:

1. Name the candidate by a real UI or business concept. If the candidate cannot be named more specifically than `Section`, `Wrapper`, `Block`, `Item`, or `Content`, keep it inline.
2. Check ownership. A component may own view structure, local UI state, validation display, focus / dialog / upload lifecycle, slots, and user-intention emits. It must not own request transport, adapter normalization, permission calculation, route orchestration, or cross-section business state unless it is explicitly a container component in the approved design.
3. Count real production callers. Test files, stories, examples, and future imagined callers do not count.
4. If caller count is two or more, extract or reuse only when the semantics are the same and the variation can be expressed with a narrow props / emits / slots contract.
5. If caller count is exactly one, extract only when it passes one of the single-caller exceptions below. Otherwise keep it inline or use a same-file local section.
6. If any `Do Not Extract When` blocker applies, keep inline even when the markup looks reusable, unless an upstream approved artifact records why the blocker is intentionally overridden.

Single-caller extraction is allowed only for these concrete reasons:

- `cohesive business section`: the section is a named sub-flow with its own form subsection, table action area, upload block, preview card, audit drawer body, or similar domain UI owner.
- `interaction lifecycle boundary`: the section owns meaningful local UI state such as validation display, temporary selection, focus management, expanded/collapsed state, drag/upload progress, modal/drawer lifecycle, or cleanup.
- `slot / composition boundary`: the parent must vary inner content while the component owns a stable shell, layout, or interaction frame.
- `focused test boundary`: the section has enough behavior branches to need a smaller component-level test surface than the page container.
- `page readability boundary`: after keeping data fetching, adapter / mapper logic, side effects, and page orchestration in the page, the remaining template section is still a large named UI region whose markup and event wiring make the page hard to review; same-file local helpers or comments are insufficient.
- `project convention boundary`: the framework, router, lazy loading, dynamic component registry, or existing local convention requires a separate SFC for that UI boundary.

Single-caller extraction is not allowed when the result is only a file split, a pass-through props / emits layer, a wrapper around an existing component, or a place to hide long Tailwind class strings.

## Extract When

Extract a Vue component when at least one condition is true and the boundary can be named by a real UI or business concept:

- Repeated UI pattern: the same visual / interaction unit appears in at least two real production places with the same semantics, or an approved shared UI pattern already exists.
- Cohesive business section: a page region owns a clear sub-flow, such as a filter panel, edit form section, table action area, audit drawer body, upload block, or preview card.
- Interaction lifecycle boundary: the section owns meaningful local UI state, validation, focus, expanded/collapsed state, temporary selection, drag/upload state, or dialog/drawer lifecycle that would otherwise pollute the page container.
- Slot / composition boundary: callers must provide variable content while the component owns stable frame behavior, layout, or interaction shell.
- Styling boundary: Tailwind utility classes would become too long or unreadable inline, and splitting markup into a named component produces a clearer semantic unit than hiding class strings in constants or computed values.
- Testability boundary: the interaction is complex enough to need focused component tests or deterministic fixtures, and extracting makes that test surface smaller and clearer.
- Page readability boundary: after data fetching, adapter / mapper logic, side effects, and orchestration stay in the page, a named UI region still has enough markup, state wiring, or event handling that same-file local helpers / sections cannot keep the page reviewable.
- Existing design-system fit: an existing shared component or project template matches the semantics closely enough that reusing or lightly adapting it is safer than creating a page-local variant.

## Do Not Extract When

Do not extract a Vue component when any condition is true:

- The only reason is that the current SFC is "long" but the section has no stable name, owner, state, interaction, or reuse signal.
- The extracted component would have exactly one caller and only pass through props / emits without owning behavior, layout frame, state, or test value.
- The component would mirror parent data shape and emit every small field change, creating prop / emit plumbing that is harder to read than local markup.
- The extracted component would accept the same form model, detail DTO, row DTO, or query object used by the parent and merely forward fields into existing controls.
- The boundary would hide simple local behavior, forcing readers to jump files to understand a short page-specific rule.
- The candidate contains business data normalization, adapter / mapper logic, request transport, store orchestration, or permission calculation that belongs outside a presentational Vue component.
- The candidate is a one-off wrapper around an existing design-system component with no additional semantics.
- The proposed shared component would require broad optional props, mode flags, or branchy templates to satisfy unrelated callers.
- The repeated markup is only syntactically similar but has different business semantics, permission rules, validation behavior, lifecycle, or future change direction.
- The extraction is only to bypass Tailwind class length rules by moving long classes into another file without creating a clearer component boundary.
- The component name would be generic, such as `CommonItem`, `BaseBlock`, `InfoWrapper`, `RenderContent`, or `Section`, without a domain or UI responsibility.
- The component would introduce a prop / emit chain longer than the local code it replaces, especially `v-model` passthrough over multiple layers.

## Vue Boundary Design Rules

When extracting is approved:

- Name the component by the UI / business concept it owns, not by implementation shape.
- Keep the parent as orchestration owner: data fetching, route handling, request side effects, and cross-section coordination stay in the page / container unless the approved design says otherwise.
- Keep semantic data normalization in adapter / mapper / `fromDetail`; the component receives already-normalized props.
- Use precise props for stable inputs; avoid passing whole backend DTOs when the component only needs a few view-model fields.
- Use `emits` for user intentions, not for leaking internal implementation steps. Emit names should describe actions such as `submit`, `cancel`, `select`, `update:field`, or project convention equivalents.
- Use slots only when caller-provided content is a real variation point. Do not use slots to avoid naming a concrete prop or component.
- Keep local state local only when it is purely UI-owned. Shared business state, form source state, server state, and route state must keep a single owner.
- Avoid `v-model` passthrough chains across multiple extracted components unless the plan records why that two-way boundary is clearer than explicit props / emits.
- Co-locate single-feature extracted components under the narrow owning feature directory. Promote to shared only after stable cross-feature semantics are proven.
- Preserve local project conventions for SFC order, naming, import style, component registration, composables, stores, request modules, and tests.

## Required Decision Record

For every Vue component extraction candidate, record:

- candidate name and owning page / feature
- decision: `extract`, `reuse existing`, `keep inline`, or `defer`
- trigger condition from `Extract When`, or blocker condition from `Do Not Extract When`
- real production caller count
- whether caller count is `1`, `2+ same semantics`, or `2+ different semantics`
- if caller count is `1`, the exact single-caller exception that permits extraction; otherwise record `keep inline`
- state owner before and after extraction
- props contract and emits contract
- slot usage, if any, and why props are not enough
- data normalization boundary
- styling / Tailwind class-length impact
- test or verification surface
- why the decision is better than same-file markup or a same-file local section

## Review Blockers

Treat these as blockers:

- Extracted Vue component has no approved decision record.
- Extracted component has one caller and no real lifecycle, behavior, styling, or test boundary reason.
- Component interface is a broad DTO passthrough or a bag of optional props created to serve unrelated semantics.
- Extraction moves adapter, request, permission, or business normalization logic into a presentational component.
- Extraction causes prop / emit drilling that makes the local flow harder to understand than the original SFC.
- Similar sections were extracted together despite different business semantics or change direction.
- Approved extraction was skipped even though the candidate meets the extraction criteria and is inside the approved change scope.
