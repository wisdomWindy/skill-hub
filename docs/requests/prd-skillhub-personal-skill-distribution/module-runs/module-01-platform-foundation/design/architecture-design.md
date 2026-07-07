# Architecture Design

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-01-platform-foundation`

## Architecture Objective

为纯静态 SkillHub 建立一个稳定、可扩展、可静态生成的 Vue 3 工程底座，使后续公开页面模块只消费共享数据、共享布局和共享渲染能力，而不重新发明项目骨架。

## Architecture Scope and Triggers

- 作用域：
  - Vite + Vue 3 + TypeScript + Pinia + Vue Router + Vite SSG 工程骨架
  - `_data/config.yaml` 与 `_data/skills/*.yaml` 的静态内容读取入口
  - 全局布局、主题系统、共享 Markdown 渲染能力、基础 head / SEO 能力
  - GitHub Pages 兼容的路由与静态资源策略
- 触发条件：
  - 仓库当前为空白，仅有 PRD
  - 后续首页 / 列表页 / 详情页都依赖共享平台能力

## Upstream Inputs and Assumptions

- 上游输入：
  - [request.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/request.md)
  - [prd-snapshot.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/artifacts/prd-snapshot.md)
  - [requirement-map.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/requirements/requirement-map.md)
  - [module-01-platform-foundation.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/requirements/modules/module-01-platform-foundation.md)
- 关键假设：
  - 当前只做纯静态公开站点，不实现后台和在线仓库写入
  - 优先采用 Vite Vue TypeScript 项目骨架思路，但由于当前仓库为空且外部脚手架下载未确认可用，允许手动构造等价骨架
  - 所有公开内容都来自本地 YAML 数据文件，运行时不发起远程业务请求

## Module Boundary Design

- `src/app/`
  - 负责应用装配：路由、Pinia、head、SSG 上下文入口
- `src/layouts/`
  - 负责公开站点壳层布局，不承载具体业务筛选逻辑
- `src/components/common/`
  - 负责跨页面复用的 UI 单元，例如站点头部、主题切换、容器壳层
- `src/features/skills/`
  - 负责技能领域的静态数据装载、查询、排序、推荐、详情读取等业务能力
- `src/content/`
  - 负责 YAML 原始内容读取、解析、适配为前端领域模型
- `src/utils/markdown/`
  - 负责 Markdown 渲染、安全过滤和代码高亮配置
- `src/stores/`
  - 只保存真正需要跨页面共享的轻量 UI 状态，例如主题偏好与全局查询条件
- `_data/`
  - 作为内容源，不直接被页面组件随意操作；必须先经过内容读取层和 adapter

## File and Directory Structure

```text
skill-hub/
├── public/
├── src/
│   ├── app/
│   │   ├── main.ts
│   │   ├── app.ts
│   │   └── ssg.ts
│   ├── assets/
│   │   └── styles/
│   ├── components/
│   │   └── common/
│   ├── content/
│   │   ├── config/
│   │   ├── skills/
│   │   └── adapters/
│   ├── features/
│   │   └── skills/
│   │       ├── model/
│   │       ├── queries/
│   │       └── components/
│   ├── layouts/
│   ├── router/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   │   └── markdown/
│   ├── views/
│   ├── App.vue
│   └── env.d.ts
├── _data/
│   ├── config.yaml
│   └── skills/
├── .github/workflows/
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── package.json
```

## Code Relationship and Dependency Direction

- 页面 `views/*` 只能消费 `features/*` 暴露的查询结果和组件，不直接解析 YAML。
- `features/skills/*` 依赖 `content/*` 提供的已归一化领域数据。
- `content/adapters/*` 负责把 YAML 原始结构转换为前端领域模型；遵守“数据语义适配在 adapter 层完成”的仓库约束。
- `layouts/*` 与 `components/common/*` 只关心展示结构和交互壳层，不持有技能业务规则。
- `stores/*` 只持有视图共享状态，不持有静态内容事实源。

## Responsibility Split

- 内容读取层：读取原始 YAML 模块并转为结构化原始对象
- 数据适配层：规范化空值、默认值、排序字段、可展示字段
- 领域查询层：提供列表筛选、分类、搜索、相关推荐等纯查询能力
- 页面容器层：组合查询结果、驱动页面布局和交互
- 共享 UI 层：负责通用视觉和可复用组件

## Function Design and Public Entrypoints

- `createApp()`：创建 Vue 应用并装配 Router、Pinia、head
- `createRouter()`：创建公开站点路由
- `loadSiteConfig()`：读取并返回站点配置
- `loadPublishedSkills()`：读取、适配并返回已发布技能列表
- `getSkillById(id)`：读取单个技能详情
- `searchSkills({ query, category, sort })`：返回过滤后的技能结果
- `renderMarkdown(markdown)`：把 Markdown 转换为安全 HTML

## State Ownership and Data Flow

- 站点配置与技能数据：
  - 所有权在 `_data/*`
  - 通过 `content/*` 装载
  - 通过 `features/skills/queries/*` 暴露只读查询能力
- 主题偏好：
  - 所有权在 `stores/theme`
  - 持久化到浏览器本地存储
- 页面级搜索 / 筛选状态：
  - 先在页面容器局部持有
  - 仅当多个页面需要共享时再升级到 store

## Data Structures and Type Strategy

- 核心 TS 类型：
  - `SiteConfig`
  - `SkillRecord`
  - `SkillSummary`
  - `SkillDetail`
  - `SkillCategory`
  - `UsageExample`
- 类型边界：
  - `types/content.ts` 定义原始 YAML 类型
  - `types/skill.ts` 定义页面消费的领域类型
- 适配策略：
  - 原始 YAML 到领域模型的空值 / 默认值 / 展示预处理放在 `content/adapters`
  - 页面不直接处理“空字符串 vs undefined”等语义差异

## Contract and Adapter Boundaries

- 无运行时后端 API
- 合同源是 `_data/config.yaml` 和 `_data/skills/*.yaml`
- `content/adapters` 是唯一允许进行数据语义归一的边界
- `features/skills/queries` 只消费已适配后的领域模型，不碰原始 YAML 字段语义

## Pattern Decisions and Rejected Alternatives

- 采用的结构：
  - 轻量 `Adapter`：解决 YAML 原始字段与页面模型之间的语义差异
  - 轻量 `Query Module`：集中列表筛选、排序、推荐逻辑，避免散落到多个页面组件
- 明确拒绝：
  - 不引入 repository / service / manager 等多层抽象，因为当前数据源稳定且纯静态
  - 不引入全局事件总线，因为当前没有跨模块异步协作压力

## Readability and Maintenance Guardrails

- 页面文件不直接内联技能筛选与适配规则
- YAML 原始结构与 UI 展示模型必须分层
- 一个模块只有一个清晰职责；页面容器不兼做 Markdown / YAML 基础工具
- 主题、内容、查询、布局分别放在独立目录，避免混责

## Architecture Risks

- 需要的依赖较多，若外部依赖安装受限，可能需要先手动搭好最小骨架再补依赖
- GitHub Pages 的项目子路径部署会影响 `base`、路由和资源路径，需要在实现期显式验证
- YAML 读取与 SSG 组合方式需要尽早选定，避免后续页面模块重复改内容入口

## Open Architecture Questions

- 详情页数据是否通过构建期静态路由参数注入，还是运行时在同一打包内按 ID 查询；倾向前者以更贴近 SSG 目标
