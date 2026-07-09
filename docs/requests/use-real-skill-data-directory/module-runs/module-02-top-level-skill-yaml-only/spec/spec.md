# 交付单元标识

- request_id: use-real-skill-data-directory
- module_id: module-02-top-level-skill-yaml-only

# 背景与目标

用户要求调整真实 skill 数据生成规则：不要给 `subskills` 中的 `SKILL.md` 写 YAML，只给 `.agents/skills` 一级子目录中的主 `SKILL.md` 写 YAML。同时，复制安装命令后执行安装时，如果主 skill 目录中包含 `subskills/`，应随主 skill 一起安装并保持原目录结构。

# 范围内

- 调整 `scripts/generate-real-skill-data.mjs` 的源文件发现规则，只选择 `.agents/skills/<skill>/SKILL.md`。
- 重新生成 `_data/real-skills/<skill>/SKILL.yaml`，删除旧的 `_data/real-skills/<skill>/subskills/**/SKILL.yaml` 生成结果。
- 保持主 skill 的 `installCommand` 指向 `.agents/skills/<skill>` 目录。
- 更新内容加载测试，断言记录数量与一级 skill 数量一致，且不包含 subskill 记录。
- 验证主 skill 目录安装目标可携带 `subskills/`，不改变 `.agents/skills/<skill>/subskills/...` 目录结构。

# 范围外

- 不修改 `.agents/skills` 原始 skill 文件。
- 不新增 subskill 单独展示条目。
- 不改变前端页面布局、样式、路由或筛选交互。
- 不实现后台服务或远程安装器。

# 触发与开始条件

- 触发条件：用户明确提出新的数据生成与安装目录结构要求。
- 开始条件：已有 request `use-real-skill-data-directory` 可复用，用户当前消息作为本次 spec 与 plan 的授权来源。

# 需求拆分摘要

- 本模块是已完成 request 的需求变更模块。
- 变更只影响真实 skill 数据生成契约与对应测试。
- 不需要 page-design 或 architecture-design 阶段。

# 用户流

- 用户在站点中看到一级 skill 条目。
- 用户复制该 skill 的安装命令。
- 安装命令指向完整 `.agents/skills/<skill>` 目录。
- 如果目录中存在 `subskills/`，安装过程按目录复制，自然携带 `subskills/` 并保留原层级。

# 页面与模块设计

- 页面层无变化。
- 数据源仍由 `loadSkillRecords()` 读取 `_data/real-skills/**/SKILL.yaml`。
- 生成脚本负责保证 `_data/real-skills` 只存在一级 skill YAML。

# 前端样式约束

- 本模块不新增或修改 authored styling。
- 不涉及 Tailwind CSS-style utility class 改动。

# Function-Complete 行为拆解

## 一级 skill YAML 生成

- 输入源：`.agents/skills` 目录下的一级子目录。
- 有效源文件：`.agents/skills/<skill>/SKILL.md`。
- 无效源文件：任意 `.agents/skills/<skill>/subskills/**/SKILL.md`。
- 输出路径：`_data/real-skills/<skill>/SKILL.yaml`。
- 输出数量：等于当前 `.agents/skills` 下包含主 `SKILL.md` 的一级子目录数量。

## 安装命令语义

- 每条记录的 `installCommand` 指向 `.agents/skills/<skill>` 目录。
- 不存在 subskill 记录，因此不存在指向 `.agents/skills/<skill>/subskills/<subskill>/SKILL.md` 的安装命令。
- 目录安装目标必须保持主 skill 原目录结构，包含 `subskills/`、脚本、参考资料等子内容。

## 内容加载契约

- `loadSkillRecords()` 继续只读取 `_data/real-skills/**/SKILL.yaml`。
- 加载结果不包含 `agent-<skill>-<subskill>` 形式的 subskill ID。
- 分类、状态、安装命令等字段继续符合 `SkillRecord` 数据契约。

# 设计约束

- 生成器的过滤规则必须集中在源文件发现阶段，避免后续渲染逻辑反复判断 subskill。
- `_data/real-skills` 每次生成前仍可整体清理后重建，避免旧 subskill YAML 残留。
- 安装命令语义由目录路径表达，不引入额外字段或特殊安装协议。
- 命名需明确区分 top-level skill 与 subskill，避免“real skill”范围再次歧义。

# 项目脚手架与初始化策略

- 非 greenfield，不涉及脚手架或 starter 决策。

# 变化轴与模式决策

- 变化轴：从“递归生成全部 `SKILL.md`”改为“只生成一级 skill 主 `SKILL.md`”。
- 模式决策：不引入新设计模式；直接以文件发现过滤和测试契约表达规则。
- 替代方案拒绝：不在运行时加载后过滤 subskill，因为这样会保留无效数据文件且增加数据契约歧义。

# 代码上下文与影响假设

- `scripts/generate-real-skill-data.mjs` 是数据生成唯一入口。
- `src/content/skills/load-skill-records.ts` 的 glob 仍以 `_data/real-skills/**/SKILL.yaml` 为唯一数据源。
- TypeScript 上下文：`src` 由 `tsconfig.app.json` governing，继承 `tsconfig.json`，关键选项为 `strict: true`、`moduleResolution: Bundler`、`baseUrl: "."`、`paths: {"@/*": ["src/*"]}`、`types: ["vite/client", "node"]`。

# API 与数据合同

- 不涉及后端 API。
- 数据合同为本地 YAML `SkillRecord`。
- 生成数据必须保留 `id`、`name`、`category`、`version`、`shortDesc`、`fullDesc`、`installCommand`、`usageExamples`、`tags`、`status`、`installCount`、`createdAt`、`updatedAt` 字段。

# 上下文与依赖来源

- 用户当前消息。
- `.agents/skills/<skill>/SKILL.md` 真实目录结构。
- `_data/real-skills/**/SKILL.yaml` 当前生成结果。
- `scripts/generate-real-skill-data.mjs`。
- `src/content/skills/load-skill-records.test.ts`。

# 边界情况

- 一级 skill 目录没有 `SKILL.md` 时不应生成 YAML。
- skill 目录有 `subskills/` 时只生成主 skill YAML，安装命令仍指向父级目录。
- 旧的 subskill YAML 不能在重新生成后残留。
- 测试不能写死过时的 40 条记录契约，应与一级 skill 数量契约一致。

# 验收标准

- `_data/real-skills` 中 `SKILL.yaml` 数量等于 `.agents/skills` 一级主 skill 数量。
- `_data/real-skills/frontend-agent-framework/SKILL.yaml` 存在。
- `_data/real-skills/frontend-agent-framework/subskills/verify/SKILL.yaml` 不存在。
- `loadSkillRecords()` 不返回 `agent-frontend-agent-framework-verify`。
- `agent-frontend-agent-framework` 的 `installCommand` 为 `本地路径：.agents/skills/frontend-agent-framework`。
- `npm test` 通过。
- `npm run typecheck` 通过。
- `BASE_PATH=/skill-hub/ npm run build` 通过。

# 人工审查与交付

- 本模块完成后进入 verify 和 review。
- review 通过后将 request 重新收口为 complete。

# 风险

- 若生成前未清理 `_data/real-skills`，旧 subskill YAML 可能继续被页面加载。
- 若测试继续使用固定数量，后续新增一级 skill 时会产生不必要维护成本。
