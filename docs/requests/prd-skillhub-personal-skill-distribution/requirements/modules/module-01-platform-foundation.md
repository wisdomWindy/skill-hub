# Module

## Module Identifier

- `module-01-platform-foundation`

## Module Name

- 平台基础与静态数据底座

## Source Snapshot

### 来自范围与维护性约束

- 当前用户澄清后的实现范围只保留纯静态公开站点；后台相关要求不进入本模块执行范围。
- “响应式设计、暗色/亮色主题”均在 in-scope 内。
- “技能数据与站点代码物理分离（`_data/` 目录独立），新增/修改技能无需改动源码。”
- “新增分类仅需在 `_data/config.yaml` 中追加，无需修改代码逻辑。”
- “使用 TypeScript 提供完整的类型安全，降低维护成本。”

### 来自数据模型

- 技能数据存储于 `_data/skills/{id}.yaml`
- 站点配置存储于 `_data/config.yaml`
- `Skill` 至少包含：`id`、`name`、`category`、`version`、`shortDesc`、`fullDesc`、`installCommand`、`status`、`installCount`、`createdAt`、`updatedAt`
- `Config` 至少包含：`site.title`、`site.description`、`site.baseUrl`、`admin.githubId`、`admin.githubUsername`、`categories`

### 来自 UI 与技术架构

- 全局组件：顶部导航栏（Logo + 站点名，搜索入口 + 主题切换按钮）
- 主题：默认深色 `#0d1117`，强调色 `#00D4AA`，支持手动切换亮色并跟随系统偏好
- 技术栈：Vue 3、Vite、vite-ssg、Vue Router、Pinia、Naive UI、Tailwind CSS、TypeScript
- 目录结构要求包含：`public/`、`src/`、`_data/`、`vite.config.ts`、`tsconfig.json`、`package.json`
- 静态生成策略：公开页面预渲染；后台页面客户端动态加载

## Markdown-Normalized Snapshot

上游内容已经是标准 Markdown，本模块下游消费时按以下结构读取：

1. 建立前端工程脚手架与目录结构
2. 定义 Skill / Config 类型与静态数据入口
3. 建立公开站点与后台共享的全局布局、路由壳层与主题系统
4. 建立 SSG、路径别名、Markdown 渲染、高亮与安全过滤基础能力

## Source-Trace References

- `PRD.md` 第 4.1 节功能范围
- `PRD.md` 第 7.4 节可维护性
- `PRD.md` 第 8 节数据模型
- `PRD.md` 第 9.1 节全局组件与主题
- `PRD.md` 第 10 节技术架构设计

## Business Intent

为整个 SkillHub 提供稳定的工程底座，使公开模块共享统一的数据源、类型、路由、主题和静态构建机制。

## User-Visible Scope

- 全局导航和主题切换
- 公开页面的基础加载框架
- 技能与配置数据的统一装载方式

## Forms, Tables, Displays, and Interactions

- Display：Logo、站点标题、主题切换按钮、全局搜索入口
- Interaction：主题切换、系统主题跟随、公开路由基础装载
- Data：YAML 数据导入、类型映射、静态页面预渲染

## Workflow and State Rules

- 公开页面需要可预渲染并在 JavaScript 未完全加载时仍可读
- 技能与站点配置是仓库中的事实源
- 后续模块都必须复用当前模块定义的数据与壳层，而不是重复定义

## Dependencies and Impacted Neighbors

- 该模块无上游业务依赖
- 下游影响所有公开模块、详情模块和 GitHub Pages 交付链路

## Page-Design Routing Decision

- `page_design_required: false`
- 原因：该模块以工程骨架、共享类型、全局能力为主，不以单页布局决策为中心；具体页面视觉结构留给后续页面模块处理

## Downstream Spec Obligations

- 固定脚手架与目录结构
- 固定 `_data` 数据入口与 TypeScript 类型边界
- 固定 SSG / Router / Pinia / Theme / Markdown / XSS 过滤等基础能力的职责归属
- 为后续页面模块提供稳定的共享布局与数据适配入口

## Open Questions

- 当前模块需要在不依赖后台能力的前提下，为后续页面模块提供稳定的数据装载和静态构建入口
