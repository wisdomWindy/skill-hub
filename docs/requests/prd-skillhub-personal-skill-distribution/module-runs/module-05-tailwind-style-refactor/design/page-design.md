# Page Design - module-05-tailwind-style-refactor

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-05-tailwind-style-refactor`
- Stage: `page-design`

## Page Objective

把已经完成的 SkillHub 公开站点迁移为 Tailwind CSS 风格的 utility-first 页面表达，同时保持原有信息架构、暗色 / 亮色主题、响应式布局和核心转化区不变。

## Target Users Or Scenarios

- 访客浏览首页、技能列表和技能详情时，页面仍应清晰、响应快速、移动端可读。
- 维护者后续调整页面时，不再需要在组件内维护 scoped CSS，而是在模板中直接通过 Tailwind 类名表达大多数视觉规则。

## Layout Structure

- 全局布局保持 `PublicLayout` 的 header / main / footer 结构。
- 首页保持 hero、统计摘要、精选技能和分类入口的信息顺序。
- 技能列表页保持筛选工具区、结果统计、技能网格和分页结构。
- 技能详情页保持头部概览、安装命令卡片、Markdown 文档、参数/示例/版本/相关推荐分区结构。
- 页面最大宽度、两栏 / 网格 / 单栏响应式切换继续沿用当前视觉意图，通过 Tailwind 容器、grid、flex、gap、max-width 和 breakpoint 类表达。

## Visual Hierarchy

- 保留暗色优先的科技感视觉基调，并保留亮色主题切换。
- 首页 hero 和详情页转化区保持最高视觉权重。
- 卡片、筛选栏、安装命令块、元信息块使用统一的边框、背景透明度、圆角、阴影和 backdrop blur utility 表达。
- 文本层级使用 Tailwind 字号、字重、行高和颜色 utility，避免在页面局部重新定义 CSS。

## Section Breakdown

- `AppHeader`：导航、站点标识、主题切换入口，保持 sticky / blur header。
- `HomeView`：hero、搜索入口、统计摘要、精选技能网格、分类入口。
- `SkillsView`：搜索框、分类筛选、排序、结果统计、空状态、网格、分页。
- `SkillDetailView`：详情头图、元信息、安装命令、Markdown 正文、参数、版本历史、相关技能。
- `SkillCard` / `SkillDetailMeta` / `InstallCommandCard` 等组件：迁移到 utility 类后仍保持组件职责和信息密度。

## Styling Direction

- 使用真实 Tailwind CSS 构建能力，而不是只模拟类名。
- 组件模板内优先使用 Tailwind utility class，包括响应式、hover/focus、dark/light token 相关样式。
- 全局 CSS 只保留必要基础层：Tailwind import、主题 CSS variables、body 基础、Markdown 渲染内容和代码高亮等由运行时 HTML 产生、无法直接加模板类名的样式。
- 禁止使用 `<style>`、`<style scoped>`、`style=""`、`:style`、`v-bind:style`。

## Interaction Skeleton

- 搜索、筛选、排序、分页、卡片跳转、详情返回、安装命令复制、主题切换交互不变。
- hover、focus-visible、disabled、active 等状态使用 Tailwind 状态变体表达。
- Toast / copy 状态只改样式表达，不改状态语义。

## Responsive Behavior

- 移动端保持单列卡片和紧凑间距。
- 平板端使用两列或自动适配网格。
- 桌面端保持多列技能卡片、详情页主次内容分栏和清晰的页面边距。
- 不使用 viewport 字号缩放；使用 Tailwind breakpoint class 调整布局与间距。

## Design Risks

- Markdown 内容由渲染器输出 HTML，不能逐节点在 Vue 模板中直接加 Tailwind 类；需要保留全局 `.markdown-body` 样式或调整 renderer 输出，两者都不能违反 style 标签和行内样式限制。
- Tailwind 依赖安装需要网络可用；如果依赖安装受限，执行阶段需要通过授权网络命令安装。
- 大量类名迁移容易引入细节视觉回退，验证必须包含样式禁用项扫描和构建验证。

## Open UI Questions

- 无需用户确认的开放 UI 问题。已批准假设：本模块保持原视觉方向，不做品牌重设计。
