# Spec

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-01-platform-foundation`

## Background and Goals

当前仓库只有 PRD，没有任何前端工程。该模块的目标是在纯静态 GitHub Pages 约束下，为 SkillHub 建立一个可直接承载后续页面开发的工程底座，并把内容模型、类型边界、主题系统、Markdown 能力和 SSG 基础一次性固定下来。

## In Scope

- 使用 Vue 3 + TypeScript + Vite 的工程骨架建立项目
- 建立 Vite SSG、Vue Router、Pinia 和页面 head 管理入口
- 建立 `_data/config.yaml`、`_data/skills/*.yaml` 的静态内容读取与适配边界
- 建立公开站点共享布局、头部、主题切换和基础样式系统
- 建立 Markdown 渲染、代码高亮、XSS 过滤基础能力
- 建立 GitHub Pages 兼容的构建配置基础，包括 `base` 可配置能力
- 建立后续页面共享的类型、查询入口和示例内容

## Out of Scope

- 后台管理、登录、OAuth、在线写仓库、运行时 GitHub API
- 具体首页 / 列表页的完整视觉实现
- 具体详情页内容布局与复制交互细节

## Trigger and Start Conditions

- 用户已明确当前范围只做纯静态 GitHub Pages 站点
- 当前模块是所有后续页面模块的共同上游
- 当前仓库为空白工程，需要先建立项目骨架与共享能力

## Requirement Split Summary

- 来源模块：`module-01-platform-foundation`
- 本模块只承接平台基础与静态数据底座，不合并公开浏览或详情页行为
- 上游 requirement-splitting 要求本模块在 `architecture-design` 后进入 `spec`

## User Flow

1. 维护者在仓库中维护 `_data/config.yaml` 与 `_data/skills/*.yaml`
2. 构建命令读取 YAML 内容并生成可消费的静态数据与路由
3. 访客访问 GitHub Pages 部署结果，立即获得可渲染的公开站点壳层
4. 页面模块后续在此基础上补齐具体浏览和详情行为

## Page and Module Design

- 页面层面只定义共享壳层：
  - 顶部导航区预留 Logo / 站点名 / 搜索入口位
  - 页面主体区使用统一最大宽度容器
  - 全局主题切换按钮位于头部右侧
- 模块设计承接 architecture design：
  - `content/*` 处理内容读取与适配
  - `features/skills/*` 处理查询与业务领域暴露
  - `layouts/*` 与 `components/common/*` 处理共享 UI

## Function-Complete Behavior Breakdown

### 1. 工程骨架初始化

- 使用 Vite Vue TypeScript 项目结构作为默认参考骨架
- 若环境无法直接拉取外部脚手架，允许手动创建与该骨架等价的必要文件
- 必须包含：
  - `package.json`
  - `vite.config.ts`
  - `tsconfig.json`
  - `tsconfig.app.json`
  - `src/app/main.ts` 或等价入口
  - `src/App.vue`
  - `index.html`

### 2. TypeScript 上下文建立

- 当前改动的 governing tsconfig 为仓库根 `tsconfig.json`
- `tsconfig.app.json` 负责应用源码作用域
- spec 要求实现期至少明确：
  - `baseUrl` / `paths` 是否启用 `@` 指向 `src`
  - `strict` 开启
  - `moduleResolution` 与 Vite 兼容
  - `types` 至少覆盖 Vite 环境声明
- `src/env.d.ts` 或等价声明文件负责 Vite 与资源导入补充声明

### 3. 内容数据读取与适配

- 站点配置从 `_data/config.yaml` 读取
- 技能内容从 `_data/skills/*.yaml` 读取
- 运行期页面不得直接消费“未经适配的 YAML 原始对象”
- 必须通过 adapter 层完成：
  - `status` 过滤前的原始语义保留
  - `tags` 非法空值归一为空数组
  - 可能缺失的 `usageExamples` 归一为空数组
  - 可能缺失的 `installCount` 归一为 `0`
  - 列表 / 详情共用的时间字段归一为可比较值
- 严禁在页面 `computed`、`watch` 或模板分支里对字段语义临时修补

### 4. 公开站点共享壳层

- 至少实现一个共享公开布局，包含：
  - 站点头部
  - 主体容器
  - 页脚占位或最小版权区
- 头部组件必须包含：
  - Logo / 站点名称展示区
  - 搜索入口视觉占位
  - 主题切换按钮
- 共享壳层在桌面和移动端都必须可用

### 5. 主题系统

- 默认主题为暗色
- 支持手动切换亮色
- 首次访问时若无本地偏好，跟随系统主题
- 偏好持久化到本地存储
- 切换主题时应通过根级 class 或 data-attribute 驱动，不允许页面各自维护一套颜色状态

### 6. Markdown 与代码渲染基础能力

- 详细描述和更新日志将来都使用统一 Markdown 渲染器
- Markdown 渲染必须包含：
  - 标题、列表、链接、引用、代码块基础支持
  - 代码块语法高亮
  - XSS 过滤
- 渲染器输出为页面可直接消费的安全 HTML

### 7. 领域查询入口

- 必须暴露统一的只读查询入口：
  - `loadSiteConfig`
  - `loadPublishedSkills`
  - `getSkillById`
  - `listRelatedSkills`
- 首页、列表页、详情页后续都只能消费这些查询入口或其同层扩展，不直接读取原始 YAML 模块

### 8. SSG 与 GitHub Pages 兼容基础

- 应用必须支持静态生成公开页面
- 路由模式必须兼容 GitHub Pages 静态托管
- `vite.config.ts` 中必须预留 `base` 配置能力，以适配项目子路径部署
- 构建输出路径与静态资源路径处理要为 `.github/workflows` 后续部署铺路

## Design Constraints

- 责任边界：
  - 页面容器不负责内容语义适配
  - adapter 层是唯一允许做数据语义归一的地方
  - Markdown 工具不混入列表筛选逻辑
- 命名约束：
  - `content` 代表原始内容读取与适配
  - `features/skills` 代表技能领域查询与业务能力
  - `common` 只包含跨页面稳定复用组件
- 重复约束：
  - 技能筛选、相关推荐和状态过滤规则只允许有一个 ownership point
- 副作用约束：
  - 本模块只有主题持久化属于运行时副作用
  - 内容加载尽量保持为构建期 / 静态导入
- 复杂度约束：
  - 不为纯静态内容引入过度 service 层或 manager 层

## Project Bootstrap and Scaffold Decision

- 已评估存在合适的同类型 scaffold：Vite Vue TypeScript starter
- 默认决策：采用该 starter 的目录与配置思路
- 由于当前仓库为空，且运行环境可能无法直接联网下载脚手架，允许手动构建等价骨架
- 允许偏离：
  - 把默认 `src/main.ts` 重组为 `src/app/*` 入口结构
  - 提前加入 `content/`、`features/skills/`、`layouts/` 分层目录
  - 加入 Vite SSG 与 YAML 内容读取所需配置
- 不允许偏离：
  - 放弃 TypeScript
  - 放弃 Vite 构建体系
  - 以手写随意目录替代明确的层次结构

## Change Axes and Pattern Decision

- 真实变化轴：
  - 内容模型可能增长
  - 页面查询方式会复用于首页 / 列表 / 详情
  - YAML 原始结构与页面消费结构存在语义差异
- 模式决策：
  - 采用轻量 Adapter 处理内容归一
  - 采用轻量 Query Module 提供领域读取能力
- 明确拒绝：
  - 不引入 repository / factory / manager / event bus 等额外模式层
  - 当前没有需要策略模式或状态模式解决的复杂变体

## Code Context and Impact Assumptions

- 当前仓库没有既有代码，无需兼容存量结构
- 当前实现将决定后续所有页面模块的目录、查询入口和主题机制
- 一旦内容适配边界选错，后续页面会出现模板内数据兜底和重复逻辑

## API and Data Contracts

- contract source：
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
- `config.yaml` 至少需要：
  - `site.title: string`
  - `site.description: string`
  - `site.baseUrl: string`
  - `categories: Array<{ key: string; label: string }>`
- `skill yaml` 至少需要：
  - `id: string`
  - `name: string`
  - `category: string`
  - `version: string`
  - `shortDesc: string`
  - `fullDesc: string`
  - `installCommand: string`
  - `status: "published" | "archived"`
  - `installCount: number`
  - `createdAt: string`
  - `updatedAt: string`
- adapter 边界：
  - 原始 YAML 字段保存在 `SkillRecord`
  - 页面消费使用 `SkillSummary` / `SkillDetail`
  - 任何空值归一、默认值补齐、推荐字段预处理都在 adapter 层完成

## Context and Dependency Sources

- 用户澄清后的范围：只做纯静态 GitHub Pages
- PRD 作为业务来源
- Vite / Vue Router / Pinia / Vite SSG 为基础依赖来源

## Edge Cases

- `_data/skills/` 为空时，后续页面模块必须能安全消费空数组
- 某技能缺失可选字段时，adapter 必须补齐稳定默认值
- 分类定义与技能分类不匹配时，后续页面可将其归入“其他”或保留原值，但当前模块至少要保留原始字段并支持下游决定
- `site.baseUrl` 为空时，不能阻断本地开发

## Acceptance Criteria

1. 仓库具备可运行的 Vue 3 + TypeScript + Vite 工程骨架，并为后续静态页面扩展预留清晰目录。
2. 已建立 `_data/config.yaml` 与 `_data/skills/*.yaml` 的静态读取与 adapter 边界，页面后续不需要直接处理原始 YAML 语义。
3. 已建立共享公开布局、头部、主题切换和基础样式系统，且桌面 / 移动端都可用。
4. 已建立统一 Markdown 渲染、安全过滤与代码高亮能力。
5. 已建立统一的技能查询入口，后续列表页和详情页都可复用。
6. 已建立与 GitHub Pages 兼容的 SSG / 路由 / `base` 配置基础。

## Human Review and Handoff

- 本模块完成后，下一模块 `module-02-public-discovery` 可以直接基于共享布局、内容查询和主题系统进入页面设计与实现。
- 需要用户确认本模块的 scope、脚手架决策和 adapter / query 边界。

## Risks

- 若依赖安装受限，实际执行时可能需要以“手动等价骨架 + 最小依赖”方式推进
- YAML + SSG 组合的实现细节若在执行期不顺，需要回流到 architecture-design 修正内容入口
