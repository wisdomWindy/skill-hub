# 交付单元标识

- request_id: use-real-skill-data-directory
- module_id: module-01-real-skill-data-directory

# 背景与目标

用户要求不要直接使用 `.agents/skills/**/SKILL.md` 作为前端数据目录。目标是让项目拥有独立的真实 skill 数据目录，并让页面只读取该目录。用户进一步要求 `_data/real-skills` 中的 skill 保持原 skill 的目录结构。

# 范围内

- 新增并维护 `_data/real-skills/` 数据目录。
- 新增同步脚本 `scripts/generate-real-skill-data.mjs`。
- 将 40 个真实 skill 记录生成到 `_data/real-skills/**/SKILL.yaml`。
- 生成路径保留 `.agents/skills` 下的相对目录结构。
- 修改加载器和测试只读取 `_data/real-skills/**/SKILL.yaml`。

# 范围外

- 不改变页面布局。
- 不修改 `.agents/skills` 原文件。
- 不恢复占位 skill YAML。

# 验收标准

- `_data/real-skills/**/SKILL.yaml` 数量为 40。
- `_data/real-skills/frontend-agent-framework/SKILL.yaml` 存在。
- `_data/real-skills/frontend-agent-framework/subskills/verify/SKILL.yaml` 存在。
- 前端源码不直接引用 `.agents/skills` 或 `SKILL.md` 数据目录。
- `npm run test` 通过。
- `npm run typecheck` 通过。
- `npm run build` 通过。
