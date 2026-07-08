# Spec

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-04-static-delivery`

## Background and Goals

前三个模块已经建立纯静态 SkillHub 的工程底座、公开发现页和详情转化页。当前模块负责把站点收束为可由 GitHub 仓库内容驱动、可在 GitHub Pages 上稳定发布的交付形态，并补齐示例内容与维护说明。

## In Scope

- GitHub Actions 监听 `main` push 并构建静态站点。
- 构建产物发布到 `gh-pages` 分支，供 GitHub Pages 托管。
- Vite / Vite SSG 在 GitHub Pages 项目子路径下正确处理 `base` 与静态资源路径。
- `_data/config.yaml` 覆盖 PRD 默认分类与站点配置示例。
- `_data/skills/*.yaml` 保留最小但足够覆盖首页、列表页、详情页、归档过滤的技能示例。
- README 说明本地开发、构建、内容维护、部署和 GitHub Pages 设置。

## Out of Scope

- 后台管理、认证、在线写仓库。
- GitHub API 运行时调用或部署状态轮询页面。
- 自定义域名配置和 `CNAME` 文件。
- 安装量真实埋点或远程统计。

## Trigger and Start Conditions

- `module-01-platform-foundation`、`module-02-public-discovery`、`module-03-skill-detail` 均已完成 review。
- 当前模块已完成 `architecture-design`。
- 现有仓库已有 Vite SSG 构建入口、YAML 读取层和基础 GitHub Actions workflow。

## Requirement Split Summary

- 来源模块：`module-04-static-delivery`
- Source trace：
  - `PRD.md` 第 6.4 节
  - `PRD.md` 第 7.2 节
  - `PRD.md` 第 10.4 节
- 当前模块只承接静态内容、构建和部署交付，不重新定义公开浏览页或详情页行为。

## User Flow

1. 维护者在仓库中修改 `_data/config.yaml` 或 `_data/skills/*.yaml`。
2. 维护者本地执行 `npm test`、`npm run typecheck`、`BASE_PATH=/skill-hub/ npm run build` 验证。
3. 维护者把变更推送到 `main`。
4. GitHub Actions 安装依赖并执行静态构建。
5. 构建成功时发布 `dist` 到 `gh-pages` 分支。
6. GitHub Pages 从 `gh-pages` 分支托管公开站点。
7. 构建失败时 workflow 失败，不更新 `gh-pages`，线上保留上一版成功站点。

## Page and Module Design

- 当前模块不新增页面。
- 交付面由以下模块组成：
  - 内容源：`_data/config.yaml`、`_data/skills/*.yaml`
  - 构建入口：`npm run build`
  - 部署入口：`.github/workflows/deploy.yml`
  - 维护说明：`README.md`
- 页面层继续通过既有内容读取、adapter 和查询层消费静态数据。

## Function-Complete Behavior Breakdown

### 1. GitHub Actions 静态部署

- 触发：
  - `main` 分支 push
  - `workflow_dispatch`
- Node 环境：
  - 使用 `package.json` 中声明的 Node 24 系列。
- 安装依赖：
  - 仓库存在 `package-lock.json`，CI 使用 `npm ci`。
- 构建：
  - 执行 `npm run build`。
  - 构建时设置 `BASE_PATH=/${{ github.event.repository.name }}/`。
- 发布：
  - 构建成功后把 `dist` 发布到 `gh-pages` 分支。
  - 发布提交使用 GitHub Actions token，不进入前端 bundle。
- 失败语义：
  - 任一步失败时 workflow 标记失败。
  - 不发布新的 `gh-pages` 产物。

### 2. GitHub Pages Base 和静态路径

- `vite.config.ts` 继续从 `process.env.BASE_PATH` 读取 `base`。
- 未设置 `BASE_PATH` 时本地默认 `/`。
- 项目页构建使用 `/skill-hub/` 或仓库名派生路径。
- 页面代码不得硬编码 `/skill-hub/`。
- 路由继续使用 Vite SSG 和 `import.meta.env.BASE_URL`。

### 3. 示例站点配置

- `_data/config.yaml` 必须包含：
  - `site.title`
  - `site.description`
  - `site.baseUrl`
  - PRD 默认分类：开发工具、数据处理、DevOps、安全、办公自动化、其他
- `site.baseUrl` 首版允许为空字符串，表示未绑定线上域名。
- 分类 key 必须保持稳定，供筛选与展示复用。

### 4. 示例技能内容

- `_data/skills/*.yaml` 至少覆盖：
  - 多个 `published` 技能，用于首页、列表页、详情页、相关推荐。
  - 至少一个 `archived` 技能，用于验证下架内容不进入公开列表与静态详情路由。
  - 不同分类、版本、更新时间、标签、安装命令、Markdown 详情、使用示例和 changelog。
- 示例内容必须通过现有 `SkillRecord` 合同进入 adapter，不在页面侧补字段语义。
- 示例安装命令不得包含真实密钥、私有 token 或环境凭据。

### 5. README 维护说明

- README 必须说明：
  - 本地开发命令：`npm install` / `npm run dev`
  - 本地验证命令：`npm test`、`npm run typecheck`、`npm run build`
  - GitHub Pages 项目路径验证：`BASE_PATH=/skill-hub/ npm run build`
  - 新增或修改技能文件的位置和字段口径
  - GitHub Pages source 需配置为 `gh-pages` branch
  - 纯静态范围：无后台、无登录、无运行时写仓库

## Design Constraints

- 部署链路只保留一条主路径：`main` 构建，`gh-pages` 托管。
- 不同时保留 official Pages artifact deploy 和 `gh-pages` 分支发布两套会互相混淆的主流程。
- `base` 路径只在构建配置和 Vite SSG 入口表达，不进入页面组件。
- 内容语义归一必须继续在 adapter / content 层完成，禁止在页面模板、computed 或 watch 中临时兜底。
- README 命令必须与 `package.json` 和 workflow 实际命令一致。

## Project Bootstrap and Scaffold Decision

- 继续复用当前 Vue 3 + Vite + TypeScript + Vite SSG 工程。
- 当前模块不是新建脚手架，不替换技术栈。
- 允许偏离：
  - 调整 GitHub Actions 发布方式以满足 `gh-pages` 分支要求。
  - 补充示例 YAML 与 README。
- 不允许偏离：
  - 不引入后台项目、服务端渲染服务或运行时部署代理。

## Change Axes and Pattern Decision

- 变化轴：
  - GitHub Pages 项目子路径 vs 本地根路径
  - `published` vs `archived` 技能状态
  - 构建成功 vs 构建失败
  - 普通仓库页 vs 未来自定义域名
- 采用：
  - 直接配置式部署链路：Vite `base` + npm scripts + GitHub Actions workflow。
  - 既有轻量 Adapter：继续由内容层归一 YAML 数据。
- 拒绝：
  - 不新增部署 service、manager 或自定义发布脚本。
  - 不为 GitHub Actions 状态引入前端轮询或运行时状态组件。

## Code Context and Impact Assumptions

- 主要影响文件：
  - `.github/workflows/deploy.yml`
  - `vite.config.ts`
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
  - `README.md`
- 关键现有入口：
  - `src/content/config/site-config.ts`
  - `src/content/skills/load-skill-records.ts`
  - `src/content/adapters/skill-adapter.ts`
  - `src/router/index.ts`
  - `src/app/main.ts`
- TypeScript context：
  - `tsconfig.app.json` governs `src/**/*` 与 `vite.config.ts`，并 extends `tsconfig.json`。
  - 关键选项：`strict: true`、`moduleResolution: Bundler`、`baseUrl: "."`、`paths: { "@/*": ["src/*"] }`、`types: ["vite/client", "node"]`、`lib: ["ES2022", "DOM", "DOM.Iterable"]`。
  - 相关声明：`src/env.d.ts` 提供 `*.yaml?raw` 和 `*.vue` 声明。

## API and Data Contracts

- 无远程 API。
- 权威合同源：
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
  - `src/types/content.ts`
  - `.github/workflows/deploy.yml`
- 直接消费与 adapter 边界：
  - YAML 原始字段由 `src/content/*` 读取。
  - 技能字段语义由 `src/content/adapters/skill-adapter.ts` 归一为 `SkillSummary` / `SkillDetail`。
  - 部署 workflow 不进入前端数据模型。
- 字段语义：
  - `status: archived` 的技能不进入公开列表和静态详情路由。
  - `usageExamples`、`tags`、`icon`、`changelog` 等可选字段继续按 adapter 现有语义归一。

## Context and Dependency Sources

- 当前模块 requirement 工件。
- 当前模块 architecture-design。
- `module-01` 的平台基础和内容读取决策。
- `module-02`、`module-03` 对公开页面数据消费的现有实现。
- GitHub Pages 分支发布约束。

## Edge Cases

- `BASE_PATH` 未设置：
  - 本地构建使用 `/`。
- `BASE_PATH=/skill-hub/`：
  - 资源路径和路由 base 使用项目子路径。
- 构建失败：
  - 不更新 `gh-pages`。
- 技能示例缺失可选字段：
  - adapter 归一后页面正常显隐。
- `archived` 示例技能：
  - 不出现在首页、列表页和静态详情路由。
- GitHub Pages 未在仓库设置中启用：
  - README 明确需要设置 source 为 `gh-pages` branch。

## Acceptance Criteria

1. `.github/workflows/deploy.yml` 在 `main` push 和手动触发时执行 Node 24、`npm ci`、`BASE_PATH=/<repo-name>/ npm run build`，并在成功后发布 `dist` 到 `gh-pages` 分支。
2. `vite.config.ts` 保持环境变量驱动的 `base` 配置，本地默认 `/`，GitHub Pages 构建可使用项目子路径。
3. `_data/config.yaml` 覆盖 PRD 默认分类，并可被现有 `loadSiteConfig()` 读取。
4. `_data/skills/*.yaml` 包含足够示例内容，覆盖公开技能、归档技能、详情页字段、使用示例和版本历史。
5. README 提供本地开发、验证、内容维护和 GitHub Pages 部署说明，且命令与仓库脚本一致。
6. `npm test`、`npm run typecheck`、`BASE_PATH=/skill-hub/ npm run build` 通过。
7. 构建产物不包含 GitHub Token、PAT 或其他部署凭据。

## Human Review and Handoff

- 需要用户审批当前模块 spec 后再进入 plan。
- 当前模块完成 verify / review 后，整个请求可进入 complete 检查。
- 如果用户要求保留 official Pages artifact deployment 而不是 `gh-pages` 分支发布，需要回到 spec 修订部署决策。

## Risks

- GitHub Pages 仓库设置无法完全由代码控制，最终启用 Pages source 可能需要维护者在 GitHub Settings 中确认。
- `gh-pages` 分支发布依赖 GitHub Actions token 权限，若仓库权限禁用 workflow 写入，需要用户在仓库设置中开启。
- 项目子路径若配置错误，静态资源可能在 Pages 上 404，必须用 `BASE_PATH=/skill-hub/ npm run build` 验证。
