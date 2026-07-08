# Review

## 结论

通过。实现满足“项目内独立真实 skill 数据目录”和“保留原 skill 目录结构”的要求。

## 检查点

- 前端运行时只读取 `_data/real-skills/**/SKILL.yaml`。
- `_data/real-skills` 是同步后的快照；如果 `.agents/skills` 后续变化，需要重新运行 `rtk node scripts/generate-real-skill-data.mjs` 更新数据。
- 生成脚本保留源路径层级，避免将所有 skill 扁平化到同一目录。
- 测试覆盖了顶层 skill 与 subskill 的代表性路径。

## 剩余风险

- `installCommand` 和详情描述仍保留原 `.agents/skills/.../SKILL.md` 来源路径，用于说明数据来源；这不是运行时数据 glob。
