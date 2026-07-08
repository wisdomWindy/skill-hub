# Architecture Design

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-04-static-delivery`

## Architecture Objective

补齐 SkillHub 纯静态 GitHub Pages 交付链路，使仓库内 YAML 内容、Vite SSG 构建产物、GitHub Actions 部署流程和项目级部署说明形成一条可维护、可验证、可回滚的静态发布路径。

## Architecture Scope and Triggers

- 作用域：
  - `_data/config.yaml` 与 `_data/skills/*.yaml` 的示例内容完整性
  - Vite / Vite SSG 的 GitHub Pages `base` 和静态资源路径策略
  - GitHub Actions 构建与 Pages 发布配置
  - README 中的本地开发、构建、部署与内容维护说明
- 触发条件：
  - `module-01` 已建立 Vite SSG 与 YAML 内容读取基础
  - `module-02` 和 `module-03` 已消费同一份静态技能数据
  - 当前仓库需要从可运行静态站点推进到可部署 GitHub Pages 站点

## Upstream Inputs and Assumptions

- 上游输入：
  - [request.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/request.md)
  - [prd-snapshot.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/artifacts/prd-snapshot.md)
  - [requirement-map.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/requirements/requirement-map.md)
  - [module-04-static-delivery.md](/Users/staff/Desktop/testProject/skill-hub/docs/requests/prd-skillhub-personal-skill-distribution/requirements/modules/module-04-static-delivery.md)
  - 现有工程文件：`vite.config.ts`、`.github/workflows/deploy.yml`、`package.json`、`_data/config.yaml`
- 关键假设：
  - 当前仍保持纯静态范围，不新增后台、认证、在线写仓库或运行时 GitHub Token
  - 仓库名为 `skill-hub`，GitHub Pages 项目路径默认为 `/skill-hub/`
  - 允许通过环境变量覆盖 `base`，以兼容项目页、自定义域名或本地预览

## Module Boundary Design

- `_data/`
  - 内容事实源，负责提供最小可展示示例技能和站点配置
  - 不承载构建脚本逻辑，不存放部署密钥
- `vite.config.ts`
  - 负责构建期 `base` 解析和 Vite SSG 构建约束
  - 不直接读取业务 YAML，也不写入部署状态
- `.github/workflows/deploy.yml`
  - 负责 CI 中安装依赖、执行构建、发布静态产物
  - 不把 GitHub Token 或部署凭据暴露给前端 bundle
- `README.md`
  - 负责面向维护者说明数据文件、命令、本地验证和 GitHub Pages 设置
  - 不代替可执行 workflow 配置

## File and Directory Structure

```text
skill-hub/
├── _data/
│   ├── config.yaml
│   └── skills/
│       ├── code-reviewer.yaml
│       └── pdf-parser.yaml
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── content/
│   │   ├── config/site-config.ts
│   │   └── skills/load-skill-records.ts
│   └── router/index.ts
├── README.md
├── package.json
└── vite.config.ts
```

## Code Relationship and Dependency Direction

- `_data/*` 只被 `src/content/*` 读取；页面和组件继续消费适配后的领域模型。
- `vite.config.ts` 只负责构建配置，向运行时代码提供 `import.meta.env.BASE_URL`。
- `src/app/main.ts` 已通过 `ViteSSG(..., { base: import.meta.env.BASE_URL })` 消费构建 base，本模块不把 base 逻辑散落到页面。
- `.github/workflows/deploy.yml` 只调用仓库脚本，不直接拼接页面路径或改写源码。
- README 记录维护流程，不能成为唯一的部署逻辑来源。

## Responsibility Split

- 内容示例责任：
  - `_data/config.yaml` 覆盖站点标题、描述、项目 base URL 语义和 PRD 默认分类
  - `_data/skills/*.yaml` 覆盖已发布技能、归档语义、详情字段、安装命令、示例、版本历史
- 构建配置责任：
  - `vite.config.ts` 统一处理 `BASE_PATH` / 默认 `/` 的资源路径
  - `package.json` 保持本地和 CI 使用相同脚本入口
- 部署责任：
  - GitHub Actions 监听 `main` push 和手动触发
  - 构建成功才发布新站点；构建失败不覆盖上一次成功站点
- 维护说明责任：
  - README 说明如何新增技能、如何本地验证、如何配置 GitHub Pages

## Function Design and Public Entrypoints

- `npm run build`
  - 本地和 CI 共同使用的静态构建入口。
- `BASE_PATH=/skill-hub/ npm run build`
  - 项目页构建入口，用于验证 GitHub Pages 子路径。
- `.github/workflows/deploy.yml`
  - CI 入口，负责 checkout、Node 版本、依赖安装、构建、上传和部署。
- `loadSkillRecords()`
  - 示例技能文件进入站点的唯一技能内容读取入口。
- `loadSiteConfig()`
  - 示例配置文件进入站点的唯一配置读取入口。

## State Ownership and Data Flow

- 内容变更流：
  - 维护者修改 `_data/config.yaml` 或 `_data/skills/*.yaml`
  - 提交到 `main`
  - GitHub Actions 构建静态产物
  - GitHub Pages 发布构建输出
- 运行期数据流：
  - 浏览器只加载静态 HTML、CSS、JS 和资源
  - 不请求后台接口，不写仓库，不读取任何部署凭据
- 构建失败流：
  - GitHub Actions job 失败
  - Pages 不接收新的成功部署
  - 线上继续保留上一版成功发布结果

## Data Structures and Type Strategy

- 继续复用已有类型：
  - `SiteConfigRecord`
  - `SkillRecord`
  - `SiteConfig`
  - `SkillSummary`
  - `SkillDetail`
- 示例 YAML 必须覆盖适配层已定义字段，不在页面侧用兜底分支补语义缺口。
- 若示例内容出现可选字段空值，仍必须由 `content/adapters` 归一，不能在部署模块引入新的页面级修正。
- `base` 不进入技能领域类型；它属于构建配置和站点配置语义，不成为技能数据字段。

## Contract and Adapter Boundaries

- 无运行时后端 API。
- 合同源：
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
  - `.github/workflows/deploy.yml`
  - `package.json` scripts
- 内容语义适配边界保持在 `src/content/adapters/*` 与 `src/content/config/*`。
- 部署语义边界保持在 GitHub Actions workflow；前端代码不感知 GitHub 凭据、环境名或发布分支细节。

## Pattern Decisions and Rejected Alternatives

- 采用：
  - 直接配置式交付：用 Vite `base`、npm scripts 和 GitHub Actions 原生步骤表达部署链路。
  - 轻量内容合同：以 YAML 示例文件作为静态内容合同，不新增 schema 生成器。
- 明确拒绝：
  - 不引入后台部署状态页或 GitHub API 轮询。
  - 不引入自定义部署脚本包装 GitHub Actions，除非后续 spec 证明官方 action 无法满足 `gh-pages` 分支要求。
  - 不把 `base` 路径硬编码到页面组件或路由跳转中。

## Readability and Maintenance Guardrails

- 部署配置只保留一条主路径，避免同时维护多套互相冲突的 Pages 发布方式。
- 若 PRD 的 `gh-pages` 分支发布要求与当前 official Pages artifact workflow 存在差异，必须在 spec 中明确选择和依据，不能让两种方式混用。
- README 中的命令必须和 `package.json`、workflow 实际命令一致。
- 示例内容必须足够覆盖首页、列表页、详情页和归档过滤，但不应膨胀成测试数据仓库。
- 构建路径配置必须可由环境变量覆盖，避免后续改自定义域名时大面积改源码。

## Architecture Risks

- PRD 写明部署到 `gh-pages` 分支，而当前 workflow 使用 GitHub Pages artifact 部署；后续 spec 必须明确是否改为 `gh-pages` 分支发布，或记录以官方 Pages workflow 等价满足“构建成功才发布”的原因。
- GitHub Pages 项目子路径会影响资源路径和 SSG 路由，需要在执行与验证阶段使用 `BASE_PATH=/skill-hub/` 构建确认。
- 示例 YAML 若字段覆盖不足，可能导致详情页或列表页只在少数路径可用，验证阶段必须检查公开页面消费路径。
- 远端 Pages 设置不完全由仓库代码控制，最终线上托管仍可能需要仓库 Settings 启用 Pages source。

## Open Architecture Questions

- 是否必须严格发布到 `gh-pages` 分支，还是接受 GitHub Pages official artifact deployment。倾向在 spec 中优先选择能被仓库 workflow 明确执行、构建失败不覆盖上一版的方案；若用户强制 `gh-pages` 分支，则执行阶段改用分支发布 action。
- 自定义域名当前未定；首版只预留 `BASE_PATH`，不新增 `CNAME`。
