---
name: frontend-agent-framework-requirement-analysis
description: Stage subskill for requirement analysis. Turn intake artifacts into an explicit scope, risk, ambiguity, and splitting-strategy analysis before requirement splitting.
---

# Requirement Analysis Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将 PRD 驱动需求路由到 `stage=requirement-analysis` 时使用。
- 适用于在正式模块拆分前，先把需求范围、非目标、依赖、风险、歧义和拆分依据显式固化的场景。
- 适用于需求横跨多个系统、项目、引用文档、外部接口或历史基线，需要先建立“资料来源与阅读口径”“系统职责边界”“阻塞项分级”后，后续阶段才能稳定推进的场景。

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
6. 如果上游已经通过需求确认、开发分析文档或稳定决议给出了明确口径，必须提炼为“已确认口径 / confirmed decisions”，避免下游 `spec` 再重复发明约束。
7. 产出：
   - `analysis/requirement-analysis.md`
8. 在本阶段明确写清：
   - source inventory and reading stance
   - confirmed scope
   - out-of-scope / non-goals
   - confirmed decisions / invariants
   - system boundaries / ownership
   - source-backed behavior inventory
   - workflow / dependency assessment
   - ambiguity / clarification register
   - risk / constraint assessment
   - blocker classification and handling stance
   - splitting strategy
   - downstream stage signals
9. 需求分析必须以“理解需求”为目标，而不是提前输出实现方案、文件结构、代码抽象、DDL 细节或测试设计。
10. 对上游已经明确给出的字段、表格、展示、交互、状态、流程、依赖、审批、外部约束，不得在分析阶段压缩成过于宽泛的口号式总结。
11. 如果范围内存在多个页面、流程、表格、表单、系统边界或跨模块规则，必须明确记录它们为什么应该在下一阶段被拆开，或为什么应该保持在一个模块内。
12. 可以在分析阶段给出 `page-design` / `architecture-design` 的 request-level signals，但不能替代 `requirement-splitting` 对具体模块路由的正式判定。
13. 如果发现源文档存在歧义、冲突、遗漏或无从判断的业务语义，必须记录为开放问题；不能靠常识补全。
14. 必须对未决事项分级，不允许一律写成“待确认”：
   - `业务阻塞`：若不确认会影响业务流程、数据模型、权限、状态机、审核口径或职责边界，则不得静默带入 `spec`
   - `外部接口待补`：仅当缺的是外部系统接口文档、topic、鉴权细节、字段补充，并且需求主口径已稳定，才允许记录为后续通过 adapter / config / 预留 DTO 承接
   - `非阻塞`：不影响主链路 `spec` 起草，可在设计评审或实现前补齐
15. 保留 `state.json.loop`，不重置、不改写。
16. 本阶段不写 `requirements/requirement-map.md`，不写 `spec/plan/execution/verification/review` 工件，不写代码。
17. 只有在核心来源可读、范围和阻塞分级已写清时，才把 `stage` 设为 `requirement-splitting`；若缺失核心需求来源或存在未分级的关键阻塞，必须停在当前阶段并交由主 skill 处理门禁。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/analysis/requirement-analysis.md`
- 最终交付物应包含：
  - 需求理解摘要
  - 资料来源与阅读口径
  - confirmed scope
  - out-of-scope / non-goals
  - 已确认口径 / confirmed decisions
  - 系统职责与边界
  - 关键行为簇梳理
  - 依赖与约束判断
  - 歧义与开放问题
  - 阻塞项分级与处理口径
  - 风险判断
  - 后续 requirement-splitting 的拆分依据
  - `page-design` / `architecture-design` 信号

## 验收标准

- `analysis/requirement-analysis.md` 已存在。
- 已记录原始来源、引用资料和阅读口径；若有未读取资料，已写清影响。
- 当前请求范围与非目标已被显式写清。
- 已把会影响 `spec` 口径的已确认决策显式写清。
- 已把系统职责边界、项目边界或能力复用边界写清。
- 上游明确行为约束没有被压缩成无法驱动后续拆分的粗摘要。
- 已记录后续拆分的依据与不应合并的边界。
- 已记录开放问题、依赖、风险与阻塞项分级。
- 若核心来源和阻塞门禁满足，`state.json.stage=requirement-splitting`；否则维持当前阶段并明确阻塞原因。
- `state.json` 保留原有 `loop`。

## 安全边界

- 不能把本阶段退化成 intake 摘要复述。
- 不能跳过范围判断、非目标判断和拆分依据判断。
- 不能跳过资料来源盘点、阅读口径或系统边界判断。
- 不能把需求分析直接写成实现设计。
- 不能在本阶段生成正式模块工件。
- 不能写 spec、plan 或代码。
- 不能在存在歧义时用实现常识替代显式记录。
- 不能把“业务阻塞”和“外部接口待补”混成一个模糊待确认列表。
