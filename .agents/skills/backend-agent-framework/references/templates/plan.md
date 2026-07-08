# 计划模板

## 必需工件路径

- `docs/requests/<request-id>/modules/<module-id>/plan/plan.md`
- `docs/requests/<request-id>/modules/<module-id>/plan/task-board.md`

## `modules/<module-id>/plan/plan.md`

必需章节：

- 模块标识与范围
- 阅读导航
- 全局摘要
- 任务拆解
- 功能拆解明细
- 接口契约与兼容性策略
- 基础设施依赖策略
- 依赖关系
- 整洁性与复杂度控制
- 模式决策与替代方案
- 代码上下文与影响范围
- 并行执行建议
- 触发与上下文准备
- 受影响文件或模块
- 测试策略
- 发布与灰度计划
- 观察与人工介入点
- 回滚说明

排版要求：

- 使用清晰标题层级
- 优先使用短段落、列表、表格、任务卡片式分节
- 每个任务必须独立成节，且标题中带任务 ID 与任务名称
- 每个任务节内必须包含流程图，默认使用 Mermaid

### `任务拆解`

每个任务至少写清：

- 任务 ID 与任务名称
- 任务目标
- 关联规格区域
- 受影响 handler/controller、service、domain flow、repository/store、job/consumer、contract、migration、observability 面
- 串行/并行属性
- 前置条件与完成条件
- 对 `execute` 的禁止猜测边界
- 任务流程图

`execute` 默认必须按 `task-board` 连续完成所有已批准且非阻塞任务，不能把单个任务完成视为一次需要人工续跑的自然停点。  
`plan.md` 只服务当前模块；不能把多个需求模块重新合并为一个共享执行计划。

### `功能拆解明细`

至少覆盖：

- 入站接口
- 业务服务/领域流程
- 持久化与迁移
- MySQL / Redis / Kafka / gRPC / Kubernetes 专项策略
- 异步任务、消费者、回调或事件流
- 兼容性与回滚
- rollout / gray release
- 观测性
- 安全验证切面
- 测试切面

## `modules/<module-id>/plan/task-board.md`

每个任务必需字段：

- 任务 ID
- 任务名称
- 状态
- 执行模式
- 触发/前置条件
- 关联规格区域
- 覆盖功能单元
- 模块范围
- 整洁性约束
- 模式约束或抽象边界
- 关键状态、契约、迁移与观测约束
- 测试切入点
- 待确认项或已批准假设

如果某任务会阻止 `execute` 连续推进，必须在 `待确认项或已批准假设` 中明确写出阻塞条件；否则默认视为可在同一 active run 内持续执行。
