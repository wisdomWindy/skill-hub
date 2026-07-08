# 交付单元标识

- request_id: use-real-skill-data-directory
- module_id: module-01-real-skill-data-directory

# 验收覆盖

| 验收项 ID | 验证方法 | 结果 | 证据 | 失败后续 |
| --- | --- | --- | --- | --- |
| AC-1 `_data/real-skills` 存在 40 条真实 skill YAML | 文件计数 | pass | `Get-ChildItem _data/real-skills -Filter *.yaml` 计数为 40 | 无 |
| AC-2 前端源码不直接引用 `.agents/skills` 或 `SKILL.md` 数据目录 | `rg` 扫描 `src` | pass | `rtk rg -n ".agents/skills|.agents\\\\skills|SKILL.md" src` 无结果 | 无 |
| AC-3 单元测试通过 | 执行测试 | pass | `rtk npm run test`：7 个测试文件、17 个用例通过 | 无 |
| AC-4 TypeScript 检查通过 | 执行类型检查 | pass | `rtk npm run typecheck` 通过 | 无 |
| AC-5 构建通过 | 执行构建 | pass | `rtk npm run build` 通过，渲染 42 个页面 | 无 |

# Spec Constraint Compliance

- result: pass
- checked constraints:
  - 前端数据源切换到 `_data/real-skills/*.yaml`。
  - `.agents/skills` 仅作为同步脚本的源，不作为运行时数据目录。
  - 页面布局未改变。
- evidence reference:
  - `rtk npm run test`
  - `rtk npm run typecheck`
  - `rtk npm run build`
  - `rtk rg` 源码扫描

# 总结

验收标准全部通过，可进入 review。
