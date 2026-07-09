# 交付单元标识

- request_id: use-real-skill-data-directory
- module_id: module-02-top-level-skill-yaml-only

# Acceptance Coverage

| acceptance item id | verification method | result | evidence reference | follow-up if failed | handoff status |
| --- | --- | --- | --- | --- | --- |
| AC1 `_data/real-skills` 中 `SKILL.yaml` 数量等于一级主 skill 数量 | `find _data/real-skills -name SKILL.yaml` | pass | 输出为 5 条：`ai-video-production-framework`、`backend-agent-framework`、`frontend-agent-framework`、`novel-agent-framework`、`skill-generator` | 无 | ready |
| AC2 顶层 `frontend-agent-framework/SKILL.yaml` 存在 | `find _data/real-skills -name SKILL.yaml` 与文件内容抽查 | pass | `_data/real-skills/frontend-agent-framework/SKILL.yaml` 存在，`installCommand` 为目录路径 | 无 | ready |
| AC3 subskill YAML 不存在 | `rg -n 'subskills/.*/SKILL.yaml\|/subskills/' _data/real-skills` | pass | 命令无匹配 | 无 | ready |
| AC4 加载结果不包含 `agent-frontend-agent-framework-verify` | `npm test` | pass | `src/content/skills/load-skill-records.test.ts` 通过 | 无 | ready |
| AC5 主 skill 安装命令为目录路径 | `npm test` 与 YAML 抽查 | pass | `本地路径：.agents/skills/frontend-agent-framework` | 无 | ready |
| AC6 测试通过 | `npm test` | pass | 7 个测试文件、19 个测试通过 | 无 | ready |
| AC7 类型检查通过 | `npm run typecheck` | pass | `vue-tsc --noEmit -p tsconfig.app.json` 退出码 0 | 无 | ready |
| AC8 GitHub Pages 构建通过 | `BASE_PATH=/skill-hub/ npm run build` | pass | Vite SSG 构建完成并渲染 7 个页面 | 无 | ready |

# Spec Constraint Compliance

- result: pass
- checked constraints:
  - 只在源文件发现阶段生成一级 skill YAML。
  - 生成前清理 `_data/real-skills`，旧 subskill YAML 不残留。
  - 安装命令保持目录路径，目录复制时可携带 `subskills/`。
  - 未引入运行时过滤层或额外模式层。
- evidence reference:
  - `scripts/generate-real-skill-data.mjs`
  - `_data/real-skills/**/SKILL.yaml`
  - `src/content/skills/load-skill-records.test.ts`
  - 验证命令：`npm test`、`npm run typecheck`、`BASE_PATH=/skill-hub/ npm run build`
- follow-up if failed: 无。

# Frontend Styling Compliance

- 本模块不涉及 authored styling 改动。

# Summary

实现满足本模块全部验收标准。Vite 构建期间出现 chunk size warning，属于既有构建体积提示，不影响本模块功能验收。
