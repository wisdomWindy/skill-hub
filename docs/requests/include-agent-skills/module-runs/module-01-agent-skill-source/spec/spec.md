# 交付单元标识

- request_id: include-agent-skills
- module_id: module-01-agent-skill-source

# 背景与目标

技能目录目前只展示 `_data/skills` 中的示例技能。用户要求 `.agents/skills` 中的 skill 也进入技能列表。目标是新增一个本地 agent skill 数据源，并与现有查询、路由和展示链路兼容。

# 范围内

- 递归读取 `.agents/skills/**/SKILL.md`。
- 将每个 `SKILL.md` 转成 `SkillRecord`。
- 顶层 skill 和 subskill 都进入列表。
- 为本地 skill 生成中文名称、中文简介、中文详情、标签、版本、时间和本地路径说明。
- 增加测试覆盖本地 agent skill 数据源。

# 范围外

- 不复制 `.agents/skills` 内容到 `_data/skills`。
- 不改技能详情页布局。
- 不改 `.agents/skills` 原文件内容。
- 不实现运行或安装本地 skill 的真实命令。

# 触发与开始条件

用户直接提出需求，当前指令视为 spec 和 plan 的执行授权。

# 需求拆分摘要

单模块：接入 `.agents/skills` 数据源。

# 用户流程

用户打开技能目录时，可以看到 `_data` 示例技能和 `.agents/skills` 里的本地技能；点击本地技能卡片可进入详情页，看到来源路径、用途说明和使用提示。

# 页面与模块设计

不改变页面结构。只扩展 `loadSkillRecords()` 的数据来源。

# 功能完整行为拆解

- 数据发现：通过 Vite glob 递归发现 `.agents/skills/**/SKILL.md`。
- 元数据读取：解析 frontmatter 的 `name`，用于生成稳定触发名和路径信息；展示标题用中文映射。
- id 生成：使用 `agent-` 前缀和路径片段，避免与 YAML 示例技能冲突。
- 分类：前端/后端/skill-generator 归入 `devtools`，小说工作流归入 `other`。
- 状态：本地 agent skill 全部标记为 `published`。
- 详情：生成中文 Markdown 说明，不直接展示英文或乱码正文。

# 设计约束

- 不引入新依赖。
- 不破坏现有 YAML skill。
- 新数据源必须在测试、构建和 SSG 静态路由中可用。

# 项目脚手架与初始化决策

非 greenfield，不涉及脚手架。

# 变化轴与模式决策

- 变化轴：技能数据来源扩展。
- 模式决策：沿用现有 `loadSkillRecords()` 聚合数据，不新增 store 或服务层。

# 代码上下文与影响假设

见 `artifacts/code-context.md`。

# API 与数据契约

无后端 API。输出继续遵守 `SkillRecord` 类型。

# 上下文与依赖来源

- `.agents/skills/**/SKILL.md`
- `src/types/content.ts`
- `src/content/skills/load-skill-records.ts`

# 边界情况

- `SKILL.md` 缺少 frontmatter 时仍应基于路径生成记录。
- subskill id 不包含 `subskills` 片段。
- 英文 frontmatter description 不直接作为页面中文简介。

# 验收标准

- `loadSkillRecords()` 包含 40 个本地 agent skill 记录。
- 顶层和 subskill 至少各有一个测试断言。
- `npm run test` 通过。
- `npm run typecheck` 通过。
- `npm run build` 通过。

# 人工评审与交接

交付时说明映射规则和验证结果。

# 风险

- 构建会为 40 个本地 agent skill 生成更多静态详情页，构建输出文件数量会增加。
