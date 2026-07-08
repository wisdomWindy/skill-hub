---
name: backend-agent-framework-execute
description: Stage subskill for execution. Implement only approved backend tasks and keep execution records aligned with the plan.
---

# Execute Subskill

## 触发场景

- 当主 `backend-agent-framework` 将请求路由到 `stage=execute` 时使用。

## 必要输入

- `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
- `docs/requests/<request-id>/modules/<active-module-id>/plan/plan.md`
- `docs/requests/<request-id>/modules/<active-module-id>/plan/task-board.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/modules/<active-module-id>/plan/plan.md`
   - `docs/requests/<request-id>/modules/<active-module-id>/plan/task-board.md`
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/clean-code.md`
   - `../../references/policies/code-graph.md`
   - `../../references/policies/design-patterns.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/backend-architecture.md`
   - `../../references/policies/backend-components.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/mysql-enterprise.md`
   - `../../references/policies/redis-enterprise.md`
   - `../../references/policies/kafka-enterprise.md`
   - `../../references/policies/grpc-enterprise.md`
   - `../../references/policies/k8s-enterprise.md`
2. 从 `state.json.module_execution.active_module_id` 恢复当前活动模块；若不存在，则只对未拆分的单请求流使用请求级兜底。
3. 执行前要求 `approvals.plan_approved=true`。
4. 仅实现当前活动模块的已批准任务。
5. 把当前活动模块的 spec 与 plan 视为唯一实现合同。
6. 默认使用中文更新 `modules/<active-module-id>/execution/changelog.md` 与其他执行工件。
7. 将 `modules/<active-module-id>/plan/task-board.md` 视为当前 execute 阶段的完整待办清单：只要仍有已批准且非阻塞的任务未完成，就继续在同一 active run 中执行，不得只完成一个任务就停下等待手动继续。
8. 不得跨到下一个模块执行任何任务，也不得把多个模块的任务混写到同一个 task-board。
9. 如果 plan 缺少关键接口、状态、流程、迁移、回滚或观测要求，停止执行并回退到 `plan`。
10. 如果 spec 与 plan 在行为颗粒度或产品含义上冲突，停止执行并回退修复工件。
11. 对可测试行为按 red -> green -> refactor 执行。
12. 对契约、迁移、幂等、重试、超时、外部依赖隔离和观测点要显式落地。
13. 对安全敏感面要显式落地 auth/authz、secret/credential、PII、abuse/replay 风险防护。
14. 若实现涉及 MySQL、Redis、Kafka、gRPC 或 Kubernetes，必须显式落实对应专项约束。
15. 如执行中发现新的结构信息，更新 `artifacts/code-context.md`。
16. 持续更新：
   - `modules/<active-module-id>/execution/changelog.md`
   - `modules/<active-module-id>/plan/task-board.md`
17. 只有当当前活动模块的全部已批准任务完成，或者遇到真实 blocker / requirement_changed / plan gap 时，才允许离开 execute。
18. 保留 `state.json.loop`，不重置、不改写。
19. 本阶段完成时，更新当前活动模块的 `module_states.<active-module-id>.current_stage=verify`。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/modules/<active-module-id>/execution/changelog.md`
  - 与计划任务对应的代码改动
  - 更新后的 `docs/requests/<request-id>/modules/<active-module-id>/plan/task-board.md`
  - 更新后的 `artifacts/code-context.md`（如结构理解有变化）

## 验收标准

- 已批准的实现任务已完成。
- `modules/<active-module-id>/execution/changelog.md` 已记录关键决策与偏差。
- 对可测试行为，已记录 test-first 执行步骤或合理例外。
- 契约、迁移、幂等、重试和观测约束已在改动中得到体现或显式记录。
- 安全约束与 rollout / rollback 实施约束已在改动中得到体现或显式记录。
- 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，对应中间件约束已在改动中得到体现或显式记录。
- `modules/<active-module-id>/plan/task-board.md` 已反映完成状态。
- 不存在仍可继续执行却被无故暂停的已批准任务。
- `state.json.stage=verify`，当前活动模块已切到 `verify`，且保留原有 `loop`。

## 安全边界

- 不能发明新需求。
- 不能猜 plan 未定义的产品行为。
- 不能无说明地跳过 TDD、兼容性、迁移或回滚约束。
- 不能在仍有未完成且非阻塞的已批准任务时因为阶段总结而停止。
