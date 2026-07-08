# 代码上下文

# TypeScript 上下文

- `tsconfig.app.json` extends `tsconfig.json`，作用域包含 `src/**/*` 和 `vite.config.ts`。
- 关键 compiler options：
  - `target`: `ES2022`
  - `module`: `ESNext`
  - `moduleResolution`: `Bundler`
  - `strict`: `true`
  - `jsx`: `preserve`
  - `baseUrl`: `.`
  - `paths`: `@/* -> src/*`
  - `types`: `vite/client`, `node`
  - `lib`: `ES2022`, `DOM`, `DOM.Iterable`
- 相关声明源：
  - `src/env.d.ts` 声明 `.vue` 与 `*.yaml?raw`
  - `src/types/content.ts`
  - `src/types/skill.ts`
  - `src/types/vendor.d.ts`

# 影响范围

- Vue 单文件组件中的模板文本和少量 computed fallback 文案。
- `_data/config.yaml` 和 `_data/skills/*.yaml` 中页面展示字段。
- 相关测试中的中文分类期望。

# 非目标范围

- 不改路由配置和数据加载逻辑。
- 不改 CSS、布局或交互结构。
- 不改安装命令、ID、枚举和分类 key。
