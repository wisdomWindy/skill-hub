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
  - 多个页面、模块、hook、adapter、mapper 或 helper 存在相同或相似业务规则、校验、转换、payload 构造、状态派生、状态映射或请求结果适配，需要先判断是否应该抽象，再决定公共逻辑抽取边界
  - 设计模式选择会改变模块边界、文件归属、依赖方向、共享抽象、副作用编排或跨文件协作；小需求、局部修改和 bugfix 只有出现这些结构性信号时才进入本阶段

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
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

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
   - `../../references/policies/policy-index.md`
   - 按 `policy-index.md` 的 `architecture-design` 阶段映射读取本次 scoped work 适用的 policy 文件；默认至少读取 `frontend-architecture.md`、`functional-programming.md`、`design-patterns.md`、`doc-writing.md`
2. 只在代码架构敏感型前端需求中使用本阶段。
3. 仅为当前交付单元产出架构设计；拆分 PRD 工作不得跨模块混写。
4. 产出当前交付单元的 `design/architecture-design.md`。
5. 如果存在当前交付单元的 `page-design`，把它视为上游输入，代码架构设计不得和页面结构决策冲突。
6. 明确定义：
   - 模块边界
   - 文件与目录结构
   - 代码关系与依赖方向
   - 复用候选清单与公共抽象决策
   - Anti-DRY 抽象矩阵：业务语义、分层、真实生产使用点数量、变化稳定性、变因数量
   - 共性分类：技术/基础设施、业务/领域、UI/设计系统、配置/常量
   - page/container、business component、shared component、hook、adapter、type 的职责切分
   - 函数分层与公开入口
   - 单页面私有 helper / hook / mapper 的 locality decision：就近放置还是单独文件
   - 纯函数边界、组合方式与副作用边界
   - 状态归属与数据流
   - 数据结构与类型设计策略
   - adapter / mapper / request-layer 边界
   - 命名口径与共享抽象约束
   - 需要使用或明确拒绝的 pattern 决策
   - pattern-fit decision 对文件结构、依赖方向、协作关系和未来变更轴的影响；若决策为 direct code，说明为什么不需要本阶段引入额外模式层
7. 对当前交付单元涉及的业务规则、校验、转换、payload 构造、adapter / mapper、状态派生、状态映射、option 构造、权限判断、格式化或 helper 逻辑，必须做复用候选扫描：
   - 当前模块内是否已有重复
   - 同业务域邻近模块是否已有等价逻辑
   - 已存在的 shared helper / hook / mapper 是否可复用
   - 是否有重复逻辑正在被本次需求触碰
   优先使用 code graph；不可用时用 scoped 文本搜索与调用方阅读，并把范围和 fallback 记录进 `artifacts/code-context.md`。
8. 对每个复用候选必须先执行 Anti-DRY 矩阵评估：
   - 代码相似是否代表同一业务或技术语义，还是偶然雷同
   - 是否跨 UI、service、request、adapter、storage、shared 等不同分层，抽取后是否破坏依赖方向
   - 是否达到三处稳定真实生产使用；只有两处时默认记录候选并保持观察，除非已有批准设计证明小范围抽取更安全
   - 变化点是否稳定；MVP、实验性或高频变更逻辑默认延迟抽象
   - 变因数量是否可控；字段名、单位、时区、精度、权限、API 语义、生命周期等变因超过三个时默认拒绝抽取
9. 对每个复用候选必须做决策：
   - 抽取公共函数 / hook / mapper / adapter
   - 复用已有公共逻辑
   - 保持分离
   - 就近放置在 owning page / component / hook
   - 暂缓并记录 follow-up
   保持分离必须说明真实差异，例如不同业务语义、不同分层、不同领域 owner、生命周期、权限、API 语义、校验语义、不足三处稳定使用、变化点不确定、变因过多或预期独立演进；不能只写“不同模块暂不抽取”。
   对只有一个真实生产调用方的 helper / mapper / hook，默认决策为就近放置；只有存在 adapter / service / request 层边界、独立生命周期、独立测试面、框架模块约束、生成 / 合同隔离或同文件可读性无法接受时，才允许设计为独立文件。
10. 当三个或更多稳定生产位置存在同一语义规则，且本次需求会触碰该规则，默认应抽取到最低稳定 owner；除非抽取会造成依赖反向、循环依赖、范围外改动过大、变因过多、或语义其实不同。
11. 对批准抽取的公共逻辑必须分类并选择 owner：
   - 技术/基础设施共性进入 shared utils / hooks 等稳定基础 owner
   - 业务/领域共性进入 domain shared service / mapper / adapter 或微内核 owner
   - UI/设计系统共性进入 shared UI 组件 owner
   - 配置/常量共性进入最窄稳定 constants owner
   禁止把无关 helper 堆进 `shared/utils/index.ts`、`utils.ts` 或 dumping-ground module。
12. 公共逻辑抽取必须使用依赖倒置：
   - shared 提供机制，业务模块提供策略
   - shared module 不得 import feature module 私有 entity / interface
   - 业务字段差异通过参数、依赖注入、getter、config、HOF、strategy object、adapter 或薄封装传入
   - 禁止用大 union type、全可选 mega-interface 或兼容性类型把不相关模块硬合并
13. 公共逻辑抽取必须保持行为等价，不改变用户可见行为、接口语义、权限、校验、持久化或状态流转；若抽取会改变语义，回退到 `spec` 或前置确认 gate。
14. 公共函数优先是纯函数或纯 mapper；请求、状态写入、导航、缓存、埋点、`localStorage`、`window.location`、`fetch` 等副作用必须留在显式 command / action / request / lifecycle 边界或通过依赖注入传入。
15. 对新晋升的 shared API，设计必须要求 JSDoc traceability：使用 `@see` 或 `@example` 标明调用场景；广泛共享 helper 至少覆盖三个代表场景，或说明当前真实场景不足。
16. 如果是 greenfield 场景，代码架构设计必须和已批准的脚手架或 starter 决策保持一致，并明确允许的偏离范围。
17. 设计结果必须足够稳定，使当前交付单元的 `spec` 能把它当作上游输入，而不是在 `spec` 或 `execute` 阶段重新发明模块与类型结构。
18. 拆分 PRD 工作必须以 `requirements/requirement-map.md` 和当前模块工件为范围来源，不得跨模块混写；direct-change、bugfix 或非拆分请求以 `request.md`、`artifacts/prd-snapshot.md` 和既有 code context 为范围来源。
19. 如果本阶段是从 `execute` 回退而来，必须优先吸收当前交付单元 `execution/changelog.md` 与 `artifacts/code-context.md` 中记录的实际代码约束、依赖边界和失败证据，修正不合理的架构设计，而不是重复原设计。
20. 如果既有代码结构影响较大，优先结合 `code-context.md` 或 code graph 结果确认真实依赖边界。
21. 所有设计决策必须写入仓库工件，不保留在聊天上下文里。
22. 保留 `state.json.loop`，不重置、不改写。
23. 本阶段不写代码。
24. 对于会显著影响当前交付单元设计、文件结构、代码关系、函数结构、数据结构、类型设计或跨模块复用决策的需求，不允许跳过本阶段。

## 输出格式

- 必须产出：
  - 当前交付单元的 `design/architecture-design.md`
- 最终交付物应至少包含：
  - 模块边界
  - 文件结构
  - 代码关系
  - 函数设计
  - locality decision：单调用方 helper 是就近放置还是单独文件，以及理由
  - 复用候选清单、Anti-DRY 矩阵与抽取 / 不抽取决策
  - 共性分类、依赖注入 / 策略边界与 traceability 要求
  - 数据结构与类型策略
  - pattern-fit decision、拒绝的模式替代方案、以及对架构边界的影响
  - 架构风险与未决问题

## 验收标准

- 当前交付单元 `design/architecture-design.md` 已存在。
- 文档已定义模块边界、文件结构、依赖方向、职责分层、函数组织、数据结构和类型策略。
- 文档已记录单页面私有 helper / hook / mapper 的 locality decision；单调用方逻辑默认就近放置，若单独文件则有明确边界收益。
- 文档已扫描并记录复用候选；对重复业务规则、转换、校验、payload 构造、adapter / mapper、状态派生或 helper 逻辑给出抽取、复用、保持分离或暂缓决策。
- 对每个候选，文档已写清 Anti-DRY 矩阵结果：业务语义、分层、真实生产使用点数量、变化稳定性、变因数量。
- 对保持分离的候选，文档已写清真实语义差异、分层差异、不足三处稳定使用、变化点不确定、变因过多或依赖风险；没有用“不同模块”作为拒绝抽取的唯一理由。
- 对抽取的候选，文档已写清共性分类、目标 owner、依赖方向、公开 API、注入 / 策略边界、调用方迁移、JSDoc traceability 和行为等价验证方式。
- 文档已定义哪些规则 / 转换适合纯函数，哪些行为属于明确副作用边界。
- 文档已记录 pattern-fit decision 如何影响或不影响架构边界；如选择 direct code，已说明没有必要创建 adapter / strategy / command / facade / proxy / manager 等新结构层。
- 若存在 page-design，架构设计已与页面结构决策对齐。
- 若 scoped work 为 greenfield，架构设计已与脚手架策略对齐并写明允许偏离范围。
- 若本阶段来自 `execute` 回退，文档已吸收执行期暴露的实际代码约束并修正原有不合理设计。
- 所有未决架构问题已记录。
- `state.json.stage=spec`，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能把本阶段退化成抽象空话或泛泛“最佳实践”。
- 不能跳过复用候选扫描后让 execute 在多个模块继续复制同一业务规则。
- 不能因为逻辑在不同模块就默认不抽取；必须证明语义不同、依赖不允许或范围不安全。
- 不能因为两个片段长得像就默认抽取；必须通过 Anti-DRY 矩阵证明抽象收益高于错误抽象风险。
- 不能为了显得高级而抽取没有共同语义 owner 的偶然相似代码。
- 不能为了“应用设计模式”而给小需求、局部修改或 bugfix 增加没有真实变化轴、依赖边界或协作收益的模式层。
- 不能把一个页面、一个真实生产调用方的函数设计成独立文件，除非有已记录的具体边界收益。
- 不能用单函数文件、局部 `utils.ts`、局部 `helpers.ts` 或单调用方 mapper 文件制造不必要阅读跳转。
- 不能创建 God Utils、导入业务模块私有 entity 的 shared helper、含环境副作用的 shared pure helper，或为了复用合并接口的 mega type。
- 不能把函数式编程写成口号；必须落到纯函数边界、不可变数据流、组合方式或副作用归属。
- 不能绕过上游 requirement-splitting 直接凭印象做架构。
- 不能在没有 durable design artifact 的情况下进入实现规划。
