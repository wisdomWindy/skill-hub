---
name: backend-agent-framework-requirement-splitting
description: Stage subskill for requirement splitting. Normalize a PRD-driven request into source-traceable backend modules and functional units before architecture design or formal specification.
---

# Requirement Splitting Subskill

## 触发场景

- 当主 `backend-agent-framework` 将 PRD 驱动需求路由到 `stage=requirement-splitting` 时使用。
- 适用于需要先把原始需求文档按服务、接口契约、异步流程、数据模型、集成流或跨服务规则做无损拆分，再进入下游模块执行流的场景。

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/requirements/requirement-analysis.md`
- `docs/requests/<request-id>/state.json`
- 原始 PRD 文档或稳定 PRD 引用

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/requirements/requirement-analysis.md`
   - 原始 PRD 文档或稳定 PRD 引用
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/templates/requirement-analysis.md`
   - `../../references/templates/request.md`
   - `../../references/templates/requirement-splitting.md`
   - `../../references/policies/doc-writing.md`
2. 仅用于 PRD 驱动需求。
3. 在正式拆分前，先检查原始内容里是否存在 Markdown 不能稳定表达或下游 `.md` 工件不易识别的格式。
4. 如果存在非 Markdown 兼容格式，先做最小必要的 Markdown 归一化。
5. 格式归一化只允许改变表达形式，不允许改变原始业务语义、字段含义、流程顺序和约束强度。
6. 对任何发生过格式归一化的内容，必须同时保留原始内容快照与 Markdown 归一化副本。
7. 先以 `requirements/requirement-analysis.md` 为拆分前提，确认范围、歧义、拆分轴和不可拆散语义边界。
8. 按源文档中的服务、接口面、数据模型、异步流程、存储流程、集成流、跨服务规则做拆分。
9. 默认使用中文写工件；代码标识、协议名、字段名、错误码、路径等源标识保持原文。
10. 对每个模块明确：
   - 模块边界
   - 业务目标
   - 调用方或消费者可见行为
   - 接口/事件/数据/流程内容
   - 下游 `spec` 必须保留的显式约束
   - 是否需要 `architecture-design`
   - 下游入口阶段
   - 下游模块工作区路径
11. 在总览工件中写清：
   - 模块清单
   - 模块依赖
   - 默认下游处理顺序与排序依据
   - 哪些模块需要先做 `architecture-design`
   - 哪些模块可以直接进入 `spec`
12. 为 `state.json` 初始化或修复 `module_execution`：
   - `mode=sequential`
   - `module_order`
   - `pending_modules`
   - `completed_modules`
   - `active_module_id`
   - 每个模块的 `requirement_file`、`workspace`、`entry_stage`、`current_stage`、`status`
13. 拆分结果默认进入“每个模块分别跑完整执行流程”的模式，不得因为拆成多个模块就向用户发起“先做哪一个”式优先级提问，除非原始需求本身给出了多种互斥阶段方案，或者排序所需信息确实缺失且无法从依赖关系、源文顺序或发布约束中恢复。
14. 如果源文档存在信息不一致或缺失，记录开放问题；不要靠猜测补全。
15. 保留 `state.json.loop`，不重置、不改写。
16. 本阶段不写任何模块的 `spec/spec.md`，不写实现计划，不写代码。
17. 完成后把 `stage` 设为首个活动模块的入口阶段：
   - 首个活动模块需要结构设计：`architecture-design`
   - 否则：`spec`

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/requirements/requirement-map.md`
  - `docs/requests/<request-id>/requirements/modules/<module-id>.md`

## 验收标准

- `requirements/requirement-map.md` 已存在。
- 已为范围内模块生成模块工件。
- 每个模块工件都能回溯到原始需求文档对应内容。
- 拆分结果与 `requirements/requirement-analysis.md` 中给出的范围、拆分轴和不可拆散边界一致。
- 每个发生过格式归一化的模块都同时保留了原始内容快照与 Markdown 归一化副本。
- 显式接口、事件、字段、状态、流程要求没有在拆分过程中丢失。
- 已明确哪些模块需要 `architecture-design`。
- 已给出默认下游处理顺序，且没有把模块拆分转化为新的用户优先级决策。
- `state.json.module_execution` 已初始化，并指向首个活动模块。
- `state.json.stage` 已切换到首个活动模块的 `architecture-design` 或 `spec`。
- `state.json` 保留原有 `loop`。

## 安全边界

- 不能发明需求文档中不存在的新行为。
- 不能在本阶段写 spec、plan 或代码。
- 不能把多个模块压成导致下游遗漏的笼统摘要。
- 不能借格式归一化之名改写原始业务语义。
