# 交付单元标识

- request_id: remove-placeholder-skills
- module_id: module-01-remove-placeholder-source

# 背景与目标

用户要求删除占位 skill 数据，只保留真实 skill 数据。当前真实数据源为 `.agents/skills/**/SKILL.md`，占位数据源为 `_data/skills/*.yaml`。

# 范围内

- 删除 `_data/skills` 下四个占位 YAML 文件。
- 移除 `loadSkillRecords()` 对 `_data/skills/*.yaml` 的读取。
- 更新测试，确认返回记录全部来自 agent skill。

# 范围外

- 不删除 `_data/config.yaml`。
- 不修改 `.agents/skills` 原文件。
- 不改变页面布局。

# 验收标准

- `loadSkillRecords()` 返回数量等于 `.agents/skills/**/SKILL.md` 数量。
- 所有返回记录 id 都以 `agent-` 开头。
- `npm run test` 通过。
- `npm run typecheck` 通过。
- `npm run build` 通过。
