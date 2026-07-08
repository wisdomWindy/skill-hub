# 请求标识

- request_id: use-real-skill-data-directory
- 来源: 用户在 Codex 中直接提出“不要直接使用 .agents/skills/**/SKILL.md 作为数据目录，在项目中单独创建一个目录存储 skill 数据”；随后补充“_data\real-skills 中的 skill，能不能保持原 skill 的目录结构”

# 业务摘要

上一轮实现中前端运行时直接 glob `.agents/skills/**/SKILL.md`。本次需要把真实 skill 数据同步到项目自己的数据目录，并让前端只从该目录读取数据；数据目录还需要保留原 `.agents/skills` 的层级结构。

# 目标声明

创建 `_data/real-skills/` 存储真实 skill 数据；前端加载器只读取 `_data/real-skills/**/SKILL.yaml`，不再直接读取 `.agents/skills/**/SKILL.md`。生成后的数据路径保持源 skill 的相对目录结构，例如 `.agents/skills/frontend-agent-framework/subskills/verify/SKILL.md` 对应 `_data/real-skills/frontend-agent-framework/subskills/verify/SKILL.yaml`。

# 初始完成信号

- `_data/real-skills/` 下存在 40 条真实 skill YAML 数据。
- `_data/real-skills/` 保留原 `.agents/skills` 的目录结构。
- `src/content/skills/load-skill-records.ts` 只读取 `_data/real-skills/**/SKILL.yaml`。
- `src` 中不再出现 `.agents/skills` 或 `SKILL.md` 数据 glob。
- 测试、类型检查、构建通过。

# 影响范围

- `_data/real-skills/**/SKILL.yaml`
- `scripts/generate-real-skill-data.mjs`
- `src/content/skills/load-skill-records.ts`
- `src/content/skills/load-skill-records.test.ts`
