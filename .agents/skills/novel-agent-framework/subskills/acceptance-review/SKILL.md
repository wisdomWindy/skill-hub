---
name: novel-agent-framework-acceptance-review
description: Stage subskill for acceptance review. Judge whether the novel package is complete, coherent, market-aligned, and ready to exit the loop.
---

# Acceptance Review Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `acceptance-review` 阶段时使用。

## 必要输入

- `artifacts/acceptance-standard.md`
- `artifacts/story-premise.md`
- `artifacts/character-bible.md`
- `artifacts/story-architecture.md`
- `artifacts/chapter-plan.md`
- `artifacts/continuity-ledger.md`
- `artifacts/revision-log.md`
- `artifacts/market-positioning.md`
- `artifacts/beta-feedback.md`
- `artifacts/style-sheet.md`
- `artifacts/copyedit-log.md`
- `artifacts/proofread-log.md`
- `manuscript/full-draft.md`
- `state.json`

## 执行步骤

1. 对照 `artifacts/acceptance-standard.md` 做最终审查。
2. 至少检查：
    - market-positioning fidelity
   - premise clarity
   - protagonist arc closure
   - conflict escalation and payoff
   - chapter usefulness
   - scene tension and chapter-hook effectiveness
   - continuity consistency
   - ending satisfaction
   - prose suitability for target readership
    - beta feedback closure
    - external beta-source requirement or approved exception
    - style-sheet consistency
   - copyedit cleanliness
    - proofread cleanliness
3. 产出 `artifacts/acceptance-review.md`，并按“标准项 -> 证据 -> 结论”结构逐条映射最终验收。
4. 每个关键验收项至少给出：
   - 检查项名称
   - 证据来源工件
   - 证据摘要
   - pass / fail / accepted risk
5. 将结论分成：
   - pass
   - blocking issues
   - accepted risks
   - recommended rollback stage
6. 只有全部 blocker 清零时，才允许主 skill 进入 `complete`。
7. 如未通过，要求主 skill 回退到最早可修复阶段并继续 loop。

## 输出格式

- 必须产出：
  - `artifacts/acceptance-review.md`

## 验收标准

- 已按 acceptance standard 做显式 pass/fail 判断。
- 关键验收项已逐条给出证据来源与结论，不存在只给总评不给证据的情况。
- 已给出明确 blocker 与回退阶段。
- 通过时，可直接支持主 skill 标记 `complete`。
- 已明确说明作品是否兑现了既定市场与读者承诺。
- 已明确说明 beta 阶段是否满足外部反馈 gate，或记录了用户批准的例外。

## 安全边界

- 不能用模糊夸奖代替验收。
- 不能在 blocker 未清零时放行 complete。
