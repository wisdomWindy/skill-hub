# Execution Changelog

## Iteration 1

- 接收用户对 `plan` 的批准。
- 将当前模块状态从 `plan` 推进到 `execute`。
- 开始执行平台基础模块：
  - 工程与 TypeScript 骨架
  - 公共壳层与主题系统
  - 内容模型、adapter 与查询入口
  - Markdown、SSG 与 GitHub Pages 兼容基座

## TDD / Verification Notes

- 优先为 adapter / query 逻辑与主题逻辑增加测试。
- 若依赖安装阶段受网络限制，先完成代码与测试文件落地，再在拿到权限后执行安装和验证。

## Iteration 2

- 创建了工程骨架与 TypeScript 配置：
  - `package.json`
  - `tsconfig.json`
  - `tsconfig.app.json`
  - `vite.config.ts`
  - `index.html`
  - `src/app/main.ts`
- 建立了公共壳层与主题系统：
  - `src/layouts/PublicLayout.vue`
  - `src/components/common/*`
  - `src/stores/theme.ts`
  - `src/assets/styles/main.css`
- 建立了内容模型、adapter 与查询入口：
  - `_data/config.yaml`
  - `_data/skills/*.yaml`
  - `src/content/**/*`
  - `src/features/skills/queries/skill-queries.ts`
  - `src/types/*`
- 建立了 Markdown、SSG 与 GitHub Pages 基座：
  - `src/utils/markdown/render-markdown.ts`
  - `src/router/index.ts`
  - `.github/workflows/deploy.yml`

## Iteration 3

- 安装依赖并执行验证：
  - `npm install`
  - `npm test`
  - `npm run typecheck`
  - `npm run build`
- 首轮暴露的问题：
  - 缺少 `@types/node`
  - `@unhead/vue` 的入口引用错误
  - `markdown-it` / `sanitize-html` 缺少类型声明
  - 技能详情静态路由尚未被预渲染
- 修正措施：
  - 新增 `@types/node`
  - 改为从 `@unhead/vue` 直接引入 `createHead`
  - 增加 `src/types/vendor.d.ts`
  - 在 `src/router/index.ts` 中根据已发布技能生成静态详情路由

## Final Outcome

- `npm test` 通过：3 个测试文件，7 个测试用例
- `npm run typecheck` 通过
- `npm run build` 通过
- 构建产物成功生成：
  - `dist/index.html`
  - `dist/skills.html`
  - `dist/skills/pdf-parser.html`
  - `dist/skills/code-reviewer.html`
- 已知非阻塞风险：
  - 当前客户端包体较大，Vite 给出了 chunk size warning；属于后续模块优化项，不阻塞基础模块验收
