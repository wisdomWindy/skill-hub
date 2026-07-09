# 请求标识

- request_id: use-real-skill-data-directory
- 来源: 用户在 Codex 中直接提出“不要直接使用 .agents/skills/**/SKILL.md 作为数据目录，在项目中单独创建一个目录存储 skill 数据”；随后补充“_data\real-skills 中的 skill，能不能保持原 skill 的目录结构”和“把主 skill 的安装命令改成指向整个目录”；本次追加要求“不要给 subskill 中的 skill 写 yml，只给 skills 中的一级子目录中的 skill 写 yml，同时复制安装命令后执行安装命令如果 skill 有 subskill，也要一起安装，且保持 skill 目录结构不变”

# 业务摘要

上一轮实现中前端运行时直接 glob `.agents/skills/**/SKILL.md`。本次需要把真实 skill 数据同步到项目自己的数据目录，并让前端只从该目录读取数据。需求变更后，数据目录只为 `.agents/skills/<skill>/SKILL.md` 这类一级 skill 生成 YAML，不再为 `.agents/skills/<skill>/subskills/**/SKILL.md` 生成独立 YAML；安装命令仍指向完整一级 skill 目录，以便安装时携带该目录下的 `subskills/` 并保持目录结构。

# 目标声明

创建 `_data/real-skills/` 存储真实 skill 数据；前端加载器只读取 `_data/real-skills/**/SKILL.yaml`，不再直接读取 `.agents/skills/**/SKILL.md`。生成后的数据只覆盖 `.agents/skills` 下一级子目录中的主 `SKILL.md`，例如 `.agents/skills/frontend-agent-framework/SKILL.md` 对应 `_data/real-skills/frontend-agent-framework/SKILL.yaml`。不再生成 `_data/real-skills/<skill>/subskills/**/SKILL.yaml`。每个主 skill 的安装命令指向 `.agents/skills/<skill>` 目录，以便复制安装命令执行后将该目录整体安装，包含其中 `subskills/` 且不改变目录结构。

# 初始完成信号

- `_data/real-skills/` 下只存在与 `.agents/skills` 一级子目录数量一致的真实 skill YAML 数据。
- `_data/real-skills/` 只保留一级 skill 记录目录，例如 `_data/real-skills/frontend-agent-framework/SKILL.yaml`。
- `_data/real-skills/` 下不存在任何 `subskills/**/SKILL.yaml`。
- 主 skill 的 `installCommand` 指向 `.agents/skills/<skill-name>` 目录。
- 安装命令以目录为安装目标；如果该目录包含 `subskills/`，执行安装时会随主 skill 目录一起安装并保持结构。
- `src/content/skills/load-skill-records.ts` 只读取 `_data/real-skills/**/SKILL.yaml`。
- `src` 中不再出现 `.agents/skills` 或 `SKILL.md` 数据 glob。
- 测试、类型检查、构建通过。

# 影响范围

- `_data/real-skills/**/SKILL.yaml`
- `scripts/generate-real-skill-data.mjs`
- `src/content/skills/load-skill-records.ts`
- `src/content/skills/load-skill-records.test.ts`
