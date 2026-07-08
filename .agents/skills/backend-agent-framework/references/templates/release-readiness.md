# 发布就绪模板

## 必需工件路径

- `docs/requests/<request-id>/modules/<module-id>/release/release-readiness.md`

## `modules/<module-id>/release/release-readiness.md`

必需章节：

- 模块标识与范围
- rollout 策略
- 迁移顺序
- 监控观察窗
- 回滚触发条件与执行路径
- 剩余发布风险
- 最终结果

当 Kubernetes 是关键因素时，还应记录：

- workload rollout 策略
- probe 与 readiness 检查点
- graceful shutdown 或 drain 路径

`最终结果` 必须包含：

- 结果（`通过` 或 `失败`）
- 阻塞缺口
- 证据引用
