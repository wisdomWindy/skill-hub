# 执行记录

- 新增 `scripts/generate-real-skill-data.mjs`，用于从 `.agents/skills` 同步生成项目内真实 skill 数据。
- 运行脚本生成 `_data/real-skills/*.yaml`，共 40 条记录。
- 重写 `src/content/skills/load-skill-records.ts`，只读取 `_data/real-skills/*.yaml`。
- 更新 `src/content/skills/load-skill-records.test.ts`，验证项目真实数据目录是唯一 skill 记录来源。
- 更新 `src/content/adapters/skill-adapter.test.ts` 中的 fixture 路径，避免测试语义继续指向 `.agents`。
