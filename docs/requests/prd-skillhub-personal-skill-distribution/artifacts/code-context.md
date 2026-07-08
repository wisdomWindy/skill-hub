# Code Context

## context requirement

- 需要原因：`module-03-skill-detail` 是建立在现有详情页占位实现上的增量改造，涉及页面容器、查询层、Markdown 渲染、路由和新增子组件边界；如果不先固定现有结构，执行阶段容易把页面编排、数据消费和复制副作用混在一起。
- 首次要求阶段：`plan`
- 是否必须依赖 code graph：否，优先使用；当前仓库规模较小，可接受文本搜索回退。

## graph availability check

- repository graph status：`missing`
- detection method：检查仓库内 `.codegraph` 与 `codegraph*` 痕迹文件
- tool or runtime found：未发现现成 code graph 配置或产物
- check timestamp or iteration context：`loop.iteration=19`

## installation or bootstrap record

- attempted：`no`
- installer or bootstrap method：未执行
- result：`not_needed`
- output summary：当前改动集中在单一详情页入口、查询 helper 与少量组件新增；文本搜索已足够恢复结构
- next step：执行阶段继续依赖 `rg`/局部源码阅读确认最终改动点

## fallback record

- fallback used：`yes`
- fallback method：`rg --files` + 入口文件阅读 + 现有测试文件审阅
- why fallback was needed：仓库内没有现成 code graph 产物，且当前模块影响面仍然可由轻量搜索完整覆盖
- residual confidence or remaining blind spots：对详情页容器、查询 helper、Markdown 渲染和路由边界把握较高；复制反馈的最终实现形态仍需在执行阶段结合组件代码细化

## relevant entrypoints

- 用户入口：
  - `src/router/index.ts`
  - `src/views/HomeView.vue`
  - `src/views/SkillsView.vue`
  - `src/views/SkillDetailView.vue`
- 内部执行入口：
  - `src/features/skills/queries/skill-queries.ts`
  - `src/content/adapters/skill-adapter.ts`
  - `src/utils/markdown/render-markdown.ts`

## key symbols and modules

- 直接影响模块：
  - `src/views/SkillDetailView.vue`
  - `src/features/skills/queries/skill-queries.ts`
  - `src/features/skills/components/*` 中将新增的详情页组件
  - `src/types/skill.ts`
- 关键符号：
  - `getSkillById`
  - `listRelatedSkills`
  - `renderMarkdown`
  - `SkillDetail`
  - `SkillSummary`

## dependency and side-effect boundaries

- 所有技能内容继续来自 `_data/skills/*.yaml`，并经 `src/content/adapters/skill-adapter.ts` 归一为 `SkillDetail` / `SkillSummary`
- 详情页容器负责：
  - 读取详情数据
  - 组织布局
  - 设置页面标题
- Markdown 渲染副作用边界保持在 `renderMarkdown`
- 剪贴板写入属于显式副作用，只允许落在安装命令卡片内部，不扩散到页面容器
- 查询层继续负责相关推荐与详情数据选择，不在模板层追加业务过滤规则

## impact scope

- likely changed files or symbol clusters：
  - `src/views/SkillDetailView.vue`
  - `src/features/skills/components/InstallCommandCard.vue`
  - `src/features/skills/components/SkillDetailMeta.vue`
  - `src/features/skills/components/SkillRelatedList.vue`
  - `src/features/skills/components/SkillVersionHistory.vue`
  - `src/features/skills/queries/skill-queries.ts`
  - 相关测试文件
- likely verification surface：
  - 相关推荐规则
  - 详情页 SEO 标题回退
  - Markdown 占位与显隐逻辑
  - 复制成功 / 失败反馈
- likely regression-sensitive neighbors：
  - 首页 / 列表页跳转详情链路
  - 共享 Markdown 样式
  - 公共卡片与分类文案展示

## open follow-up checks

- 当前 `installCount` 适配后是 number；执行阶段需按计划中的已批准假设处理“0 是否展示”规则，避免在模板层临时猜测。
- 若执行阶段发现现有详情页样式与移动端堆叠差距过大，需要在不改变数据边界的前提下回到页面容器布局细化。

---

# Code Context Addendum: module-04-static-delivery

## context requirement

- 需要原因：`module-04-static-delivery` 会改动 GitHub Actions、静态内容样例、构建 base 配置与 README。虽然不涉及复杂运行时代码，但会影响内容读取、静态路由生成和部署链路，需要在计划阶段固定影响范围。
- 首次要求阶段：`plan`
- 是否必须依赖 code graph：否。当前模块主要是配置、YAML 内容和少量测试补强；文本搜索与入口文件阅读足够。

## graph availability check

- repository graph status：`missing`
- detection method：沿用前序检查，仓库内未发现可用 `.codegraph` 或 codegraph 产物。
- tool or runtime found：未发现现成 code graph 配置或产物。
- check timestamp or iteration context：`loop.iteration=27`

## installation or bootstrap record

- attempted：`no`
- installer or bootstrap method：未执行。
- result：`not_needed`
- output summary：当前模块不需要跨大量符号调用关系追踪；影响面可由 workflow、Vite config、YAML 读取入口和现有测试直接恢复。
- next step：执行阶段继续使用 `rg` / 局部文件阅读确认最终改动点。

## fallback record

- fallback used：`yes`
- fallback method：读取 `.github/workflows/deploy.yml`、`vite.config.ts`、`package.json`、`README.md`、`_data/*`、`src/content/*`、`src/router/index.ts`、相关测试。
- why fallback was needed：没有现成 code graph，且当前配置与内容影响面较小。
- residual confidence or remaining blind spots：对 GitHub Actions 与本地构建可验证；真实 GitHub Pages 仓库 Settings 和 workflow token 写权限需要用户在远端确认。

## relevant entrypoints

- 用户/维护者入口：
  - `README.md`
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
  - `.github/workflows/deploy.yml`
- 内部执行入口：
  - `vite.config.ts`
  - `package.json`
  - `src/content/config/site-config.ts`
  - `src/content/skills/load-skill-records.ts`
  - `src/content/adapters/skill-adapter.ts`
  - `src/router/index.ts`

## key symbols and modules

- 直接影响模块：
  - `.github/workflows/deploy.yml`
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
  - `README.md`
  - 测试文件，如 `src/content/config/site-config.test.ts`、`src/router/router.test.ts` 或同等覆盖点
- 关键符号：
  - `loadSiteConfig`
  - `loadSkillRecords`
  - `buildPublishedSkillSummaries`
  - `getSkillById`
  - `routes`

## dependency and side-effect boundaries

- GitHub Actions 是唯一部署副作用边界。
- `vite.config.ts` 只负责构建 base，不读取业务 YAML。
- `_data/*` 是内容事实源，经 `src/content/*` 与 adapter 归一后进入页面。
- `status: archived` 的过滤规则由查询层和静态路由生成入口拥有，README 只说明维护规则。

## impact scope

- likely changed files or symbol clusters：
  - `.github/workflows/deploy.yml`
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
  - `README.md`
  - 内容 / 路由相关测试
- likely verification surface：
  - PRD 默认分类可读取
  - published / archived 示例内容过滤
  - `BASE_PATH=/skill-hub/ npm run build`
  - workflow 使用 `npm ci` 并发布 `dist` 到 `gh-pages`
- likely regression-sensitive neighbors：
  - 首页 / 列表页分类筛选
  - 详情页静态路由生成
  - Vite SSG 构建输出资源路径

## open follow-up checks

- 执行阶段若选用第三方 `gh-pages` 发布 action，必须确保 workflow 权限包含 `contents: write`，且 README 提醒仓库 Pages source 选择 `gh-pages` 分支。
- 执行阶段不得把 GitHub Token、PAT 或任何密钥写入 `_data`、README 示例命令或前端 bundle。
