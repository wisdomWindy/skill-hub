---
name: frontend-agent-framework-plan
description: Stage subskill for planning. Convert the approved spec into execution tasks, dependencies, and verification strategy.
---

# Plan Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=plan` 时使用。
- 适用于把已批准 spec 转成执行任务、依赖关系、验证策略的场景。

## 必要输入

- `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
- `docs/requests/<request-id>/module-runs/<current-module-id>/spec/clarifications.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/spec/clarifications.md`
   - `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
   - `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
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
   - `../../references/policies/typescript-context.md`
2. 进入本阶段前，要求当前模块 `approvals.spec_approved=true`。
3. 产出：
   - `module-runs/<current-module-id>/plan/plan.md`
   - `module-runs/<current-module-id>/plan/task-board.md`
4. 默认使用中文写计划工件。
5. 所有任务都必须回溯到已批准 spec。
6. 保持 spec 颗粒度：
   - `plan` 必须沿用 spec 的 function-complete behavior granularity
   - 不能用 plan 私自补产品行为
   - 若 spec 太粗，必须回退到 spec
7. 把任务拆到 `execute` 无需猜测的粒度：
   - 表单拆字段、校验、状态、提交结果
   - 表格拆列、操作、状态
   - 展示拆字段、布局、格式、显隐
   - 交互拆触发、前置条件、UI 变化、副作用、loading 起止
   - 流程拆步骤、分支、回退和交接点
8. 对文本输入类控件，计划必须把实现阶段容易漏掉的隐式输入边界拆出来，不能只照抄 PRD 明写约束，例如：
   - 纯空格输入
   - `trim` 后为空
   - 长度校验按原值还是归一化后值计算
   - 前后空白、连续空白、换行、粘贴内容、非法字符
   - 校验触发时机与报错时机
   若这些语义未在 spec 中定清，必须回退到 spec，不能由 plan 自行偷偷发明。
9. 如果任何产品细节仍未知，显式写成 blocking clarification 或 approved assumption。
10. 如果 PRD 明明有细节而 spec 缺失，视为 spec 质量问题，回退到 spec。
11. 如果 requirement-splitting 已经拆出了模块与功能单元，当前模块计划只能覆盖当前模块，不得把多个模块重新压成一个黑盒计划。
12. 对可测试行为按 TDD 导向拆任务，并在实现前定义验证路径。
13. 对 API 对接工作，拆成：
   - contract-source 确认
   - type reuse / translation
   - request-layer
   - adapter / mapper
   - UI consumption
   - verification
14. 如果 scoped work 为从 0 开始搭建项目、应用、包或前端业务面，计划必须把脚手架或 starter 落地拆成显式任务：
   - 先确认并应用已批准的脚手架选择
   - 再拆脚手架裁剪、目录调整、依赖替换和初始化代码改造
   - 若不使用脚手架，必须把自建 bootstrap 的理由和范围写成任务约束
15. 服务端有 TS 声明时优先复用；无 TS 声明时，保持服务端字段名并写成 TS 类型；proto 需说明复用生成类型还是从 proto 推导。
16. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，计划必须显式拆出：
   - 读取 governing `tsconfig` 与必要的 extends 链
   - 识别影响当前改动的 compiler options 与 alias / global / module-resolution 约束
   - 读取与当前作用域相关的声明或生成类型来源
   - 基于这些约束实施改动与验证
   不得把“全量扫所有 `.d.ts`”写成默认动作。
17. 把 clean-code guardrails、pattern decisions、side-effect boundaries、request-layer ownership 写进计划。
18. 既有代码影响面较大时，优先用 code graph 明确 impact scope，并更新 `artifacts/code-context.md`。
19. 区分串行任务与可并行任务，仅在确实值得时建议 workflow-style parallel execution。
20. 如果请求本质是主动式 workflow，写清 trigger / context / observation points / handoff。
21. 当前模块 `plan/plan.md` 必须使用利于人眼快速扫描的结构：
   - 先给全局摘要
   - 再按任务分节
   - 每个任务都用固定小节展示目标、范围、前置条件、交互、状态、风险、测试
   - 避免输出大段连续散文
22. 每个任务都必须附一个流程图，默认使用 Mermaid，至少覆盖：
   - 起点
   - 关键步骤
   - 分支判断
   - 成功出口
   - 失败/回退出口
23. 如果任务很小，也不能省略流程图；可以使用最小闭环流程图，但不能缺失。
24. 保留 `state.json.loop`，不重置、不改写。
25. 本阶段不写实现代码。
26. 完成后请求用户审批，再设置当前模块 `approvals.plan_approved=true` 并切到 `stage=execute`。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/module-runs/<current-module-id>/plan/plan.md`
  - `docs/requests/<request-id>/module-runs/<current-module-id>/plan/task-board.md`
  - `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）
- 最终交付物应包含：
  - 利于人眼浏览的任务化排版
  - 任务拆解
  - function-complete 级任务细化
  - 每个任务对应的流程图
  - 依赖关系
  - 测试与验证策略
  - API 对接与类型策略
  - 风险与回滚说明
  - clean-code / pattern / boundary 约束
  - trigger / context / handoff 规划（如适用）

## 验收标准

- 当前模块 `plan/plan.md` 已存在并覆盖任务、依赖、影响面、测试、回滚。
- 当前模块 `plan/plan.md` 使用了清晰的人眼友好结构，而不是难以扫描的大段文字。
- 每个任务都有对应流程图。
- 当前模块 `plan/task-board.md` 已存在并反映执行单元。
- 任务颗粒度与已批准 spec 保持一致，不出现产品含义漂移。
- `execute` 无需猜测表单字段、表格列、展示字段、交互效果、loading 结束条件。
- `execute` 无需猜测文本输入的隐式边界语义，尤其是纯空格、归一化后空值、长度计算口径、非法字符与校验触发时机。
- 所有验收标准都已映射到执行任务和验证任务。
- API 对接项已写清 contract source、type strategy、adapter boundary、request-layer ownership。
- 若 scoped work 为 greenfield，计划已把脚手架采用或拒绝及其落地改造拆成显式任务。
- clean-code / pattern 决策已记录。
- 串行与可并行任务已区分。
- 主动式 workflow 的 trigger / context / observation / handoff 已写清（如适用）。
- 用户已审批 plan。
- `state.json.module_flow.modules.<current-module-id>.approvals.plan_approved=true`，`state.json.stage=execute`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能创建 spec 未授权的任务。
- 没有用户审批时不能进入 execution。
- 不能把样例计划当捷径直接套用。
- 对可测试行为，不能把测试设计拖到实现之后。
- 不能把明显的复杂度、重复、混责问题留成未规划状态。
- 不能在没有明确 change axis / rejected alternative 的前提下引入 pattern。
- 不能把 trivial / tightly-coupled 任务包装成 workflow-style parallel execution。
- 不能把 trigger / context / intervention points 留成隐式。
- 不能把页面结构、字段定义、列定义、交互结果、loading 规则留空。
- 不能让 `execute` 自行补产品行为。
- 不能私自把 spec 细化成新行为。
- 不能把多接口/多表面 API 对接压成一个黑盒任务。
- 不能省略任何任务的流程图。
- 不能把整份 `plan.md` 写成只有长段落、缺少任务分节的低可读格式。
