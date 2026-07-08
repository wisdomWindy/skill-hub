# 请求标识

- request_id: remove-placeholder-skills
- 来源: 用户在 Codex 中直接提出“把占位 skill 数据删除，只保留真实 skill 数据”

# 业务摘要

当前项目仍保留 `_data/skills/*.yaml` 示例占位技能。上一轮已将 `.agents/skills/**/SKILL.md` 接入技能列表，本次需要删除占位 YAML 数据，并让列表只来自真实本地 skill。

# 目标声明

技能列表中不再出现 `code-reviewer`、`deploy-watch`、`pdf-parser`、`secret-scanner` 等占位示例技能，只保留 `.agents/skills/**/SKILL.md` 生成的真实 skill。

# 初始完成信号

- `_data/skills` 下占位 YAML 被删除。
- `loadSkillRecords()` 只从 `.agents/skills/**/SKILL.md` 生成记录。
- 测试覆盖“只包含 agent skill”。
- 测试、类型检查、构建通过。

# 影响范围

- `_data/skills/*.yaml`
- `src/content/skills/load-skill-records.ts`
- `src/content/skills/load-skill-records.test.ts`
