# Novel Agent Framework State Machine

## Lifecycle

`intake -> market-positioning -> idea-expansion -> story-architecture -> character-design -> chapter-planning -> scene-design -> drafting -> continuity-review -> structural-revision -> beta-feedback -> line-polish -> copyedit -> proofread -> acceptance-review -> complete`

## Normal forward path

- `intake` -> `market-positioning`
- `market-positioning` -> `idea-expansion`
- `idea-expansion` -> `story-architecture`
- `story-architecture` -> `character-design`
- `character-design` -> `chapter-planning`
- `chapter-planning` -> `scene-design`
- `scene-design` -> `drafting`
- `drafting` -> `continuity-review`
- `continuity-review` -> `structural-revision`
- `structural-revision` -> `beta-feedback`
- `beta-feedback` -> `line-polish`
- `line-polish` -> `copyedit`
- `copyedit` -> `proofread`
- `proofread` -> `acceptance-review`
- `acceptance-review` -> `complete`

## Rollback guidance

- Market mismatch or weak commercial lane: roll back to `market-positioning`
- Premise weak or generic: roll back to `idea-expansion`
- Broken major turning points: roll back to `story-architecture`
- Weak motivation or character inconsistency: roll back to `character-design`
- Chapter order or causality failure: roll back to `chapter-planning`
- Scene-level drag, POV break, or weak chapter hook: roll back to `scene-design`
- Scene-level continuity or payoff failure: roll back to `drafting`
- Structural pacing failure after review: roll back to `structural-revision` or earlier
- Reader boredom, confusion, or emotional flatness after review: roll back to `structural-revision`, `scene-design`, `chapter-planning`, or `drafting` based on root cause; do not use `beta-feedback` itself as the repair stage
- Sentence-level awkwardness only: remain in `line-polish`
- Copy consistency defects only: remain in `copyedit`
- Typo and surface defects only: remain in `proofread`

## Loop object

`state.json` should contain:

```json
{
  "loop": {
    "iteration": 1,
    "state": "running",
    "last_completed_stage": null,
    "pending_gate": null,
    "reentry_reason": "new_project"
  }
}
```

## Allowed loop.state values

- `running`
- `blocked`
- `complete`

## Allowed reentry_reason values

- `new_project`
- `resume_project`
- `market_failed`
- `continuity_failed`
- `structure_failed`
- `character_failed`
- `beta_feedback_failed`
- `copyedit_failed`
- `proofread_failed`
- `acceptance_failed`
- `manual_reopen`
