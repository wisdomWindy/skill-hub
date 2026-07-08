# 请求模板

## 必需工件路径

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- PRD 驱动请求在 requirement analysis 之后还需要 `docs/requests/<request-id>/requirements/requirement-analysis.md`
- PRD 驱动请求在 requirement splitting 之后还需要 `docs/requests/<request-id>/requirements/requirement-map.md`
- PRD 驱动且已拆分的请求，在下游执行阶段还需要 `docs/requests/<request-id>/modules/<module-id>/...` 模块工作区

## `request.md`

必需章节：

- 请求标识
- 来源链接
- 业务摘要
- 目标陈述
- 初始完成信号
- 触发条件
- 初始上下文来源
- 人工交接点
- 影响范围
- 参与服务或模块

## `state.json`

必需字段：

- `request_id`
- `source`
- `stage`
- `status`
- `artifacts`
- `approvals`
- `loop`
- PRD 驱动且已拆分时还需要 `module_execution`

必需结构：

```json
{
  "request_id": "...",
  "source": {},
  "stage": "requirement-analysis",
  "status": "in_progress",
  "artifacts": {},
  "approvals": {},
  "loop": {
    "iteration": 1,
    "state": "running",
    "last_completed_stage": null,
    "pending_gate": null,
    "reentry_reason": "new_request"
  }
}
```

对于 PRD 驱动请求，初始化 `stage` 为 `requirement-analysis`。  
对于经 `bugfix-intake` 归一化的 bugfix 请求，初始化 `stage` 为：

- `architecture-design`：当修复变更了对外契约形态、服务边界、持久化模型、异步拓扑或跨服务集成边界
- 否则为 `spec`

对于 PRD 驱动且已完成 requirement splitting 的请求，增加：

```json
{
  "module_execution": {
    "mode": "sequential",
    "active_module_id": "module-a",
    "module_order": ["module-a", "module-b"],
    "pending_modules": ["module-a", "module-b"],
    "completed_modules": [],
    "module_states": {
      "module-a": {
        "requirement_file": "requirements/modules/module-a.md",
        "workspace": "modules/module-a",
        "entry_stage": "architecture-design",
        "current_stage": "architecture-design",
        "status": "in_progress"
      },
      "module-b": {
        "requirement_file": "requirements/modules/module-b.md",
        "workspace": "modules/module-b",
        "entry_stage": "spec",
        "current_stage": "pending",
        "status": "pending"
      }
    }
  }
}
```

约束：

- `module_order` 由需求拆分阶段按源文顺序、依赖顺序和发布约束确定。
- `active_module_id` 指向当前唯一允许进入下游生命周期的模块。
- 每个模块都必须在自己的 `workspace` 下生成独立的 `design/spec/plan/execution/verification/review/release` 工件。
- 只有当前模块通过 `review` 与 `release-readiness` 后，才允许切换到下一个模块。

## `artifacts/prd-snapshot.md`

必需章节：

- 来源摘要
- 关键业务目标
- 显式行为约束
- 从来源提取的接口、事件、数据模型与流程规则
- 相关服务或模块
- 上游 PRD 中值得关注的开放问题

## `requirements/requirement-map.md`

PRD 驱动请求的必需章节：

- 拆分摘要
- 来源模块
- 拆分后的模块与功能单元
- 来源追踪关系
- 模块依赖
- 模块串行执行顺序
- architecture-design 路由提示
- spec 输入检查清单
- 开放问题

## `requirements/requirement-analysis.md`

PRD 驱动请求的必需章节：

- 资料来源与阅读口径
- 已确认口径
- 需求目标与业务价值
- 范围内事项
- 非目标与范围外事项
- 关键参与者与调用方
- 项目、服务与数据归属边界
- 显式约束归纳
- 隐含约束与假设
- 核心流程与状态分析
- 多模式/多角色差异流程
- 外部系统与既有能力复用边界
- 验收与回归基线
- 研发拆分建议
- 风险、歧义与待确认项
- 拆分策略与建议拆分轴
- requirement-splitting 输入检查清单

## `requirements/modules/<module-id>.md`

每个拆分模块建议章节：

- 模块名称
- 来源快照
- 来源追踪引用
- 业务目标
- 调用方可见行为
- 来源中的接口、事件、数据与流程规则
- spec 必须保留的上游约束
- 是否需要 architecture-design
- 下游执行入口阶段
- 下游模块工作区路径
- 开放问题
