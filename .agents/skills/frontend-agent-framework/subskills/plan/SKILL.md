---
name: frontend-agent-framework-plan
description: Stage subskill for planning. Convert the framework-approved spec into execution tasks, dependencies, and verification strategy.
---

# Plan Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=plan` 时使用。
- 适用于把已通过 framework 自动审批的 spec 转成执行任务、依赖关系、验证策略的场景。

## 必要输入

- 当前交付单元的 `spec/spec.md`
- 当前交付单元的 `spec/clarifications.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

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
   - `../../references/policies/policy-index.md`
   - 按 `policy-index.md` 的 `plan` 阶段映射读取本次 scoped work 适用的 policy 文件；默认至少读取 `source-grounding.md`、`testing.md`、`design-patterns.md`、`doc-writing.md`、`plan-executable-contract.md`；生产代码改动默认读取 `code-review-checklist.md`；如需要选择 compact tasking、scoped verification 或 parallelism，读取 `workflow-efficiency.md`
2. 进入本阶段前，要求当前交付单元 spec 已通过 framework 自动审批：
   - 拆分 PRD 模块：`state.json.module_flow.modules.<current-module-id>.approvals.spec_approved=true`
   - direct-change、bugfix 或非拆分请求：`state.json.approvals.spec_approved=true`
3. 产出：
   - 当前交付单元的 `plan/plan.md`
   - 当前交付单元的 `plan/task-board.md`
4. 默认使用中文写计划工件。
   - 若 `state.json.speed_profile` 为 `S0` / `S1`，使用 compact plan：保留必需章节与适用合同，不适用章节一行说明；任务数量保持最少，避免为单路径小改制造多任务、多流程图和重复政策复述。
5. 所有任务都必须回溯到已通过 framework 自动审批的 spec。
6. 每个任务必须带 source-grounding 标签与 spec 来源引用；没有来源锚定的内容不得进入 `plan/plan.md` 或 `plan/task-board.md`。
7. 保持 spec 颗粒度：
   - `plan` 必须沿用 spec 的 function-complete behavior granularity
   - 不能用 plan 私自补产品行为
   - 若 spec 太粗，必须回退到 spec
8. 先把业务功能需求点和业务逻辑拆到 `execute` 无需猜测的粒度，再拆代码任务：
   - 每个业务功能点写清业务目标、角色、业务对象、触发入口、前置条件、成功结果、失败结果和验收标准
   - 每个业务术语、状态、类型、枚举、动作、权限、角色、字段、金额、时间、阈值、开关都必须定义语义
   - 每条业务规则写清条件、判断顺序、优先级、输入、输出、默认行为、异常行为和不可做事项
   - 每个业务分支写清触发条件、状态流转、回退、重试、取消、不可达状态和终态
   - 每个字段写清来源、业务含义、合法值、空值语义、默认值、回填规则、展示规则、提交规则和适配 / 归一位置
   - 每个校验写清触发时机、阻断条件、错误文案、服务端错误映射和验证方式
   - 每个权限 / 可见性 / 可编辑 / 禁用 / 只读 / 二次确认规则都必须有明确条件
   - 每个跨字段、跨步骤、跨接口或跨状态依赖都必须写清依赖方向和互斥关系
   - 不能用“按业务规则”“按原逻辑”“按现有逻辑”“按常规处理”替代业务逻辑定义
9. 把任务拆到 `execute` 无需猜测的粒度：
   - 表单拆字段、校验、状态、提交结果
   - 表格拆列、操作、状态
   - 展示拆字段、布局、格式、显隐
   - 交互拆触发、前置条件、UI 变化、副作用、loading 起止
   - 流程拆步骤、分支、回退和交接点
   - 代码改动拆到目标文件、目标符号、前后行为、数据结构、依赖关系、副作用、清理项和验证命令
   - 每个任务必须明确 execute 需要编辑、保留、删除、迁移、验证的对象，不能只写方向性动作
10. 计划必须通过 execute-readiness 自检：
   - 是否每个任务都有精确业务功能点、业务规则、业务分支、字段语义、状态流、scope、文件 / 符号 owner、数据合同、实现步骤、验证方式和回退条件
   - 是否消除了 execute 需要猜测的业务规则、字段含义、列含义、接口、状态、错误文案、loading 边界、清理目标、测试目标或样式方案
   - 是否明确哪些信息来自 approved spec，哪些来自代码事实，哪些是已批准假设，哪些必须阻塞
   - 是否不存在“按现有逻辑”“按常规处理”“完善相关逻辑”“优化代码”等不能直接执行的模糊任务描述
   - 如果自检不通过，必须回退到 spec 或前置确认 gate，不能自动审批 plan
11. 对文本输入类控件，计划必须把实现阶段容易漏掉的隐式输入边界拆出来，不能只照抄 PRD 明写约束，例如：
   - 纯空格输入
   - `trim` 后为空
   - 长度校验按原值还是归一化后值计算
   - 前后空白、连续空白、换行、粘贴内容、非法字符
   - 校验触发时机与报错时机
   若这些语义未在 spec 中定清，必须回退到 spec，不能由 plan 自行偷偷发明。
12. 如果任何产品细节仍未知，显式写成 blocking clarification 或 framework-approved assumption；如果该未知项需要人工确认，不能在本阶段请求用户审批，必须回退到 `requirement-analysis`、`intake` 或 `bugfix-intake` 的前置确认 gate。
13. 如果计划需要的内容只有常规做法、相邻模块、样例内容或偏好实现支撑，必须回退到 spec 或前置确认 gate，不能在 plan 阶段补成任务。
14. 如果 PRD 明明有细节而 spec 缺失，视为 spec 质量问题，回退到 spec。
15. 如果 requirement-splitting 已经拆出了模块与功能单元，当前模块计划只能覆盖当前模块，不得把多个模块重新压成一个黑盒计划。
16. 对可测试行为按 TDD 导向拆任务，并在实现前定义验证路径。
17. 对 API 对接工作，拆成：
   - contract-source 确认
   - type reuse / translation
   - request-layer
   - adapter / mapper
   - UI consumption
   - verification
18. 如果 scoped work 为从 0 开始搭建项目、应用、包或前端业务面，计划必须把脚手架或 starter 落地拆成显式任务：
   - 先确认并应用 spec 中已通过 framework 自动审批的脚手架选择
   - 再拆脚手架裁剪、目录调整、依赖替换和初始化代码改造
   - 若不使用脚手架，必须把自建 bootstrap 的理由和范围写成任务约束
19. 服务端有 TS 声明时优先复用；无 TS 声明时，保持服务端字段名并写成 TS 类型；proto 需说明复用生成类型还是从 proto 推导。
20. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，计划必须显式拆出：
   - 读取 governing `tsconfig` 与必要的 extends 链
   - 识别影响当前改动的 compiler options 与 alias / global / module-resolution 约束
   - 读取与当前作用域相关的声明或生成类型来源
   - 基于这些约束实施改动与验证
   不得把“全量扫所有 `.d.ts`”写成默认动作。
21. 如 spec 包含 user intent contract，计划必须把 intent compliance 拆进执行和验证任务：
   - 每个相关任务写清 practical goal
   - 每个相关任务写清 forbidden interpretations
   - 每个相关任务写清如何证明没有把问题、复杂度或风险转移到别处
   - 不能只把字面要求拆成任务而遗漏反例约束
22. 如 scoped work 包含修改或移除既有代码，计划必须先拆出变更链路审查任务：
   - 审查功能入口、组件 / hook / store / service / adapter / helper 链路
   - 审查文件引用关系、import / export、调用方、消费者、事件、watch / computed、测试与 mock
   - 审查副作用、请求、状态流转、下游 UI 或数据消费者
   - 写明哪些链路环节是本次变更的 owner，哪些只是邻近影响面
   - 写明测试文件引用只作为测试适配面，不作为保留待改 / 待删生产代码的真实调用方
   - 写明操作完成后的链路复查方式，确保不缺少必要环节，也不保留多余环节
23. 如 scoped work 包含移除调用、请求、分支、字段、控件或副作用，计划必须拆出删除依赖闭包清理任务：
   - 检查 import / export
   - 检查 helper function / constant / enum / type
   - 检查 request wrapper / composable / adapter
   - 检查 ref / reactive state / computed / watch
   - 检查 tests / mocks / comments
   - 保留 helper 时必须记录真实生产调用方；仅测试文件引用不算真实调用方，必须改测试适配需求
24. 如涉及新增或修改样式，计划必须把 Tailwind CSS-style styling 约束拆进任务：
   - 只使用 Tailwind CSS-style utility classes 落地 authored styling
   - 不新增 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class 作为样式方案
   - `class` / `className` / class binding 值不得超过项目 formatter 正常行宽或依赖多行包裹
   - 不得用常量、map、computed、helper 或 import 变量隐藏过长 class 值
   - 过长时必须拆分结构、提取更小组件或降低样式复杂度
25. 如 scoped work 包含业务规则、校验、筛选排序、payload 构造、状态派生、接口数据到表单或视图模型转换，计划必须把 functional-programming 约束拆进任务：
   - 把确定性规则和数据转换拆成纯函数或纯 mapper 任务
   - 把请求、导航、写状态、缓存、埋点等副作用拆到明确 command / action / request / lifecycle 边界
   - 规定不可直接 mutate props、backend DTO、共享 store snapshot、函数参数或导入常量
   - 明确 adapter / mapper / `fromDetail` 负责数据语义归一，computed 仅用于视图局部派生
   - 为纯函数、mapper、payload builder 或 validator 设计可验证路径
26. 如 scoped work 添加或修改生产代码，计划必须把 production-code-quality 约束拆进任务：
   - 先定义或复用精确 `type` / `interface`，再实现依赖这些数据的逻辑；必要时规划 branded type 或等价名义区分
   - 把异常、空值、非法值、请求失败、超时、部分成功和不可能状态拆成显式处理与验证点
   - 明确 `null` 与 `undefined` 语义，规定 `??` / `?.` 的防御位置，以及禁止用展示兜底替代业务校验的位置
   - 优先规划可读实现；只有真实性能或引用稳定性需求时才规划 memoization、cache、debounce、throttle、virtualization、`useMemo` / `useCallback` / computed caching，并写明依赖合理性说明
   - 把确定性规则、校验、转换、format、payload builder、状态派生规划为纯函数和不可变数据更新；class 只能在 spec 已说明理由时使用
   - 把布尔命名、props 回调 `on*`、内部事件 `handle*`、函数精准动词作为执行检查项
   - 明确 helper 依赖来源，避免 magic variables；真实配置常量集中到最窄稳定 owner，禁止把一次性值或过长 class 放进常量规避审查
   - 对列表空状态、异步 loading 状态、表单输入错误状态拆出实现与验证任务
27. 如 scoped work 修改生产代码、测试、mock、契约或生成类型可见文件，计划必须把 human-review-readiness 约束拆进任务：
   - 明确允许改动的文件、符号和行为范围
   - 明确不允许的无关改动、宽泛格式化、顺手重构和未批准重命名
   - 拆出相邻项目惯例阅读与遵守任务
   - 拆出 changed hunks 到 plan task / cleanup / test adaptation 的映射要求
   - 拆出 pre-review self-check：无 debug code、dead code、stale comments、temporary names、unused import / export、stale tests / mocks
   - 拆出 reviewer-ready evidence：测试、类型检查、lint、手工验证、未运行命令原因和剩余风险
   同时，如 scoped work 添加或修改生产代码，计划必须先执行 code-review checklist 预检，并把预检结果转成 execute 必须遵守的合同：
   - 健壮性：外部数据、接口响应、路由参数、存储值、props、表单输入、第三方返回值的可选链 / 判空 / 合法性保护；API 调用的异常捕获、rejected promise 处理和错误边界
   - 可维护性：超过 150 行或混合职责函数的拆分策略；orchestration、request、transform、render、side effect、validation 的职责边界；魔法数字是否提取为具备语义的最窄 owner 常量
   - 性能与内存：高频事件是否触发 debounce / throttle / cancellation / dedupe / no-optimization 决策；订阅、定时器、监听器、watcher、effect、请求取消句柄和外部资源的 cleanup / dispose / unmount 责任
   - 项目规范一致性：组件库、样式方案、目录结构、import alias / 相对路径、状态管理、请求封装、框架和库选择必须遵守 spec / plan、`code-context.md`、相邻代码和项目 AGENTS 形成的技术栈锚定
   - 明确禁止 execute 擅自更改技术栈、替换组件库、绕过既有样式方案、改变目录引用方式或引入未批准框架 / 库；执行中发现合同缺项必须回退到 plan
28. 如 scoped work 新增或修改用户可见行为、状态流、数据流、组件组合、前端架构或生产集成，计划必须把 expert frontend engineering 约束拆进任务：
   - 用户旅程、可见状态、失败/重试/取消/交接
   - 状态所有权、数据生命周期、derived state 与 writable state 边界
   - 异步 loading owner、去重、取消、过期响应、竞态、幂等、重试
   - 键盘、焦点、语义控件、disabled、确认、权限、反馈
   - render scope、大列表、昂贵派生、bundle、响应式 fan-out
   - migration、兼容边界、回滚面、清理触发器、双路径 owner
   - 测试与诊断证据
29. 如 spec 或 architecture-design 包含复用候选，计划必须把 architecture reuse 决策拆成执行任务：
   - 抽取或复用已有公共函数 / hook / mapper / adapter
   - 对每个候选承接 Anti-DRY 矩阵结论：业务语义、分层、真实生产使用点数量、变化稳定性、变因数量
   - 承接共性分类：技术/基础设施、业务/领域、UI/设计系统、配置/常量
   - 迁移所有 in-scope 生产调用方
   - 更新 import / export、测试、mock 和调用文档
   - 删除重复旧路径或保留有真实差异的分支
   - 通过参数、依赖注入、getter、config、HOF、strategy object、adapter 或薄封装传入业务差异
   - 为新晋升 shared API 添加 JSDoc `@see` / `@example` traceability
   - 为共享逻辑补行为等价验证
   - 对保持分离或暂缓项写清真实语义差异、分层差异、不足三处稳定生产使用、变化点不确定、变因过多、依赖风险或范围边界
   不能把“不同模块”作为不抽取的唯一理由，不能把“两处相似代码”作为必须抽取的理由，不能让 execute 自行决定是否抽取。
30. 把 business function / business logic details、clean-code guardrails、plan executable contract、code-review checklist contract、human-review-readiness constraints、expert frontend engineering constraints、production-code-quality constraints、architecture reuse decisions、functional-programming boundaries、pattern decisions、side-effect boundaries、request-layer ownership 写进计划。
   - 每个任务都必须承接 spec 的 pattern-fit decision；若任务内新增了选择、适配、创建、编排、副作用协调、状态分支、树处理、访问控制或横切关注点，必须再次确认是否仍适合 direct code。
   - 计划中必须明确 pattern depth level，以及选用 `direct code` / `reuse existing pattern` / `adapt lightweight pattern` / `introduce pattern` 的执行方式。
   - 计划中必须明确前端语法实现形态：function、typed record、discriminated union、object map、hook / composable、component boundary、store action、request module、adapter / mapper、higher-order function，或有批准理由的 class。
   - 对 bugfix 和局部修改，也要执行 pattern-fit decision；无真实信号时选择 Level 0 direct code 并写短理由即可，不得机械枚举所有未触发模式。
   - 只有出现具体候选信号时，才写被触发的 Adapter、Strategy、State、Command、Chain、Observer / Pub-Sub、Decorator、Facade、Proxy、Composite、Builder 或项目既有模式是否采用及拒绝理由。
   - 不能把 pattern fit 留给 execute 现场判断。
   - 对每个计划新增的 helper、hook、mapper、adapter、constant group 或 utility file，写明真实生产调用方数量和 locality decision。
   - 若只有一个真实生产调用方，默认规划为 owning page / component / hook 内的 local helper；只有 spec 已批准明确边界理由时，才允许规划新独立文件。
   - 不能把“让页面文件短一点”“纯函数应该外置”“以后可能复用”写成新文件理由。
31. 既有代码影响面较大时，优先用 code graph 明确 impact scope，并更新 `artifacts/code-context.md`。
32. 按 `speed_profile` 选择上下文与验证范围：
   - `S0` / `S1` 默认使用目标文件、直接 import / caller、相关测试和必要合同来源的窄闭包
   - `S2` / `S3` 才扩大到完整功能链、跨模块复用扫描、code graph 或更全面验证
   - 发现 API、状态、权限、adapter、共享逻辑或删除闭包风险扩大时，先升级 profile，再补计划
33. 区分串行任务与可并行任务，仅在确实值得时建议 workflow-style parallel execution。
34. 如果请求本质是主动式 workflow，写清 trigger / context / observation points / handoff。
35. 当前交付单元 `plan/plan.md` 必须使用利于人眼快速扫描的结构：
   - 先给全局摘要
   - 再按任务分节
   - 每个任务都用固定小节展示目标、范围、前置条件、交互、状态、风险、测试
   - 避免输出大段连续散文
36. 每个任务都必须附一个流程图，默认使用 Mermaid，至少覆盖：
   - 起点
   - 关键步骤
   - 分支判断
   - 成功出口
   - 失败/回退出口
37. 如果任务很小，也不能省略流程图；可以使用最小闭环流程图，但不能缺失。
38. 保留 `state.json.loop`，不重置、不改写。
39. 本阶段不写实现代码。
40. 完成后执行 framework 自动审批检查，只有在 plan 满足 framework-approved spec、模板、政策、source grounding、业务功能需求点与业务逻辑明细、plan-executable-contract、expert-frontend-engineering、production-code-quality、code-review checklist contract、human-review-readiness、architecture reuse、workflow-efficiency、任务完整性、验证策略、影响面、前置确认口径和状态机门禁时，才设置审批并切到 `stage=execute`；不得请求用户审批：
   - 拆分 PRD 模块：`state.json.module_flow.modules.<current-module-id>.approvals.plan_approved=true`
   - direct-change、bugfix 或非拆分请求：`state.json.approvals.plan_approved=true`

## 输出格式

- 必须产出：
  - 当前交付单元的 `plan/plan.md`
  - 当前交付单元的 `plan/task-board.md`
  - `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）
- 最终交付物应包含：
  - 利于人眼浏览的任务化排版
  - 业务功能需求点与业务逻辑明细
  - 任务拆解
  - function-complete 级任务细化
  - plan executable contract / execute-readiness 自检
  - source grounding 任务映射
  - user intent compliance 任务（如适用）
  - change-chain review 任务（修改或移除既有代码时适用）
  - removal cleanup 任务（如适用）
  - 每个任务对应的流程图
  - 依赖关系
  - 测试与验证策略
  - API 对接与类型策略
  - 风险与回滚说明
  - clean-code / functional-programming / pattern / boundary 约束
  - pattern-fit evaluation / direct-code rationale / rejected alternatives
  - expert-frontend-engineering 执行与验证任务（如适用）
  - production-code-quality 执行与验证任务（如适用）
  - code-review checklist contract（生产代码改动适用）
  - human-review-readiness 执行与验证任务（代码改动适用）
  - architecture reuse / shared extraction 任务（如适用）
  - Tailwind CSS-style styling 约束（如适用）
  - trigger / context / handoff 规划（如适用）

## 验收标准

- 当前交付单元 `plan/plan.md` 已存在并覆盖任务、依赖、影响面、测试、回滚。
- 当前交付单元 `plan/plan.md` 使用了清晰的人眼友好结构，而不是难以扫描的大段文字。
- 当前交付单元 `plan/plan.md` 已遵守 `speed_profile`：小需求紧凑但不缺适用合同，大需求完整覆盖影响面。
- 当前交付单元 `plan/plan.md` 已写清业务功能点、业务术语、业务规则、分支与状态流转、字段与数据语义、校验与错误口径、权限与可见性、跨字段 / 跨步骤依赖和业务验收映射。
- 每个任务都有对应流程图。
- 当前交付单元 `plan/task-board.md` 已存在并反映执行单元。
- plan 已通过 execute-readiness 自检，明确到 execute 不需要猜测产品行为、文件、符号、数据结构、状态流、清理对象或验证命令。
- plan 已通过业务逻辑完整性自检，明确到 execute 不需要猜测业务功能点、业务规则、条件分支、字段语义、状态流转、权限 / 可见性、校验口径或错误文案。
- 任务颗粒度与已通过 framework 自动审批的 spec 保持一致，不出现产品含义漂移。
- 每个任务都有 source-grounding 标签与 spec 来源引用，没有未授权扩展。
- plan 没有把 missing-source、相邻模块、样例内容或常规做法包装成执行任务。
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
- 每个任务已承接或细化 pattern-fit decision 和 pattern depth level；direct code、复用既有模式、轻量模式或引入模式的理由明确且与候选信号匹配。
- 每个涉及 pattern 的任务已说明符合当前前端栈的语法实现形态，没有把前端代码规划成后端式 class hierarchy 或 manager / factory ceremony。
- 新增文件级 helper / hook / mapper / utility 的调用方数量和 locality decision 已记录；单调用方逻辑没有被无理由规划为独立文件。
- 如添加或修改生产代码，计划已把 type-first、fail-fast、strict null、naming、no magic variables、maintainability-first、pure functions over classes、boundary UI states 拆成执行和验证任务。
- 如添加或修改生产代码，计划已把 code-review checklist 预检结果写成 execute 合同，覆盖健壮性、可维护性、性能与内存、项目规范一致性，并明确 execute 不得擅自更改技术栈。
- 如修改生产代码、测试、mock、契约或生成类型可见文件，计划已把 diff scope、局部惯例、pre-review self-check 和 reviewer-ready evidence 拆成执行与验证任务。
- 如新增或修改用户可见行为、状态流、数据流、组件组合、前端架构或生产集成，计划已把 expert frontend engineering 约束拆成执行和验证任务。
- 如存在复用候选，计划已拆出公共逻辑抽取 / 复用 / 保持分离 / 暂缓任务，并明确调用方迁移和行为等价验证。
- 如存在复用候选，计划已承接 Anti-DRY 矩阵、共性分类、依赖注入 / 策略边界、JSDoc traceability 和抽象反模式红线。
- 如涉及规则、校验、数据转换、状态派生或 payload 构造，计划已拆出纯函数、不可变数据、副作用边界和测试 / 验证任务。
- 如涉及样式变更，计划已拆出 Tailwind CSS-style utility class、class 值长度、禁止隐藏过长 class 字符串的执行和验证任务。
- 串行与可并行任务已区分。
- 主动式 workflow 的 trigger / context / observation / handoff 已写清（如适用）。
- framework 已自动审批 plan，并记录其满足 framework-approved spec、模板、政策、source grounding、plan-executable-contract、code-review checklist contract、architecture reuse、任务完整性、验证策略、影响面、前置确认口径和状态机门禁。
- 拆分 PRD 模块已设置 `state.json.module_flow.modules.<current-module-id>.approvals.plan_approved=true`；direct-change、bugfix 或非拆分请求已设置 `state.json.approvals.plan_approved=true`。
- `state.json.stage=execute`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能创建 spec 未授权的任务。
- 不能创建没有来源锚定的任务。
- 不能审批业务功能需求点或业务逻辑不完整的 plan；任何需要 execute 猜测业务规则、条件分支、字段语义、状态流转、权限 / 可见性、校验口径或错误文案的计划都必须回退修正。
- 不能审批只给方向、不足以直接执行的 plan；任何需要 execute 猜测文件、符号、字段、接口、状态、步骤、异常分支、清理对象或验证命令的计划都必须回退修正。
- 未通过 framework 自动审批检查时不能进入 execution。
- 不能把样例计划当捷径直接套用。
- 对可测试行为，不能把测试设计拖到实现之后。
- 不能把明显的复杂度、重复、混责问题留成未规划状态。
- 不能把重复语义逻辑的抽取 / 复用 / 保持分离决策留给 execute 自行判断。
- 不能用“不同模块”作为拒绝公共逻辑抽取的唯一理由。
- 不能因为两处代码相似就规划抽取；必须先通过 Anti-DRY 矩阵。
- 不能规划 God Utils、shared 导入业务私有 entity、shared 内部直接读写环境副作用，或为了复用合并接口。
- 不能为一个页面、一个真实生产调用方的函数规划独立 helper 文件，除非 spec 已批准具体边界收益。
- 不能在没有明确 change axis / rejected alternative 的前提下引入 pattern。
- 不能跳过小需求、局部修改或 bugfix 的 pattern-fit decision。
- 不能把 direct code 当作默认空白结论；必须写明无结构性信号的短理由，或对被触发模式候选写拒绝理由。
- 不能为了证明考虑过设计模式而机械枚举所有未触发模式。
- 不能把 pattern 实现规划成不符合前端语法特点的 abstract class、one-method class wrapper、manager、factory 或 handler 层；除非 spec 已批准项目惯例、生命周期、多态或依赖边界理由。
- 不能把 trivial / tightly-coupled 任务包装成 workflow-style parallel execution。
- 不能把 trigger / context / intervention points 留成隐式。
- 不能把页面结构、字段定义、列定义、交互结果、loading 规则留空。
- 不能让 `execute` 自行补产品行为。
- 不能让 `execute` 自行补类型契约、失败处理、严格空值语义、命名标准、性能取舍、配置常量归属或边界 UI 状态。
- 不能让 `execute` 自行补 code-review checklist 合同；生产代码改动必须在 plan 先完成健壮性、可维护性、性能与内存、项目规范一致性预检。
- 不能让 `execute` 自行补人工评审可通过性；代码改动必须在 plan 明确 diff scope、局部惯例、自审项、证据项和禁止无关改动边界。
- 不能让 `execute` 自行补用户旅程、状态所有权、数据生命周期、异步竞态、交互韧性、性能边界、演进安全或测试证据。
- 不能让 `execute` 自行理解用户真实意图或自行发现 forbidden interpretations。
- 不能让 `execute` 在未规划功能链路、文件引用关系、调用方、副作用和影响面审查的情况下修改或移除既有代码。
- 不能让 `execute` 自行发现行为移除后的 orphan helper、unused import、stale request wrapper、obsolete state、测试或注释残留。
- 不能因为测试文件仍引用待改或待删代码，就把该测试引用规划成生产代码真实调用方；应规划测试适配。
- 不能私自把 spec 细化成新行为。
- 不能从常规做法、相邻模块、样例内容或个人偏好中扩展执行范围。
- 不能把多接口/多表面 API 对接压成一个黑盒任务。
- 不能省略任何任务的流程图。
- 不能把整份 `plan.md` 写成只有长段落、缺少任务分节的低可读格式。
- 不能把样式实现方式、class 值长度治理或禁止隐藏过长 class 字符串的检查留给 execute 自行决定。
- 不能把纯函数边界、不可变数据处理、副作用边界或 adapter / mapper 语义归一留给 execute 自行决定。
