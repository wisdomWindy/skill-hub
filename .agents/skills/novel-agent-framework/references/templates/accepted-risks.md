# Accepted Risks Template

## Required Artifact Path

- `docs/novel-projects/<novel-id>/artifacts/accepted-risks.md`

## Purpose

This artifact is the single durable approval register for exceptions that would otherwise block completion or stage advancement.

Agents may propose an accepted-risk candidate, but they must not approve it themselves.

## Required Sections

- project identifier
- approval policy
- active accepted risks
- rejected or expired risk candidates
- audit notes

## Approval Policy

Every accepted risk that affects completion, beta qualification, continuity, structure, market promise, or the acceptance standard must include explicit user approval.

If approval is missing, the item remains a blocker.

## Active Accepted Risks

For each approved risk, record:

- risk id
- source stage
- source artifact
- risk description
- affected chapters, scenes, or artifacts
- affected acceptance item
- severity before approval
- rationale for accepting
- user approval signal
- approval date or conversation reference
- downstream handling
- final acceptance-review reference

## Rejected Or Expired Risk Candidates

For each candidate that was not approved, record:

- candidate id
- source stage
- reason approval was required
- decision
- required rollback or repair stage

## Audit Notes

Use this section for cross-stage traceability:

- which accepted risks were checked during acceptance-review
- which accepted risks were later repaired and closed
- which accepted risks remain part of the final delivery decision
