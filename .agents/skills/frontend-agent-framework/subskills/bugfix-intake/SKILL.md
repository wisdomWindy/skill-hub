---
name: frontend-agent-framework-bugfix-intake
description: Stage subskill for defect intake. Normalize a Feishu/Lark project defect or bug report into the standard request workspace before entering spec, plan, execution, verification, and review.
---

# Bugfix Intake Subskill

## 触发场景

- 当主 `frontend-agent-framework` 判断输入是 bug / defect，而不是 PRD 驱动新需求时使用。
- 适用于 Feishu/Lark 项目缺陷、缺陷 ID、缺陷链接、导出缺陷文档或其他等价 bug 报告。

## 必要输入

- 可读 bug 报告或稳定 bug 引用。
- 可接受输入包括：
  - Feishu/Lark project key + defect/work item ID
  - 缺陷详情链接
  - 导出缺陷文档
  - 本地 bug 报告文件路径
- 足够上下文以识别：
  - 受影响模块
  - 观察到的行为
  - 期望行为

## 执行步骤

1. 先读：
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/authoring-guide.md`
   - `../../references/bugfix-feishu-project.md`
   - `../../references/templates/request.md`
   - `../../references/templates/bugfix-intake.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/code-graph.md`
   - `../../references/policies/doc-writing.md`
2. 先解析 defect 来源，再创建下游工件。
3. 如果是 Feishu/Lark defect 且环境里有 `meegle`：
   - 默认使用 `meegle`
   - 先检查认证状态
   - 若未认证，停在认证 gate，完成登录后继续
4. 如果输入是 Feishu Project 缺陷 URL：
   - 先执行 `meegle url decode --url <defect-url>`
   - 提取 `simple_name` 与 `work_item_id`
   - 再用 `simple_name` 作为 `--project-key` 调 `meegle workitem get`
5. 优先做 source-of-truth 拉取，不先要求用户手工复述。
6. 如果自动拉取只拿到部分内容，继续补齐缺失上下文，不丢弃已拉到的数据。
7. 如果自动拉取失败：
   - 明确记录失败原因
   - 向用户请求缺失信息
   - 不允许猜测 reproduction 或 expected behavior
8. 如果是已有代码缺陷且需要结构分析：
   - 优先用 code graph
   - graph 不可用时先尝试 bootstrap
   - 再 fallback 到文本搜索
   - 把检测、bootstrap、fallback 写进 `artifacts/code-context.md`
9. 创建 `docs/requests/<request-id>/` 标准工作区。
10. 只写 bugfix intake 工件，不写 `spec/spec.md`，不写代码。
11. 在 `request.md` 中写入 bugfix 目标和初始 done signal。
12. 归一化缺陷内容，输出为下游 `spec/plan` 可消费的标准工件。
13. 初始化 `state.json.loop`，并把 `stage` 设为 `spec`。
14. 对 bugfix 请求，将 `state.json.module_flow` 初始化为 `null`；本框架的模块顺序执行仅适用于 requirement-splitting 之后的 PRD 驱动请求。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/request.md`
  - `docs/requests/<request-id>/artifacts/bugfix-source.md`
  - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
  - `docs/requests/<request-id>/state.json`
  - `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）
- 最终交付物应体现：
  - 来源系统和缺陷标识
  - 问题摘要
  - 复现线索或已知失败场景
  - 受影响模块/页面
  - expected / observed behavior
  - 回归敏感区风险
  - 自动拉取状态与认证状态（如适用）
  - 结构分析与 fallback 状态（如适用）

## 验收标准

- 请求工作区已创建。
- `request.md` 与 `state.json` 已记录 bug 来源。
- `request.md` 已记录明确 bugfix 目标与初始 done signal。
- `artifacts/bugfix-source.md` 已完成缺陷上下文归一化。
- 如需要结构分析，`artifacts/code-context.md` 已存在。
- 下游标准摘要已写入 `artifacts/prd-snapshot.md`。
- `state.json.stage=spec`。
- `state.json.loop` 已按框架规定形状初始化。
- `state.json.module_flow=null`。

## 安全边界

- 不能在 bug 上下文未归一化前就开始做实现规划。
- 不能写 spec 工件。
- 不能写代码。
- 不能捏造 reproduction 或 expected behavior。
- 没有 durable source snapshot 时，不能宣称 bug 已准备好进入实现。
