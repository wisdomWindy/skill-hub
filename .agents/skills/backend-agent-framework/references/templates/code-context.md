# 代码上下文模板

## 条件性工件路径

- `docs/requests/<request-id>/artifacts/code-context.md`

当既有代码理解会显著影响请求处理时创建该工件，尤其适用于 bugfix、重构、跨模块变更、模式决策或对结构敏感的评审工作。

## `artifacts/code-context.md`

必需章节：

- 上下文需求
- graph 可用性检查
- 安装或 bootstrap 记录
- fallback 记录
- 相关入口点
- 关键符号与模块
- 依赖与副作用边界
- 影响范围
- 开放后续检查项

### `相关入口点`

列出：

- 公共 API 入口点
- 内部执行入口点
- 关键时的 handler、controller、consumer、cron/job、callback 与 event trigger
