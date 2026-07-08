---
name: backend-agent-framework-review
description: Stage subskill for review. Review correctness, standards compliance, and residual backend risk before completion.
---

# Review Subskill

## 触发场景

- 当主 `backend-agent-framework` 将请求路由到 `stage=review` 时使用。

## 必要输入

- `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
- `docs/requests/<request-id>/modules/<active-module-id>/plan/plan.md`
- `docs/requests/<request-id>/modules/<active-module-id>/verification/verification.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/modules/<active-module-id>/plan/plan.md`
   - `docs/requests/<request-id>/modules/<active-module-id>/verification/verification.md`
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/review.md`
   - `../../references/templates/release-readiness.md`
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
3. 先读变更后的代码，再开始评审。
4. 仅为当前活动模块产出 `modules/<active-module-id>/review/review.md`。
5. 同时产出 `modules/<active-module-id>/release/release-readiness.md`。
6. 默认使用中文写工件。
7. 把评审结论分成阻塞问题、非阻塞问题、已接受风险、后续事项。
8. 既看功能正确性，也看 clean-code、后端边界、契约忠实度、数据所有权、事务与一致性、重试与补偿、副作用扩散、可观测性和迁移风险。
9. 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，必须显式审查对应中间件架构与企业规范是否被满足。
10. 必须显式审查安全面，并写出 `通过|失败|不适用`。
11. 检查当前模块 spec 与 plan 是否保持同一 function-complete behavior granularity；若有漂移，按 blocker 处理。
12. 在 `modules/<active-module-id>/release/release-readiness.md` 中明确写出 rollout 策略、迁移顺序、监控观察窗、回滚触发条件与执行路径、剩余发布风险、`结果: 通过|失败`。
13. 明确写出：
   - `整洁代码评估: 通过|失败`
   - `设计模式评估: 通过|失败`
   - `安全评估: 通过|失败|不适用`
14. 如果 review 扩展或推翻了早先结构理解，更新 `artifacts/code-context.md`。
15. 保留 `state.json.loop`，不重置、不改写。
16. 若仍有 blocker，记录后交回主 skill 回流到 `execute`。
17. 若当前模块 review 与 release readiness 通过，则：
   - 把当前模块加入 `module_execution.completed_modules`
   - 从 `module_execution.pending_modules` 中移除当前模块
   - 把当前模块 `module_states.<active-module-id>.status=completed`
   - 若仍有待处理模块，切换 `active_module_id` 到下一个模块，并把 `state.json.stage` 切到该模块 `entry_stage`
   - 若已无待处理模块，设置 `state.json.stage=complete`

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/modules/<active-module-id>/review/review.md`
  - `docs/requests/<request-id>/modules/<active-module-id>/release/release-readiness.md`

## 验收标准

- `modules/<active-module-id>/review/review.md` 已存在并按严重级别记录发现项。
- 已明确说明变更区域是否仍有 clean-code blocker。
- 已明确说明 pattern choice 是合理 / 过度设计 / 不必要。
- `modules/<active-module-id>/review/review.md` 已明确写出 `整洁代码评估: 通过|失败` 与 `设计模式评估: 通过|失败`。
- `modules/<active-module-id>/review/review.md` 已明确写出 `安全评估: 通过|失败|不适用`。
- `modules/<active-module-id>/release/release-readiness.md` 已明确写出 `结果: 通过|失败`。
- 已明确说明 spec 与 plan 是否保持所需行为颗粒度对齐。
- 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，已明确说明对应中间件企业规范是否满足。
- 所有 blocker 都已清零，否则必须回流执行。
- 通过时，要么 `state.json.stage` 已切到下一个模块的入口阶段，要么在最后一个模块完成后切到 `complete`，且保留原有 `loop`。

## 安全边界

- 不能把 review 压缩成一句批准语。
- 不能因为“功能能跑”就忽略严重的可维护性问题。
- 在 blocker 未解决前，不能宣称 merge-ready。
