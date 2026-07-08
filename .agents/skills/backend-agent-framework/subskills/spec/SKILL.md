---
name: backend-agent-framework-spec
description: Stage subskill for specification. Turn intake artifacts into the formal backend engineering spec and collect clarifications.
---

# Spec Subskill

## 触发场景

- 当主 `backend-agent-framework` 将请求路由到 `stage=spec` 时使用。

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/requirements/requirement-analysis.md`（PRD 驱动需求必需）
- `docs/requests/<request-id>/requirements/requirement-map.md`（PRD 驱动需求必需）
- `docs/requests/<request-id>/requirements/modules/<active-module-id>.md`（PRD 驱动拆分模块必需）
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）
- `docs/requests/<request-id>/modules/<active-module-id>/design/architecture-design.md`（如当前模块存在 architecture-design 阶段）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/requirements/requirement-analysis.md`
   - `docs/requests/<request-id>/requirements/requirement-map.md`
   - `docs/requests/<request-id>/requirements/modules/<active-module-id>.md`
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `docs/requests/<request-id>/modules/<active-module-id>/design/architecture-design.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/spec.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/clean-code.md`
   - `../../references/policies/code-graph.md`
   - `../../references/policies/design-patterns.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/backend-architecture.md`
   - `../../references/policies/backend-components.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/mysql-enterprise.md`
   - `../../references/policies/redis-enterprise.md`
   - `../../references/policies/kafka-enterprise.md`
   - `../../references/policies/grpc-enterprise.md`
   - `../../references/policies/k8s-enterprise.md`
2. 从 `state.json.module_execution.active_module_id` 恢复当前活动模块；若不存在，则只对未拆分的单请求流使用请求级兜底。
3. 对 PRD 驱动需求，必须先消费 `requirements/requirement-analysis.md`、`requirements/requirement-map.md` 与当前模块工件；如果当前模块存在 architecture-design，则再把它视为上游输入。
4. 仅为当前活动模块产出：
   - `modules/<active-module-id>/spec/spec.md`
   - `modules/<active-module-id>/spec/clarifications.md`
5. 默认使用中文写工件。
6. 把行为定义写到当前模块 downstream 可执行、可审查、可验证的粒度。
7. 明确写清入站接口、出站依赖、事件契约、数据模型、鉴权、配额/限流、幂等、超时/重试、异常语义、观测指标、兼容性、迁移/回滚策略。
8. 对拆分请求，当前 spec 只承接当前活动模块的功能单元；不能把尚未轮到的其他模块重新并入这一份 spec。
9. 如果仍有未知信息，写入 `modules/<active-module-id>/spec/clarifications.md`。
10. 如涉及 MySQL、Redis、Kafka、gRPC 或 Kubernetes，必须把对应中间件或运行时约束写入当前模块 spec。
11. 不写实现代码。
12. 默认自动推进：如果用户没有明确要求在 spec 后停下审批，且不存在真实阻塞决策，则直接把 `approvals.spec_approved=true` 并切到 `stage=plan`。
13. 同步更新当前活动模块的 `module_states.<active-module-id>.current_stage=plan`。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/modules/<active-module-id>/spec/spec.md`
  - `docs/requests/<request-id>/modules/<active-module-id>/spec/clarifications.md`

## 验收标准

- `modules/<active-module-id>/spec/spec.md` 已存在，且覆盖当前模块的 scope、flows、contracts、edge cases、acceptance criteria、risks。
- 行为颗粒度已达到与 `plan` 对齐的 function-complete granularity。
- spec 已记录责任边界、side effect、复杂度边界、模式决策、安全约束与发布/回滚约束。
- 若使用 MySQL、Redis、Kafka、gRPC 或 Kubernetes，spec 已记录对应企业级架构与运行约束。
- `modules/<active-module-id>/spec/clarifications.md` 已记录开放问题与已定决策。
- 若存在 requirement-analysis、requirement-splitting 或当前模块 architecture-design 工件，spec 已完整承接其显式行为约束。
- spec 已被隐式或显式审批。
- `state.json.approvals.spec_approved=true`，`state.json.stage=plan`，当前活动模块已切到 `plan`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能在 spec 不存在前生成实现任务。
- 不能把行为写得含糊到需要实现阶段去猜。
- 不能把重大抽象/协作问题留给下游自己决定。
