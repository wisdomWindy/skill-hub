---
name: frontend-agent-framework-requirement-splitting
description: Stage subskill for requirement splitting. Normalize a PRD-driven request into source-traceable modules and functional units before page design or formal specification.
---

# Requirement Splitting Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将 PRD 驱动需求路由到 `stage=requirement-splitting` 时使用。
- 适用于需要先把原始需求文档按模块、页面、功能单元或流程单元做无损拆分，再进入 `page-design` 或 `spec` 的场景。

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/analysis/requirement-analysis.md`
- `docs/requests/<request-id>/state.json`
- 原始 PRD 文档或稳定 PRD 引用

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/analysis/requirement-analysis.md`
   - 原始 PRD 文档或稳定 PRD 引用
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/templates/request.md`
   - `../../references/templates/requirement-analysis.md`
   - `../../references/templates/requirement-splitting.md`
   - `../../references/policies/doc-writing.md`
2. 仅用于 PRD 驱动需求；bugfix 输入默认不走本阶段，除非主 skill 明确把缺陷提升为等价需求拆分问题。
3. 先消费 `requirement-analysis` 工件，把其中确认过的范围、非目标、前端 / 服务端职责拆分、依赖、风险、歧义和拆分依据视为本阶段上游输入，而不是重新从零发明拆分逻辑。
4. 在正式拆分前，先检查原始内容里是否存在 Markdown 不能稳定表达或下游 `.md` 工件不易识别的格式。
5. 如果存在非 Markdown 兼容格式，先做最小必要的 Markdown 归一化，再开始拆分，例如：
   - 非标准表格、截图表格、富文本栅格转成 Markdown 表格
   - 图片、附件、示意图转成 Markdown 图片或带说明的图片引用
   - 裸链接、按钮链接、卡片链接转成 Markdown 超链接
   - 多列排版、折叠块、嵌套卡片、便签块转成线性标题加列表
   - 无法直接转成 Markdown 结构的可视内容，转成结构化文字说明并保留来源说明
6. 格式归一化只允许改变表达形式，不允许改变原始业务语义、字段含义、流程顺序和约束强度。
7. 对任何发生过格式归一化的内容，必须同时保留两份：
   - 原始内容快照
   - Markdown 归一化副本
   不能只保留转换后的版本而丢弃原始表达。
8. 按源文档中的模块、页面、表单流程、表格流程、展示区块、交互流程、跨模块规则做拆分。
9. 拆分时优先保留原文语义和结构，不要先抽象成宽泛总结。
10. 对每个拆分后的模块，生成单独模块工件，并确保该模块内容与原始文档对应部分尽量一字不差；必要的仅限于最小规范化、重排、Markdown 兼容转换与补充 source trace。
11. 如果原始需求文档已经按模块写得很清楚，允许近乎原样保留到模块工件中，但必须补上模块标识、来源映射、下游 obligations。
12. 如果原始文档中同一模块的信息分散在多个章节，允许汇总到一个模块工件中，但必须保留来源映射。
13. 对每个模块明确：
   - 模块边界
   - 业务目标
   - 前端职责、服务端职责、共享契约和外部接口待补项
   - 用户可见行为
   - 表单/表格/展示/交互/流程内容
   - 下游 `spec` 必须保留的显式约束
   - 是否需要 `page-design`
   - 是否需要 `architecture-design`
   - 执行顺序
14. 在总览工件中写清：
   - 模块清单
   - 模块依赖
   - 哪些模块需要先做 `page-design`
   - 哪些模块需要先做 `architecture-design`
   - 哪些模块可以直接进入 `spec`
   - 模块顺序执行次序
15. 如果源文档存在信息不一致或缺失，记录开放问题；不要靠猜测补全。
16. 根据拆分结果初始化 `state.json.module_flow`：
   - `execution_mode=sequential`
   - `current_module_id` 指向第一个模块
   - `pending_module_ids` 按执行顺序列出全部模块
   - `completed_module_ids=[]`
   - 为每个模块写入 `source_module_path`、`page_design_required`、`architecture_design_required`、`approvals`、`status`
17. 完成后把第一个模块标记为 `in_progress`，其他模块标记为 `pending`。
18. 保留 `state.json.loop`，不重置、不改写。
19. 本阶段不写下游 `spec/plan/execution/verification/review` 工件，不写代码。
20. 完成后把 `stage` 设为第一个模块的首个必需阶段：
   - 需要 `page-design`：`page-design`
   - 否则若需要 `architecture-design`：`architecture-design`
   - 其他：`spec`

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/requirements/requirement-map.md`
  - `docs/requests/<request-id>/requirements/modules/<module-id>.md`
- 最终交付物应包含：
  - 需求拆分总览
  - requirement-analysis 承接结果
  - 前端 / 服务端职责拆分承接结果
  - 模块级原始内容快照
  - 已归一化的 Markdown 兼容内容
  - source trace 映射
  - 模块依赖关系
  - page-design / architecture-design 路由判断
  - 模块顺序执行信息
  - spec carry-forward checklist
  - 开放问题

## 验收标准

- `requirements/requirement-map.md` 已存在。
- 已为范围内模块生成模块工件。
- requirement-analysis 中确认的范围、非目标、前端 / 服务端职责拆分、依赖与拆分依据已被承接，而不是被本阶段忽略。
- 每个模块工件都能回溯到原始需求文档对应内容。
- 每个发生过格式归一化的模块都同时保留了原始内容快照与 Markdown 归一化副本。
- 原始内容中的非 Markdown 兼容格式已被转换为 Markdown 可识别格式或等价结构化说明。
- 显式字段、列、展示、交互、状态、流程要求没有在拆分过程中丢失。
- 已明确哪些模块或请求需要 `page-design`。
- 已明确哪些模块需要 `architecture-design`。
- `state.json.module_flow` 已初始化当前模块、待处理模块和已完成模块队列。
- `state.json.stage` 已切换到第一个模块的首个下游阶段。
- `state.json` 保留原有 `loop`。

## 安全边界

- 不能发明需求文档中不存在的新行为。
- 不能在本阶段写 spec、plan 或代码。
- 不能绕过 `requirement-analysis` 重新凭印象定义范围、非目标或拆分依据。
- 不能在拆分时把 requirement-analysis 已确认的服务端职责改写成前端实现任务，或把前端职责改写成服务端待办。
- 不能把多个模块压成导致下游遗漏的笼统摘要。
- 不能借格式归一化之名改写原始业务语义。
- 不能只保留 Markdown 归一化结果而删除原始内容快照。
- 不能丢失原始需求文档中已明确给出的字段、列、交互、状态、流程和规则。
- 不能在存在歧义时用实现常识替代明确记录。
