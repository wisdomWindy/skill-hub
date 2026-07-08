# 验证模板

## 必需工件路径

- `docs/requests/<request-id>/modules/<module-id>/verification/verification.md`
- `docs/requests/<request-id>/modules/<module-id>/verification/evidence/`

## `modules/<module-id>/verification/verification.md`

必需顶层章节：

- 模块标识与范围
- 验收项覆盖
- 规格约束符合性
- 安全验证
- 总结

每个验收项的必需字段：

- 验收项 ID
- 验证方法
- 结果
- 证据引用
- 失败后续动作
- 交接状态

`规格约束符合性` 必须包含：

- 结果（`通过` 或 `失败`）
- 已检查约束
- 证据引用
- 失败后续动作

`安全验证` 必须包含：

- 结果（`通过`、`失败` 或 `不适用`）
- 已检查范围
- 证据引用
- 失败后续动作
