---
name: novel-agent-framework-structural-revision
description: Stage subskill for structural revision. Repair pacing, escalation, chapter function, and major story-shape issues before prose polish.
---

# Structural Revision Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `structural-revision` 阶段时使用。

## 必要输入

- `artifacts/story-architecture.md`
- `artifacts/chapter-plan.md`
- `artifacts/revision-log.md`
- `artifacts/beta-feedback.md`（如存在）
- `manuscript/full-draft.md`
- `state.json`

## 执行步骤

1. 先读结构与修订记录。
2. 宏观检查：
   - 开头钩子
   - 中段升级
   - 高潮兑现
   - 节奏拖沓
   - 支线必要性
   - 读者疲劳点
   - 情绪兑现密度
3. 对需要删除、合并、重排、补桥的内容做出明确修订建议。
4. 若修订影响章节顺序或大节点，回写 `artifacts/chapter-plan.md` 与必要的上游工件。
5. 通过时把 `state.json.stage` 推进到 `beta-feedback`，不得跳过读者反馈 gate。

## 输出格式

- 必须产出：
  - 更新后的 `artifacts/revision-log.md`
  - 需要时更新 `artifacts/chapter-plan.md`
  - 需要时更新 `artifacts/story-architecture.md`

## 验收标准

- 关键结构性问题不只是“有处理路径”，而是已经被吸收到修订后的结构工件或正文中。
- `artifacts/story-architecture.md`、`artifacts/chapter-plan.md`、`artifacts/revision-log.md` 与当前正文保持一致，不存在结构层面的明显漂移。
- 节奏、转折、中段升级、高潮兑现与结尾回收已达到可进入 `beta-feedback` 的稳定状态。
- beta 反馈中的故事级 blocker 已被吸收、关闭，或被明确反驳并记录依据。
- 不再存在阻止进入 `beta-feedback` 的结构 blocker。

## 安全边界

- 不能只改字句就宣称结构已修复。
- 不能保留无功能章节而不记录风险。
