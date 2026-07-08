# 规格模板

## 必需工件路径

- `docs/requests/<request-id>/modules/<module-id>/spec/spec.md`
- `docs/requests/<request-id>/modules/<module-id>/spec/clarifications.md`

## `modules/<module-id>/spec/spec.md`

当 `requirements/requirement-analysis.md` 存在时，把它视为 PRD 驱动请求的上游分析基线，并承接其中的范围边界、隐含约束、关键歧义结论与拆分策略。  
当 `requirements/requirement-map.md` 存在时，把它视为 PRD 驱动请求的必需上游输入，并在当前模块 spec 中保留本模块的来源追踪与承接检查清单。  
当 `modules/<module-id>/design/architecture-design.md` 存在时，把它视为当前模块的必需上游输入，并把其中的边界、接口、流程、持久化和一致性决策承接进 spec。  
验收标准必须充当当前模块的运行级目标合同：具体、可观察，且尽量可机器检查。

必需章节：

- 模块标识与范围
- 背景与目标
- 范围内事项
- 范围外事项
- 触发与启动条件
- 需求拆分摘要
- 请求与工作流流程
- 服务与模块设计
- function-complete 行为拆解
- 设计约束
- 变更轴与模式决策
- 代码上下文与影响假设
- 接口与数据契约
- 基础设施依赖策略
- 安全与滥用防控
- rollout、迁移与回滚策略
- 上下文与依赖来源
- 边界情况
- 验收标准
- 人工评审与交接
- 风险

## `接口与数据契约`

对当前模块范围内每个关键入站或出站集成，说明：

- 契约来源
- 接口用途
- 适用时的请求方法 / 路径 / 协议
- 载荷或 schema 形态
- 响应、事件或存储语义
- 关键时的 required、optional、nullable、repeated、enum、版本化或默认值语义
- 关键时的鉴权、授权、限流、超时、幂等、重试与失败语义
- 协议需要时的 gRPC deadline、metadata、状态码与流式语义
- 兼容性、迁移、回滚与观测性预期
- 后端是直接使用该契约，还是通过 adapter 边界接入

## `基础设施依赖策略`

关键时说明：

- MySQL 归属、事务边界、索引与迁移假设
- Redis 归属、key 设计、TTL、失效与一致性模型
- Kafka 归属、topic/key/partition 语义、重试、死信与回溯策略
- gRPC 归属、proto 兼容性、deadline 透传、metadata 或鉴权透传，以及错误或流式策略
- Kubernetes workload 归属、probe 策略、资源策略、config 或 secret 边界、rollout 以及 drain 或 rollback 假设

## `modules/<module-id>/spec/clarifications.md`

必需章节：

- 问题
- 回答
- 最终决策
- 受影响的 spec 区域
