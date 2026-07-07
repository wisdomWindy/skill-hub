# Architecture Design

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-02-public-discovery`

## Architecture Objective

在不破坏 `module-01` 已建立的内容与查询边界前提下，实现首页与列表页的发现路径、搜索筛选状态组合和分页能力，并保证页面容器与领域查询逻辑清晰分层。

## Architecture Scope and Triggers

- 作用域：
  - 首页容器
  - 列表页容器
  - 技能卡片组件
  - 搜索 / 分类 / 排序 / 分页状态组合
  - 结果统计与空状态展示
- 触发条件：
  - `module-01` 已完成共享布局、主题、内容 adapter 与统一查询入口
  - 当前模块是第一个真正消费这些能力的页面模块

## Upstream Inputs and Assumptions

- 上游输入：
  - `module-02` requirement 工件
  - `module-02` page-design
  - `module-01` 的内容查询与布局骨架
- 假设：
  - 搜索完全在客户端内存中完成
  - 首轮分页采用页码分页，不做滚动加载
  - 分类来自 `loadSiteConfig()` 的分类列表，额外保留“全部”虚拟项

## Module Boundary Design

- `src/views/HomeView.vue`
  - 负责首页发现路径与精选列表编排
- `src/views/SkillsView.vue`
  - 负责列表页搜索、分类、排序、分页状态编排
- `src/features/skills/components/SkillCard.vue`
  - 负责技能卡片复用展示
- `src/features/skills/components/SkillGridEmptyState.vue`
  - 负责空状态显示
- `src/features/skills/components/SkillPagination.vue`
  - 负责页码切换 UI
- `src/features/skills/queries/skill-queries.ts`
  - 扩展当前查询能力，补分页与列表上下文组装

## File and Directory Structure

```text
src/
├── features/skills/
│   ├── components/
│   │   ├── SkillCard.vue
│   │   ├── SkillGridEmptyState.vue
│   │   └── SkillPagination.vue
│   └── queries/
│       └── skill-queries.ts
└── views/
    ├── HomeView.vue
    └── SkillsView.vue
```

## Code Relationship and Dependency Direction

- 页面容器只持有视图状态，不直接做原始内容适配
- 卡片、分页和空状态组件只接收已计算好的 props
- 查询层可新增分页与结果统计辅助函数，但不能越过 adapter 层读原始 YAML

## Responsibility Split

- 首页：
  - 负责 Hero、分类入口、最新技能选取
- 列表页：
  - 负责搜索词、分类、排序、当前页状态
- 查询层：
  - 负责过滤、排序、分页切片、结果计数
- 展示组件：
  - 负责卡片与空状态可视输出

## Function Design and Public Entrypoints

- `loadPublishedSkills(input)`
  - 保持为公开查询入口
- `paginateSkills(skills, page, pageSize)`
  - 提供分页切片和总页数
- `getLatestSkills(limit)`
  - 首页最新技能集合

## State Ownership and Data Flow

- 首页：
  - 搜索值可以先由本地输入驱动，再导航到列表页
- 列表页：
  - 搜索词、分类、排序、页码属于页面局部状态
  - 由这些状态驱动查询层输出
- 不新增全局 store；当前变化轴还不值得提升为全局共享状态

## Data Structures and Type Strategy

- 复用 `SkillSummary`
- 新增分页结果类型：
  - `PaginatedSkillResult`
  - 包含 `items`、`page`、`pageSize`、`totalItems`、`totalPages`

## Contract and Adapter Boundaries

- 无新增合同源
- 继续复用 `module-01` 已适配后的领域模型
- 搜索和分类逻辑只基于 `SkillSummary` 工作

## Pattern Decisions and Rejected Alternatives

- 采用：
  - 轻量 Query Helper 扩展，集中分页与结果统计逻辑
- 拒绝：
  - 不为分页单独创建 store
  - 不为首页 / 列表页再造第二套内容模型

## Readability and Maintenance Guardrails

- 搜索 / 分类 / 排序 / 分页逻辑不得分别散在多个模板计算片段中
- 卡片展示字段统一由 `SkillCard` 负责，避免首页和列表页各写一套
- 列表页状态组合要保持显式，不隐藏在过深 watcher 链里

## Architecture Risks

- 若过早把搜索状态做成全局 store，会让首页与列表页耦合过深
- 若分页逻辑散到页面层，后续空状态与结果统计会难维护

## Open Architecture Questions

- 当前先不引入模糊搜索库；首轮使用轻量文本匹配即可满足静态站点规模
