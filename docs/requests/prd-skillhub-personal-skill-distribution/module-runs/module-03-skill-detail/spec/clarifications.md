# Clarifications

## Question

参数说明区在当前数据模型下如何落地？

## Answer

现有 `SkillDetail` 合同没有独立的结构化参数字段，而 PRD 对参数说明的优先级是 P1。

## Final Decision

首版详情页不新增伪结构化参数模型；若当前数据没有专门字段，则由 Markdown 详情承担参数 / 环境说明，页面只在未来有结构化字段时再增加专门区块。

## Affected Spec Area

- Function-Complete Behavior Breakdown / 参数 / 环境说明区
- Design Constraints

## Question

版本历史区首版使用什么数据来源？

## Answer

当前合同已有 `changelog` Markdown 字段，但没有独立版本历史数组。

## Final Decision

首版版本历史区优先展示 `changelog` Markdown；后续若引入结构化版本数组，再扩展展示方式。

## Affected Spec Area

- Function-Complete Behavior Breakdown / 版本历史区
