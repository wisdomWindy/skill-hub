---
name: backend-agent-framework-architecture-design
description: Stage subskill for architecture design. Define backend boundaries, interface surfaces, workflow structure, and persistence strategy for backend-structural requests before the formal spec stage.
---

# Architecture Design Subskill

## 触发场景

- 当主 `backend-agent-framework` 在 `requirement-splitting` 之后判断当前活动模块是后端结构型需求时使用。

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/requirements/requirement-analysis.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`
- `docs/requests/<request-id>/requirements/modules/<active-module-id>.md`
- `docs/requests/<request-id>/state.json`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/requirements/requirement-analysis.md`
   - `docs/requests/<request-id>/requirements/requirement-map.md`
   - `docs/requests/<request-id>/requirements/modules/<active-module-id>.md`
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/templates/architecture-design.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/backend-architecture.md`
   - `../../references/policies/backend-components.md`
   - `../../references/policies/grpc-enterprise.md`
   - `../../references/policies/k8s-enterprise.md`
2. 从 `state.json.module_execution.active_module_id` 恢复当前活动模块；若不存在，则只对未拆分的单请求流使用请求级兜底。
3. 仅为当前活动模块产出 `modules/<active-module-id>/design/architecture-design.md`。
4. 默认使用中文写工件；代码标识、协议名、字段名、错误码、路径等源标识保持原文。
5. 明确定义职责边界、接口面、调用链与执行路径、领域流程、数据所有权、事务/一致性策略、幂等/重试/超时/失败补偿、观测点与人工干预点。
6. 如涉及 gRPC 或 Kubernetes，补充对应企业级契约与运行时约束。
7. 设计结果必须足够稳定，使当前模块的 `spec` 能把它当作上游输入。
8. 必须以 `requirements/requirement-analysis.md`、`requirements/requirement-map.md` 与当前活动模块工件为范围来源，不得越权设计尚未轮到的其他模块。
9. 保留 `state.json.loop`，不重置、不改写。
10. 本阶段完成时，更新当前模块的 `module_states.<active-module-id>.current_stage=spec`。
11. 本阶段不写代码。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/modules/<active-module-id>/design/architecture-design.md`

## 验收标准

- `modules/<active-module-id>/design/architecture-design.md` 已存在。
- 文档已定义边界、接口面、执行路径、数据所有权、一致性策略、失败处理和观测点。
- 若涉及 gRPC 或 Kubernetes，文档已定义对应契约边界与运行时架构约束。
- 所有未决结构问题已记录。
- `state.json.stage=spec`，当前活动模块已切到 `spec`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能把本阶段退化成泛泛的架构空话。
- 没有 durable design artifact 时，不能进入实现规划。
