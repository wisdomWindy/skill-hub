# Clarifications

## Question

PRD 原文包含后台管理、OAuth 和在线写仓库，但用户是否要求保留这些能力？

## Answer

用户已明确说明：“不需要后台，只需要一个纯静态 githubpages，这个 githubpages 是根据 github 仓库部署的。”

## Final Decision

当前请求只实现纯静态公开站点；后台、认证、运行时写仓库、部署状态轮询全部移出当前范围。

## Affected Spec Area

- 背景与目标
- In Scope / Out of Scope
- API and Data Contracts
- Project Bootstrap and Scaffold Decision

## Question

当前空仓库是否必须通过外部命令拉取现成脚手架，还是允许手动搭建等价骨架？

## Answer

在没有确认外部网络与下载权限前，允许以 Vite Vue TypeScript starter 为参考手动搭建等价骨架。

## Final Decision

工程骨架采用 Vite Vue TypeScript starter 的结构与约束，但执行时允许手动创建等价文件结构。

## Affected Spec Area

- Function-Complete Behavior Breakdown / 工程骨架初始化
- Project Bootstrap and Scaffold Decision
