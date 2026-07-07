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
