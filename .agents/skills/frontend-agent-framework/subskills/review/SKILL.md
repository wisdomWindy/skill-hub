---
name: frontend-agent-framework-review
description: Stage subskill for review. Review correctness, standards compliance, and residual risk before completion.
---

# Review Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=review` 时使用。
- 适用于在 completion 前对代码、spec、plan、verification 输出做最终审查的阶段。

## 必要输入

- 当前交付单元的 `spec/spec.md`
- 当前交付单元的 `plan/plan.md`
- 当前交付单元的 `verification/verification.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - 当前交付单元的 `spec/spec.md`
   - 当前交付单元的 `plan/plan.md`
   - 当前交付单元的 `verification/verification.md`
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/review.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/policy-index.md`
   - `../../references/policies/constraint-model.md`
   - 按 `policy-index.md` 的 `review` 阶段映射读取本次 scoped work 适用的 policy 文件；默认至少读取 `clean-code.md`、`source-grounding.md`、`design-patterns.md`；代码改动默认读取 `code-review-checklist.md` 与 `human-review-readiness.md`；如需 compact changed-hunk review，读取 `workflow-efficiency.md`
2. 先读变更后的代码，再开始评审。
   - 按 `speed_profile` 控制评审范围：`S0` / `S1` 聚焦 changed hunks、直接调用链、相关测试和适用 verdict；`S2` / `S3` 或共享影响面扩大到完整功能链和跨模块风险。
3. 产出当前交付单元的 `review/review.md`。
4. 把评审结论分成：
   - blocking issues
   - non-blocking issues
   - accepted risks
   - follow-up items
5. 检查实现、验证结论与 review 发现是否全部回溯到 framework-approved spec / plan 的 source-grounding 条目；任何无来源行为、相邻模块扩展、样例内容扩展或常规做法扩展均按 blocker 处理。
6. 既看功能正确性，也看 clean-code 和 functional-programming 合规性。逐个检查本次新增或扩大作用域的常量是否具有稳定业务语义、约束、必要快照、复杂表达式简化或真实复用价值；以下情况按 blocker 处理：
   - 只给单次使用的显然字面量、模板片段、对象 / 数组、简单属性访问或简单表达式换名
   - 名称只是复述值或下一步操作，移除常量后代码同样清晰且不损失正确性
   - 为假想复用创建模块级 / 导出常量，或为已有领域常量创建同义 / 透传别名
   - 常量作用域大于当前真实 owner 和调用方所需范围
   同时逐个检查新增独立 helper / hook / mapper / adapter / utility 文件是否具有真实边界收益；以下情况按 blocker 处理：
   - 只有一个页面或一个真实生产调用方，却抽成单函数文件、局部 `utils.ts`、局部 `helpers.ts` 或单调用方 mapper 文件
   - 抽取理由只是让页面短一点、函数是纯函数、命名更整齐、未来可能复用，或为了制造架构感
   - same-file local helper 可以更直接表达 owning flow，但实现强迫读者跨文件跳转
   - spec / plan 未批准该单调用方文件边界，或执行记录没有说明具体边界收益
7. 检查 pattern-fit evaluation 是否真的执行，并判断结果是否匹配问题：
   - 小需求、局部修改、bugfix 是否也记录了 pattern-fit decision
   - 是否记录 pattern depth level：Level 0 / Level 1 / Level 2 / Level 3
   - direct code 是否有明确理由，而不是默认空白结论
   - Level 0 direct code 是否只做短的无信号说明，没有机械枚举所有未触发模式
   - 如果存在具体候选信号，是否检查过被触发的 Adapter、Strategy、State、Command、Chain of Responsibility、Observer / Pub-Sub、Decorator、Facade、Proxy、Composite、Builder 或项目既有模式的适配性
   - pattern 实现形态是否符合当前前端栈语法特点，是否优先使用函数、对象映射、typed record、discriminated union、hook / composable、组件边界、store action、request module、adapter / mapper 或 higher-order function
   - 引入或修改的 pattern 是否真的必要、是否与问题匹配
   - 是否存在本应使用轻量 Adapter / Strategy / Command / State table / Facade / Proxy 等模式，却继续堆叠脆弱条件分支、重复适配逻辑或散落副作用
   - 是否存在为了显得高级而引入 fake extensibility、manager、factory、strategy、command object 或 wrapper ceremony
8. 依据 spec 中声明的设计约束审查实现，不做脱离工件的主观审美评审。
9. 检查 spec 与 plan 是否保持同一 function-complete behavior granularity；若有漂移，按 blocker 处理。
10. 如存在 user intent contract，检查实现是否同时满足 literal request 与 practical goal；如果实现只是转移复杂度、风险、歧义、责任或采用 forbidden interpretation，按 blocker 处理。
11. 如果实现修改或移除了既有代码，检查变更前是否审查完整功能链路和文件引用关系，变更后是否复查链路正常；缺少证据、缺少必要环节、残留多余环节、重复路径、冲突路径或未授权影响邻近功能，均按 blocker 处理。测试文件引用待改或待删代码时，只能视为测试适配面，不能作为保留生产代码的真实 owner。
12. 如果实现移除了调用、请求、分支、字段、控件或副作用，检查该行为独占的 import、helper、常量、类型、request wrapper、状态、测试、mock 和注释是否同步清理；孤立残留按 blocker 处理。保留 helper 时必须有真实生产调用方，不能只靠测试引用。
13. 检查 API 集成是否符合 API contract policy：
   - contract-source fidelity
   - type reuse correctness
   - field-name preservation
   - adapter-boundary discipline
   - request-layer ownership
14. 检查 expert-frontend-engineering policy 是否被正确应用；以下情况按 blocker 处理：
   - 用户旅程只有 happy path，缺少失败、重试、取消、权限、disabled、交接或成功后状态
   - mutable state owner 不清，derived state 被无理由写入，或同一业务状态在多个位置可写
   - backend DTO、view model、form model、payload、response handling 的数据生命周期混乱
   - 重叠请求没有 stale response、取消、去重、竞态、幂等或 retry 语义
   - dialog、drawer、form、table、menu 或 custom control 的键盘、焦点、语义控件不可用
   - 性能改动没有真实瓶颈，或大列表、昂贵派生、响应式 fan-out 没有边界
   - dual path、migration、兼容层、feature flag 或 fallback 没有 owner、清理触发器或回滚面
   - 缺少能证明端到端前端链路的测试或诊断证据
15. 检查 production-code-quality policy 是否被正确应用；以下情况按 blocker 处理：
   - 缺少先行类型契约，类型过宽，滥用 `any` / 类型断言，或应区分的 ID / token 没有 branded / nominal 区分且无合理拒绝理由
   - silent failure、吞错、忽略 rejected promise、无上下文错误提示、用默认成功掩盖失败
   - `null` / `undefined` 语义混淆，或用 computed / watch / template fallback 掩盖应在适配层或业务层修复的数据问题
   - 布尔变量未用 `is` / `has` / `should` / `can`，props 回调未用 `on`，内部事件处理未用 `handle`，普通函数动词模糊
   - helper 隐式读取未声明外部上下文，或真实配置常量没有集中到最窄稳定 owner
   - 为隐藏一次性值、简单表达式或过长 class 字符串而创建常量 / map / computed / helper / import
   - 无真实性能或引用稳定性理由引入 memoization、cache、debounce、throttle、virtualization、`useMemo` / `useCallback`、computed caching 或 watcher 优化
   - 可读性被微优化、过度函数式写法或不必要 class 降低
   - touched list / async operation / form input 缺少空状态、loading 状态、错误状态或具体错误文案
16. 检查 functional-programming policy 是否被正确应用：
   - 规则、校验、数据转换、payload 构造是否优先用纯函数表达
   - 副作用是否集中在明确 command / action / request / lifecycle 边界
   - 是否存在 hidden mutation、hidden side effect、duplicated derived state
   - 是否存在为了函数式而牺牲可读性的过度 point-free、过长 reducer chain、过度 currying 或未经批准的函数式库抽象
17. 检查 frontend-architecture policy 是否被正确应用，尤其是 architecture reuse：
   - 重复业务规则、校验、转换、payload 构造、状态派生、状态映射、option 构造、权限判断、adapter / mapper 或 helper 是否被发现并决策
   - Anti-DRY 矩阵是否被应用：业务语义、分层、真实生产使用点数量、变化稳定性、变因数量
   - 应抽取或复用的公共逻辑是否已经落实，刻意不抽的重复是否有充分理由
   - 保持分离的候选是否有真实领域、分层、生命周期、权限、API、依赖、使用点数量、变化稳定性、变因过多或演进差异
   - 共性分类、共享 owner、依赖方向、公开 API、类型来源和副作用边界是否合理
   - 共享代码是否通过参数、依赖注入、getter、config、HOF、strategy object、adapter 或薄封装接收业务差异
   - 是否存在 dumping-ground utility、未迁移调用方、重复旧路径或孤立 helper
   - 是否存在 premature abstraction、shared 导入业务私有 entity、shared 内部环境副作用、合并接口或 God Utils
   - 是否存在单调用方文件抽象、无必要 one-function module、局部 dumping-ground utility，或把页面私有逻辑外置造成阅读跳转
   - 新晋升 shared API 是否有 JSDoc `@see` / `@example` traceability
   - 行为等价证据是否充分
   漏抽已通过 Anti-DRY 矩阵且安全可抽取的重复语义逻辑、仅以“不同模块”为理由拒绝抽取，或引入错误抽象，均按 blocker 处理。
18. 检查 human-review-readiness policy 是否被正确应用；以下情况按 blocker 处理：
   - diff 包含无关改动、宽泛格式化、顺手重构、未批准重命名或无法映射到 plan 的 hunk
   - 实现没有遵守相邻项目惯例，或新结构让 reviewer 必须跨过不必要文件才能理解局部行为
   - 残留 debug log、commented-out code、stale TODO、临时变量名、dead code、unused import / export、orphan helper、stale mock、stale test 或过期注释
   - 测试、类型检查、lint、手工验证、未运行命令原因或剩余风险记录不足，reviewer 无法判断风险是否被覆盖
   - 最终说明不能回答“改了什么、为什么改、影响哪些文件、如何验证、哪些未改”
19. 如添加或修改生产代码，必须执行 code-review checklist assessment；以下情况按 blocker 处理：
   - plan 缺少 code-review checklist contract，或 execute 没有按 plan 合同实现
   - 健壮性：外部数据没有完整可选链 / 判空 / 合法性保护，API 调用没有异常捕获或 rejected promise 处理，异常、空值、边界状态被静默吞掉或伪装成成功
   - 可维护性：存在超过 150 行且混合多个职责的巨型函数，或函数虽未超过 150 行但已混合编排、请求、转换、渲染、副作用和校验；魔法数字没有被提取为具备语义的最窄作用域常量
   - 性能与内存：涉及 resize、scroll、input、mousemove、drag、轮询、订阅、watcher、effect 等高频事件却没有按 spec / plan 决策使用防抖、节流、取消、去重或边界控制；副作用、订阅、定时器、监听器、请求取消句柄或外部资源缺少 cleanup / dispose / unmount 清理
   - 项目规范一致性：组件库、样式方案、目录结构、import alias / 相对路径、状态管理、请求封装或技术栈实现形态没有严格遵循 spec / plan、`code-context.md`、相邻代码和项目 AGENTS 形成的技术栈锚定
   - 如果实现擅自更改技术栈、替换组件库、绕过既有样式方案、改变目录引用方式或引入未批准框架 / 库，必须标记 `code review checklist assessment: fail`，在 review 中说明这是未授权技术栈变更，并回流重写；对用户最终说明中要明确承认该实现不应被接受
20. 明确写出：
   - `clean-code assessment: pass|fail`
   - `source grounding assessment: pass|fail`
   - `expert frontend engineering assessment: pass|fail`（如适用）
   - `architecture reuse assessment: pass|fail`（如适用）
   - `production code quality assessment: pass|fail`（如适用）
   - `code review checklist assessment: pass|fail`（生产代码改动适用）
   - `human review readiness assessment: pass|fail`（如适用）
   - `functional-programming assessment: pass|fail`
   - `design-pattern assessment: pass|fail`
   - `user intent assessment: pass|fail`（如适用）
   - `change-chain integrity assessment: pass|fail`（如适用）
   - `removal cleanup assessment: pass|fail`（如适用）
   - `frontend styling assessment: pass|fail`（如适用）
   - `API contract assessment: pass|fail`（如适用）
   - `TypeScript context assessment: pass|fail`（如适用）
21. 如涉及样式变更，检查 authored styling 是否遵守 frontend-components policy；以下情况按 blocker 处理：
   - 使用未批准的 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class
   - `class` / `className` / class binding 值超过项目 formatter 正常行宽或依赖多行包裹
   - 用常量、map、computed、helper 或 import 变量隐藏过长 class 值
   - 用条件 class binding 承载大段基础样式而不是小型状态切换
22. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，检查实现是否先恢复了 governing `tsconfig` 与相关声明来源，再进行编码与类型决策；把靠猜测 path aliases、ambient globals、generated types 落地的行为视为流程缺陷。
23. 如果结论依赖真实依赖方向、ownership boundary、side-effect spread、abstraction fan-out，优先使用 code graph 证据。
24. 如果 review 扩展或推翻了早先结构理解，更新 `artifacts/code-context.md`。
25. 保留 `state.json.loop`，不重置、不改写。
26. 若仍有 blocker，记录后交回主 skill 回流到 `execute`，并在同一 workflow run 中继续。
27. 若当前拆分模块通过 review，必须要求主 skill 执行模块收口状态迁移：
   - 将当前模块标记为 `completed`
   - 更新 `pending_module_ids` 与 `completed_module_ids`
   - 若仍有待处理模块，则提升下一个模块并切到其首个下游阶段
   - 若无待处理模块，则切到 `stage=complete` 且令 `loop.state=complete`
28. 若 direct-change、bugfix 或非拆分请求通过 review，必须要求主 skill 设置 `state.json.stage=complete` 与 `state.json.loop.state=complete`。
29. 在 blocker 未清零前，不允许标记 complete。

## 输出格式

- 必须产出：
  - 当前交付单元的 `review/review.md`
- 最终交付物应包含：
  - final review findings
  - merge readiness judgment
  - spec-plan alignment findings
  - source-grounding findings
  - user-intent findings（如适用）
  - API integration findings
  - change-chain integrity findings（修改或移除既有代码时适用）
  - clean-code findings
  - expert-frontend-engineering findings（如适用）
  - production-code-quality findings（如适用）
  - code-review checklist findings（生产代码改动适用）
  - human-review-readiness findings（如适用）
  - architecture reuse findings（如适用）
  - functional-programming findings（如适用）
  - frontend styling findings（如适用）
  - API contract assessment（如适用）
  - TypeScript context assessment（如适用）
  - design-pattern findings
  - code-graph-backed structural findings（如适用）
  - pass/fail compliance conclusions
  - 可直接驱动下一轮 execute 的 blocker 列表

## 验收标准

- 当前交付单元 `review/review.md` 已存在并按严重级别记录发现项。
- review 范围符合 `speed_profile`，小改动没有重复政策样板，大影响改动没有压缩必要风险审查。
- 已明确说明实现是否全部回溯到 source-grounding 条目，且没有未授权扩展。
- 如存在 user intent contract，已明确说明实现是否满足用户实际目标并避开 forbidden interpretations。
- 如存在既有代码修改或移除，已明确说明操作前链路审查是否充分、操作后链路是否干净、是否存在缺环或多余环节、是否影响邻近功能。
- 已明确说明 changed area 是否仍有 clean-code blocker。
- 如新增或修改用户可见行为、状态流、数据流、组件组合、前端架构或生产集成，已明确说明 expert frontend engineering assessment pass/fail。
- 如添加或修改生产代码，已明确说明 production code quality assessment pass/fail。
- 如添加或修改生产代码，已明确说明 code review checklist assessment pass/fail，覆盖健壮性、可维护性、性能与内存、项目规范一致性。
- 如修改生产代码、测试、mock、契约或生成类型可见文件，已明确说明 human review readiness assessment pass/fail。
- 如涉及复用候选或可能重复的语义逻辑，已明确说明 architecture reuse assessment pass/fail。
- 已明确说明新增或扩大作用域的常量是否均有可证明的语义、约束、快照、简化或复用价值，且无意义常量已作为 blocker 处理。
- 已明确说明新增独立 helper / hook / mapper / utility 文件是否均有多个真实生产调用方或已批准边界理由；单调用方无理由外置已作为 blocker 处理。
- 如存在行为移除，已明确说明是否仍有 orphan helper、unused import、stale request wrapper、obsolete state、测试或注释残留。
- 已明确说明测试文件是否已按需求适配；没有把测试引用当作待改或待删生产代码的真实调用方。
- 如涉及样式变更，已明确说明 Tailwind CSS-style styling、class 值长度、禁止隐藏过长 class 字符串是否合规。
- 如涉及 API 合同，已明确说明 API contract assessment pass/fail。
- 如涉及 TypeScript context，已明确说明 TypeScript context assessment pass/fail。
- 已明确说明 pattern choice 是 justified / overbuilt / unnecessary。
- 已明确说明 pattern implementation shape 是否符合前端语法特点。
- 已明确说明 pattern-fit evaluation 是否覆盖小需求、局部修改和 bugfix；direct code 选择有明确无信号理由或被触发模式候选的拒绝理由。
- 当前交付单元 `review/review.md` 已明确写出 `clean-code assessment: pass|fail` 与 `design-pattern assessment: pass|fail`。
- 当前交付单元 `review/review.md` 已明确写出 `source grounding assessment: pass|fail`。
- 当前交付单元 `review/review.md` 已明确写出 `expert frontend engineering assessment: pass|fail`（如适用）。
- 当前交付单元 `review/review.md` 已明确写出 `production code quality assessment: pass|fail`（如适用）。
- 当前交付单元 `review/review.md` 已明确写出 `code review checklist assessment: pass|fail`（生产代码改动适用）。
- 当前交付单元 `review/review.md` 已明确写出 `human review readiness assessment: pass|fail`（如适用）。
- 当前交付单元 `review/review.md` 已明确写出 `architecture reuse assessment: pass|fail`（如适用）。
- 当前交付单元 `review/review.md` 已明确写出 `functional-programming assessment: pass|fail`（如适用）。
- 已明确说明 spec 与 plan 是否保持所需行为颗粒度对齐。
- 当前交付单元所有 blocker 都已清零，否则必须回流执行。
- 拆分模块通过时，主 skill 必须完成模块收口状态迁移后，再推进到下一个模块或 `complete`，且保留原有 `loop`。
- direct-change、bugfix 或非拆分请求通过时，主 skill 必须设置 `stage=complete` 与 `loop.state=complete`。

## 安全边界

- 不能把 review 压缩成一句批准语。
- 不能接受没有来源锚定的行为或从常规做法、相邻模块、样例内容、个人偏好扩展出来的行为。
- 不能因为“功能能跑”就忽略严重的可维护性问题。
- 不能因为自动化验证通过就忽略人工评审可读性、diff scope、局部惯例、证据质量或 reviewer trust。
- 不能接受局部实现正确但端到端用户旅程、状态生命周期、异步正确性、交互韧性、性能边界、演进安全或证据不足的前端改动。
- 不能接受缺少类型契约、silent failure、空值语义混淆、命名违规、magic variables、无理由微优化、无批准 class / mutable owner，或缺少边界 UI 状态的生产代码。
- 不能接受未通过 code-review checklist 的生产代码：plan 缺少预检合同、execute 未按合同实现、外部数据缺少判空 / 可选链、API 缺少异常处理、巨型混责函数、魔法数字无语义常量、高频事件缺少合适防抖 / 节流 / 取消 / 去重决策、副作用缺少 cleanup，或组件库 / 样式方案 / 目录引用方式 / 技术栈锚定不一致。
- 不能接受擅自更改技术栈、替换组件库、绕过既有样式方案、改变目录引用方式或引入未批准框架 / 库；这类问题必须标 ❌、说明不应接受，并回流重写。
- 不能把已通过 Anti-DRY 矩阵且批准抽取但未抽取的重复语义逻辑降级为非阻塞建议。
- 不能接受仅以“不同模块”为理由拒绝公共逻辑抽取。
- 不能接受未通过 Anti-DRY 矩阵的提前抽象、God Utils、shared 导入业务私有 entity、shared 内部环境副作用、合并接口或缺少 traceability 的新晋升 shared API。
- 不能接受没有清晰领域 owner 的 dumping-ground utility。
- 不能接受只有一个页面、一个真实生产调用方的函数被无理由抽成独立文件；这属于错误抽象，不是 clean-code。
- 不能接受用 one-function module、局部 `utils.ts`、局部 `helpers.ts` 或单调用方 mapper 文件制造不必要阅读跳转。
- 不能因为“函数式”就接受更难读、更难调试或隐藏副作用的实现。
- 不能接受只给一次性显然值换名、为假想复用导出、创建同义别名或无依据扩大作用域的常量。
- 不能接受只满足字面要求但违背用户实际目标的实现。
- 不能接受缺少变更链路审查或链路复查证据的既有代码修改 / 移除。
- 不能接受修改或移除后仍存在缺环、多余环节、重复路径、冲突路径或未授权邻近功能影响。
- 不能接受删除行为后残留孤立 helper、unused import、stale request wrapper、obsolete state、测试或注释。
- 不能接受因为测试文件仍引用待改或待删代码而保留生产代码；测试引用视为空引用，测试应适配新需求。
- 不能接受没有实际问题支撑的 pattern layer / fake extensibility / framework-shaped indirection。
- 不能接受把前端 pattern 机械实现成后端式 class hierarchy、abstract base、manager、factory、handler 或 one-method wrapper ceremony，除非项目惯例和已批准边界理由同时成立。
- 不能接受为了证明考虑过设计模式而机械枚举所有未触发模式，或把这种枚举当成真实 pattern-fit evaluation。
- 不能接受缺失 pattern-fit evaluation 的 spec / plan，即使实现是小改动或 bugfix。
- 不能接受没有理由的 direct code，当代码事实已经出现适配、选择、状态、命令、流程、通知、代理、组合或构建候选信号。
- 不能把 clean-code 或 design-pattern 合规性当成默认成立而不写 pass/fail。
- 不能把 functional-programming 合规性当成默认成立而不写 pass/fail（如适用）。
- 不能接受违反 Tailwind CSS-style utility class、class 值长度或禁止隐藏过长 class 字符串规则的 authored styling。
- 不能把 material spec-plan granularity drift 当作无害文档问题。
- 不能接受无批准 adapter boundary 的 API 集成代码去重复声明服务端 TS 类型或偷偷改写后端字段语义。
- 不能接受 TypeScript 相关实现建立在未确认 `tsconfig`、未确认声明来源、或全靠猜测的 alias / global / generated-type 假设之上。
- 在 blocker 未解决前，不能宣称 merge-ready。
