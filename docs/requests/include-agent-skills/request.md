# 请求标识

- request_id: include-agent-skills
- 来源: 用户在 Codex 中直接提出“把 .agents\\skills 中的 skill 都作为 skill 列表中的 skill”

# 业务摘要

当前技能列表只读取 `_data/skills/*.yaml`。需要把仓库本地 `.agents/skills/**/SKILL.md` 中的所有 skill 也纳入同一技能列表，并能生成详情页。

# 目标声明

技能目录同时展示示例 YAML 技能和 `.agents/skills` 下递归发现的本地 skill。新增本地 skill 后，只要存在 `SKILL.md`，就能自动进入列表。

# 初始完成信号

- `loadSkillRecords()` 返回 `_data/skills` 与 `.agents/skills/**/SKILL.md` 转换后的记录。
- 本地 agent skill 均为 `published`，可在列表和详情页访问。
- 相关测试覆盖递归发现行为。
- 测试、类型检查、构建通过。

# 触发条件

用户明确要求把 `.agents\skills` 中的 skill 都作为列表 skill。

# 初始上下文来源

- `src/content/skills/load-skill-records.ts`
- `.agents/skills/**/SKILL.md`
- `src/types/content.ts`
- `src/features/skills/queries/skill-queries.ts`
- `src/content/skills/load-skill-records.test.ts`

# 人工交接点

交付时说明 `.agents/skills` 当前发现数量、映射规则和验证结果。

# 影响范围

- 技能数据加载
- 静态详情路由生成
- 技能列表与详情展示数据
- 单元测试

# 参与模块

- module-01-agent-skill-source
