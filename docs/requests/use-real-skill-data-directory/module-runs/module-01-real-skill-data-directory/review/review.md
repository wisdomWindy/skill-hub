# 交付单元标识

- request_id: use-real-skill-data-directory
- module_id: module-01-real-skill-data-directory

# Blocking Issues

无。

# Non-Blocking Issues

无。

# Accepted Risks

- `_data/real-skills` 是同步后的快照；如果 `.agents/skills` 后续变化，需要重新运行 `rtk node scripts/generate-real-skill-data.mjs` 更新数据。
- 构建仍提示 chunk size warning，不阻断本次数据目录调整。

# Follow-Up Items

- 可在后续加入 npm script，例如 `sync:skills`，进一步标准化同步入口。

# Clean-Code Assessment

- result: pass
- key findings:
  - 前端加载器重新变回简单 YAML 数据读取。
  - 生成逻辑放在脚本中，避免运行时读取 `.agents`。
  - 测试直接约束项目数据目录。
- required follow-up if failed: 无

# Design-Pattern Assessment

- result: pass
- key findings:
  - 未引入新模式层。
  - 用同步脚本加静态数据目录解决数据目录边界问题，复杂度合适。
- required follow-up if failed: 无

# Merge Readiness Summary

当前模块无阻断项，验证通过，可以标记完成。
