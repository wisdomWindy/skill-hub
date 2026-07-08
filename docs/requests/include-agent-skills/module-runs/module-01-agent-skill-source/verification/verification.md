# 交付单元标识

- request_id: include-agent-skills
- module_id: module-01-agent-skill-source

# 验收覆盖

| 验收项 ID | 验证方法 | 结果 | 证据 | 失败后续 |
| --- | --- | --- | --- | --- |
| AC-1 `loadSkillRecords()` 包含 `.agents/skills/**/SKILL.md` 记录 | 单元测试断言 agent 记录数量等于 glob 发现数量 | pass | `src/content/skills/load-skill-records.test.ts`；`rtk npm run test` 通过 | 无 |
| AC-2 顶层 skill 和 subskill 均进入列表 | 单元测试断言 `agent-frontend-agent-framework` 与 `agent-frontend-agent-framework-verify` 存在 | pass | `rtk npm run test` 通过 | 无 |
| AC-3 本地 agent skill 记录为 published | 单元测试断言所有 `agent-` 记录状态为 `published` | pass | `rtk npm run test` 通过 | 无 |
| AC-4 TypeScript 检查通过 | 执行类型检查 | pass | `rtk npm run typecheck` 通过 | 无 |
| AC-5 构建生成本地 agent skill 静态详情页 | 执行生产构建 | pass | `rtk npm run build` 通过，渲染 45 个页面，包含 40 个 `agent-*` 页面 | 无 |

# Spec Constraint Compliance

- result: pass
- checked constraints:
  - 保留 `_data/skills` 数据源。
  - 未修改 `.agents/skills` 原文件。
  - 递归包含 `.agents/skills/**/SKILL.md`。
  - 本地 skill 展示文案由加载器生成中文内容。
  - 输出仍符合 `SkillRecord` 类型。
- evidence reference:
  - `rtk npm run test`
  - `rtk npm run typecheck`
  - `rtk npm run build`
- follow-up if failed: 无

# Spec-Plan 粒度对齐

- result: pass
- 规格、计划和实现均聚焦于扩展技能数据源，没有改变页面布局或引入额外行为。

# 注意事项

- 构建继续提示 chunk size warning；本次功能成功构建，警告与新增静态数据体量相关但不阻断。
- 当前运行环境 Node 为 v22.15.1，而项目 `package.json` 声明 `24.x`，npm 会提示 EBADENGINE warning。

# 总结

验收标准全部通过，可进入 review。
