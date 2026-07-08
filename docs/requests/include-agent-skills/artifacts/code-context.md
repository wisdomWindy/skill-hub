# 代码上下文

# TypeScript 上下文

- `tsconfig.app.json` extends `tsconfig.json`，包含 `src/**/*` 和 `vite.config.ts`。
- `@/*` 映射到 `src/*`。
- `src/env.d.ts` 声明了 `*.yaml?raw`，但尚未声明 Markdown raw 导入；本次使用 `import.meta.glob(..., { query: '?raw', import: 'default' })` 并在调用处做类型断言。

# 现有数据链路

- `src/content/skills/load-skill-records.ts` 通过 `import.meta.glob('../../../_data/skills/*.yaml', { query: '?raw' })` 加载 YAML。
- `loadSkillRecords()` 返回 `SkillRecord[]`。
- `src/router/index.ts` 用 `loadSkillRecords()` 生成已发布技能详情静态路由。
- `src/features/skills/queries/skill-queries.ts` 基于 `SkillRecord` 做发布筛选、搜索、分页、详情和相关技能查询。

# `.agents/skills` 结构

- 当前共有 40 个 `SKILL.md`。
- 包含顶层技能和 `subskills/*/SKILL.md`。
- `SKILL.md` 通常含 YAML frontmatter，其中 `name` 和 `description` 可作为元数据来源。

# 映射约束

- 递归包含 `.agents/skills/**/SKILL.md`。
- 生成稳定 id，避免与 `_data/skills` 冲突。
- 展示文案保持中文，不直接展示英文 frontmatter 描述。
- 保留原 YAML 技能数据。
