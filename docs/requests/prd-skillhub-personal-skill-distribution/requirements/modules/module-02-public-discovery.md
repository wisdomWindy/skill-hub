# Module

## Module Identifier

- `module-02-public-discovery`

## Module Name

- 公开浏览首页与列表页

## Source Snapshot

### 功能需求

- 首页展示所有已上架技能卡片网格，每张卡片含图标、名称、简短描述、分类标签、当前版本号
- 顶部导航提供分类筛选下拉菜单
- 全局搜索框按技能名称和描述做全文检索，实时显示匹配结果，支持模糊匹配
- 排序选项：发布时间新到旧、名称 A 到 Z
- 分页：每页 20 个技能，支持页码跳转或滚动加载
- 空状态展示友好提示

### 验收标准

- 未登录用户可完整访问所有公开页面
- 搜索响应小于 500ms
- 分类筛选与搜索条件可叠加

### UI 设计要点

- 首页：大标题 + 搜索框 + 分类快捷入口 + 最新技能卡片网格（4 列响应式）
- 列表页：左侧分类侧边栏，右侧卡片网格，顶部带排序与结果数量统计

## Markdown-Normalized Snapshot

1. 首页负责“发现”
2. 列表页负责“筛选与浏览”
3. 卡片字段统一来自 Skill 数据模型
4. 搜索、分类、排序、分页 / 空状态必须能组合工作

## Source-Trace References

- `PRD.md` 第 6.1 节
- `PRD.md` 第 9.1 节首页 / 列表页设计要点
- `PRD.md` 第 7.1、7.5 节性能与兼容性要求

## Business Intent

让访客在无登录、低认知负担的前提下快速发现和筛选技能，并把流量引导到详情页。

## User-Visible Scope

- 首页
- 列表页
- 搜索与筛选交互
- 排序、分页 / 无限滚动、空状态

## Forms, Tables, Displays, and Interactions

- Display：卡片网格、分类标签、结果数量、排序控件
- Interaction：搜索输入、分类切换、排序切换、分页 / 加载更多
- State：默认列表、搜索结果为空、无已发布技能、响应式折叠分类栏

## Workflow and State Rules

- 仅 `published` 技能对公开站点可见
- 搜索和分类条件可叠加
- 公开浏览不要求登录

## Dependencies and Impacted Neighbors

- 依赖 `module-01-platform-foundation` 的数据入口、共享布局与类型
- 详情页和首页卡片点击链路依赖该模块产出的路由入口

## Page-Design Routing Decision

- `page_design_required: true`
- 原因：PRD 对首页、列表页布局、卡片密度、分类入口与响应式结构给出了明确的页面级要求

## Downstream Spec Obligations

- 固定首页与列表页的信息层级和筛选路径
- 保留搜索 / 分类 / 排序 / 空状态 / 分页的明确组合规则
- 明确客户端检索与性能目标的实现边界

## Open Questions

- 分页最终采用页码跳转还是无限滚动需要在设计阶段选定主路径，另一种可作为扩展
