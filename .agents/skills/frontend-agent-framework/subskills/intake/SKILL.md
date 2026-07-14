---
name: frontend-agent-framework-intake
description: Stage subskill for intake. Create the request workspace from a PRD-driven source or stable direct-change instruction and write only intake-stage artifacts.
---

# Intake Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将一个新的 PRD 驱动需求路由到 `intake` 阶段时使用。
- 当主 `frontend-agent-framework` 将一个稳定的直接前端修改、清理、删除或调整请求路由到 `intake` 阶段时使用。
- 适用于需要从可读 PRD 文档、稳定 PRD 引用或可执行的用户直接指令创建标准请求工作区的场景。

## 必要输入

- 可读的 PRD 文档、稳定 PRD 引用，或稳定的直接变更指令。
- 可接受输入包括：
  - Feishu/Lark PRD 链接
  - 文档 ID
  - 本地 PRD 文件路径
  - 明确目标页面、组件、文件、行为、清理项、删除项或可观察结果的用户直接指令
- 足够的需求上下文，用于推导稳定的 `request-id`。

## 执行步骤

1. 先读：
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/authoring-guide.md`
   - `../../references/templates/request.md`
2. 读取 PRD 文档、解析稳定 PRD 引用，或归一化稳定直接变更指令，再开始创建下游工件。
3. 创建 `docs/requests/<request-id>/` 作为标准请求工作区。
4. 只写 intake 阶段工件，不写 `spec/spec.md`，不写实现代码。
5. 在 `request.md` 中写入：
   - 初始目标
   - 初始 done signal
   - 初始触发条件
   - 初始上下文来源
   - 预期人工交接点
6. 在 `artifacts/prd-snapshot.md` 中做结构化提取，而不是薄摘要；直接变更请求也使用该文件作为下游可消费的 source snapshot。
7. 如果 PRD 或直接变更指令已明确给出字段、表格、展示、交互、校验、loading、流程分支、修改目标或删除目标等细节，必须将这些显式约束规范化写入 `artifacts/prd-snapshot.md`。
8. 如果上游来源结构不一致或信息不完整，区分“已确认事实”和“开放问题”，不要混成模糊总结。
9. 对直接变更请求，本阶段是其人工确认前置 gate：如果目标、范围、预期结果、禁止解释、关键规则、歧义内容、模糊内容或可观察完成条件仍需用户确认，必须停在 intake 并记录阻塞原因；不能把确认推迟到 `spec` 或 `plan`。
10. 初始化 `state.json.loop`，并把 `stage` 设为：
   - PRD 驱动需求：`requirement-analysis`
   - 直接变更请求：若页面布局、样式或交互结构是主要工作则为 `page-design`；否则若代码结构、文件关系、函数结构、数据结构或类型策略是主要工作则为 `architecture-design`；否则为 `spec`
11. 对 PRD 驱动需求，将 `state.json.module_flow` 初始化为 `null`；先由 `requirement-analysis` 固化范围、风险与拆分依据，再由 `requirement-splitting` 负责补全顺序执行队列。
12. 对直接变更请求，将 `state.json.module_flow` 初始化为 `null`，并在 `request.md` 和 `artifacts/prd-snapshot.md` 中记录为什么该请求不需要 PRD-only requirement-analysis / requirement-splitting。
13. 参考样例 `docs/requests/prd-material-delivery-config-center/` 时，只复用结构和质量基线：
   - 可参考目录结构
   - 必须重写 `README.md`、`request.md`、`state.json`、`artifacts/prd-snapshot.md`
   - 不得沿用样例中的 `spec/plan/execution/verification/review` 业务内容

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/request.md`
  - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
  - `docs/requests/<request-id>/state.json`
- 最终交付物应包含：
  - 请求来源摘要
  - 规范化 PRD / 直接变更快照
  - 当上游存在时，对字段、表格、展示、交互、状态、流程约束的结构化提取
  - 初始请求状态

## 验收标准

- 请求工作区已创建。
- `request.md` 与 `state.json` 已记录来源链接。
- `request.md` 已记录明确目标、初始 done signal、触发条件、最小上下文、人工交接点。
- `artifacts/prd-snapshot.md` 已生成。
- `artifacts/prd-snapshot.md` 没有把上游明确行为约束压缩成过粗摘要。
- 直接变更请求如需人工确认，或存在会影响 downstream 的歧义 / 模糊内容，已在 intake 阶段解决或阻塞，没有把确认推迟到 `spec` / `plan`。
- `state.json` 已初始化完成，且：
  - PRD 驱动需求进入 `requirement-analysis`
  - 直接变更请求进入请求级 `page-design`、`architecture-design` 或 `spec`
- `state.json.loop` 已按框架规定形状初始化。
- `state.json.module_flow=null`；PRD 驱动需求等待 `requirement-analysis` 与 `requirement-splitting` 继续生成下游状态，直接变更请求保持请求级交付单元。

## 安全边界

- 不能在本阶段规划实现任务。
- 不能写 `spec` 工件。
- 不能写代码。
- 不能宣称请求已具备实现准备度。
- 不能把样例请求中的下游阶段内容当作当前请求的有效内容直接复用。
