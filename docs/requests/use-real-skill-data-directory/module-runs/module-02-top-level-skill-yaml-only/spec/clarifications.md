# 问题

- 是否需要为 `subskills` 下的 `SKILL.md` 生成独立 YAML？

# 回答

- 不需要。用户明确要求不要给 subskill 中的 skill 写 YAML，只给 `.agents/skills` 一级子目录中的 skill 写 YAML。

# 最终决策

- `_data/real-skills` 只生成 `_data/real-skills/<skill>/SKILL.yaml`。
- 安装命令指向 `.agents/skills/<skill>` 目录，目录复制安装时包含 `subskills/` 并保持结构。

# 影响的 spec 区域

- 一级 skill YAML 生成。
- 安装命令语义。
- 内容加载契约。
