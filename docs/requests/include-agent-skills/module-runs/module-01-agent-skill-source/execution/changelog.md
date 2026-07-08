# 执行记录

# 已完成变更

- 在 `loadSkillRecords()` 中保留原 `_data/skills/*.yaml` 数据源。
- 新增 `.agents/skills/**/SKILL.md` 递归数据源。
- 将每个本地 `SKILL.md` 转换为 `SkillRecord`：
  - id 使用 `agent-` 前缀和路径片段生成。
  - subskill id 去掉 `subskills` 路径片段。
  - 展示名称、简介、详情、标签均生成中文。
  - 状态统一为 `published`。
  - 详情中记录本地来源路径和触发提示。
- 增加单元测试，断言当前 40 个本地 agent skill 均被纳入。

# 保留不变

- `_data/skills` 示例技能仍然保留。
- 页面、查询、路由调用方仍使用 `loadSkillRecords()`。
- 不修改 `.agents/skills` 原文件。

# TDD 记录

先补充 `loadSkillRecords()` 行为测试，再实现本地 agent skill 数据源转换；针对测试已通过。
