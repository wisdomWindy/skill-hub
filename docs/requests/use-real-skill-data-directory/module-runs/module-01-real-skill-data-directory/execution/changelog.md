# 变更记录

- 新增 `scripts/generate-real-skill-data.mjs`，用于从 `.agents/skills` 同步生成项目内真实 skill 数据。
- 生成脚本会清理并重建 `_data/real-skills/`，再按源 skill 相对路径写入 `SKILL.yaml`。
- 生成脚本会为主 skill 写入目录安装命令，为 subskill 写入单文件安装命令。
- 运行脚本生成 `_data/real-skills/**/SKILL.yaml`，共 40 条记录。
- 重写 `src/content/skills/load-skill-records.ts`，只读取 `_data/real-skills/**/SKILL.yaml`。
- 更新 `src/content/skills/load-skill-records.test.ts`，覆盖真实数据数量、分类合法性、发布状态、嵌套目录结构和安装命令路径规则。
