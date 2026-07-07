# Spec

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-02-public-discovery`

## Background and Goals

`module-01` 已经把静态内容、主题、布局和查询入口打通。当前模块的目标是把这些基础能力转化成真正可用的公开发现页，让访客能通过首页与列表页完成“发现技能 -> 缩小范围 -> 进入详情”的第一段路径。

## In Scope

- 首页发现页
- 列表页
- 搜索、分类、排序、分页、结果统计
- 卡片网格与空状态
- 首页分类快捷入口与最新技能区

## Out of Scope

- 详情页完整转化区
- 安装命令复制交互
- 运行时远程搜索服务
- 无限滚动

## Trigger and Start Conditions

- `module-01` 已完成并通过 review
- 当前模块从 `page-design -> architecture-design -> spec` 顺序进入

## Requirement Split Summary

- 来源模块：`module-02-public-discovery`
- 承接首页与列表页的公开发现路径
- 继续复用 `module-01` 的内容 adapter、查询入口和共享壳层

## User Flow

1. 访客进入首页，看到 Hero、搜索框、分类入口和最新技能卡片
2. 访客可：
   - 在首页输入关键词后进入列表页查看过滤结果
   - 点击分类入口直接进入列表页对应分类
   - 点击技能卡片进入详情页
3. 访客进入列表页后，可组合使用搜索、分类、排序
4. 当结果超过 20 条时，通过页码切换浏览
5. 无结果时，看到明确空状态和重置筛选入口

## Page and Module Design

- 首页：
  - Hero 区是第一视觉焦点
  - 分类快捷区紧随其后
  - 最新技能网格作为主要内容区
- 列表页：
  - 顶部展示结果上下文
  - 桌面端使用“左筛选、右结果”的双栏结构
  - 移动端把分类切换收敛到顶部可滚动标签条
- 组件：
  - 统一 `SkillCard`
  - 统一空状态组件
  - 统一分页组件

## Function-Complete Behavior Breakdown

### 1. 首页 Hero

- 用途：让访客快速理解站点内容并进入浏览路径
- 包含：
  - 大标题
  - 简短说明
  - 搜索输入框
  - 主行动按钮
- 搜索输入语义：
  - 输入值在进入列表页前做 `trim`
  - 纯空格输入视为未输入
  - `trim` 后为空时，跳转列表页但不附带 query
  - 不做长度硬校验
  - 不展示报错
- 交互：
  - 按回车或触发主行动时进入列表页
  - 若有有效 query，则把 query 带入列表页状态

### 2. 首页分类快捷入口

- 用途：让访客按主题快速切入列表页
- 展示项：
  - “全部”
  - `config.yaml` 中的每个分类
- 交互：
  - 点击后进入列表页
  - 带入对应分类参数

### 3. 首页最新技能卡片区

- 用途：展示最新发布技能
- 数据来源：
  - `getLatestSkills(limit)` 或同等查询
- 卡片字段：
  - 名称
  - 短描述
  - 分类标签
  - 版本号
  - 可选图标
- 空状态：
  - 无已发布技能时显示友好提示

### 4. 列表页搜索区

- 用途：在公开技能集合内做即时客户端检索
- 输入语义：
  - 输入值先 `trim`
  - 纯空格输入视为清空搜索
  - `trim` 后为空则不过滤
  - 按归一化后的值进行匹配
  - 匹配字段：技能名称、短描述
  - 输入过程中即可更新结果
  - 不展示错误态

### 5. 列表页分类筛选

- 用途：按分类缩小技能范围
- 数据来源：
  - 站点配置分类列表
- 筛选规则：
  - 默认值为“全部”
  - 分类与搜索条件可叠加
  - 切换分类后页码重置到第 1 页

### 6. 列表页排序

- 选项：
  - 发布时间（新到旧）
  - 名称（A 到 Z）
- 默认：
  - 发布时间（新到旧）
- 交互：
  - 切换排序后立即刷新当前结果
  - 切换排序后页码重置到第 1 页

### 7. 列表页分页

- 主路径：
  - 页码分页
- 规则：
  - 每页 20 项
  - 当总数小于等于 20 时不显示分页
  - 切换页码后滚动回列表区顶部
- 分页状态：
  - 超出总页数的页码自动收敛到最后一页

### 8. 列表页结果区

- 展示：
  - 结果总数
  - 当前分类 / 搜索上下文
  - 技能卡片网格
- 空状态：
  - 当筛选结果为空时展示友好提示
  - 提供重置筛选入口

## Design Constraints

- 搜索、分类、排序、分页的组合逻辑必须由查询层或页面容器显式协调，不能散在多个模板分支里
- 页面层不得重新对 `tags`、`usageExamples`、`installCount` 等字段做语义修补
- 首页与列表页必须复用统一 `SkillCard`

## Project Bootstrap and Scaffold Decision

- 继续复用 `module-01` 已建立的工程与目录骨架
- 当前模块只在既有骨架上增加页面和组件，不重新调整基础入口结构

## Change Axes and Pattern Decision

- 变化轴：
  - 搜索 query
  - 分类
  - 排序
  - 页码
- 采用：
  - 轻量 Query Helper 组合这些状态
- 拒绝：
  - 不引入额外全局 store
  - 不引入模糊搜索库作为本轮必需品

## Code Context and Impact Assumptions

- 依赖 `module-01` 已建立的：
  - `loadSiteConfig`
  - `loadPublishedSkills`
  - `getSkillById`
  - 全局壳层与主题系统
- 当前模块会直接影响详情页入口流量与公开站点首屏感知

## API and Data Contracts

- 无远程 API
- 数据合同继续复用 `_data/config.yaml` 与 `_data/skills/*.yaml`
- 查询使用 `SkillSummary`
- 分类来源于 `SiteConfig.categories`

## Context and Dependency Sources

- `module-02` requirement 文档
- `module-02` page-design / architecture-design
- `module-01` 的查询与布局能力

## Edge Cases

- 当技能总数为 0 时：
  - 首页最新技能区显示空状态
  - 列表页显示无技能空状态
- 当搜索值为纯空格：
  - 视为未输入
- 当分类值不存在：
  - 回退为“全部”
- 当页码超过总页数：
  - 收敛到最后一页

## Acceptance Criteria

1. 未登录访客可以完整访问首页与列表页。
2. 首页展示 Hero、分类快捷入口和最新技能卡片区，并能通往列表页。
3. 列表页支持搜索、分类、排序组合使用。
4. 分页按每页 20 条工作，页码切换稳定。
5. 搜索为空、无技能、无结果时都能看到友好空状态。
6. 首页与列表页均复用统一卡片组件，且字段展示一致。

## Human Review and Handoff

- 需要用户审批当前模块 spec 后再进入 plan。
- 当前模块完成后，`module-03` 可直接承接详情页转化区设计。

## Risks

- 若后续技能量明显增长，简单文本包含匹配可能需要升级，但当前不阻塞首版静态站点
- 若列表页状态分散过多，容易出现分页与筛选不同步，需要在计划中严控
