# Review

## 结论

通过。实现满足“项目内独立真实 skill 数据目录”和“保留原 skill 目录结构”的要求。

## 检查点

- 前端运行时只读取 `_data/real-skills/**/SKILL.yaml`。
- `_data/real-skills` 是同步后的快照；如果 `.agents/skills` 后续变化，需要重新运行 `rtk node scripts/generate-real-skill-data.mjs` 更新数据。
- 生成脚本保留源路径层级，避免将所有 skill 扁平化到同一目录。
- 主 skill 的安装命令指向整个目录，因此安装端按目录复制时会包含 `subskills/`。
- subskill 的安装命令仍指向对应 `SKILL.md`，便于单独安装或查看某个子技能。
- 测试覆盖了顶层 skill 与 subskill 的代表性路径。

## 剩余风险

- 是否递归安装 `subskills/` 仍取决于安装端对目录安装的支持；本项目现在提供的是完整目录路径。
