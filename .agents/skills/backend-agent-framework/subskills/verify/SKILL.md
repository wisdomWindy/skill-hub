---
name: backend-agent-framework-verify
description: Stage subskill for verification. Validate the backend implementation against acceptance criteria and record durable evidence.
---

# Verify Subskill

## 触发场景

- 当主 `backend-agent-framework` 将请求路由到 `stage=verify` 时使用。

## 必要输入

- `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
- `docs/requests/<request-id>/modules/<active-module-id>/plan/plan.md`
- `docs/requests/<request-id>/modules/<active-module-id>/execution/changelog.md`
- `docs/requests/<request-id>/state.json`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/modules/<active-module-id>/plan/plan.md`
   - `docs/requests/<request-id>/modules/<active-module-id>/execution/changelog.md`
   - `../../references/state-machine.md`
   - `../../references/templates/verify.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/mysql-enterprise.md`
   - `../../references/policies/redis-enterprise.md`
   - `../../references/policies/kafka-enterprise.md`
   - `../../references/policies/grpc-enterprise.md`
   - `../../references/policies/k8s-enterprise.md`
2. 从 `state.json.module_execution.active_module_id` 恢复当前活动模块；若不存在，则只对未拆分的单请求流使用请求级兜底。
3. 仅为当前活动模块产出 `modules/<active-module-id>/verification/verification.md`。
4. 默认使用中文写工件。
5. 将每条验收标准映射到验证方法、结果、证据。
6. 验证实现是否符合当前活动模块的 approved spec。
7. 验证当前模块 spec 与 plan 是否保持同一 function-complete granularity。
8. 如涉及后端接口、事件或存储契约，验证契约一致性、错误路径、兼容性、幂等、重试、超时、迁移结果与回滚可行性。
9. 必须显式验证 auth/authz、secret、PII、abuse/replay 等安全面，并记录 `通过|失败|不适用`。
10. 必须结合当前模块 plan 验证 rollout readiness 所需证据是否齐备。
11. 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，必须显式验证对应专项证据。
12. 在 `modules/<active-module-id>/verification/verification.md` 中写出明确的 `规格约束符合性: 通过|失败` 与 `安全验证: 通过|失败|不适用`。
13. 保留 `state.json.loop`，不重置、不改写。
14. 本阶段通过时，更新当前活动模块的 `module_states.<active-module-id>.current_stage=review`。
15. 若验证失败，明确记录失败原因，交回主 skill 回流到 `execute`。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/modules/<active-module-id>/verification/verification.md`
  - `docs/requests/<request-id>/modules/<active-module-id>/verification/evidence/` 下的可选证据文件

## 验收标准

- 每条验收标准都已被检查。
- 每个验证项都有附件或引用证据。
- `modules/<active-module-id>/verification/verification.md` 已明确写出 `规格约束符合性: 通过|失败`。
- `modules/<active-module-id>/verification/verification.md` 已明确写出 spec-plan 粒度对齐结论。
- 契约一致性、错误路径、幂等、迁移和回滚面已被验证或明确记录为不适用。
- `modules/<active-module-id>/verification/verification.md` 已明确写出 `安全验证: 通过|失败|不适用`。
- rollout readiness 所需证据已被验证或明确记录缺口。
- 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，对应中间件专项证据已被验证或明确记录缺口。
- 若存在失败，要么已修复，要么已明确回流执行。
- 通过时 `state.json.stage=review`，当前活动模块已切到 `review`，且保留原有 `loop`。

## 安全边界

- 不能在没有证据时标记完成。
- 不能忽略失败的 acceptance criteria。
- 不能把 `规格约束符合性` 当作默认成立而不写 `通过|失败`。
