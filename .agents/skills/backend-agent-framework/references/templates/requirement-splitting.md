# Requirement Splitting 模板

## 必需工件路径

- `docs/requests/<request-id>/requirements/requirement-analysis.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`
- `docs/requests/<request-id>/requirements/modules/<module-id>.md`
- `docs/requests/<request-id>/state.json` 中的 `module_execution`

## `requirements/requirement-map.md`

必需章节：

- 需求分析摘要
- 请求摘要
- 拆分原则
- 来源清单
- Markdown 归一化说明
- 模块清单
- 模块依赖与处理顺序说明
- 下游模块执行策略
- architecture-design 候选项
- spec 承接检查清单
- 开放问题与未解决歧义

### `模块清单`

每个模块或功能单元至少包含：

- 模块 ID
- 模块名称
- 模块类型
  - service
  - endpoint contract
  - job/workflow
  - consumer/subscriber
  - data model/schema
  - integration flow
  - cross-service rule
- 来源章节映射
- 一句话范围摘要
- 在 `spec` 之前是否需要 `architecture-design`
- 下游入口阶段
- 下游模块工作区
- 面向 `spec` 与 `plan` 的下游承接说明

### `模块依赖与处理顺序说明`

这一节必须基于源文顺序、依赖顺序和发布约束，为所有范围内模块给出默认下游处理顺序。

- 当来源和依赖已经能推出顺序时，不要把排序留成开放选择题。
- 除非上游文档明确给出互斥交付阶段，或现有证据无法推出顺序，否则不要让用户在拆分模块之间再选优先级。

### `下游模块执行策略`

这一节必须明确：

- 拆分后的每个模块都会分别经历一次完整下游生命周期：
  `architecture-design? -> spec -> plan -> execute -> verify -> review`
- 这些生命周期按模块顺序串行推进，不共享一个总 `plan.md` 或总 `task-board.md`
- 只有当前模块通过验收后，下一个模块才能开始
- `state.json.module_execution` 如何映射模块顺序、活动模块和模块工作区

### `spec 承接检查清单`

对每个拆分模块，明确列出下游阶段必须保留的上游细节，例如：

- 接口字段与状态语义
- 事件载荷与投递规则
- 数据字段与 schema 约束
- 重试、超时、幂等、权限、迁移、回滚与观测性规则

### `需求分析摘要`

这一节必须承接 `requirements/requirement-analysis.md` 的关键结论，至少包括：

- 范围边界
- 关键歧义是否已降到可拆分程度
- 推荐拆分轴
- 不能拆散的语义边界

## `requirements/modules/<module-id>.md`

必需章节：

- 模块标识
- 模块名称
- 来源快照
- Markdown 归一化快照
- 来源追踪引用
- 业务意图
- 调用方可见范围
- 接口、事件、数据与流程规则
- 依赖关系与受影响邻接模块
- architecture-design 路由决策
- 下游入口阶段
- 下游模块工作区
- 下游 spec 义务
- 开放问题
