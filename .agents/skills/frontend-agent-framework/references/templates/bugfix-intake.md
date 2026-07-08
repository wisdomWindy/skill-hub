# Bugfix Intake Template

## Required Artifact Path

- `docs/requests/<request-id>/artifacts/bugfix-source.md`
- `docs/requests/<request-id>/artifacts/code-context.md` when structural analysis is needed

## `artifacts/bugfix-source.md`

Required sections:

- source system
- project key or source scope
- defect or work item id
- defect title
- observed behavior
- expected behavior
- reproduction clues
- affected module or page
- available screenshots, logs, or comments
- open questions and missing context

## Normalization Rule

After writing `bugfix-source.md`, also write `artifacts/prd-snapshot.md` as the normalized problem statement for the downstream `spec` stage.
