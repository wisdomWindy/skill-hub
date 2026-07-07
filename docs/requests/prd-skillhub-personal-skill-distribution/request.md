# Request

## Request Identifier

- `prd-skillhub-personal-skill-distribution`

## Source Link

- Local PRD: [PRD.md](/Users/staff/Desktop/testProject/skill-hub/PRD.md)
- Source version: `v1.0.0`
- Source updated at: `2026-07-07`

## Business Summary

SkillHub 是一个面向公开访客的个人技能分发站点，目标是以纯静态 GitHub Pages 方式展示技能目录、技能详情和安装命令复制能力。站点内容直接来自 GitHub 仓库中的数据文件与源码构建产物，不包含任何后台管理、登录或在线写仓库能力。

## Goal Statement

基于 `PRD.md` 并结合用户最新澄清，落地一个符合 Vue 3 + Vite + Pinia + GitHub Pages 技术方向的纯静态首版 SkillHub，实现：

- 公开站点的技能浏览、搜索、筛选、详情与安装命令复制。
- 以 `_data/skills/*.yaml` 与 `_data/config.yaml` 为核心的数据模型与静态构建流程。
- 从 GitHub 仓库自动构建并部署到 GitHub Pages 的静态发布链路。
- 可追溯的请求工件、设计、实现、验证和评审记录。

## Initial Done Signal

- 公开站点首页、列表页、详情页满足 PRD 的核心 P0 行为。
- 仓库已具备可运行的静态构建骨架、类型定义、主题切换、数据装载、路由结构与 GitHub Pages 部署配置。
- 请求工件能证明实现与 PRD、验证与评审结果一致。

## Trigger Condition

当仓库接收到 `PRD.md` 中定义的 SkillHub v1.0.0 需求，并且用户明确收敛为“无后台、纯静态 GitHub Pages 站点”范围时，开始本请求生命周期。

## Initial Context Sources

- 产品需求文档：[PRD.md](/Users/staff/Desktop/testProject/skill-hub/PRD.md)
- 用户最新范围澄清：不需要后台；只需要一个根据 GitHub 仓库部署的纯静态 GitHub Pages 站点
- 仓库当前状态：greenfield，仅存在 PRD，尚无现成前端工程与请求工件
- 仓库工作约束：用户消息中的表单数据适配约束、`/Users/staff/.codex/RTK.md`
- 生命周期框架：`frontend-agent-framework`

## Human Handoff Point

- 当 page design / architecture design 需要确认存在 PRD 冲突或 GitHub Pages 静态约束下的实现边界时，向用户确认方案。
- 当前模块通过 verify / review 后，向用户汇报结果与剩余模块推进情况。
- 整体请求 complete 时，交付实现、验证证据、风险与后续建议。

## Affected Area

- 仓库根目录下的前端工程脚手架与静态资源
- `_data/` 技能与配置数据目录
- `docs/requests/prd-skillhub-personal-skill-distribution/` 生命周期工件
- GitHub Actions、SSG、路由、主题、Markdown 渲染与静态内容装载相关实现

## Participating Modules

1. `module-01-platform-foundation`：脚手架、静态数据底座、路由壳层、主题与全局能力
2. `module-02-public-discovery`：公开首页 / 列表页、搜索、筛选、排序、空状态
3. `module-03-skill-detail`：技能详情、安装命令复制、版本历史、相关推荐与页面元信息
4. `module-04-static-delivery`：GitHub Pages 构建发布、示例内容数据、静态站点交付约束
