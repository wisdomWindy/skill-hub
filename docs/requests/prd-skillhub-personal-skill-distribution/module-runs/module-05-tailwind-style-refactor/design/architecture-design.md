# Architecture Design - module-05-tailwind-style-refactor

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-05-tailwind-style-refactor`
- Stage: `architecture-design`

## Architecture Objective

把 SkillHub 的样式表达从 Vue SFC scoped CSS 迁移到 Tailwind CSS utility-first 体系，并建立可验证的“无组件 style 标签、无行内 style”边界。

## Architecture Scope And Triggers

- 触发源：用户新增样式架构要求。
- 范围：`src/**/*.vue`、`src/assets/styles/main.css`、Tailwind / Vite 样式构建配置、相关测试或验证脚本。
- 不触碰：数据 adapter、Pinia store、路由行为、Markdown 安全策略和 GitHub Actions 发布语义，除非构建样式依赖需要同步文档或 lockfile。

## Upstream Inputs And Assumptions

- 上游页面设计：`design/page-design.md`。
- 当前工程：Vue 3 + Vite + TypeScript + Vite SSG。
- TypeScript context：根 `tsconfig.json`，`moduleResolution=Bundler`，`baseUrl=.`，`paths.@/*=src/*`，`strict=true`，`types=["vite/client"]`。
- 已批准假设：Tailwind CSS 指真实 Tailwind 构建依赖，而不是自定义仿 utility CSS。

## Module Boundary Design

- 页面容器继续拥有页面结构和数据编排。
- 业务组件继续只负责自身展示与交互，不引入新的样式管理 hook。
- 全局样式层只负责 Tailwind import、主题 token、body 基础、Markdown / highlight.js 生成内容。
- Tailwind 配置和 `main.css` 是样式系统边界；组件 SFC 不能再包含 style 块。

## File And Directory Structure

- `package.json` / lockfile：新增 Tailwind 相关 dev dependency。
- `vite.config.ts`：接入 Tailwind 的 Vite 插件或等价官方集成方式。
- `src/assets/styles/main.css`：引入 Tailwind，保留必要 `@layer base/components`。
- `src/views/*.vue`：迁移页面级 scoped CSS 为 utility 类。
- `src/components/common/*.vue`：迁移公共组件样式。
- `src/features/skills/components/*.vue`：迁移技能业务组件样式。
- `docs/requests/.../module-runs/module-05-tailwind-style-refactor/`：记录执行、验证、评审证据。

## Code Relationship And Dependency Direction

- Vue 组件依赖 Tailwind utility class，不依赖本地 scoped CSS。
- 全局 CSS 不反向依赖组件实现细节，只暴露 theme token 和生成内容样式。
- Markdown renderer 继续输出安全 HTML；展示层通过 `.markdown-body` 全局样式承接生成内容。
- Vite 构建负责处理 Tailwind，`BASE_PATH` 仍只影响静态资源 base。

## Responsibility Split

- `main.css`：全局基础、Tailwind import、CSS variables、body 背景、Markdown / code block 样式。
- 页面 SFC：布局结构、响应式组织和页面级 Tailwind 类。
- 组件 SFC：卡片、按钮、状态、交互样式的 Tailwind 类。
- 测试 / 验证：扫描禁用样式入口，并回归 typecheck/test/build。

## Function Design And Public Entrypoints

- 不新增公开业务函数。
- Tailwind 样式入口为 `src/assets/styles/main.css`，沿用当前 `src/app/main.ts` 的全局样式导入。
- 禁用样式入口验证使用 `rg -n '<style|style=' src` 作为机器可检查门槛。

## State Ownership And Data Flow

- 状态归属不变：主题仍由 `stores/theme.ts` 控制并写入 root `data-theme`。
- UI 类名根据现有响应式和交互状态表达，不新增样式状态 store。
- Copy 成功状态、筛选状态、分页状态全部保持原组件或页面所有权。

## Data Structures And Type Strategy

- 不新增业务数据结构。
- 若引入 Tailwind Vite 插件，需要遵循项目 ESM 配置。
- TypeScript 影响仅限配置类型和 Vue SFC 模板类名，不改变业务类型。

## Contract And Adapter Boundaries

- 无后端接口。
- 无表单数据适配变更。
- Markdown 内容的安全适配仍归 `render-markdown.ts`；本模块不把样式语义塞进数据 adapter。

## Pattern Decisions And Rejected Alternatives

- 采用 utility-first 样式表达，不引入 CSS-in-JS、组件样式 manager 或主题策略对象。
- 拒绝“只把 scoped CSS 搬到全局 class”的方案，因为这不满足 Tailwind CSS 风格和维护目标。
- 保留全局 Markdown 样式作为生成内容边界，不把 renderer 改造成复杂 AST class 注入器，避免为样式迁移引入过度抽象。

## Readability And Maintenance Guardrails

- 类名较长时按结构换行，但不抽象出无语义的 wrapper 组件。
- 重复出现且具备全局含义的 token 可放入 CSS variables；局部视觉规则优先留在 Tailwind class。
- 不为了消除少量重复而引入新的 style helper。
- 禁用 `<style>` 和 `style=` 的扫描必须成为验证证据。

## Architecture Risks

- Tailwind v4 / Vite 集成方式可能受当前依赖版本影响，执行阶段必须以安装后的官方包行为为准。
- 如果 Tailwind 依赖安装失败，不能退回组件 style 标签；应阻塞在依赖安装或选择经批准的替代方案。
- 全局 Markdown 样式需要谨慎保留，避免误判为违反用户“style 标签 / 行内样式”禁令。

## Open Architecture Questions

- 无需用户进一步确认。已批准假设：允许保留全局 CSS 文件；禁止的是 Vue SFC style 标签与 HTML 行内 style。
