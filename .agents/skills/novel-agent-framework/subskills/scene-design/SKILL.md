---
name: novel-agent-framework-scene-design
description: Stage subskill for scene design. Turn chapter plans into scene cards with POV, scene goals, reversals, and chapter-hook control before drafting.
---

# Scene Design Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `scene-design` 阶段时使用。

## 必要输入

- `artifacts/chapter-plan.md`
- `artifacts/character-bible.md`
- `artifacts/story-architecture.md`
- `state.json`

## 执行步骤

1. 先读：
   - `../../references/templates/scene-cards.md`
2. 将每章拆成 scene cards。
3. 每个场景至少定义：
   - POV 角色
   - 场景目标
   - 冲突来源
   - stakes
   - obstacle
   - 信息揭示
   - scene outcome
   - value shift
   - disaster / reveal / reversal
   - sequel function（决策、反应或转场意义）
   - exposition load
   - 情绪转折
   - 出场/退场状态变化
   - 与下一场景的因果连接
4. 为每章明确：
   - 开章切入点
   - 章内升级点
   - 章末钩子或悬念
5. 按模板结构写入 `artifacts/scene-cards.md`。
6. 若发现章节层规划仍过粗，回退并修订 `chapter-plan.md`。
7. 通过时把 `state.json.stage` 推进到 `drafting`。

## 输出格式

- 必须产出：
  - `artifacts/scene-cards.md`

## 验收标准

- 每章已经细化到可稳定起稿的场景级。
- POV、冲突、value shift、转折、章末钩子都有明确设计。
- 场景之间具备因果衔接。
- 每个场景都能说明自己为何存在，而不只是承载信息。
- `scene-cards.md` 已按模板完整覆盖章节与场景字段。

## 安全边界

- 不能把 scene cards 写成摘要式流水账。
- 不能忽略 POV 和情绪转折设计。
- 不能缺失 stakes / obstacle 这些决定场景张力的字段。
- 不能缺失 outcome / value shift / sequel function 这些会直接影响戏剧密度的字段。
