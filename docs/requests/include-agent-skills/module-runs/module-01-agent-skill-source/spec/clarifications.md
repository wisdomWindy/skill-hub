# 问题

`.agents/skills` 下是否只包含顶层 skill，还是也包含 subskills？

# 回答

按用户“都作为 skill 列表中的 skill”的措辞，递归包含所有 `SKILL.md`，包括 subskills。

# 最终决策

使用 `.agents/skills/**/SKILL.md` 作为数据源。

# 影响规格区域

- 范围内
- 功能完整行为拆解
- 验收标准
