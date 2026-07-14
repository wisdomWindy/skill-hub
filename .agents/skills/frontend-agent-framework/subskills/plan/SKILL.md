---
name: frontend-agent-framework-plan
description: Stage subskill for planning. Convert the approved spec into execution tasks, dependencies, and verification strategy.
---

# Plan Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=plan` 时使用。
- 适用于把已批准 spec 转成执行任务、依赖关系、验证策略的场景。

## 必要输入

- 当前交付单元的 `spec/spec.md`
- 当前交付单元的 `spec/clarifications.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - 当前交付单元的 `spec/spec.md`
   - 当前交付单元的 `spec/clarifications.md`
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
   - `../../references/policies/frontend-components.md`
   - `../../references/policies/functional-programming.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/typescript-context.md`
   - `../../references/policies/user-intent.md`
2. 进入本阶段前，要求当前交付单元 spec 已审批：
   - 拆分 PRD 模块：`state.json.module_flow.modules.<current-module-id>.approvals.spec_approved=true`
   - bugfix 或非拆分请求：`state.json.approvals.spec_approved=true`
3. 产出：
   - 当前交付单元的 `plan/plan.md`
   - 当前交付单元的 `plan/task-board.md`
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
17. 如 spec 包含 user intent contract，计划必须把 intent compliance 拆进执行和验证任务：
   - 每个相关任务写清 practical goal
   - 每个相关任务写清 forbidden interpretations
   - 每个相关任务写清如何证明没有把问题、复杂度或风险转移到别处
   - 不能只把字面要求拆成任务而遗漏反例约束
18. 如 scoped work 包含修改或移除既有代码，计划必须先拆出变更链路审查任务：
   - 审查功能入口、组件 / hook / store / service / adapter / helper 链路
   - 审查文件引用关系、import / export、调用方、消费者、事件、watch / computed、测试与 mock
   - 审查副作用、请求、状态流转、下游 UI 或数据消费者
   - 写明哪些链路环节是本次变更的 owner，哪些只是邻近影响面
   - 写明测试文件引用只作为测试适配面，不作为保留待改 / 待删生产代码的真实调用方
   - 写明操作完成后的链路复查方式，确保不缺少必要环节，也不保留多余环节
19. 如 scoped work 包含移除调用、请求、分支、字段、控件或副作用，计划必须拆出删除依赖闭包清理任务：
   - 检查 import / export
   - 检查 helper function / constant / enum / type
   - 检查 request wrapper / composable / adapter
   - 检查 ref / reactive state / computed / watch
   - 检查 tests / mocks / comments
   - 保留 helper 时必须记录真实生产调用方；仅测试文件引用不算真实调用方，必须改测试适配需求
20. 如涉及新增或修改样式，计划必须把 Tailwind CSS-style styling 约束拆进任务：
   - 只使用 Tailwind CSS-style utility classes 落地 authored styling
   - 不新增 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class 作为样式方案
   - `class` / `className` / class binding 值不得超过项目 formatter 正常行宽或依赖多行包裹
   - 不得用常量、map、computed、helper 或 import 变量隐藏过长 class 值
   - 过长时必须拆分结构、提取更小组件或降低样式复杂度
21. 如 scoped work 包含业务规则、校验、筛选排序、payload 构造、状态派生、接口数据到表单或视图模型转换，计划必须把 functional-programming 约束拆进任务：
   - 把确定性规则和数据转换拆成纯函数或纯 mapper 任务
   - 把请求、导航、写状态、缓存、埋点等副作用拆到明确 command / action / request / lifecycle 边界
   - 规定不可直接 mutate props、backend DTO、共享 store snapshot、函数参数或导入常量
   - 明确 adapter / mapper / `fromDetail` 负责数据语义归一，computed 仅用于视图局部派生
   - 为纯函数、mapper、payload builder 或 validator 设计可验证路径
22. 把 clean-code guardrails、functional-programming boundaries、pattern decisions、side-effect boundaries、request-layer ownership 写进计划。
23. 既有代码影响面较大时，优先用 code graph 明确 impact scope，并更新 `artifacts/code-context.md`。
24. 区分串行任务与可并行任务，仅在确实值得时建议 workflow-style parallel execution。
25. 如果请求本质是主动式 workflow，写清 trigger / context / observation points / handoff。
26. 当前交付单元 `plan/plan.md` 必须使用利于人眼快速扫描的结构：
   - 先给全局摘要
   - 再按任务分节
   - 每个任务都用固定小节展示目标、范围、前置条件、交互、状态、风险、测试
   - 避免输出大段连续散文
27. 每个任务都必须附一个流程图，默认使用 Mermaid，至少覆盖：
   - 起点
   - 关键步骤
   - 分支判断
   - 成功出口
   - 失败/回退出口
28. 如果任务很小，也不能省略流程图；可以使用最小闭环流程图，但不能缺失。
29. 保留 `state.json.loop`，不重置、不改写。
30. 本阶段不写实现代码。
31. 完成后请求用户审批，再设置审批并切到 `stage=execute`：
   - 拆分 PRD 模块：`state.json.module_flow.modules.<current-module-id>.approvals.plan_approved=true`
   - bugfix 或非拆分请求：`state.json.approvals.plan_approved=true`

## 输出格式

- 必须产出：
  - 当前交付单元的 `plan/plan.md`
  - 当前交付单元的 `plan/task-board.md`
  - `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）
- 最终交付物应包含：
  - 利于人眼浏览的任务化排版
  - 任务拆解
  - function-complete 级任务细化
  - user intent compliance 任务（如适用）
  - change-chain review 任务（修改或移除既有代码时适用）
  - removal cleanup 任务（如适用）
  - 每个任务对应的流程图
  - 依赖关系
  - 测试与验证策略
  - API 对接与类型策略
  - 风险与回滚说明
  - clean-code / functional-programming / pattern / boundary 约束
  - Tailwind CSS-style styling 约束（如适用）
  - trigger / context / handoff 规划（如适用）

## 验收标准

- 当前交付单元 `plan/plan.md` 已存在并覆盖任务、依赖、影响面、测试、回滚。
- 当前交付单元 `plan/plan.md` 使用了清晰的人眼友好结构，而不是难以扫描的大段文字。
- 每个任务都有对应流程图。
- 当前交付单元 `plan/task-board.md` 已存在并反映执行单元。
- 任务颗粒度与已批准 spec 保持一致，不出现产品含义漂移。
- `execute` 无需猜测表单字段、表格列、展示字段、交互效果、loading 结束条件。
- `execute` 无需猜测文本输入的隐式边界语义，尤其是纯空格、归一化后空值、长度计算口径、非法字符与校验触发时机。
- 所有验收标准都已映射到执行任务和验证任务。
- 如 spec 包含 user intent contract，计划已把 literal compliance 与 intent compliance 都映射到任务和验证点。
- 如存在既有代码修改或移除，计划已拆出操作前功能链路与引用关系审查任务，并拆出操作后链路完整性复查任务。
- 如存在行为移除，计划已拆出该行为独占依赖闭包的清理与验证任务。
- 如测试文件引用待改或待删生产代码，计划已把这些测试列为适配项，而不是把测试引用当作保留生产代码的依据。
- API 对接项已写清 contract source、type strategy、adapter boundary、request-layer ownership。
- 若 scoped work 为 greenfield，计划已把脚手架采用或拒绝及其落地改造拆成显式任务。
- clean-code / pattern 决策已记录。
- 如涉及规则、校验、数据转换、状态派生或 payload 构造，计划已拆出纯函数、不可变数据、副作用边界和测试 / 验证任务。
- 如涉及样式变更，计划已拆出 Tailwind CSS-style utility class、class 值长度、禁止隐藏过长 class 字符串的执行和验证任务。
- 串行与可并行任务已区分。
- 主动式 workflow 的 trigger / context / observation / handoff 已写清（如适用）。
- 用户已审批 plan。
- 拆分 PRD 模块已设置 `state.json.module_flow.modules.<current-module-id>.approvals.plan_approved=true`；bugfix 或非拆分请求已设置 `state.json.approvals.plan_approved=true`。
- `state.json.stage=execute`，且保留原有 `loop`。

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
- 不能让 `execute` 自行理解用户真实意图或自行发现 forbidden interpretations。
- 不能让 `execute` 在未规划功能链路、文件引用关系、调用方、副作用和影响面审查的情况下修改或移除既有代码。
- 不能让 `execute` 自行发现行为移除后的 orphan helper、unused import、stale request wrapper、obsolete state、测试或注释残留。
- 不能因为测试文件仍引用待改或待删代码，就把该测试引用规划成生产代码真实调用方；应规划测试适配。
- 不能私自把 spec 细化成新行为。
- 不能把多接口/多表面 API 对接压成一个黑盒任务。
- 不能省略任何任务的流程图。
- 不能把整份 `plan.md` 写成只有长段落、缺少任务分节的低可读格式。
- 不能把样式实现方式、class 值长度治理或禁止隐藏过长 class 字符串的检查留给 execute 自行决定。
- 不能把纯函数边界、不可变数据处理、副作用边界或 adapter / mapper 语义归一留给 execute 自行决定。
