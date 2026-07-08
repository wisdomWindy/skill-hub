---
name: backend-agent-framework-requirement-analysis
description: Stage subskill for requirement analysis. Turn a PRD-driven backend request into a durable analysis baseline before requirement splitting.
---

# Requirement Analysis Subskill

## 触发场景

- 当主 `backend-agent-framework` 将 PRD 驱动需求路由到 `stage=requirement-analysis` 时使用。
- 适用于在需求拆分前，先把资料来源、范围、目标、确认口径、职责边界、差异流程、状态口径、隐含约束、拆分轴和结构风险做成 durable 分析工件的场景。

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/state.json`
- 原始 PRD 文档或稳定 PRD 引用

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
2. 仅用于 PRD 驱动需求。
3. 产出 `docs/requests/<request-id>/requirements/requirement-analysis.md`。
4. 默认使用中文写工件；代码标识、协议名、字段名、错误码、路径等源标识保持原文。
5. 明确分析：
   - 资料来源与阅读口径
   - 需求目标与业务价值
   - 已确认口径与不可违背前提
   - 范围内事项与范围外事项
   - 关键参与者、调用方、上下游依赖
   - 项目、服务、数据库或存储边界
   - 多角色、多制作模式或多业务模式的主流程差异
   - 统一状态口径、流程节点口径、审批口径和术语口径
   - 来源中已经给出的显式约束
   - 来源未明说但会影响拆分或实现的隐含约束与假设
   - 核心流程、状态变化、关键实体、接口与事件观察
   - 外部系统依赖、既有系统复用边界与 adapter 预留策略
   - 验收基线、回归基线与不受影响范围
   - 研发拆分建议与推荐拆分轴
   - 风险、歧义、待确认项及其分类
   - 建议拆分轴与不应拆散的语义边界
   - 是否存在进入 requirement-splitting 的真实 blocker
6. 对待确认项必须分三类写清：
   - `业务阻塞`
   - `外部接口待补`
   - `非阻塞`
7. 只有 `业务阻塞` 会阻止进入 `requirement-splitting`；`外部接口待补` 允许按 adapter、配置和预留 DTO 继续推进，但必须把替换边界写清；`非阻塞` 只记录不拦阶段。
8. 这一阶段的目标是“吃透需求并沉淀研发分析底稿”，不是直接拆模块，也不是写工程 spec。
9. 如果存在关键歧义会导致无损拆分失真，必须在分析工件中显式记录，并由主 skill 视情况走 gate；不要用猜测补全。
10. 若不存在真实 blocker，则完成后把 `stage` 设为 `requirement-splitting`。
11. 保留 `state.json.loop`，不重置、不改写。
12. 本阶段不写模块拆分结果、不写 spec、不写代码。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/requirements/requirement-analysis.md`

## 验收标准

- `requirements/requirement-analysis.md` 已存在。
- 已明确写出资料来源与阅读口径、需求目标、已确认口径、范围内/外、参与者、边界、显式约束、隐含约束、核心流程、状态口径、外部依赖、验收/回归基线和建议拆分轴。
- 已把会影响拆分正确性的关键问题显式暴露，并按 `业务阻塞`、`外部接口待补`、`非阻塞` 分类，而不是留到 spec 或 execute 再猜。
- 若不存在真实 blocker，`state.json.stage=requirement-splitting`。
- `state.json.loop` 保持原有结构与语义。

## 安全边界

- 不能在本阶段偷写模块拆分结果。
- 不能把分析退化成 PRD 摘抄或宽泛会议纪要。
- 不能发明需求文档中不存在的新行为。
- 不能在关键歧义存在时假装需求已经分析完成。
