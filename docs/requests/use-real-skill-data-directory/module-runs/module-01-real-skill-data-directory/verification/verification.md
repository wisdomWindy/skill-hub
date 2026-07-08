# 交付单元标识

- request_id: use-real-skill-data-directory
- module_id: module-01-real-skill-data-directory

# 验收覆盖

| 验收项 ID | 验证方法 | 结果 | 证据 | 失败后续 |
| --- | --- | --- | --- | --- |
| AC-1 `_data/real-skills` 存在 40 条真实 skill YAML | 递归文件计数 | pass | `Get-ChildItem _data/real-skills -Recurse -Filter SKILL.yaml` 计数为 40 | 无 |
| AC-2 保留原 skill 目录结构 | 路径存在性检查 | pass | 顶层 `frontend-agent-framework/SKILL.yaml` 与子级 `frontend-agent-framework/subskills/verify/SKILL.yaml` 均存在，旧扁平 `agent-frontend-agent-framework.yaml` 不存在 | 无 |
| AC-3 主 skill 安装命令指向目录，subskill 安装命令指向文件 | YAML 解析与单元测试 | pass | `agent-frontend-agent-framework` 为 `本地路径：.agents/skills/frontend-agent-framework`，`agent-frontend-agent-framework-verify` 为 `本地路径：.agents/skills/frontend-agent-framework/subskills/verify/SKILL.md` | 无 |
| AC-4 前端运行时源码不直接引用 `.agents/skills` 或 `SKILL.md` 数据目录 | `rg` 扫描生产源码，排除测试文件 | pass | `rtk rg -n ".agents/skills|.agents\\\\skills|SKILL.md" src --glob "!*.test.ts"` 无结果 | 无 |
| AC-5 单元测试通过 | 执行测试 | pass | `rtk npm run test`，7 个测试文件、19 个用例通过 | 无 |
| AC-6 TypeScript 检查通过 | 执行类型检查 | pass | `rtk npm run typecheck` 通过 | 无 |
| AC-7 构建通过 | 执行构建 | pass | `rtk npm run build` 通过，渲染 42 个页面 | 无 |

# Spec Constraint Compliance

- result: pass
- checked constraints:
  - 前端数据源切换到 `_data/real-skills/**/SKILL.yaml`。
  - `.agents/skills` 仅作为同步脚本的源，不作为运行时数据目录。
  - `_data/real-skills` 保持原 skill 目录结构。
  - 主 skill 安装命令指向整个目录。
  - 页面布局未改变。
