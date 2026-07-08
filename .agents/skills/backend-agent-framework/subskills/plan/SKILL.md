---
name: backend-agent-framework-plan
description: Stage subskill for planning. Convert the approved backend spec into execution tasks, dependencies, and verification strategy.
---

# Plan Subskill

## 触发场景

- 当主 `backend-agent-framework` 将请求路由到 `stage=plan` 时使用。

## 必要输入

- `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
- `docs/requests/<request-id>/modules/<active-module-id>/spec/clarifications.md`
- `docs/requests/<request-id>/requirements/requirement-analysis.md`（如存在）
- `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
- `docs/requests/<request-id>/requirements/modules/<active-module-id>.md`（如存在）
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/modules/<active-module-id>/spec/clarifications.md`
   - `docs/requests/<request-id>/requirements/requirement-analysis.md`（如存在）
   - `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
   - `docs/requests/<request-id>/requirements/modules/<active-module-id>.md`（如存在）
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/plan.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/design-patterns.md`
   - `../../references/policies/code-graph.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/clean-code.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/mysql-enterprise.md`
   - `../../references/policies/redis-enterprise.md`
   - `../../references/policies/kafka-enterprise.md`
   - `../../references/policies/grpc-enterprise.md`
   - `../../references/policies/k8s-enterprise.md`
2. 从 `state.json.module_execution.active_module_id` 恢复当前活动模块；若不存在，则只对未拆分的单请求流使用请求级兜底。
3. 进入本阶段前，要求 `approvals.spec_approved=true`。
4. 仅为当前活动模块产出：
   - `modules/<active-module-id>/plan/plan.md`
   - `modules/<active-module-id>/plan/task-board.md`
5. 默认使用中文写计划工件。
6. 所有任务都必须回溯到当前活动模块的已批准 spec。
7. 把任务拆到当前模块 `execute` 无需猜测的粒度，至少覆盖 handler/controller、service/domain flow、repository/store、job/consumer/subscriber、contract、migration、observability、verification。
8. 不得把多个需求文件重新合并为一个共享 `plan.md` 或共享 `task-board.md`。
9. 对可测试行为按 TDD 导向拆任务，并在实现前定义验证路径。
10. 对发布、安全、观测、兼容性、迁移与回滚都要拆成非黑盒任务。
11. 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，必须拆出对应专项任务。
12. 区分串行任务与可并行任务，仅在确实值得时建议 workflow-style parallel execution；但这些建议只作用于当前模块。
13. 每个任务都必须附一个 Mermaid 流程图。
14. 保留 `state.json.loop`，不重置、不改写。
15. 本阶段不写实现代码。
16. 默认自动推进：如果用户没有明确要求在 plan 后停下审批，且不存在真实阻塞决策，则直接设置 `approvals.plan_approved=true` 并切到 `stage=execute`。
17. 同步更新当前活动模块的 `module_states.<active-module-id>.current_stage=execute`。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/modules/<active-module-id>/plan/plan.md`
  - `docs/requests/<request-id>/modules/<active-module-id>/plan/task-board.md`
  - `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）

## 验收标准

- `modules/<active-module-id>/plan/plan.md` 已存在并覆盖当前模块的任务、依赖、影响面、测试、回滚。
- 每个任务都有对应流程图。
- `modules/<active-module-id>/plan/task-board.md` 已存在并反映当前模块的执行单元。
- 所有验收标准都已映射到执行任务和验证任务。
- 接口、兼容性、迁移、观测项已拆解为非黑盒任务。
- rollout、灰度、回滚和安全验证项已拆解为非黑盒任务。
- 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，专项风险与验证任务已拆解为非黑盒任务。
- plan 已被隐式或显式审批。
- `state.json.approvals.plan_approved=true`，`state.json.stage=execute`，当前活动模块已切到 `execute`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能创建 spec 未授权的任务。
- 不能把迁移、兼容性、回滚和观测面留空。
