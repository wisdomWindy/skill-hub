---
name: novel-agent-framework-drafting
description: Stage subskill for drafting. Generate sample chapters and manuscript batches while preserving structure, character logic, and continuity.
---

# Drafting Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `drafting` 阶段时使用。

## 必要输入

- `artifacts/story-premise.md`
- `artifacts/theme-and-promise.md`
- `artifacts/market-positioning.md`
- `artifacts/style-sheet.md`
- `artifacts/character-bible.md`
- `artifacts/chapter-plan.md`
- `artifacts/scene-cards.md`
- `artifacts/continuity-ledger.md`（如存在）
- `manuscript/outline.md`
- `state.json`

## 执行步骤

1. 先读既有结构、人物、市场、文体与连续性约束。
2. 默认按阶段扩写：
   - 先生成样章
   - 再分批扩写章节
   - 再合并到 `manuscript/full-draft.md`
3. 每章写作必须继承：
   - 平台与交付形态约束
   - 目标章节长度带
   - 目标钩子密度与高潮频率
   - 当前章节目标
   - 当前场景目标
   - POV 角色与叙事距离
   - 人物动机
   - 已知设定
   - style-sheet 中的命名、称谓、标点与文体规则
   - 已埋伏笔
   - 章末钩子要求
4. 如市场定位与当前起稿方式冲突，先回退修订，不要硬写成与目标形态不匹配的正文。
5. 写完后更新：
   - `manuscript/chapters/`
   - `manuscript/full-draft.md`
   - `artifacts/continuity-ledger.md`
6. 本阶段结束后，强制推进到 `continuity-review`。

## 输出格式

- 必须产出：
  - `manuscript/chapters/` 下的新增或更新章节
  - `manuscript/full-draft.md`
  - 更新后的 `artifacts/continuity-ledger.md`

## 验收标准

- 本轮应交付的章节范围已被实际写成可审阅正文，而不是只有片段、摘要或待补占位。
- 新写章节已兑现对应 chapter plan 与 scene cards 的核心目标、冲突推进、POV 约束与章末钩子要求，而不是只保留大意一致。
- 新写章节与 `market-positioning.md`、`style-sheet.md` 的平台节奏、章节长度带、命名规范、文体与读者承诺保持一致。
- 人物口吻、动机、关系温度与既有设定未发生未记录漂移。
- `artifacts/continuity-ledger.md` 已更新到足以支持下一轮 continuity review 的粒度，而不是只记笼统备注。
- 本轮残留的 drafting blocker、待补桥段、需上游回退的问题已被显式记录；未记录的问题不得默认为已解决。

## 安全边界

- 不能脱离章节规划自由漂移主线。
- 不能跳过 scene-level 约束直接流水账扩写。
- 不能无视平台节奏、章节长度带、钩子密度和 style-sheet 约束写成另一种作品。
- 不能为了“好看”改掉已固定的重要设定而不记录。
