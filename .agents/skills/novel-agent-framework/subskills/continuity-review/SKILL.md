---
name: novel-agent-framework-continuity-review
description: Stage subskill for continuity review. Check timeline, character logic, setting consistency, and payoff integrity after drafting.
---

# Continuity Review Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `continuity-review` 阶段时使用。

## 必要输入

- `artifacts/character-bible.md`
- `artifacts/chapter-plan.md`
- `artifacts/continuity-ledger.md`
- `artifacts/accepted-risks.md`（如存在）
- `manuscript/full-draft.md`
- `state.json`

## 执行步骤

1. 检查：
   - 时间线
   - 地点与世界设定
   - 人物动机
   - POV 稳定性
   - 视角泄漏或不当切换
   - 伏笔与回收
   - 前后矛盾
2. 将结果写入 `artifacts/continuity-ledger.md` 和 `artifacts/revision-log.md`。
3. 把问题分成：
   - draft-level issues
   - chapter-plan issues
   - character issues
   - architecture issues
4. 只要存在 blocker，就建议主 skill 回退到最早可修复阶段。
5. 若建议将 blocker 降级为 accepted risk，只能记录为 candidate；必须由用户明确批准并写入 `artifacts/accepted-risks.md` 后才可放行。
6. 通过时把 `state.json.stage` 推进到 `structural-revision`。

## 输出格式

- 必须产出：
  - 更新后的 `artifacts/continuity-ledger.md`
  - `artifacts/revision-log.md`

## 验收标准

- `artifacts/continuity-ledger.md` 已显式覆盖至少以下核心维度：
  - 时间线
  - POV 稳定性
  - 人物动机连续性
  - 物品持有与状态变化
  - 伤势、疤痕、关系温度等 continuity-sensitive attributes
  - 伏笔布置与回收状态
- 已识别主要连续性问题并按严重级别分类，而不是只做笼统备注。
- 所有 continuity blocker 都已清零；若被降级为 accepted risk，必须已在 `artifacts/accepted-risks.md` 中记录用户批准、影响范围、原因和后续处理。
- 已给出明确回退建议或放行结论，且放行结论能支持进入 `structural-revision` 而不会把明显连续性问题带入下游。

## 安全边界

- 不能把明显结构问题伪装成小修小补。
- 不能在未记录问题的情况下直接放行。
