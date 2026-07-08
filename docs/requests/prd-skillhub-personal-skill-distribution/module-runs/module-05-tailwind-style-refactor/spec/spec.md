# Spec - module-05-tailwind-style-refactor

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-05-tailwind-style-refactor`
- Stage: `spec`

## Background And Goals

原 SkillHub 静态站点已完成公开浏览、技能详情和 GitHub Pages 交付能力。用户新增要求：全站页面样式改成 Tailwind CSS 风格，并且不允许出现 `<style>` 标签、内联样式或行内样式。本模块目标是在不改变产品行为的前提下，完成样式表达层迁移。

## In Scope

- 接入真实 Tailwind CSS 到 Vite 构建链路。
- 迁移 `src/views`、`src/layouts`、`src/components/common`、`src/features/skills/components` 中现有 Vue SFC 的样式表达。
- 删除所有 Vue SFC `<style>` / `<style scoped>` 块。
- 禁止所有模板行内样式入口：`style=""`、`:style`、`v-bind:style`。
- 保留主题切换、响应式布局、Markdown 正文、代码块高亮、卡片层级、hover / focus 状态。
- 增加或执行机器可检查验证，证明禁用样式入口已清除。

## Out Of Scope

- 不新增或恢复后台管理能力。
- 不改变 YAML 内容模型、adapter 语义、搜索筛选排序分页逻辑、路由、安装命令复制、Toast 状态或部署分支策略。
- 不把 Markdown 安全渲染改造成新的内容处理架构。
- 不使用 CSS-in-JS 或内联 style workaround。

## Trigger And Start Conditions

- 触发条件：用户明确要求全站 Tailwind CSS 风格迁移，并禁止 style 标签与行内样式。
- 开始条件：`module-05` 的 spec 与 plan 获得用户审批；若 Tailwind 依赖安装需要网络，执行阶段需通过允许的网络安装命令完成。

## Requirement Split Summary

- 本模块是原 PRD 完成后的需求变更交付单元。
- 它跨越 module-02 和 module-03 的页面视觉表达，也触及 module-01 的全局样式入口与 module-04 的构建兼容性。
- 由于只改变样式表达，不重新拆分原有业务模块。

## User Flow

- 访客进入首页、列表页、详情页的流程不变。
- 用户搜索、筛选、排序、分页、查看详情、复制安装命令、切换主题的交互不变。
- 维护者后续修改样式时，在 Vue 模板中使用 Tailwind class，而不是新增 scoped style 或行内 style。

## Page And Module Design

- 页面结构承接 `design/page-design.md`。
- 架构边界承接 `design/architecture-design.md`。
- 首页、列表页、详情页和组件的视觉表达应以 Tailwind utility-first 类名为主。
- 全局 CSS 允许存在，但只承担 Tailwind import、theme variables、body 基础与运行时生成 HTML 样式。

## Function-Complete Behavior Breakdown

### 全局样式链路

- `src/assets/styles/main.css` 引入 Tailwind。
- 保留 root 主题变量，供 Tailwind arbitrary value class 或全局 generated-content 样式使用。
- 保留 `html`、`body`、`#app`、基础链接 / button / input reset。
- `.markdown-body` 和代码块样式可以留在全局 CSS，因为 Markdown HTML 由 renderer 生成，不能在 Vue 模板中直接逐节点加 class。

### 页面与布局组件

- `PublicLayout`、`AppHeader`、`AppFooter`、`ThemeToggle` 使用 Tailwind class 表达布局、sticky header、主题按钮、页脚间距。
- 不能保留组件 `<style>` 块。
- 不能通过 `style` 属性设置动态尺寸、颜色、背景或过渡。

### 首页与技能列表

- `HomeView`、`SkillsView` 的 hero、工具栏、搜索输入、筛选、排序、结果统计、网格和空状态全部用 Tailwind class 表达。
- 搜索筛选行为、查询参数、分页计算和空状态条件不变。
- 移动端和桌面端布局切换通过 Tailwind breakpoint class 表达。

### 技能详情与转化组件

- `SkillDetailView`、`SkillDetailMeta`、`InstallCommandCard`、`SkillVersionHistory`、`SkillRelatedList` 用 Tailwind class 表达。
- 安装命令复制按钮、复制成功反馈、代码块展示、版本历史和相关推荐行为不变。
- 详情 Markdown 的 HTML 内容继续通过安全 renderer 输出，并由全局 `.markdown-body` 样式承接。

### 样式禁用项

- `src/**/*.vue` 中不得出现 `<style`。
- `src/**/*.vue` 中不得出现 `style=`。
- 若有动态样式需求，必须改为状态 class、CSS variable 或 Tailwind arbitrary class，不得使用 `:style`。

## Design Constraints

- 保持页面结构、组件职责、数据流和状态 ownership 不变。
- 页面容器不得吸收业务组件内部样式细节。
- 样式迁移不得引入新的 mixed-responsibility 文件。
- 禁用项扫描是 hard acceptance criterion。
- 全局 CSS 文件不是行内样式，也不是 SFC style 标签；允许作为 Tailwind 入口和生成内容边界。

## Project Bootstrap And Scaffold Decision

- 本模块不是 greenfield bootstrap。
- 沿用当前 Vue 3 + Vite + Vite SSG 项目。
- Tailwind 作为现有 Vite 样式链路的增量依赖接入，不重建工程脚手架。

## Change Axes And Pattern Decision

- 变化轴：样式表达方式从 scoped CSS 切换为 Tailwind utility-first。
- 不引入命名设计模式。
- 拒绝 CSS-in-JS、style manager、组件样式策略对象，因为当前问题可由 Tailwind + 全局基础层直接解决。

## Code Context And Impact Assumptions

- 当前已知存在 `<style scoped>` 的文件包括：
  - `src/views/HomeView.vue`
  - `src/views/SkillsView.vue`
  - `src/views/SkillDetailView.vue`
  - `src/components/common/AppHeader.vue`
  - `src/components/common/AppFooter.vue`
  - `src/components/common/ThemeToggle.vue`
  - `src/features/skills/components/SkillCard.vue`
  - `src/features/skills/components/SkillGridEmptyState.vue`
  - `src/features/skills/components/SkillPagination.vue`
  - `src/features/skills/components/InstallCommandCard.vue`
  - `src/features/skills/components/SkillVersionHistory.vue`
  - `src/features/skills/components/SkillRelatedList.vue`
  - `src/features/skills/components/SkillDetailMeta.vue`
- TypeScript context：根 `tsconfig.json` governs `src/**/*.vue` 与 `vite.config.ts`，关键选项为 `strict=true`、`moduleResolution=Bundler`、`baseUrl=.`、`paths.@/*=src/*`、`types=["vite/client"]`。

## API And Data Contracts

- 无后端 API。
- 无表单控件数据适配变更。
- YAML 内容模型、skill adapter、site config adapter 不变。

## Context And Dependency Sources

- 用户变更要求。
- `design/page-design.md`
- `design/architecture-design.md`
- `src/assets/styles/main.css`
- `package.json`
- `vite.config.ts`
- 当前 Vue SFC 文件。

## Edge Cases

- Markdown renderer 输出的 HTML 不能在 Vue 模板中直接加 Tailwind class；通过全局 `.markdown-body` 样式解决。
- highlight.js 产生的代码块 class 不属于行内样式，允许保留。
- Tailwind arbitrary value class 可使用 CSS variables，但不得通过 `style` 属性写变量。
- 构建依赖安装失败时，不能用 scoped CSS 回退，需要阻塞或重新审批替代方案。

## Acceptance Criteria

- `rtk rg -n '<style|style=' src` 无命中。
- `package.json` 与构建配置体现 Tailwind CSS 接入。
- `npm run typecheck` 通过。
- `npm test` 通过。
- `BASE_PATH=/skill-hub/ npm run build` 通过。
- 首页、技能列表、技能详情、复制安装命令、主题切换和静态 base path 行为不因样式迁移改变。

## Human Review And Handoff

- 本 spec 需用户审批后进入 plan。
- plan 审批后才能执行代码改造。
- 执行完成后提供禁用项扫描、测试、typecheck、build 证据。

## Risks

- Tailwind 依赖安装受网络限制，需要执行阶段请求外部网络授权。
- 大量样式迁移可能造成细微视觉退化，需要通过构建和必要的人工预览兜底。
- 全局 CSS 与 utility class 的边界需要克制，避免把旧 scoped CSS 简单搬家。
