---
name: novel-agent-framework-character-design
description: Stage subskill for character design. Build the protagonist arc, supporting cast logic, and relationship tension that drive the novel.
---

# Character Design Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `character-design` 阶段时使用。

## 必要输入

- `artifacts/story-premise.md`
- `artifacts/theme-and-promise.md`
- `artifacts/story-architecture.md`
- `state.json`

## 执行步骤

1. 为主角和关键配角设计：
   - 欲望
   - 恐惧
   - 创伤或盲点
   - 关系张力
   - 外在目标
   - 内在弧光
   - 角色在题材中的功能位
   - 对标作品里常见原型的继承与偏离
2. 写入 `artifacts/character-bible.md`。
3. 检查人物是否真的推动结构，而不是被情节拖行。
4. 如果关键人物动机不成立，记录并回退前提。
5. 通过时把 `state.json.stage` 推进到 `chapter-planning`。

## 输出格式

- 必须产出：
  - `artifacts/character-bible.md`

## 验收标准

- 主角的欲望、阻碍、盲点、外在目标与内在弧线已形成可执行的人物驱动逻辑，而不只是人设标签。
- 关键人物关系不只是“有张力”，还已明确各自如何制造冲突、施压、诱导选择或改变主角路径。
- 主要角色都具备清晰功能位，并能映射到具体结构节点或章节任务，不存在只占篇幅但不改动主线的装饰性关键角色。
- 人物弧线与结构节点的对齐关系已显式写明，能解释角色为什么会在对应节点做出对应选择。
- 不存在需要靠“角色突然想通了”或“为了剧情需要”才能成立的主要行为转折。
- `character-bible.md` 已足以支撑章节规划与起稿，不再依赖聊天补全核心人物动机。

## 安全边界

- 不能产出只有人设标签、没有驱动力的人物卡。
- 不能让人物行为只为配合剧情硬转弯。
