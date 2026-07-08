---
name: novel-agent-framework-chapter-planning
description: Stage subskill for chapter planning. Convert structure and character logic into chapter-by-chapter progression and payoff planning.
---

# Chapter Planning Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `chapter-planning` 阶段时使用。

## 必要输入

- `artifacts/story-architecture.md`
- `artifacts/character-bible.md`
- `state.json`

## 执行步骤

1. 按结构与篇幅策略拆分章节。
2. 为每章定义：
   - 章节目标
   - 核心事件
   - 冲突或信息推进
   - 人物关系变化
   - 伏笔布置或回收
   - 章末钩子
   - 章节在目标市场中的阅读功能
3. 写入 `artifacts/chapter-plan.md`。
4. 生成 `manuscript/outline.md`。
5. 若章节存在空转、重复功能或因果断裂，修订后再推进。
6. 通过时把 `state.json.stage` 推进到 `scene-design`。

## 输出格式

- 必须产出：
  - `artifacts/chapter-plan.md`
  - `manuscript/outline.md`

## 验收标准

- 每章都具备明确且不可随意替换的章节功能，不存在空转章、重复功能章或只搬运信息的过渡章。
- 主线、关键副线、人物关系变化与伏笔/回收已映射到具体章节，而不是停留在笼统说明。
- 章节顺序具备明确因果连续性；删掉、调换或合并任一关键章节时，应能说明其影响而不是“好像也行”。
- 关键结构 beat、人物转折与情绪升级已被分配到对应章节，不存在重要节点无落点的情况。
- 章末钩子与阅读驱动力已显式设计，并与目标市场的更新节奏、章节长度和留存预期相容。
- `chapter-plan.md` 与 `manuscript/outline.md` 已达到可继续拆到 scene cards 的稳定度，而不是仍需重新发明章节功能。

## 安全边界

- 不能把“会发生一些事”当作章节规划。
- 不能省略关键转折的铺垫与回收设计。
