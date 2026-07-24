---
name: frontend-agent-framework-verify
description: Stage subskill for verification. Validate the implementation against acceptance criteria and record durable evidence.
---

# Verify Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=verify` 时使用。
- 适用于对实现结果做验收、留证据、判断是否可进入 review 的阶段。

## 必要输入

- 当前交付单元的 `spec/spec.md`
- 当前交付单元的 `plan/plan.md`
- 当前交付单元的 `execution/changelog.md`
- `docs/requests/<request-id>/state.json`

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - 当前交付单元的 `spec/spec.md`
   - 当前交付单元的 `plan/plan.md`
   - 当前交付单元的 `execution/changelog.md`
   - `../../references/state-machine.md`
   - `../../references/templates/verify.md`
   - `../../references/policies/policy-index.md`
   - `../../references/policies/constraint-model.md`
   - 按 `policy-index.md` 的 `verify` 阶段映射读取本次 scoped work 适用的 policy 文件；默认至少读取 `testing.md`、`source-grounding.md`、`design-patterns.md`；代码改动默认读取 `human-review-readiness.md`；如需选择 scoped verification，读取 `workflow-efficiency.md`
2. 产出当前交付单元的 `verification/verification.md`。
3. 将每条 acceptance criterion 映射到：
   - verification method
   - result
   - evidence
4. 验证实现是否符合 framework-approved spec，而不是 undocumented intent。
5. 验证实现行为是否全部回溯到 framework-approved spec / plan 的 source-grounding 条目，不能接受无来源行为、相邻模块扩展、样例内容扩展或常规做法扩展。
6. 验证 spec 与 plan 是否在实现范围内保持同一 function-complete granularity。
7. 验证 pattern-fit decision 是否在 spec / plan 中存在并被实现遵守：
   - 每个交付单元都必须有 `direct code` / `reuse existing pattern` / `adapt lightweight pattern` / `introduce pattern` 决策
   - 小需求、局部修改和 bugfix 不能缺少 pattern-fit evaluation
   - 选择 Level 0 direct code 且无真实候选信号时，必须有短的无信号理由，且实现没有现场升级成未批准 pattern 层
   - 存在候选信号但仍选择 direct code 时，必须有被触发候选模式的拒绝理由
   - 选择复用、轻量适配或引入 pattern 时，实现必须采用已批准的最轻结构，没有降级、替换、平行抽象或过度 ceremony
8. 验证可测试行为是否被测试覆盖，若无则检查是否有明确例外说明。
   - 按 `speed_profile` 执行最低充分验证：`S0` / `S1` 优先跑目标测试、类型 / lint 的 scoped 命令和直接手工检查；`S2` / `S3` 或共享影响面必须扩大验证范围。
9. 如果 framework-approved spec 包含 user intent contract，必须同时验证：
   - literal compliance
   - intent compliance
   - forbidden interpretations 未被采用
   - 复杂度、风险、歧义或责任没有被转移到未检查位置
10. 如果实现修改或移除了既有代码，验证是否具备变更前链路审查与变更后链路复查证据：
   - 功能入口到组件、状态、请求、adapter、helper、UI 消费者的链路仍完整
   - 文件引用关系、调用方、事件、watch / computed、测试与 mock 已同步
   - 测试文件引用待改或待删代码时，已被当作测试适配面处理，而不是生产代码保留依据
   - 没有缺少必要环节、残留多余环节、重复路径、冲突路径或未授权邻近功能影响
11. 如果实现移除了调用、请求、分支、字段、控件或副作用，验证是否同步清理该行为独占的 import、helper、常量、类型、request wrapper、状态、测试、mock 和注释；保留 helper 时必须有真实生产调用方证据，仅测试引用不能作为保留证据。
12. 如果 framework-approved spec 包含 trigger/context/handoff 假设，也要验证实现是否遵守。
13. 如涉及后端接口，验证 request/response handling 是否符合 framework-approved backend contract source，包括：
   - API docs
   - protobuf contracts
   - backend-owned TypeScript declarations
14. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，验证实现是否遵守 governing `tsconfig` 与已确认的相关声明来源，尤其是 alias resolution、ambient types、generated contracts 与 strictness-sensitive assumptions。
15. 如涉及样式变更，验证 authored styling 是否遵守 frontend-components policy：
   - 是否只使用 Tailwind CSS-style utility classes
   - 是否存在新增 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class
   - 是否存在超过项目 formatter 正常行宽或依赖多行包裹的 `class` / `className` / class binding
   - 是否存在用常量、map、computed、helper 或 import 变量隐藏过长 class 值
16. 如实现包含规则、校验、数据转换、状态派生、payload 构造或 adapter / mapper，验证是否遵守 functional-programming policy：
   - 确定性规则和转换是否可测试且结果符合预期
   - 是否没有在纯 helper 中隐藏副作用
   - 是否没有直接 mutate props、backend DTO、共享 store snapshot、函数参数或导入常量
   - 数据语义归一是否位于 adapter / mapper / `fromDetail`，而不是 computed / watch / template fallback
17. 如实现添加或修改生产代码，验证是否遵守 production-code-quality policy：
   - type-first 契约是否先于实现建立，类型是否足够精确，必要的 branded / nominal 区分是否存在或有合理拒绝理由
   - 异常、空值、非法值、超时、请求失败、部分成功和不可能状态是否显式处理，没有 silent failure
   - `null` / `undefined` 语义是否清晰，`??` / `?.` 是否用于防御而非掩盖 contract 问题
   - 布尔、props 回调、内部事件处理和普通函数动词是否符合命名规则
   - helper 是否没有 magic variables，真实配置常量是否集中在最窄稳定 owner，且没有用常量隐藏一次性值或过长 class
   - memoization、cache、debounce、throttle、virtualization、`useMemo` / `useCallback`、computed caching 或 watcher 优化是否有真实理由和依赖说明
   - 确定性逻辑是否优先纯函数和不可变数据，class 或 mutable owner 是否有批准理由
   - touched list / async operation / form input 是否具备空状态、loading 状态、错误状态和终止条件
18. 如 scoped work 新增或修改用户可见行为、状态流、数据流、组件组合、前端架构或生产集成，验证 expert frontend engineering compliance：
   - 用户旅程是否覆盖入口、前置、可见状态、成功、失败、重试、取消和交接
   - 状态 owner 与数据生命周期是否清晰，没有重复 writable state 或 derived state 误存
   - 异步 loading、去重、取消、过期响应、竞态、幂等、重试语义是否符合 spec / plan
   - 键盘、焦点、语义控件、disabled、确认、权限、反馈是否有证据或合理不适用说明
   - render scope、大列表、昂贵派生、bundle、响应式 fan-out 风险是否被验证
   - migration、兼容边界、回滚面、清理触发器或双路径 owner 是否清楚
   - 测试与诊断证据是否足以支撑该前端链路
   - 如涉及 Vue 组件抽取，验证是否按 spec / plan 的 `vue-component-extraction.md` 决策执行：应抽取的候选已抽取或复用，不应抽取的候选保持内联；真实生产调用方数量、`2+ 同语义`或单调用方例外、props / emits / slots、状态 owner、数据归一边界、Tailwind class 边界和测试面均符合计划
19. 如 scoped work 触碰业务规则、校验、筛选排序、option 构造、权限判断、payload 构造、状态派生、状态映射、adapter / mapper、view-model 构造或 helper 逻辑，验证 architecture reuse compliance：
   - 是否检查了 spec / plan / architecture-design 中的复用候选
   - 是否验证了 Anti-DRY 矩阵：业务语义、分层、真实生产使用点数量、变化稳定性、变因数量
   - 抽取 / 复用 / 保持分离 / 暂缓决策是否被执行
   - 公共 owner、依赖方向、公开 API、类型来源和副作用边界是否符合设计
   - 共性分类和目标 owner 是否匹配
   - 业务差异是否通过参数、依赖注入、getter、config、HOF、strategy object、adapter 或薄封装传入
   - in-scope 生产调用方、测试、mock、import / export 是否迁移完成
   - 新晋升 shared API 是否具备 JSDoc `@see` / `@example` traceability
   - 是否仍有重复旧路径、孤立 helper、dumping-ground utility、premature abstraction、业务私有 entity import、环境副作用或合并接口
   - 是否有行为等价验证证据
20. 如 scoped work 修改生产代码、测试、mock、契约或生成类型可见文件，验证 human review readiness compliance：
   - changed files 是否都在批准范围内
   - changed hunks 是否都能映射到 approved task、cleanup obligation 或 test adaptation
   - 是否符合相邻项目惯例
   - 是否无无关改动、格式化噪音、debug code、dead code、commented-out code、stale comments、temporary names、unused imports / exports、stale tests 或 stale mocks
   - 测试、类型检查、lint、手工验证、未运行命令原因和剩余风险是否足以支撑人工评审
21. 在当前交付单元 `verification/verification.md` 中写出明确的 pass/fail 结论：
   - `spec constraint compliance: pass|fail`
   - `source grounding compliance: pass|fail`
   - `design-pattern compliance: pass|fail`
   - `user intent compliance: pass|fail`（如适用）
   - `change-chain integrity: pass|fail`（如适用）
   - `removal cleanup compliance: pass|fail`（如适用）
   - `expert frontend engineering compliance: pass|fail`（如适用）
   - `production code quality compliance: pass|fail`（如适用）
   - `human review readiness compliance: pass|fail`（如适用）
   - `functional-programming compliance: pass|fail`（如适用）
   - `architecture reuse compliance: pass|fail`（如适用）
   - `frontend styling compliance: pass|fail`（如适用）
   - `API contract conformance: pass|fail`（如适用）
   - `TypeScript context compliance: pass|fail`（如适用）
22. 保留 `state.json.loop`，不重置、不改写。
23. 若验证失败，明确记录失败原因，交回主 skill 回流到 `execute`，并继续同一 workflow run。
24. 本阶段不能在没有验证工件的情况下宣称完成。

## 输出格式

- 必须产出：
  - 当前交付单元的 `verification/verification.md`
  - 当前交付单元的 `verification/evidence/` 下的可选证据文件
- 最终交付物应包含：
  - acceptance coverage mapping
  - verification evidence
  - spec-constraint compliance 结论
  - source grounding compliance 结论
  - design-pattern compliance 结论
  - user-intent compliance 结论（如适用）
  - change-chain integrity 结论（修改或移除既有代码时适用）
  - expert-frontend-engineering compliance 结论（如适用）
  - production-code-quality compliance 结论（如适用）
  - human review readiness compliance 结论（如适用）
  - functional-programming compliance 结论（如适用）
  - architecture reuse compliance 结论（如适用）
  - spec-plan granularity alignment 结论
  - frontend styling compliance evidence（如适用）
  - API contract conformance evidence（如适用）
  - TypeScript context compliance evidence（如适用）
  - failure records（如失败）
  - TDD exception checks（如适用）
  - workflow handoff readiness evidence（如适用）

## 验收标准

- 每条 acceptance criterion 都已被检查。
- 验证范围符合 `speed_profile`，且任何未运行的更大范围命令都有原因和替代证据。
- 每个验证项都有附件或引用证据。
- 当前交付单元 `verification/verification.md` 已明确写出 spec constraints pass/fail。
- 当前交付单元 `verification/verification.md` 已明确写出 source grounding pass/fail，且实现没有未授权扩展。
- 当前交付单元 `verification/verification.md` 已明确写出 design-pattern compliance pass/fail，且实现遵守 spec / plan 的 pattern-fit decision。
- 如存在 user intent contract，当前交付单元 `verification/verification.md` 已明确写出 literal compliance 与 intent compliance pass/fail。
- 如存在既有代码修改或移除，当前交付单元 `verification/verification.md` 已明确写出变更前链路审查与变更后链路完整性复查结论。
- 如存在行为移除，当前交付单元 `verification/verification.md` 已明确写出删除依赖闭包清理结论。
- 如测试文件引用待改或待删代码，当前交付单元 `verification/verification.md` 已明确写出测试适配结论，且未把测试引用当成生产代码保留依据。
- 如新增或修改用户可见行为、状态流、数据流、组件组合、前端架构或生产集成，当前交付单元 `verification/verification.md` 已明确写出 expert frontend engineering compliance pass/fail。
- 如涉及 Vue 组件拆分，当前交付单元 `verification/verification.md` 已明确写出抽取 / 不抽取决策是否落实、真实生产调用方数量和单调用方例外是否成立、组件接口是否清晰、是否存在单调用方透传组件、泛 wrapper、DTO / form-model passthrough 或只为隐藏长 class 的组件。
- 如添加或修改生产代码，当前交付单元 `verification/verification.md` 已明确写出 production code quality compliance pass/fail。
- 如修改生产代码、测试、mock、契约或生成类型可见文件，当前交付单元 `verification/verification.md` 已明确写出 human review readiness compliance pass/fail。
- 如涉及样式变更，当前交付单元 `verification/verification.md` 已明确写出 Tailwind CSS-style styling 与 class 值长度检查结论。
- 如涉及规则、校验、转换、状态派生或 payload 构造，当前交付单元 `verification/verification.md` 已明确写出 functional-programming compliance pass/fail。
- 如涉及复用候选、公共逻辑抽取或可能重复的语义逻辑，当前交付单元 `verification/verification.md` 已明确写出 architecture reuse compliance pass/fail。
- 如涉及 API 合同，当前交付单元 `verification/verification.md` 已明确写出 API contract conformance pass/fail。
- 如涉及 TypeScript context，当前交付单元 `verification/verification.md` 已明确写出 TypeScript context compliance pass/fail。
- 当前交付单元 `verification/verification.md` 已明确写出 spec-plan 粒度对齐结论。
- 对可测试行为的 TDD 例外都有明确理由和替代证据。
- 若存在失败，要么已修复，要么已明确回流执行。
- 若工作流要求 handoff / downstream-ready result，也已明确验证。
- 通过时 `state.json.stage=review`，且保留原有 `loop`。
- 若失败，记录足够精确，`execute` 不需等待用户重新描述即可继续。

## 安全边界

- 不能在没有证据时标记完成。
- 不能忽略失败的 acceptance criteria。
- 不能把 spec-constraint compliance 当作默认成立而不写 pass/fail。
- 不能把 source grounding compliance 当作默认成立而不写 pass/fail。
- 不能把 design-pattern compliance 当作默认成立而不写 pass/fail。
- 不能接受无法回溯到 framework-approved spec 的实现行为。
- 不能接受从常规做法、相邻模块、样例内容或个人偏好中扩展出来的实现行为。
- 不能在实现只满足字面要求但违反用户实际目标时判定验证通过。
- 不能在缺少变更前链路审查、变更后链路复查，或仍存在缺环、多余环节、重复路径、冲突路径、未授权邻近功能影响时判定验证通过。
- 不能在移除行为后仍有孤立 helper、unused import、stale request wrapper、obsolete state、测试或注释残留时判定验证通过。
- 不能因为测试文件引用待改或待删生产代码就判定该生产代码仍有真实调用方；测试必须适配新需求。
- 不能在 spec / plan 存在行为颗粒度冲突时仍判定验证通过。
- 不能在用户旅程不完整、状态 owner 不清、异步竞态未定义、交互韧性缺失、性能边界未验证、演进双路径无 owner，或证据不足时判定 expert frontend engineering compliance 通过。
- 不能在存在缺失类型契约、silent failure、空值语义混淆、命名违规、magic variables、无理由微优化、无批准 class / mutable owner，或缺少边界 UI 状态时判定 production code quality compliance 通过。
- 不能在存在无关改动、格式化噪音、debug code、dead code、stale comments、temporary names、unused imports / exports、stale tests、stale mocks、局部惯例不符或证据不足时判定 human review readiness compliance 通过。
- 不能在 request/response handling 与 framework-approved backend contract source 冲突时仍判定验证通过。
- 不能在 authored styling 违反 Tailwind CSS-style utility class、class 值长度或禁止隐藏过长 class 字符串规则时判定验证通过。
- 不能在存在隐藏副作用、隐藏 mutation、语义归一层级错误或不可读的过度函数式链路时判定 functional-programming compliance 通过。
- 不能在存在漏抽已批准公共逻辑、重复旧路径、未迁移调用方、无 owner 共享工具或缺少行为等价证据时判定 architecture reuse compliance 通过。
- 不能在存在未通过 Anti-DRY 矩阵的提前抽象、God Utils、shared 导入业务私有 entity、shared 内部环境副作用、合并接口，或缺少 JSDoc traceability 的新晋升 shared API 时判定 architecture reuse compliance 通过。
- 不能在缺失 pattern-fit evaluation、direct code 缺少拒绝理由、实现引入未批准 pattern 层、已批准 pattern 被降级替换，或 pattern ceremony 明显重于问题时判定 design-pattern compliance 通过。
