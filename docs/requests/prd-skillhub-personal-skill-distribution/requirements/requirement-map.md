# Requirement Map

## Request Summary

当前请求是一个 PRD 驱动的 greenfield 前端项目，需要在空仓库内从 0 到 1 建立 SkillHub 的纯静态站点、内容数据结构和 GitHub Pages 部署链路。用户已明确当前范围不包含后台管理、认证或在线写仓库能力。

## Splitting Principles

- 以 PRD 中已经分区明确的公开站点、详情页和静态部署链路为主轴拆分。
- 优先将跨页面的“平台基础”单独拆出，作为后续页面模块的共同上游。
- 将具有独立验收边界、可独立 review 的页面或流程拆成独立模块。
- 保留 PRD 中显式给出的字段、交互、状态、性能与安全约束；对用户已明确排除的后台相关能力不再进入当前模块范围。

## Source Inventory

- [PRD.md](/Users/staff/Desktop/testProject/skill-hub/PRD.md)
- `docs/requests/prd-skillhub-personal-skill-distribution/artifacts/prd-snapshot.md`

## Markdown Normalization Notes

- 上游 PRD 已为标准 Markdown 文档，表格、代码块、标题和列表均可直接被下游工件消费。
- 本次 requirement-splitting 不需要额外格式归一化，只做按模块的结构化摘录。
- 原始内容保留位置：
  - `artifacts/prd-snapshot.md`
  - 各模块文档的 `source snapshot` 段落

## Module List

| Module ID | Module Name | Module Type | Source Section Mapping | Scope Summary | Order | Page Design | Architecture Design | Downstream Notes | Run Root |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `module-01-platform-foundation` | 平台基础与静态数据底座 | cross-module rule | 4.1, 7.4, 8, 9.1 全局组件, 10 | 建立 Vue + Vite + SSG 脚手架、数据目录、全局布局、主题、路由与类型基础 | 1 | 否 | 是 | 先固定项目骨架与共享数据入口，再进入页面模块 | `module-runs/module-01-platform-foundation/` |
| `module-02-public-discovery` | 公开浏览首页与列表页 | page + table/list workflow | 6.1, 9.1 首页/列表页, 7.1, 7.5 | 首页、列表页、搜索、分类、排序、空状态、响应式与结果统计 | 2 | 是 | 是 | 依赖基础模块提供数据装载、路由和全局壳层 | `module-runs/module-02-public-discovery/` |
| `module-03-skill-detail` | 技能详情与转化区 | detail/display block | 6.2, 8.1, 9.1 详情页 | 详情页展示、Markdown 渲染、安装命令复制、版本历史、相关技能、OG 元信息 | 3 | 是 | 是 | 依赖基础模块与公开浏览共享类型与数据入口 | `module-runs/module-03-skill-detail/` |
| `module-04-static-delivery` | GitHub Pages 静态交付与内容示例 | cross-module rule | 6.4, 7.1, 7.2, 10.4 | GitHub Actions 构建、gh-pages 发布、示例 YAML 内容、静态交付说明 | 4 | 否 | 是 | 负责把站点从代码与内容仓库交付到 GitHub Pages | `module-runs/module-04-static-delivery/` |

## Module Dependency and Sequencing Notes

- `module-01-platform-foundation` 是所有后续模块的共同依赖。
- `module-02-public-discovery` 与 `module-03-skill-detail` 共用公开数据读取、全局导航、主题与 Markdown 能力，但可顺序独立交付。
- `module-04-static-delivery` 依赖 `module-01-platform-foundation` 建立好的工程与数据结构，并为最终交付补齐 GitHub Pages 发布能力与示例内容。
- 后续模块在当前流程中必须按顺序完成 `page-design? -> architecture-design? -> spec -> plan -> execute -> verify -> review` 后才能切换。

## Module Execution Sequence

顺序执行如下：

1. `module-01-platform-foundation`：从 `architecture-design` 开始
2. `module-02-public-discovery`：从 `page-design` 开始
3. `module-03-skill-detail`：从 `page-design` 开始
4. `module-04-static-delivery`：从 `architecture-design` 开始

首个 `current_module_id` 为 `module-01-platform-foundation`。

## Page-Design Candidates

- 需要 `page-design`：
  - `module-02-public-discovery`
  - `module-03-skill-detail`
- 不需要 `page-design`：
  - `module-01-platform-foundation`
  - `module-04-static-delivery`

## Spec Carry-Forward Checklist

### `module-01-platform-foundation`

- Vue 3 + Vite + Pinia + TypeScript + Vite SSG 脚手架方向
- `_data/config.yaml` 与 `_data/skills/*.yaml` 作为核心数据源
- 响应式断点、主题切换、默认暗色与系统偏好同步
- 全局导航、站点标题、Logo、主题切换、基础 SEO / head 能力
- alias、类型、静态导入、Markdown / 高亮 / XSS 防护基础能力

### `module-02-public-discovery`

- 首页与列表页的卡片字段、搜索、分类、排序、分页 / 空状态
- 公开页面可读性、性能指标、响应式布局与结果统计
- 访客无需登录即可访问全部公开页面

### `module-03-skill-detail`

- 详情页字段、Markdown 渲染、安装命令复制、Toast、语法高亮
- 参数说明、版本历史、相关推荐、安装量、OG 元信息
- 加载性能要求

### `module-04-static-delivery`

- GitHub Actions 构建与 gh-pages 发布链路
- `_data/config.yaml` 与 `_data/skills/*.yaml` 的示例内容和静态读取方式
- GitHub Pages 所需 `base`、静态资源路径和构建输出约束
- README 或文档中的本地开发 / 构建 / 部署说明

## Open Questions and Unresolved Ambiguities

- 安装量统计的真实数据源未定，可能只能先实现展示结构与可配置字段。
