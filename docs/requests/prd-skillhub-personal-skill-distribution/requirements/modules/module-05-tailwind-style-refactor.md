# Module 05 - Tailwind CSS 风格样式迁移

## Module Metadata

- Module ID: `module-05-tailwind-style-refactor`
- Module name: Tailwind CSS 风格样式迁移
- Module type: page + component style system
- Source: 用户变更需求
- Delivery order: 5
- Page design required: yes
- Architecture design required: yes
- Run root: `module-runs/module-05-tailwind-style-refactor/`

## Source Snapshot

用户要求：

> 把所有页面的样式都改成tailwind-css风格的，不允许出现style标签，内联样式、行内样式

## Scope

- 将现有公开首页、技能列表页、技能详情页、公共布局、公共组件和技能业务组件的样式表达迁移为 Tailwind CSS utility-first 类名。
- 接入 Tailwind CSS 到当前 Vite + Vue 构建链路。
- 移除所有 Vue SFC 中的 `<style>` / `<style scoped>` 块。
- 禁止模板中出现 `style`、`:style`、`v-bind:style` 等行内样式入口。
- 保留当前暗色 / 亮色主题、响应式布局、卡片层级、搜索筛选、分页、详情、安装命令复制、版本历史、相关推荐和静态 GitHub Pages 构建行为。

## Non-Goals

- 不新增后台、认证、管理端或在线写仓库能力。
- 不重写业务数据模型、路由规则、搜索筛选算法、Markdown 安全渲染或复制安装命令行为。
- 不做视觉品牌的大方向重塑；本模块是样式表达层迁移和维护性提升。
- 不用组件内 style 标签或行内样式作为临时兜底。

## Acceptance Signals

- `src/**/*.vue` 中 `rg -n '<style|style=' src` 无命中。
- 页面和组件模板主要通过 Tailwind utility-first 类名表达布局、间距、色彩、边框、响应式和状态样式。
- Tailwind CSS 被纳入项目构建，`npm run typecheck`、`npm test`、`BASE_PATH=/skill-hub/ npm run build` 通过。
- GitHub Pages 静态构建产物仍能使用 `/skill-hub/` base path。
- 原有公开站点功能行为不变。
