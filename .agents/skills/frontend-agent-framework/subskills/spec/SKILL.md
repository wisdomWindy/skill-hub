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
- 当前交付单元的 `design/page-design.md`（如存在 page-design 阶段）
- 当前交付单元的 `design/architecture-design.md`（如存在 architecture-design 阶段）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/requirements/requirement-map.md`（如存在）
   - `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - 当前交付单元的 `design/page-design.md`（如存在）
   - 当前交付单元的 `design/architecture-design.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/spec.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/policy-index.md`
   - 按 `policy-index.md` 的 `spec` 阶段映射读取本次 scoped work 适用的 policy 文件；默认至少读取 `source-grounding.md`、`spec-constraints.md`、`design-patterns.md`、`doc-writing.md`；如需要选择 compact artifact 或 context breadth，读取 `workflow-efficiency.md`
2. 先消费 intake 工件；对 PRD 驱动拆分需求，必须先消费 `requirements/requirement-map.md` 与当前模块工件；如果存在当前交付单元的 `page-design` 或 `architecture-design`，则再把它们视为上游输入。
3. 把 `artifacts/prd-snapshot.md` 当作结构化抽取来使用；如果它或 requirement-splitting 工件比原始需求源更薄，必须回看原始 PRD/稳定引用。
4. 产出：
   - 当前交付单元的 `spec/spec.md`
   - 当前交付单元的 `spec/clarifications.md`
   - 若 `state.json.speed_profile` 为 `S0` / `S1`，可使用 compact spec：必需章节仍保留，不适用章节用一行写明 `不适用：<reason>`，但业务逻辑、source grounding、pattern decision 和适用质量约束不能省略。
5. 先建立 spec source-grounding mapping；每个材料性行为、字段、交互、状态规则、API 契约、依赖、验收标准和实现约束都必须标注来源标签与引用。
6. 把行为定义写到 downstream 可执行、可审查、可验证的粒度。
7. 明确把行为写到与 `plan` 对齐的 function-complete granularity：
   - 表单要写字段、必填/选填、控件、校验、状态、提交结果
   - 表格要写列意图、行/批量操作、展示与状态
   - 展示类要写字段、分组、布局、格式、显隐
   - 交互/流程要写触发、状态流转、副作用、成功/失败/loading 预期
8. 对文本输入类控件，不能只记录 PRD 明写约束；凡是实现必须自行决定的输入语义，也必须在 spec 中显式写明或写入 clarification / assumption，例如：
   - 是否 `trim`
   - 纯空格输入如何处理
   - `trim` 后为空如何处理
   - 长度校验按原值还是归一化后值计算
   - 前后空白、连续空白、换行、粘贴内容、非法字符的处理口径
   - 校验触发时机（输入中 / blur / submit）
9. 如果上游需求源已经给出字段、列、交互、状态、流程细节，这些信息必须进入 spec，不能因为 intake 摘要粗化而丢失。
10. 如果 requirement-splitting 已经按模块拆分了内容，当前模块 spec 只能承接当前模块功能单元，不能重新合并多个模块。
11. 如果仍有未知信息，写入当前交付单元 `spec/clarifications.md`，作为显式 clarification 或框架可接受 assumption；如果该未知信息需要人工确认，不能在本阶段请求用户审批，必须回退到 `requirement-analysis`、`intake` 或 `bugfix-intake` 的前置确认 gate。
12. 如果某个行为、字段、状态、交互、校验、接口、验收标准或模块只有常规做法、相邻模块、样例内容或偏好实现支撑，不能写入 spec 正文，只能写入 clarification、missing-source 或 out-of-scope 记录。
13. 如果 requirement-analysis 或用户当前输入包含 user intent contract，spec 必须承接并细化：
   - literal request
   - practical goal
   - success criteria
   - forbidden interpretations
   - acceptable approaches
   - verification / review checks
   不能把“后续实现自己理解用户意图”作为策略。
14. 把可维护性、抽象边界、side effect、duplication ownership、命名、函数式边界、生产代码质量边界与模式决策写成 spec constraints，而不是留给下游凭感觉判断。
   - 每个交付单元都必须做 pattern-fit evaluation，不因需求小、局部修改或 bugfix 而跳过。
   - 必须检查 selection / adaptation / creation / sequencing / side-effect coordination / state-dependent behavior / tree handling / access control / cross-cutting concern 等候选信号。
   - 必须选择 `direct code` / `reuse existing pattern` / `adapt lightweight pattern` / `introduce pattern` 之一。
   - 必须记录 pattern depth level：Level 0 direct code、Level 1 local lightweight shape、Level 2 reused / formalized project pattern、Level 3 structural pattern introduction。
   - 如果没有真实候选信号并选择 Level 0 direct code，只需写明无结构性变化轴、无适配 / 选择 / 编排 / 副作用协调 / 状态分支 / 跨文件协作问题，以及 direct code 为什么最安全；不得机械枚举所有未触发模式。
   - 如果存在候选信号但仍选择 direct code，必须只针对被触发的候选模式或项目既有模式写拒绝理由。
   - 如果选择 pattern，必须写明具体问题、最小可行模式、前端语法实现形态、拒绝的更简单方案、隔离的变化轴 / 依赖边界 / 副作用协调点，以及未来判定 overbuilt 的信号。
   - 模式实现形态必须符合当前前端栈语法特点：优先函数、对象映射、typed record、discriminated union、hook / composable、component boundary、store action、request module、adapter / mapper、higher-order function；只有项目惯例或已批准生命周期 / 多态 / 依赖边界理由成立时才允许 class / abstract class / manager / factory / handler 层。
   - 新增 helper、hook、mapper、adapter、constant group 或 utility file 时，必须写明 locality decision：是否同页 / 同组件就近放置，还是抽到单独文件；只有存在多个真实生产调用方、明确 adapter / service 边界、独立测试需要、独立生命周期、框架约束、生成 / 合同隔离，或同文件可读性无法接受时，才允许单独文件。
   - 单页面、单真实生产调用方的函数默认写成 owning page / component 内的 local helper；不能仅因为函数是纯函数、想让页面短一点、或“以后可能复用”就抽成独立文件。
15. 如 scoped work 添加或修改生产代码，spec 必须记录 production code quality constraints：
   - 先类型契约后实现：需要新增、复用或收窄的 `type` / `interface`，以及是否需要 branded type 或等价名义区分来避免传错 ID / token
   - fail-fast：空值、异常、非法值、超时、请求失败、部分成功和不可能状态如何显式处理
   - strict null handling：`null` 与 `undefined` 的业务语义是否不同，哪里允许 `??` / `?.` 防御，哪里必须验证而不能展示兜底
   - maintainability first：是否存在真实性能问题；如需 memoization、cache、debounce、throttle、virtualization、`useMemo` / `useCallback` / computed caching，必须写明理由
   - pure functions over classes：确定性规则、校验、转换、format、payload builder、状态派生优先纯函数和不可变数据；引入 class 必须有框架、生命周期、封装状态或多态理由
   - naming：布尔变量使用 `is` / `has` / `should` / `can`，props 回调用 `on`，内部事件处理用 `handle`，普通函数动词使用 `get` / `fetch` / `set` / `update` / `transform` / `format` / `check` / `validate` 等精确动词
   - no magic variables：helper 输入来自参数、依赖注入或明确本地闭包；真实配置常量集中到最窄稳定 domain owner，不能用常量隐藏一次性值或过长 class
   - boundary UI states：列表空状态、异步 loading 状态、表单错误状态与结束条件
16. 如 scoped work 修改生产代码、测试、mock、契约或生成类型可见文件，spec 必须记录 human review readiness constraints：
   - 需要遵守的相邻项目惯例：组件组织、hook / composable、request、store、adapter、测试、命名、错误处理
   - 本次允许改动的文件、符号和行为范围，以及明确不在范围内的改动
   - review-sensitive risks：大 diff、共享代码、迁移、兼容、请求副作用、状态所有权、测试适配
   - execute 结束前必须留下 changed hunks 到 plan task / cleanup / test adaptation 的映射
   - 必须清理无关改动、格式化噪音、debug code、dead code、stale comments、temporary names、unused import / export、stale tests / mocks
   - reviewer 需要的验证证据：测试、类型检查、lint、手工验证、未运行命令原因和剩余风险
17. 如 scoped work 新增或修改用户可见行为、状态流、数据流、组件组合、前端架构或生产集成，spec 必须记录 expert frontend engineering constraints：
   - 用户旅程完整性、状态所有权、数据生命周期
   - 异步正确性：loading owner、请求去重、取消、过期响应、竞态、幂等、重试
   - 交互韧性：键盘、焦点、语义控件、disabled、破坏性确认、权限拒绝、可行动反馈
   - 性能与渲染边界：render scope、大列表、昂贵派生、bundle、响应式 fan-out
   - 演进安全：扩展缝、兼容边界、feature flag / migration、回滚面、清理触发器
   - 可测试与可诊断证据
18. 如 scoped work 包含业务规则、表单校验、筛选排序、状态派生、payload 构造、详情到表单回填、接口到视图模型转换，spec 必须记录 functional-programming constraints：
   - 哪些规则或转换应该是纯函数
   - 哪些输入必须按不可变数据处理，例如 props、backend DTO、store snapshot、adapter input
   - 哪些副作用只能出现在 request layer、event handler、store action、command function 或 lifecycle boundary
   - 哪些数据语义归一必须在 adapter / mapper / `fromDetail`，不能落在 computed / watch / template fallback
   - 是否明确拒绝引入函数式工具库或过度抽象
19. 如 scoped work 触碰业务规则、校验、筛选排序、option 构造、权限判断、payload 构造、状态派生、状态映射、adapter / mapper、view-model 构造或 helper 逻辑，spec 必须记录 architecture reuse and shared ownership constraints：
   - 已发现的等价生产逻辑位置与调用方
   - Anti-DRY 矩阵结论：业务语义、分层、真实生产使用点数量、变化稳定性、变因数量
   - 抽取 / 复用 / 保持分离 / 暂缓决策
   - 共性分类：技术/基础设施、业务/领域、UI/设计系统、配置/常量
   - 公共 owner、依赖方向、公开 API、输入输出、类型来源、依赖注入 / 策略边界和副作用边界
   - 需要迁移的生产调用方、测试与 mock
   - 新晋升 shared API 的 JSDoc `@see` / `@example` traceability 要求
   - 行为等价验证要求
   - 单调用方候选的就近放置决策；若仍抽到单独文件，必须记录非复用型边界理由和为什么 same-file local helper 更差
   如果存在重复语义逻辑但没有 architecture-design 工件，必须回退到 `architecture-design`；不能在 spec 阶段自行略过。
20. 如涉及新增或修改样式，spec 必须记录 Tailwind CSS-style utility class 约束：
   - authored styling 只能使用 Tailwind CSS-style utilities
   - `class` / `className` / class binding 值必须保持可在模板内直接审查，超过项目 formatter 正常行宽或需要多行包裹即视为过长
   - 不允许用常量、map、computed、helper 或 import 变量隐藏过长 class 值
   - 条件 class binding 只能承载小型状态切换，不能承载大段基础样式
21. 如果存在当前交付单元 `architecture-design`，spec 必须承接其中的模块边界、文件结构、依赖方向、函数分层、数据结构、类型策略、复用候选和公共抽象决策，不能在 spec 阶段重新发明、悄悄改写或降级为局部复制。
22. 如果 scoped work 是从 0 开始搭建项目、应用、包或前端业务面，必须在 spec 中明确脚手架或 starter 决策：
   - 优先判断是否存在合适的同类型项目脚手架
   - 有可复用脚手架时，默认复用并写明来源
   - 不复用时，必须记录不适配、不可用或改造成本不合理的原因
   - 允许偏离脚手架的范围也要提前写明
23. 如涉及后端接口：
   - 识别权威 contract source
   - 记录 direct contract consumption 还是 adapter boundary
   - 服务端有 TypeScript 声明则优先复用
   - 非 TS 契约则保留字段名并写成 TS 可用类型
   - protobuf 需说明是复用生成类型还是由 proto 导出前端可用类型
   - 承接 requirement-analysis / requirement-splitting 中的前端 / 服务端职责拆分，不得把服务端负责的字段生产、权限、持久化、状态流转、审计、异步任务或同步能力写成前端实现任务
   - 前端只定义消费、展示、交互、adapter / mapper / fromDetail 归一、错误处理和状态呈现等前端职责；缺失服务端契约必须写入 clarifications 或外部接口待补
24. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，spec 必须记录：
   - 哪个 `tsconfig` 实际 governs 当前作用域文件
   - 哪些 compiler options 会 materially 影响实现或类型理解，例如路径别名、ambient globals、JSX runtime、strictness、module resolution
   - 哪些声明或生成类型来源属于当前改动必须读取的闭包范围
   - 明确禁止把“后面执行时再猜 tsconfig / 再扫全仓 `.d.ts`”当作实现策略
25. 如涉及既有代码结构调整：
   - 优先用 code graph 识别真实边界、依赖方向和 impact scope
   - 如结构理解加深，更新 `artifacts/code-context.md`
26. 不写实现代码。
27. 完成后执行框架自动审批检查，只有在 spec 满足模板、政策、source grounding、source traceability、当前交付单元范围、已确认需求口径、专家级前端工程约束、生产代码质量约束、人工评审可通过性约束、架构复用决策和状态机门禁时，才设置审批并切到 `stage=plan`；不得请求用户审批：
   - 拆分 PRD 模块：`state.json.module_flow.modules.<current-module-id>.approvals.spec_approved=true`
   - direct-change、bugfix 或非拆分请求：`state.json.approvals.spec_approved=true`

## 输出格式

- 必须产出：
  - 当前交付单元的 `spec/spec.md`
  - 当前交付单元的 `spec/clarifications.md`
- 最终交付物应包含：
  - scope / flow / modules / contracts / edge cases / acceptance criteria / risks
  - 与 requirement-splitting 对齐的模块边界与 source trace
  - source grounding mapping
  - user intent contract
  - API 与数据合同决策
  - 前端 / 服务端职责边界承接结果
  - API contract source / type reuse / protobuf handling / adapter-boundary 决策
  - expert frontend engineering constraints
  - production code quality constraints
  - human review readiness constraints
  - functional-programming constraints
  - architecture reuse and shared ownership constraints
  - design constraints
  - frontend styling constraints
  - pattern decision
  - pattern-fit evaluation and rejected alternatives
  - clarifications
  - 可直接驱动 plan 的 function-complete behavior contracts

## 验收标准

- 当前交付单元 `spec/spec.md` 已存在，且覆盖 scope、flows、modules、contracts、edge cases、acceptance criteria、risks。
- spec 已遵守 `speed_profile`：小改动使用紧凑但完整的适用章节，宽影响工作使用完整深度。
- 行为颗粒度已达到与 `plan` 对齐的 function-complete granularity。
- 如存在 user intent contract，spec 已保留 practical goal、forbidden interpretations、success criteria 和 intent-level verification checks。
- spec 已记录 responsibility boundaries、side-effect placement、duplication ownership、complexity guardrails、pattern use / rejection。
- spec 已记录 pattern-fit evaluation、pattern depth level 和前端语法实现形态；如选择 direct code，已按信号粒度写明无信号理由或被触发候选的拒绝理由，没有机械枚举无关模式。
- spec 已记录新增 helper / hook / mapper / utility file 的 locality decision；单页面单调用方逻辑没有被无理由批准抽到独立文件。
- 如添加或修改生产代码，spec 已记录 type-first、fail-fast、strict null、naming、no magic variables、maintainability-first、pure functions over classes、boundary UI states 约束。
- 如修改生产代码、测试、mock、契约或生成类型可见文件，spec 已记录 human review readiness constraints，包括 diff scope、局部惯例、禁止无关改动和 reviewer-ready evidence。
- 如新增或修改用户可见行为、状态流、数据流、组件组合、前端架构或生产集成，spec 已记录 expert frontend engineering constraints。
- spec 已记录架构复用候选、公共 owner、抽取 / 复用 / 保持分离 / 暂缓决策，以及行为等价验证要求（如适用）。
- spec 已记录 Anti-DRY 矩阵、共性分类、依赖注入 / 策略边界、反模式红线和 JSDoc traceability 要求（如适用）。
- spec 已记录纯函数边界、不可变输入、副作用归属、adapter / mapper / fromDetail 归一边界（如适用）。
- 如涉及样式变更，spec 已记录 Tailwind CSS-style utility class、class 值长度、禁止隐藏过长 class 字符串的约束。
- 当前交付单元 `spec/clarifications.md` 已记录开放问题与已定决策。
- spec 足够清晰，plan / tests / verification evidence 都能回溯到它。
- spec 中每个材料性行为、字段、交互、状态规则、API 契约、验收标准和约束都有来源锚定标签与引用。
- spec 没有把 missing-source、相邻模块、样例内容或常规做法写成已批准行为。
- spec 没有迫使 `plan` 自行补写原本应在 spec 中明确的产品行为。
- 若上游已有显式字段/列/交互/状态/流程要求，spec 已完整带下。
- 若存在 requirement-splitting 工件，当前模块 spec 已完整承接当前模块显式行为约束。
- 若上游包含前端 / 服务端职责拆分，spec 已承接该边界，且没有把服务端职责写成前端实现任务。
- 若存在 architecture-design 工件，当前交付单元 spec 已完整承接当前交付单元代码架构决策。
- 若存在重复语义逻辑，spec 没有把抽取或复用决策留给 plan / execute 自行判断。
- 若 scoped work 为 greenfield，spec 已明确脚手架或 starter 决策及允许偏离范围。
- framework 已自动审批 spec，并记录其满足模板、政策、source grounding、source traceability、范围、需求口径和状态机门禁。
- 拆分 PRD 模块已设置 `state.json.module_flow.modules.<current-module-id>.approvals.spec_approved=true`；direct-change、bugfix 或非拆分请求已设置 `state.json.approvals.spec_approved=true`。
- `state.json.stage=plan`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能在 spec 不存在前生成实现任务。
- 未通过 framework 自动审批检查时不能进入 `plan`。
- 不能把样例 spec 的结论直接复制到新请求中。
- 不能把没有来源锚定的内容写成 spec 行为。
- 不能从常规做法、相邻模块、样例内容或个人偏好中扩展需求范围。
- 不能把行为写得含糊到需要实现阶段去猜。
- 不能只满足用户字面表达而丢失实际目标、反例和禁止规避方式。
- 不能把行为停留在比 `plan` 所需更粗的颗粒度。
- 不能遗漏上游已明确给出的字段、交互、状态、流程信息。
- 不能绕过 requirement-splitting 工件重新凭印象组织模块范围。
- 不能绕过 requirement-analysis / requirement-splitting 中确认的前端 / 服务端职责拆分。
- 不能把服务端字段生产、权限校验、持久化、状态流转、审计、异步任务或同步职责伪装成前端可独立完成的 spec。
- 不能把重大抽象/协作问题留给下游自己决定。
- 不能把关键 responsibility / side-effect / duplication / readability 约束留空。
- 不能因为是小需求、局部修改或 bugfix 就跳过 pattern-fit evaluation。
- 不能只写“无需模式”而不说明 direct code 为什么是最轻合适解；也不能为了证明考虑过模式而机械枚举所有未触发模式。
- 不能把设计模式实现成不符合前端语法特点的 Java / C# 式 class hierarchy、abstract base、manager、factory、handler ceremony；除非项目惯例和已批准边界理由同时成立。
- 不能把单页面、单真实生产调用方的 helper 默认批准为独立文件；除非 spec 写清具体边界收益，否则必须保持就近。
- 不能把类型契约、fail-fast、严格空值、命名、配置常量归属、性能取舍或边界 UI 状态留给 plan / execute 自行判断。
- 不能把人工评审可通过性留给 execute 自行补救；代码改动必须在 spec 明确 diff scope、局部惯例、证据要求和禁止无关改动边界。
- 不能把用户旅程、状态所有权、数据生命周期、异步竞态、交互韧性、性能边界、演进安全或可测试证据留给 plan / execute 自行判断。
- 不能把跨模块重复语义逻辑留给 plan 或 execute 自行决定是否抽取。
- 不能把 Anti-DRY 抽象矩阵、共性分类、依赖倒置策略或错误抽象红线留给 plan / execute 自行判断。
- 不能把纯函数边界、数据不可变性、副作用归属或语义归一位置留给下游自己猜。
- 不能把样式实现方式、class 值长度治理或禁止隐藏过长 class 字符串的规则留给下游自己决定。
