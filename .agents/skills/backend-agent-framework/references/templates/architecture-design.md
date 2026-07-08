# 架构设计模板

## 必需工件路径

- `docs/requests/<request-id>/modules/<module-id>/design/architecture-design.md`

## `modules/<module-id>/design/architecture-design.md`

必需章节：

- 模块 ID
- 模块名称
- 对应需求文件
- 服务目标
- 目标调用方或场景
- 边界图
- 接口面
- 工作流与执行路径
- 数据所有权与持久化
- 一致性与事务策略
- 幂等 / 重试 / 失败处理
- 观测性计划
- 设计风险
- 开放问题

当 gRPC 是关键因素时，`接口面` 与 `工作流与执行路径` 还应记录：

- proto 权威来源
- 兼容性或混部版本假设
- metadata 或鉴权透传方式
- deadline、重试、错误与流式语义

当 Kubernetes 是关键因素时，`边界图`、`工作流与执行路径` 或 `观测性计划` 还应记录：

- workload 类型与归属
- probe 与 readiness 语义
- 资源或扩缩容假设
- config 或 secret 边界
- rollout、drain 与 rollback 预期
