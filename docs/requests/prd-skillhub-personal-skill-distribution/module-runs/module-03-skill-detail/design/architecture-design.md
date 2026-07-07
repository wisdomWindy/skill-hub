# Architecture Design

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-03-skill-detail`

## Architecture Objective

在现有详情页基础上，把展示、转化、复制反馈、相关推荐和版本信息拆成清晰的详情页面结构，同时保持 Markdown 渲染和查询边界不被页面组件侵蚀。

## Architecture Scope and Triggers

- 作用域：
  - `SkillDetailView.vue`
  - 详情页子组件
  - 复制交互
  - 相关推荐与版本信息块
- 触发条件：
  - `module-02` 已建立公开站点的详情页入口
  - 当前详情页仍是基础占位实现，需要升级为正式转化页

## Upstream Inputs and Assumptions

- 上游输入：
  - `module-03` requirement 工件
  - `module-03` page-design
  - `module-01` 的 `getSkillById`、`listRelatedSkills`、Markdown 渲染能力
- 假设：
  - 首版仍基于静态 YAML 数据，不新增远程详情接口
  - 复制反馈以轻量 UI 状态实现，不引入全局消息系统

## Module Boundary Design

- `src/views/SkillDetailView.vue`
  - 页面容器，只做详情数据编排与布局组织
- `src/features/skills/components/InstallCommandCard.vue`
  - 安装命令展示与复制
- `src/features/skills/components/SkillDetailMeta.vue`
  - 标题、版本、分类、更新时间、安装量
- `src/features/skills/components/SkillRelatedList.vue`
  - 相关推荐
- `src/features/skills/components/SkillVersionHistory.vue`
  - 版本历史展示

## File and Directory Structure

```text
src/
├── features/skills/components/
│   ├── InstallCommandCard.vue
│   ├── SkillDetailMeta.vue
│   ├── SkillRelatedList.vue
│   └── SkillVersionHistory.vue
└── views/
    └── SkillDetailView.vue
```

## Code Relationship and Dependency Direction

- `SkillDetailView` 从查询层获取详情与相关推荐
- Markdown 渲染继续由 `renderMarkdown` 完成
- 复制交互局限在 `InstallCommandCard`
- 相关推荐和版本历史组件只接收已准备好的 props

## Responsibility Split

- 页面容器：
  - 数据读取、SEO/head、整体布局
- 安装命令卡片：
  - 复制状态与反馈
- 元信息区：
  - 标题与关键信息展示
- 相关推荐区：
  - 只负责跳转列表

## Function Design and Public Entrypoints

- `getSkillById`
- `listRelatedSkills`
- `renderMarkdown`
- 新增局部复制 handler，例如 `copyInstallCommand`

## State Ownership and Data Flow

- 详情内容与相关推荐：
  - 查询层提供
- 复制反馈：
  - `InstallCommandCard` 本地状态
- 页面不再引入全局 store

## Data Structures and Type Strategy

- 继续复用 `SkillDetail` 与 `SkillSummary`
- 若版本历史暂未有结构化数组，首版以 `changelog` Markdown 作为版本内容来源

## Contract and Adapter Boundaries

- 无远程 API
- 继续消费已适配的 `SkillDetail`
- 若后续引入参数说明字段，也必须先在 adapter / 类型层落地，再由详情页消费

## Pattern Decisions and Rejected Alternatives

- 采用：
  - 按展示职责拆子组件
- 拒绝：
  - 不为详情页引入单独 store
  - 不为复制反馈引入全局消息总线

## Readability and Maintenance Guardrails

- `SkillDetailView` 不内联复制实现细节
- Markdown、复制、相关推荐分别在独立组件 / 工具中
- 当前没有结构化参数字段时，不在页面模板临时拼凑伪字段

## Architecture Risks

- 如果安装命令复制反馈和页面布局耦合太深，移动端容易变复杂
- 若强行在无结构化数据前提下做参数说明，会把内容语义混乱带到页面层

## Open Architecture Questions

- 首版参数说明区将按“有结构化数据则展示、否则隐藏”的方式处理，待后续数据模型增强再扩展
