---
name: frontend-agent-framework-requirement-analysis
description: Use when a PRD-driven frontend request needs developer-facing requirement analysis before requirement splitting, especially when scope, risks, ambiguities, confirmations, systems, fields, states, or workflows may be hidden in the source.
---

# Requirement Analysis Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将 PRD 驱动需求路由到 `stage=requirement-analysis` 时使用。
- 适用于在正式模块拆分前，先把需求范围、非目标、依赖、风险、歧义和拆分依据显式固化的场景。
- 适用于需求横跨多个系统、项目、引用文档、外部接口或历史基线，需要先建立“资料来源与阅读口径”“系统职责边界”“阻塞项分级”后，后续阶段才能稳定推进的场景。
- 适用于用户只给一个原始需求文档，希望产出能让开发者少向产品二次确认的开发向需求细化稿，而不是 PRD 摘要的场景。

## 核心原则

需求分析产物是给开发者用的需求细化和确认稿，不是给读者快速了解 PRD 的摘要。

本阶段要做的是把原始需求中已经出现、被引用、被暗示、存在冲突或会导致实现分歧的内容摊开，形成后续 `requirement-splitting`、`spec`、`plan` 可直接承接的工程输入。所谓“减少二次确认”，不是删除不确定项，也不是替产品拍脑袋，而是：

1. 对已确认内容写得更具体，让开发者不必反复回源文档查字段、状态、流程、权限、边界。
2. 对隐藏但会影响实现的点显式暴露，写清为什么会影响开发、影响哪个模块、当前可采用什么处理口径。
3. 对真正未确认的内容分级记录，并给出阻塞影响、建议确认对象、下游承接方式。
4. 对风险点写清触发条件、影响面和后续阶段必须保护的约束。

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/state.json`
- 原始 PRD 文档或稳定 PRD 引用
- 若 PRD 明确引用了其他文档、表格、原型、接口文档、项目文档或仓库基线资料，需提供可读入口或稳定引用

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - 原始 PRD 文档或稳定 PRD 引用
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/templates/request.md`
   - `../../references/templates/requirement-analysis.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/source-grounding.md`
   - `../../references/policies/user-intent.md`
2. 仅用于 PRD 驱动需求；bugfix 输入默认不走本阶段，除非主 skill 明确把缺陷提升为等价需求分析问题。
3. 先消费 intake 工件；如果 `artifacts/prd-snapshot.md` 相比原始 PRD 丢失了关键业务约束、流程、字段、状态或依赖关系，必须回看原始 PRD 或稳定引用。
4. 若原始 PRD 中显式引用了其他会改变范围判断的资料，必须补建“资料来源与阅读口径”：
   - 原始 PRD / Wiki / 文档 ID
   - PRD 内引用的文档、表格、表单、原型、画板、接口文档
   - 本地需求文档或开发分析文档
   - 与当前需求边界判断直接相关的项目文档、仓库说明或历史基线资料
   - 若部分资料未读取，必须明确记录“未读取原因”和“因此无法确认的边界”
5. 如果需求跨多个系统、项目或数据库归属，必须在分析阶段显式写出“系统职责与边界”：
   - 哪些系统 / 仓库 / 角色直接承接开发
   - 哪些系统只作为参考或被动依赖
   - 哪些能力属于复用既有能力，而不是当前需求新建范围
6. 如果需求涉及数据、接口、权限、状态流转、审核、持久化、异步任务、跨系统同步或外部服务，必须在分析阶段显式写出“前端 / 服务端职责拆分”：
   - 前端需要实现的页面、交互、展示、状态管理、表单校验、adapter / mapper、请求消费与错误处理
   - 服务端需要提供或改造的接口、字段、DTO、权限、状态机、校验、持久化、任务、回调、同步或审计能力
   - 前后端共同确认的 API / DTO / enum / error-code / permission / workflow contract
   - 当前缺失的服务端契约、字段或能力属于 `业务阻塞`、`外部接口待补` 还是 `非阻塞`
   - 哪些内容是前端可先用 adapter / mock / feature flag / config 承接的，哪些必须等服务端决议后才能进入 `spec`
   不能把服务端职责默认为前端实现，也不能把前端展示、适配、交互责任笼统推给服务端。
7. 如果上游已经通过需求确认、开发分析文档或稳定决议给出了明确口径，必须提炼为“已确认口径 / confirmed decisions”，避免下游 `spec` 再重复发明约束。
8. 建立 source-grounding matrix，把每个材料性范围、行为、字段、交互、状态规则、接口契约、依赖、验收依据分类为 `source-backed`、`code-fact-backed`、`confirmed-decision`、`source-derived`、`missing-source` 或 `out-of-scope`。
9. `source-derived` 只能记录所有合理解释都会导向同一结果的窄推导，不能新增业务行为、字段、状态、交互、校验、API、验收标准或模块。
10. 对相邻模块、样例请求、常规做法或偏好实现中可能诱导模型扩展的内容，必须写进 `out-of-scope` 或 clarification，而不是默认纳入范围。
11. 产出：
   - `analysis/requirement-analysis.md`
12. 在本阶段明确写清：
   - source inventory and reading stance
   - source grounding matrix
   - user intent contract
   - confirmed scope
   - out-of-scope / non-goals
   - confirmed decisions / invariants
   - system boundaries / ownership
   - frontend / server responsibility split
   - source-backed behavior inventory
   - developer-facing behavior details
   - implicit requirements / hidden assumptions exposure
   - workflow / dependency assessment
   - ambiguity / clarification register
   - risk / constraint assessment
   - blocker classification and handling stance
   - confirmation-reduction notes
   - splitting strategy
   - downstream stage signals
13. 在本阶段完成所有需要人工确认的需求、问题、规则、歧义内容、模糊内容、缺失来源和产品决策处理：
   - 能从来源、项目文档或仓库上下文确认的，写入 confirmed decisions / invariants
   - 需要用户、产品、后端或外部系统确认且会影响 spec / plan 的，必须停在本阶段并设置阻塞原因
   - 歧义内容必须写清可能解释、影响面、推荐确认对象和阻塞等级；不得选一个方便实现的解释直接下传
   - 模糊内容必须写清模糊点、缺少的判定标准、影响的字段 / 流程 / 状态 / 验收项，以及是否需要人工确认
   - 可继续推进但仍需后续接口补充的，只能分类为 `外部接口待补` 并写清 adapter / mock / config / DTO 边界
   - 非阻塞问题必须写明为什么不影响 downstream 自动审批
   下游 `spec` 和 `plan` 不再发起用户审批或人工确认。
14. 需求分析必须以“理解需求”为目标，而不是提前输出实现方案、文件结构、代码抽象、DDL 细节或测试设计。
15. 对上游已经明确给出的字段、表格、展示、交互、状态、流程、依赖、审批、外部约束，不得在分析阶段压缩成过于宽泛的口号式总结。
16. 当用户请求包含“优化、简化、缩短、减少、调整、清理、规避、修复、归一”等容易被表面满足的词时，必须提炼 user intent contract：
   - 用户字面要求是什么
   - 实际要降低或保护的复杂度、风险、歧义、审查成本或行为语义是什么
   - 哪些实现方式属于 forbidden interpretations
   - 哪些实现方式属于 acceptable approaches
   - 后续 spec / plan / verify / review 必须如何检查 intent compliance
17. 对开发者会自然追问的内容，必须主动展开；至少检查并记录以下维度是否已明确：
   - 角色、端、菜单、权限、只读 / 可写边界
   - 页面、列表、表单、字段、筛选、导出、弹窗、抽屉、详情区块
   - 创建、编辑、提交、审核、驳回、终止、删除、导入、导出、下载、上传、解析、同步等操作入口和结果
   - 字段必填、格式、长度、枚举、默认值、只读态、可编辑时机、提交前校验
   - 状态机、节点、流转触发、锁定规则、逆流程、异常终止、重提规则
   - 数据来源、主数据归属、跨库 / 跨系统同步、前端消费 DTO、adapter / mapper / fromDetail 边界
   - 外部接口、异步任务、消息、回调、定时任务、失败重试、幂等和最终一致性
   - 审核快照、操作日志、审计、历史回放、原因文案、审批意见
   - 回归敏感区、权限隔离、安全隔离、旧系统兼容或不兼容边界
18. 如果源文档只写了业务结果但没有写实现会依赖的前置条件、状态来源、失败处理、权限边界或数据归属，必须将其写入“隐含需求 / hidden assumptions”，并标注：
   - 这是从哪条原文或哪个流程推导出来的
   - 为什么开发会受影响
   - 当前能否作为已确认口径
   - 若不能确认，属于业务阻塞、外部接口待补还是非阻塞
19. 如果源文档中存在表格、字段清单、状态枚举、流程图、权限矩阵、接口字段、验收条目，必须尽量结构化保留；不能只改写成一句“支持列表 / 支持审核 / 支持同步”。
20. 如果范围内存在多个页面、流程、表格、表单、系统边界或跨模块规则，必须明确记录它们为什么应该在下一阶段被拆开，或为什么应该保持在一个模块内。
21. 可以在分析阶段给出 `page-design` / `architecture-design` 的 request-level signals，但不能替代 `requirement-splitting` 对具体模块路由的正式判定。
22. 如果发现源文档存在歧义、模糊、冲突、遗漏或无从判断的业务语义，必须记录为开放问题并进入人工确认判断；不能靠常识补全，也不能为了让文档看起来完整而删掉不确定性。
23. 必须对未决事项分级，不允许一律写成“待确认”：
   - `业务阻塞`：若不确认会影响业务流程、数据模型、权限、状态机、审核口径或职责边界，则不得静默带入 `spec`
   - `外部接口待补`：仅当缺的是外部系统接口文档、topic、鉴权细节、字段补充，并且需求主口径已稳定，才允许记录为后续通过 adapter / config / 预留 DTO 承接
   - `非阻塞`：不影响主链路 `spec` 起草，可在设计评审或实现前补齐
24. 风险必须具体到触发条件和影响面，不能只写“存在风险”；每个高风险项至少写清：
   - 风险来源
   - 可能出错的开发点
   - 影响页面 / 流程 / 系统
   - 后续 `spec`、`plan` 或实现阶段必须采取的保护方式
25. 保留 `state.json.loop`，不重置、不改写。
26. 本阶段不写 `requirements/requirement-map.md`，不写 `spec/plan/execution/verification/review` 工件，不写代码。
27. 只有在核心来源可读、范围、来源锚定、前后端职责拆分、开发向细化、风险和阻塞分级已写清，且需要人工确认的需求、问题、规则、歧义内容、模糊内容、缺失来源和产品决策已解决或正确阻塞时，才把 `stage` 设为 `requirement-splitting`；若缺失核心需求来源、前后端责任边界不清、存在未分级的关键阻塞、存在未解决的人工确认项，或存在未处理的歧义 / 模糊 / 缺失来源内容，必须停在当前阶段并交由主 skill 处理门禁。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/analysis/requirement-analysis.md`
- 最终交付物应包含：
  - 需求理解摘要
  - 用户意图合同
  - 资料来源与阅读口径
  - 来源锚定矩阵
  - confirmed scope
  - out-of-scope / non-goals
  - 已确认口径 / confirmed decisions
  - 系统职责与边界
  - 前端 / 服务端职责拆分
  - 关键行为簇梳理
  - 面向开发者的行为细化
  - 隐含需求 / 隐藏假设暴露
  - 依赖与约束判断
  - 歧义与开放问题
  - 阻塞项分级与处理口径
  - 风险判断与影响面
  - 减少二次确认的开发提示
  - 后续 requirement-splitting 的拆分依据
  - `page-design` / `architecture-design` 信号

## 验收标准

- `analysis/requirement-analysis.md` 已存在。
- 已记录原始来源、引用资料和阅读口径；若有未读取资料，已写清影响。
- 已建立来源锚定矩阵，并区分 source-backed、code-fact-backed、confirmed-decision、source-derived、missing-source 和 out-of-scope 内容。
- 没有把常规做法、相邻模块、样例内容或偏好实现扩展成本次需求范围。
- 当前请求范围与非目标已被显式写清。
- 对容易被表面满足的请求，已写清用户实际目标、禁止解释、成功标准和后续检查方式。
- 已把会影响 `spec` 口径的已确认决策显式写清。
- 已把系统职责边界、项目边界或能力复用边界写清。
- 已把前端需要做的、服务端需要做的、前后端共同确认的契约、外部接口待补项和阻塞归属显式写清。
- 上游明确行为约束没有被压缩成无法驱动后续拆分的粗摘要。
- 产物能让开发者按字段、状态、流程、权限、数据来源、失败处理、回归范围继续写 `spec`，而不是只能知道“需求大概是什么”。
- 已把源文档中隐藏、不明确、相互冲突或会让开发者二次追问产品的问题显式列出，并说明影响。
- 已把风险点具体写到触发条件、影响面和后续处理口径。
- 已记录后续拆分的依据与不应合并的边界。
- 已记录开放问题、依赖、风险与阻塞项分级。
- 需要人工确认的需求、问题、规则、歧义内容、模糊内容和产品决策已在本阶段解决、明确阻塞，或分类为不影响 downstream 自动审批的非阻塞项。
- 若核心来源和阻塞门禁满足，`state.json.stage=requirement-splitting`；否则维持当前阶段并明确阻塞原因。
- `state.json` 保留原有 `loop`。

## 安全边界

- 不能把本阶段退化成 intake 摘要复述。
- 不能写成“PRD 摘要 / 背景总结 / 高层概览”后就进入拆分。
- 不能跳过范围判断、非目标判断和拆分依据判断。
- 不能跳过资料来源盘点、阅读口径或系统边界判断。
- 不能跳过前端 / 服务端职责拆分；不能把服务端字段、权限、状态机、持久化、任务、回调或同步能力默认为前端实现。
- 不能把前端展示、交互、adapter、错误处理、表单语义或状态消费责任笼统推给服务端。
- 不能把需求分析直接写成实现设计。
- 不能因为“减少二次确认”而删除、淡化或合并未确认问题；要把不明确处具体暴露并分级。
- 不能只按字面复述用户要求，而不提炼实际目标、反例和禁止规避方式。
- 不能把源文档中的字段、状态、权限、流程、验收、外部依赖压缩成“支持某功能”。
- 不能用“后续 spec 再细化”逃避本阶段应完成的需求理解、隐含约束暴露和风险判断。
- 不能把没有来源支撑的内容写成已确认范围。
- 不能把相邻模块行为、样例请求内容、通用产品惯例或偏好实现当作新范围来源。
- 不能在本阶段生成正式模块工件。
- 不能写 spec、plan 或代码。
- 不能在存在歧义时用实现常识替代显式记录。
- 不能把模糊内容包装成“按常规实现”或“后续实现自行判断”。
- 不能把“业务阻塞”和“外部接口待补”混成一个模糊待确认列表。
