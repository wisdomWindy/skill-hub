---
name: frontend-agent-framework-architecture-design
description: Stage subskill for code architecture design. Define frontend module boundaries, file structure, code relationships, function structure, data structures, and type strategy before the formal spec stage when these decisions materially shape delivery.
---

# Architecture Design Subskill

## 触发场景

- 当主 `frontend-agent-framework` 在 `requirement-splitting` 之后判断该需求是代码架构敏感型前端需求时使用。
- 适用于：
  - 模块边界需要重构或新建
  - 文件结构或目录结构需要明确设计
  - 页面容器、业务组件、共享组件、hooks、adapter、types 的职责边界需要提前固定
  - 复杂流程需要先定义代码关系和依赖方向
  - 函数组织、状态归属、数据结构或 TypeScript 类型策略会显著影响后续实现

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（拆分 PRD 模块适用）
- 当前交付单元的 `design/page-design.md`（如存在）
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
- 当前交付单元的 `execution/changelog.md`（如存在）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/requirements/requirement-map.md`
   - `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
   - 当前交付单元的 `design/page-design.md`（如存在）
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - 当前交付单元的 `execution/changelog.md`（如存在）
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/templates/architecture-design.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/frontend-architecture.md`
   - `../../references/policies/frontend-components.md`
   - `../../references/policies/functional-programming.md`
   - `../../references/policies/design-patterns.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/code-graph.md`
2. 只在代码架构敏感型前端需求中使用本阶段。
3. 仅为当前交付单元产出架构设计；拆分 PRD 工作不得跨模块混写。
4. 产出当前交付单元的 `design/architecture-design.md`。
5. 如果存在当前交付单元的 `page-design`，把它视为上游输入，代码架构设计不得和页面结构决策冲突。
6. 明确定义：
   - 模块边界
   - 文件与目录结构
   - 代码关系与依赖方向
   - page/container、business component、shared component、hook、adapter、type 的职责切分
   - 函数分层与公开入口
   - 纯函数边界、组合方式与副作用边界
   - 状态归属与数据流
   - 数据结构与类型设计策略
   - adapter / mapper / request-layer 边界
   - 命名口径与共享抽象约束
   - 需要使用或明确拒绝的 pattern 决策
7. 如果是 greenfield 场景，代码架构设计必须和已批准的脚手架或 starter 决策保持一致，并明确允许的偏离范围。
8. 设计结果必须足够稳定，使当前交付单元的 `spec` 能把它当作上游输入，而不是在 `spec` 或 `execute` 阶段重新发明模块与类型结构。
9. 拆分 PRD 工作必须以 `requirements/requirement-map.md` 和当前模块工件为范围来源，不得跨模块混写；bugfix 或非拆分请求以 `request.md`、`artifacts/prd-snapshot.md` 和既有 code context 为范围来源。
10. 如果本阶段是从 `execute` 回退而来，必须优先吸收当前交付单元 `execution/changelog.md` 与 `artifacts/code-context.md` 中记录的实际代码约束、依赖边界和失败证据，修正不合理的架构设计，而不是重复原设计。
11. 如果既有代码结构影响较大，优先结合 `code-context.md` 或 code graph 结果确认真实依赖边界。
12. 所有设计决策必须写入仓库工件，不保留在聊天上下文里。
13. 保留 `state.json.loop`，不重置、不改写。
14. 本阶段不写代码。
15. 对于会显著影响当前交付单元设计、文件结构、代码关系、函数结构、数据结构或类型设计的需求，不允许跳过本阶段。

## 输出格式

- 必须产出：
  - 当前交付单元的 `design/architecture-design.md`
- 最终交付物应至少包含：
  - 模块边界
  - 文件结构
  - 代码关系
  - 函数设计
  - 数据结构与类型策略
  - 架构风险与未决问题

## 验收标准

- 当前交付单元 `design/architecture-design.md` 已存在。
- 文档已定义模块边界、文件结构、依赖方向、职责分层、函数组织、数据结构和类型策略。
- 文档已定义哪些规则 / 转换适合纯函数，哪些行为属于明确副作用边界。
- 若存在 page-design，架构设计已与页面结构决策对齐。
- 若 scoped work 为 greenfield，架构设计已与脚手架策略对齐并写明允许偏离范围。
- 若本阶段来自 `execute` 回退，文档已吸收执行期暴露的实际代码约束并修正原有不合理设计。
- 所有未决架构问题已记录。
- `state.json.stage=spec`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能把本阶段退化成抽象空话或泛泛“最佳实践”。
- 不能把函数式编程写成口号；必须落到纯函数边界、不可变数据流、组合方式或副作用归属。
- 不能绕过上游 requirement-splitting 直接凭印象做架构。
- 不能在没有 durable design artifact 的情况下进入实现规划。
