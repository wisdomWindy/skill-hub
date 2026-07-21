# Constraint Model Policy

Use this policy when adding, changing, verifying, or reviewing frontend-agent-framework constraints.

The goal is to keep the framework strict without making every rule appear in every file.

For policy discovery, stage-specific loading, and ownership routing, read `policy-index.md` first. This file owns gate semantics, verdict registration, conflict resolution, and constraint update discipline.

## Constraint Layers

- Main skill owns lifecycle routing, hard-gate categories, state transitions, completion criteria, and policy loading.
- `policy-index.md` owns policy discovery, policy ownership routing, and stage-specific policy loading.
- Policy files own durable rule definitions and conflict-resolution logic.
- Template files own artifact shape, required sections, required fields, and verdict names.
- Stage subskills own stage-local procedure, inputs, outputs, rollback triggers, and stage-specific checks.
- Memory records recent decisions only; it is not an authoritative policy source.

Do not copy a full policy into the main skill, templates, and subskills. Keep the full rule in its policy file, then reference it from the stages that must apply it.

## Allowed Redundancy

Some repetition is intentional and required:

- Main skill may state non-bypassable gates as short anchors.
- Templates may require the artifact sections or pass/fail verdicts needed by downstream stages.
- Subskills may restate the minimum stage-local action needed to produce or check those sections.
- Review and verify may both mention the same verdict because verification proves behavior and review assesses risk.

## Disallowed Redundancy

Avoid these patterns:

- Repeating the same policy paragraphs verbatim across main skill, templates, and subskills.
- Defining the same threshold in multiple places, such as class length, use-site count, or approval criteria.
- Maintaining separate pass/fail lists that can drift from the completion rule.
- Adding a new rule directly to `execute` without adding its spec, plan, verify, and review path.
- Adding a new review blocker without defining where upstream artifacts record the decision.
- Mixing workflow routing rules with code-quality rules in the same policy.

## Constraint Families

Use these families to decide where a new rule belongs. Use `policy-index.md` for the concrete policy file and stage-loading route.

- Lifecycle and state: main skill, state-machine, relevant subskill transition steps.
- Source and intent: source-grounding, user-intent, requirement-analysis / intake / bugfix-intake.
- Existing-code modification: change-chain and removal-cleanup rules in templates and execute / verify / review.
- Code quality: clean-code, production-code-quality, functional-programming, design-patterns, expert-frontend-engineering.
- Architecture: frontend-architecture, architecture-design, code-context.
- Styling and components: frontend-components, page-design, spec / plan / execute / verify / review.
- API and types: api-contracts, typescript-context, spec / plan / execute / verify / review.

If a rule spans multiple families, put the detailed definition in the most specific policy and add only cross-family hooks elsewhere.

## Verdict Registry

Completion requires these verdicts when applicable:

- Always required in verification: `spec constraint compliance: pass`, `source grounding compliance: pass`.
- Always required in review: `clean-code assessment: pass`, `source grounding assessment: pass`, `design-pattern assessment: pass`.
- Required when the spec contains a user intent contract: `user intent compliance: pass`, `user intent assessment: pass`.
- Required when modifying or removing existing code: `change-chain integrity: pass`, `change-chain integrity assessment: pass`.
- Required when removing calls, requests, branches, fields, controls, or side effects: `removal cleanup compliance: pass`, `removal cleanup assessment: pass`.
- Required when adding or changing production code: `production code quality compliance: pass`, `production code quality assessment: pass`.
- Required when adding or changing user-facing frontend behavior, state flow, data flow, component composition, frontend architecture, or production integration: `expert frontend engineering compliance: pass`, `expert frontend engineering assessment: pass`.
- Required when touching transformations, rules, payloads, state derivation, adapters, mappers, or side-effect orchestration: `functional-programming compliance: pass`, `functional-programming assessment: pass`.
- Required when touching repeated semantic logic or shared abstraction decisions: `architecture reuse compliance: pass`, `architecture reuse assessment: pass`.
- Required when adding or changing authored styling: `frontend styling compliance: pass`, `frontend styling assessment: pass`.
- Required when touching backend integration: `API contract conformance: pass`, `API contract assessment: pass`.
- Required when TypeScript context affects correctness: `TypeScript context compliance: pass`, `TypeScript context assessment: pass`.

Do not add a new verdict without updating the relevant template, subskill, completion rule, and this registry.

## Conflict Resolution

When constraints appear to conflict:

- User-confirmed source and repository-local AGENTS constraints can narrow implementation choices but must not weaken this framework's built-in gates.
- Source-grounding blocks implementation scope expansion even if a code-quality policy suggests an improvement.
- User intent blocks technically compliant work that relocates complexity, risk, ambiguity, or responsibility.
- Architecture reuse can require extraction only after Anti-DRY criteria pass; wrong abstraction is a blocker.
- Production-code-quality sets baseline implementation discipline; functional-programming provides the detailed rule for transformations and side-effect boundaries.
- Expert-frontend-engineering coordinates end-to-end frontend concerns across state ownership, async correctness, interaction resilience, performance boundaries, evolution safety, and evidence. It should reference specific policies instead of duplicating them.
- Frontend-components owns styling mechanics; production-code-quality owns boundary UI states.
- API-contracts and TypeScript-context own contract/type sources; production-code-quality owns local type precision and null/failure handling.

If a conflict materially changes behavior, scope, data semantics, API meaning, permissions, or user intent, roll back to the front-loaded confirmation gate instead of resolving it in `execute`.

## Update Procedure

When adding or changing a constraint:

1. Identify the owning constraint family.
2. Check `policy-index.md` for the owning policy and stage-loading route.
3. Update the owning policy first.
4. Add only required artifact fields to templates.
5. Add only stage-local procedure and blockers to subskills.
6. Add or update verdicts only through the registry.
7. Keep the main skill limited to routing, gate categories, policy references, and completion.
8. Validate the skill and verify global sync if installed globally.
