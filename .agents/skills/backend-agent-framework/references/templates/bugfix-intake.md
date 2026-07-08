# Bugfix Intake 模板

## 必需工件路径

- `docs/requests/<request-id>/artifacts/bugfix-source.md`
- 当需要结构分析时，还需要 `docs/requests/<request-id>/artifacts/code-context.md`

## `artifacts/bugfix-source.md`

必需章节：

- 来源系统
- 项目 key 或来源范围
- 缺陷或工作项 ID
- 缺陷标题
- 观察到的行为
- 期望行为
- 复现线索
- 受影响服务、模块、接口、任务或消费者
- 可用截图、日志或评论
- 开放问题与缺失上下文

## 归一化规则

写完 `bugfix-source.md` 之后，还要写 `artifacts/prd-snapshot.md`，作为下游 `spec` 阶段使用的归一化问题陈述。
