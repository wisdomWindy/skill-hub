# Source Grounding Policy

Use this policy whenever request artifacts are created, approved, planned, implemented, verified, or reviewed.

The goal is to prevent requirement expansion beyond the user's source material, confirmed decisions, and repository facts.

## Authoritative Sources

Allowed authority sources are:

- direct user instruction for the active request
- original PRD, defect report, local requirement file, or retrieved upstream document
- durable source snapshots under `docs/requests/<request-id>/artifacts/`
- requirement-analysis, requirement-splitting, page-design, architecture-design, spec, and plan artifacts that passed the framework gates
- repository code facts discovered from scoped code reading, code graph, tests, generated contracts, or documented project conventions
- explicit human confirmations recorded in request artifacts

Do not treat the following as authority for new scope:

- general product or frontend convention
- behavior from a neighboring module unless it is explicitly in the source or required by a confirmed shared contract
- sample request business content
- preferred architecture, preferred UX, or personal implementation taste
- assumptions made to make a document look complete

## Grounding Labels

Every material scope item, behavior, field, interaction, state rule, API contract, dependency, task, and acceptance criterion must be classifiable as one of:

- `source-backed`: directly stated in an authoritative requirement source
- `code-fact-backed`: directly required or constrained by scoped repository code facts
- `confirmed-decision`: explicitly confirmed by user, product, backend, or another named owner and recorded in artifacts
- `source-derived`: a narrow consequence of a source-backed item where every plausible interpretation leads to the same downstream spec, plan, implementation, and verification result
- `missing-source`: not supported enough to define behavior; must become a clarification, blocker, external-interface pending item, or non-scope note
- `out-of-scope`: adjacent or tempting work that must not be silently absorbed

Only `source-backed`, `code-fact-backed`, `confirmed-decision`, and safe `source-derived` items may drive downstream spec, plan, execution, or acceptance criteria.

`source-derived` is allowed only to expose implementation-relevant dependency, risk, or normalization consequences. It must not create new product behavior, new fields, new states, new interactions, new validation rules, new API requirements, new modules, or new acceptance criteria.

## Artifact Rules

- Each stage artifact must preserve source references for material decisions.
- If an item has no source reference, label it `missing-source` instead of rewriting it as a requirement.
- If multiple interpretations are possible, route it to the front-loaded confirmation gate instead of choosing the most convenient interpretation.
- If a source only says a business result and omits implementation-relevant semantics, record the omitted semantics as missing or pending rather than filling them from convention.
- If repository code shows a technical constraint, use it to bound implementation, not to expand product scope.
- If adjacent modules suggest a possible behavior, record it as a candidate comparison or clarification, not as current-scope behavior.

## Approval Rules

Framework automatic approval for `spec` and `plan` must fail when:

- a requirement, behavior, task, or acceptance criterion has no grounding label or source reference
- a `missing-source` item is used as if it were confirmed behavior
- a `source-derived` item creates new product semantics
- direct-change or bugfix work expands beyond the explicit user instruction or observed / expected defect behavior
- sample content, neighboring-module behavior, or convention is used to add scope without confirmation

When approval fails because grounding is missing, roll back to `requirement-analysis`, `intake`, or `bugfix-intake` as the appropriate front-loaded confirmation gate.

## Direct-Change And Bugfix Rules

For direct-change requests, the direct user instruction is the primary source. Repository facts may identify impact scope, references, callers, and cleanup needs, but must not add unrelated refactors or neighboring improvements.

For bugfix requests, observed behavior, expected behavior, reproduction scope, and affected module are the primary source. Do not invent a broader redesign unless the defect source or a confirmed decision explicitly requires it.

For removal or cleanup requests, code reference analysis may discover dependent cleanup items. Cleanup is in scope only when it is part of the dependency closure of the requested change; adjacent opportunistic cleanup remains out of scope.
