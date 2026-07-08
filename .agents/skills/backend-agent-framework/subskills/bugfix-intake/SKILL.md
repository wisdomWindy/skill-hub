---
name: backend-agent-framework-bugfix-intake
description: Stage subskill for defect intake. Normalize a Feishu/Lark project defect or bug report into the standard request workspace before entering spec, plan, execution, verification, and review.
---

# Bugfix Intake Subskill

## 触发场景

- 当主 `backend-agent-framework` 判断输入是 bug / defect，而不是 PRD 驱动新需求时使用。
- 适用于 Feishu/Lark 项目缺陷、缺陷 ID、缺陷链接、导出缺陷文档或其他等价 bug 报告。

## 必要输入

- 可读 bug 报告或稳定 bug 引用。
- 可接受输入包括：
  - Feishu/Lark project key + defect/work item ID
  - 缺陷详情链接
  - 导出缺陷文档
  - 本地 bug 报告文件路径
- 足够上下文以识别：
  - 受影响服务、模块、接口、任务或消费者
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
3. 如果是 Feishu/Lark defect 且环境里有 `meegle`，默认使用 `meegle` 做 source-of-truth 拉取。
4. 如果输入是 Feishu Project 缺陷 URL，先执行 URL decode，再提取 `simple_name` 与 `work_item_id`。
5. 优先做 source-of-truth 拉取，不先要求用户手工复述。
6. 如果自动拉取失败，明确记录失败原因，向用户请求缺失信息，不允许猜测 reproduction 或 expected behavior。
7. 如果是已有代码缺陷且需要结构分析：
   - 优先用 code graph
   - graph 不可用时先尝试 bootstrap
   - 再 fallback 到文本搜索
   - 把检测、bootstrap、fallback 写进 `artifacts/code-context.md`
8. 创建 `docs/requests/<request-id>/` 标准工作区。
9. 只写 bugfix intake 工件，不写 `spec/spec.md`，不写代码。
10. 默认使用中文写工件；代码标识、协议名、字段名、错误码、路径等源标识保持原文。
11. 在 `request.md` 中写入 bugfix 目标和初始 done signal。
12. 判断该缺陷是否属于后端结构型修复；若涉及以下任一变化，视为结构型：
   - 发布接口或事件契约形状变化
   - 服务边界或调用链重构
   - 持久化模型、迁移路径或回滚限制变化
   - 消费者、任务、回调、异步拓扑变化
   - 跨服务集成边界变化
13. 归一化缺陷内容，输出为下游 `spec/plan` 可消费的标准工件。
14. 初始化 `state.json.loop`，并把 `stage` 设为：
   - 结构型 bugfix：`architecture-design`
   - 其他 bugfix：`spec`

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/request.md`
  - `docs/requests/<request-id>/artifacts/bugfix-source.md`
  - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
  - `docs/requests/<request-id>/state.json`
  - `docs/requests/<request-id>/artifacts/code-context.md`（如需要结构分析）

## 验收标准

- 请求工作区已创建。
- `request.md` 与 `state.json` 已记录 bug 来源。
- `request.md` 已记录明确 bugfix 目标与初始 done signal。
- `artifacts/bugfix-source.md` 已完成缺陷上下文归一化。
- 如需要结构分析，`artifacts/code-context.md` 已存在。
- 下游标准摘要已写入 `artifacts/prd-snapshot.md`。
- `state.json.stage` 已按 bugfix 是否结构型切换到 `architecture-design` 或 `spec`。
- `state.json.loop` 已按框架规定形状初始化。

## 安全边界

- 不能在 bug 上下文未归一化前就开始做实现规划。
- 不能写 spec 工件。
- 不能写代码。
- 不能捏造 reproduction 或 expected behavior。
