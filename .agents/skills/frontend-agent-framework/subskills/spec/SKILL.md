---
name: frontend-agent-framework-spec
description: Stage subskill for specification. Turn intake artifacts into the formal frontend engineering spec and collect clarifications.
---

# Spec Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=spec` 时使用。
- 适用于需要把 intake 结果转成正式前端工程合同的场景。

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`（PRD 驱动需求必需）
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（PRD 拆分需求必需）
- `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）
- `docs/requests/<request-id>/module-runs/<current-module-id>/design/page-design.md`（如存在 page-design 阶段）
- `docs/requests/<request-id>/module-runs/<current-module-id>/design/architecture-design.md`（如存在 architecture-design 阶段）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
   - `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `docs/requests/<request-id>/module-runs/<current-module-id>/design/page-design.md`（如存在）
   - `docs/requests/<request-id>/module-runs/<current-module-id>/design/architecture-design.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/spec.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/clean-code.md`
   - `../../references/policies/code-graph.md`
   - `../../references/policies/design-patterns.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/frontend-architecture.md`
   - `../../references/policies/frontend-components.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/typescript-context.md`
   - `../../references/policies/user-intent.md`
2. 先消费 intake 工件；对 PRD 驱动需求，必须先消费 `requirements/requirement-map.md` 与当前模块工件；如果存在当前模块的 `page-design` 或 `architecture-design`，则再把它们视为上游输入。
3. 把 `artifacts/prd-snapshot.md` 当作结构化抽取来使用；如果它或 requirement-splitting 工件比原始需求源更薄，必须回看原始 PRD/稳定引用。
4. 产出：
   - `module-runs/<current-module-id>/spec/spec.md`
   - `module-runs/<current-module-id>/spec/clarifications.md`
5. 把行为定义写到 downstream 可执行、可审查、可验证的粒度。
6. 明确把行为写到与 `plan` 对齐的 function-complete granularity：
   - 表单要写字段、必填/选填、控件、校验、状态、提交结果
   - 表格要写列意图、行/批量操作、展示与状态
   - 展示类要写字段、分组、布局、格式、显隐
   - 交互/流程要写触发、状态流转、副作用、成功/失败/loading 预期
7. 对文本输入类控件，不能只记录 PRD 明写约束；凡是实现必须自行决定的输入语义，也必须在 spec 中显式写明或写入 clarification / assumption，例如：
   - 是否 `trim`
   - 纯空格输入如何处理
   - `trim` 后为空如何处理
   - 长度校验按原值还是归一化后值计算
   - 前后空白、连续空白、换行、粘贴内容、非法字符的处理口径
   - 校验触发时机（输入中 / blur / submit）
8. 如果上游需求源已经给出字段、列、交互、状态、流程细节，这些信息必须进入 spec，不能因为 intake 摘要粗化而丢失。
9. 如果 requirement-splitting 已经按模块拆分了内容，当前模块 spec 只能承接当前模块功能单元，不能重新合并多个模块。
10. 如果仍有未知信息，写入当前模块 `spec/clarifications.md`，作为显式 clarification 或 approved assumption。
11. 如果 requirement-analysis 或用户当前输入包含 user intent contract，spec 必须承接并细化：
   - literal request
   - practical goal
   - success criteria
   - forbidden interpretations
   - acceptable approaches
   - verification / review checks
   不能把“后续实现自己理解用户意图”作为策略。
12. 把可维护性、抽象边界、side effect、duplication ownership、命名与模式决策写成 spec constraints，而不是留给下游凭感觉判断。
13. 如涉及新增或修改样式，spec 必须记录 Tailwind CSS-style utility class 约束：
   - authored styling 只能使用 Tailwind CSS-style utilities
   - `class` / `className` / class binding 值必须保持可在模板内直接审查，超过项目 formatter 正常行宽或需要多行包裹即视为过长
   - 不允许用常量、map、computed、helper 或 import 变量隐藏过长 class 值
   - 条件 class binding 只能承载小型状态切换，不能承载大段基础样式
14. 如果存在当前模块 `architecture-design`，spec 必须承接其中的模块边界、文件结构、依赖方向、函数分层、数据结构与类型策略，不能在 spec 阶段重新发明或悄悄改写。
15. 如果 scoped work 是从 0 开始搭建项目、应用、包或前端业务面，必须在 spec 中明确脚手架或 starter 决策：
   - 优先判断是否存在合适的同类型项目脚手架
   - 有可复用脚手架时，默认复用并写明来源
   - 不复用时，必须记录不适配、不可用或改造成本不合理的原因
   - 允许偏离脚手架的范围也要提前写明
16. 如涉及后端接口：
   - 识别权威 contract source
   - 记录 direct contract consumption 还是 adapter boundary
   - 服务端有 TypeScript 声明则优先复用
   - 非 TS 契约则保留字段名并写成 TS 可用类型
   - protobuf 需说明是复用生成类型还是由 proto 导出前端可用类型
17. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，spec 必须记录：
   - 哪个 `tsconfig` 实际 governs 当前作用域文件
   - 哪些 compiler options 会 materially 影响实现或类型理解，例如路径别名、ambient globals、JSX runtime、strictness、module resolution
   - 哪些声明或生成类型来源属于当前改动必须读取的闭包范围
   - 明确禁止把“后面执行时再猜 tsconfig / 再扫全仓 `.d.ts`”当作实现策略
18. 如涉及既有代码结构调整：
   - 优先用 code graph 识别真实边界、依赖方向和 impact scope
   - 如结构理解加深，更新 `artifacts/code-context.md`
19. 不写实现代码。
20. 完成后请求用户审批，再把当前模块 `approvals.spec_approved=true` 并切到 `stage=plan`。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
  - `docs/requests/<request-id>/module-runs/<current-module-id>/spec/clarifications.md`
- 最终交付物应包含：
  - scope / flow / modules / contracts / edge cases / acceptance criteria / risks
  - 与 requirement-splitting 对齐的模块边界与 source trace
  - user intent contract
  - API 与数据合同决策
  - API contract source / type reuse / protobuf handling / adapter-boundary 决策
  - design constraints
  - frontend styling constraints
  - pattern decision
  - clarifications
  - 可直接驱动 plan 的 function-complete behavior contracts

## 验收标准

- 当前模块 `spec/spec.md` 已存在，且覆盖 scope、flows、modules、contracts、edge cases、acceptance criteria、risks。
- 行为颗粒度已达到与 `plan` 对齐的 function-complete granularity。
- 如存在 user intent contract，spec 已保留 practical goal、forbidden interpretations、success criteria 和 intent-level verification checks。
- spec 已记录 responsibility boundaries、side-effect placement、duplication ownership、complexity guardrails、pattern use / rejection。
- 如涉及样式变更，spec 已记录 Tailwind CSS-style utility class、class 值长度、禁止隐藏过长 class 字符串的约束。
- 当前模块 `spec/clarifications.md` 已记录开放问题与已定决策。
- spec 足够清晰，plan / tests / verification evidence 都能回溯到它。
- spec 没有迫使 `plan` 自行补写原本应在 spec 中明确的产品行为。
- 若上游已有显式字段/列/交互/状态/流程要求，spec 已完整带下。
- 若存在 requirement-splitting 工件，当前模块 spec 已完整承接当前模块显式行为约束。
- 若存在 architecture-design 工件，当前模块 spec 已完整承接当前模块代码架构决策。
- 若 scoped work 为 greenfield，spec 已明确脚手架或 starter 决策及允许偏离范围。
- 用户已审批 spec。
- `state.json.module_flow.modules.<current-module-id>.approvals.spec_approved=true`，`state.json.stage=plan`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能在 spec 不存在前生成实现任务。
- 没有用户审批时不能进入 `plan`。
- 不能把样例 spec 的结论直接复制到新请求中。
- 不能把行为写得含糊到需要实现阶段去猜。
- 不能只满足用户字面表达而丢失实际目标、反例和禁止规避方式。
- 不能把行为停留在比 `plan` 所需更粗的颗粒度。
- 不能遗漏上游已明确给出的字段、交互、状态、流程信息。
- 不能绕过 requirement-splitting 工件重新凭印象组织模块范围。
- 不能把重大抽象/协作问题留给下游自己决定。
- 不能把关键 responsibility / side-effect / duplication / readability 约束留空。
- 不能把样式实现方式、class 值长度治理或禁止隐藏过长 class 字符串的规则留给下游自己决定。
