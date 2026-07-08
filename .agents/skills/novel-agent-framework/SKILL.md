---
name: novel-agent-framework
description: Use when the user wants a complete novel-writing workflow from a rough story idea. This main skill orchestrates the full novel lifecycle, routes work to stage subskills, enforces loop-based quality gates, and continues revising until the novel package meets the acceptance standard rather than stopping at a first draft.
---

# Novel Agent Framework

Use this as the default entry skill for repository-local long-form fiction generation.

This main skill is the lifecycle orchestrator. It does not directly draft chapters, revise prose, or judge acceptance on its own. It owns workflow decomposition, loop control, gate checks, stage routing, and completion discipline so the novel grows from idea to production-ready manuscript through explicit stages.

## Goal

Turn a rough story idea into a complete, expandable, industry-standard novel package through one controlled workflow that:

- captures the story premise and creative constraints,
- expands the idea into structure, characters, and chapters,
- drafts and revises the manuscript in stages,
- enforces continuity and quality review loops,
- and only stops when the acceptance standard is satisfied.

## What This Skill Owns

- Establish and preserve the novel goal contract so "finished" is explicit and reviewable.
- Enforce the canonical lifecycle:
  `intake -> market-positioning -> idea-expansion -> story-architecture -> character-design -> chapter-planning -> scene-design -> drafting -> continuity-review -> structural-revision -> beta-feedback -> line-polish -> copyedit -> proofread -> acceptance-review -> complete`
- Build or recover the active novel project's lifecycle execution path.
- Run the loop orchestrator:
  `observe state -> decide next action -> dispatch one stage -> inspect result -> advance or roll back -> iterate`
- Keep novel decisions, constraints, and progress in repository artifacts instead of chat-only state.
- Preserve consistency across premise, structure, characters, chapters, manuscript, and revision notes.
- Preserve alignment with target market, comparable works, audience expectations, and delivery format.
- Distinguish draft completion from project completion.
- Block premature completion when continuity, structure, or polish quality is still below standard.
- Decide whether the current request is:
  - a new novel project,
  - a continuation of an in-flight novel,
  - a rewrite of an existing manuscript,
  - or a targeted revision pass.
- Route targeted revisions back to the earliest stage that can actually fix the problem.
- Keep the loop alive after drafting, continuity review, and acceptance review until the manuscript passes all gates.

## Built-In Constitution

- Default entrypoint: use this skill as the single workflow entrypoint for novel generation.
- New novel request: always start from `intake`.
- Existing novel request: resume from `docs/novel-projects/<novel-id>/state.json`.
- Never start `drafting` before durable structure, character, chapter, and scene artifacts exist.
- Never skip market positioning for a novel that claims to target an industry-standard lane.
- Never let `line-polish` repair structural failure that should be fixed in `story-architecture`, `character-design`, `chapter-planning`, or `drafting`.
- Never let `copyedit` repair prose problems that require `line-polish`, or structure problems that require earlier stages.
- Never let `proofread` absorb unresolved copyedit-level inconsistency or story-level problems.
- Never treat internal reader simulation alone as sufficient beta feedback for an industry-standard completion claim unless the user explicitly accepts that exception.
- Never declare completion after a first draft alone.
- Never treat word count as proof of quality.
- Never bypass `continuity-review` before `acceptance-review`.
- Never bypass `acceptance-review` before `complete`.
- When a stage exposes an upstream flaw, roll back to the earliest stage that can truly resolve it.
- The main skill owns lifecycle decomposition, progression control, loop state, and stage dispatch.
- Stage subskills own stage-local work only.
- The loop stops only when `acceptance-review` passes and `state.json.loop.state=complete`.

## Preconditions

- Read `references/framework-overview.md` and `references/state-machine.md` before dispatching.
- For existing work, read `docs/novel-projects/<novel-id>/state.json` before choosing a stage.
- For existing work, recover:
  - premise and theme,
  - genre and target readership,
  - character bible,
  - chapter plan,
  - manuscript status,
  - revision and continuity notes,
  - current acceptance gaps.
- For new work, require at minimum a seed idea from the user.
- Acceptable minimum inputs include:
  - one-sentence premise,
  - a scene idea,
  - a character concept,
  - a "what if" question,
  - a genre + hook combination.

## Dispatch Model

Follow this order:

1. Classify whether the request is a new novel, continuation, rewrite, or revision.
2. For a new novel, route to `intake`.
3. For an in-flight novel, recover `state.json`, current stage, and loop state before dispatch.
4. Build or recover the lifecycle path:
   `intake -> market-positioning -> idea-expansion -> story-architecture -> character-design -> chapter-planning -> scene-design -> drafting -> continuity-review -> structural-revision -> beta-feedback -> line-polish -> copyedit -> proofread -> acceptance-review -> complete`
5. Load only the subskill for the current stage.
6. After each stage, decide whether the project should:
   - advance,
   - remain in the same stage for another pass,
   - or roll back to an upstream stage.
7. Continue looping until the project reaches `complete` or an actual external blocker requires user input.

This workflow must be executed strictly in lifecycle order unless rollback rules require moving upstream.

## Goal Contract

Every novel project must have an explicit goal contract.

Goal rules:

- Capture the initial goal in `request.md` during intake.
- Refine that goal into observable acceptance criteria in `artifacts/acceptance-standard.md`.
- Keep the goal contract aligned with:
  - market lane and comparable titles,
  - target length strategy,
  - intended audience,
  - emotional promise,
  - structural promise,
  - ending promise.
- If the user asks for "a good novel" or "industry standard", translate that into concrete acceptance conditions before heavy drafting starts.
- The loop exists to converge on the goal contract; the loop itself is not the goal.

## Loop Orchestration Model

The main skill runs one explicit control loop for the novel project.

1. Observe: read `state.json`, current artifacts, manuscript status, stage outputs, and blockers.
2. Decide: choose exactly one next action from `dispatch_stage`, `recover_stage`, `request_input`, `wait_external`, or `complete`.
3. Dispatch: load only the subskill that matches the current stage.
4. Observe result: verify the stage exit criteria and identify whether the project advances or rolls back.
5. Iterate: update `state.json.loop` and begin the next cycle.

Loop rules:

- Process only one current action per loop iteration.
- After `drafting`, always continue to `continuity-review`.
- If `continuity-review` fails, roll back to the earliest failing upstream stage:
  - continuity bug only: `drafting`
  - scene progression or POV break: `scene-design`
  - chapter causality issue: `chapter-planning`
  - broken character motivation: `character-design`
  - broken major turning point: `story-architecture`
- After `structural-revision`, continue to `beta-feedback` only when structure is stable.
- If `beta-feedback` finds boredom, confusion, tonal mismatch, or weak emotional payoff, roll back to `structural-revision`, `scene-design`, `chapter-planning`, or `drafting` based on the diagnosed root cause, never to `beta-feedback` itself as the repair stage.
- After `beta-feedback`, continue to `line-polish` only when story-level blockers are cleared.
- After `line-polish`, continue to `copyedit`.
- After `copyedit`, continue to `proofread`.
- After `acceptance-review`, if any blocker remains, roll back to the earliest stage that can fix it and continue the same loop.
- Do not stop at "usable". Stop only at "accepted".

## Novel Workspace Contract

Each active novel project must use:

`docs/novel-projects/<novel-id>/`

Expected artifacts include:

- `request.md`
- `state.json`
- `artifacts/story-premise.md`
- `artifacts/genre-and-readership.md`
- `artifacts/theme-and-promise.md`
- `artifacts/market-positioning.md`
- `artifacts/style-sheet.md`
- `artifacts/character-bible.md`
- `artifacts/story-architecture.md`
- `artifacts/chapter-plan.md`
- `artifacts/scene-cards.md`
- `artifacts/continuity-ledger.md`
- `artifacts/revision-log.md`
- `artifacts/beta-feedback.md`
- `artifacts/copyedit-log.md`
- `artifacts/proofread-log.md`
- `artifacts/acceptance-standard.md`
- `manuscript/outline.md`
- `manuscript/chapters/`
- `manuscript/full-draft.md`

Subskills may add more artifacts, but they must preserve this core workspace contract.

## Orchestration Rules

- Treat the user's rough idea as seed input, not as a complete specification.
- Expand vague ideas into premise, conflict, and narrative promise before architecture work.
- Lock the market lane, format, and comparable-work expectations before claiming industry-standard output.
- Lock platform, update cadence, length band, age band, content limits, and hook density expectations before architecture is treated as stable.
- Treat architecture, character design, and chapter planning as mandatory upstream inputs to serious drafting.
- Treat scene design as the mandatory bridge between chapter planning and drafting for long-form work.
- Keep story logic, emotional logic, and continuity logic explicit in artifacts rather than implicit in chat.
- If the user only wants a sample chapter, still create enough upstream structure to prevent generic or contradictory output.
- If the user wants a long novel, default to staged expansion:
  concept -> market lane -> outline -> scene cards -> sample chapters -> rolling chapter batches -> full-draft consolidation -> revision -> beta feedback -> line edit -> copyedit -> proofread -> acceptance.
- Preserve a continuity ledger once drafting starts.
- Preserve a revision log once any review stage begins.
- Preserve a market-positioning artifact once `market-positioning` completes.
- Preserve a style sheet once market and naming conventions stabilize.
- Preserve a scene-card artifact once `scene-design` completes.
- Do not let style polish invent plot logic that the manuscript has not earned.
- Do not treat internal self-review as a substitute for reader-simulation or beta-style feedback.
- Treat reader simulation as a fallback signal only; for industry-standard completion claims, require at least one external feedback source unless the user explicitly accepts a simulation-only workflow.
- Do not let acceptance-review become a generic compliment pass; it must state pass/fail against the acceptance standard.

## Completion Standard

The novel project may reach `complete` only when:

- the core premise is clear and reproducible in one sentence,
- the market lane and comparable-work expectations are explicit,
- target genre and readership are explicit,
- the protagonist arc is coherent,
- the main conflict escalates and resolves,
- structure is closed,
- chapter flow is purposeful,
- scene flow preserves POV, tension, and chapter hooks,
- major foreshadowing has payoff or intentional deferral,
- continuity is internally consistent,
- prose quality matches the intended market level,
- beta-style reader objections have been addressed or consciously accepted,
- at least one external beta-style feedback source has informed the revision loop, unless a simulation-only exception is explicitly recorded,
- copyediting issues are below blocker threshold,
- proofread-level defects are below blocker threshold,
- and `acceptance-review` explicitly records pass.
