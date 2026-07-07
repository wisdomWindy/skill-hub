# Clarifications

## Question

分页主路径应采用页码分页还是滚动加载？

## Answer

PRD 同时允许“页码跳转或滚动加载”，当前模块需要先收敛为一个主路径。

## Final Decision

当前首版采用“页码分页”作为主路径；滚动加载保留为后续扩展，不进入本轮 plan。

## Affected Spec Area

- User Flow
- Function-Complete Behavior Breakdown / 列表页分页

## Question

搜索是否需要引入专门的模糊搜索库？

## Answer

在当前静态站点规模下，先用轻量客户端文本匹配即可满足需求与性能目标。

## Final Decision

本轮不引入额外模糊搜索库；搜索按名称和短描述的归一化文本匹配执行。

## Affected Spec Area

- Function-Complete Behavior Breakdown / 首页 Hero
- Function-Complete Behavior Breakdown / 列表页搜索区
