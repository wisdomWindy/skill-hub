# Task Board - module-05-tailwind-style-refactor

| 任务 ID | 任务名称 | 状态 | 执行模式 | 执行人或执行说明 | 触发/前置条件 | 关联规格区域 | 覆盖功能单元 | 页面/模块/容器范围 | 整洁性约束或注意点 | 模式约束或抽象边界 | 代码上下文或影响面备注 | 关键交互与状态约束 | API 契约来源与类型策略 | 测试切入点 | 待确认项或已批准假设 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T05-01 | Tailwind 依赖与 Vite 样式链路接入 | completed | 串行 | Codex 执行 | plan approval | In Scope / Acceptance Criteria | Tailwind 构建入口 | package / Vite / main.css | 不使用伪 Tailwind | 不引入 CSS-in-JS | 影响 package、lockfile、vite config | 无交互变更 | 无 API；TypeScript 受 `tsconfig.json` governs | build | 已批准假设：使用真实 Tailwind CSS |
| T05-02 | 全局样式边界与主题 token 收敛 | completed | 串行 | Codex 执行 | T05-01 完成 | Function-Complete / Design Constraints | 主题 token、Markdown、基础 reset | `src/assets/styles/main.css` | 全局 CSS 只保留必要边界 | 不把旧 scoped CSS 全量搬家 | 影响全站视觉基础 | 主题切换语义不变 | 无 API | build / 主题检查 | 已批准假设：全局 CSS 文件允许存在 |
| T05-03 | 公共布局与通用组件迁移 | completed | 串行 | Codex 执行 | T05-02 完成 | 页面与布局组件 / 样式禁用项 | Header、Footer、ThemeToggle | `src/layouts`、`src/components/common` | 删除 SFC style，类名保持可读 | 不新增 style helper | 影响全局导航和主题入口 | 导航和主题切换行为不变 | 无 API | typecheck / scan | 无 |
| T05-04 | 首页、列表页与发现组件迁移 | completed | 串行 | Codex 执行 | T05-03 完成 | 首页与技能列表 | Hero、搜索、筛选、卡片、分页 | `HomeView`、`SkillsView`、skill list components | 不改查询和分页逻辑 | 不引入新状态层 | 影响公开发现主链路 | 搜索、筛选、排序、分页不变 | 无 API；adapter 不变 | existing tests / scan | 无 |
| T05-05 | 技能详情页与转化组件迁移 | completed | 串行 | Codex 执行 | T05-04 完成 | 技能详情与转化组件 / Edge Cases | 详情、安装命令、Markdown、版本、相关推荐 | `SkillDetailView`、detail components、`.markdown-body` | 不改 sanitize / renderer 行为 | 不做 AST class 注入器 | 影响详情页核心转化区 | 复制安装命令反馈不变 | 无 API；数据模型不变 | existing tests / build / scan | 已批准假设：Markdown 生成 HTML 由全局样式承接 |
| T05-06 | 禁用项扫描与完整回归验证 | completed | 串行 | Codex 执行 | T05-01 至 T05-05 完成 | Acceptance Criteria | 扫描、typecheck、test、build | 全仓相关前端文件 | 任一禁用项命中即阻塞 | 不跳过失败验证 | 影响 verification evidence | 行为回归失败需回到 execute | 无 API | `rg` / typecheck / test / build | 无 |
