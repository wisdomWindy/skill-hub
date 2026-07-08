# Task Board

## Module

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-04-static-delivery`
- Stage: `plan`

| 任务 ID | 任务名称 | 状态 | 执行模式 | 执行人或执行说明 | 触发/前置条件 | 关联规格区域 | 覆盖功能单元 | 页面/模块/容器范围 | 整洁性约束或注意点 | 模式约束或抽象边界 | 代码上下文或影响面备注 | 关键交互与状态约束 | API 契约来源与类型策略 | 测试切入点 | 待确认项或已批准假设 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `M04-T01` | 测试先行锁定静态内容与部署合同 | completed | 串行 | 主执行者；先 red 后 green | module-04 plan 批准后 | AC3, AC4, AC6, AC7 | 配置分类、示例技能、归档过滤、静态详情路由 | `src/content/*`, `src/router/index.ts`, tests | 测试断言业务合同，不绑定组件细节 | 不新增测试专用业务分支 | 读取 `loadSiteConfig`, `loadSkillRecords`, `routes` | archived 不公开消费 | `_data/*`, `src/types/content.ts`；复用现有类型 | 新增 config / content / route 测试 | Red 证据已记录，最终通过 |
| `M04-T02` | 收敛 GitHub Actions 到 `gh-pages` 分支发布 | completed | 串行 | 主执行者 | `M04-T01` 完成 | AC1, AC7 | main push、npm ci、BASE_PATH 构建、gh-pages 发布 | `.github/workflows/deploy.yml` | 只保留一条主发布路径 | 直接配置式部署；不新增部署 manager | 已替换 artifact Pages 主流程 | 构建失败不发布 | workflow 是部署合同；无前端类型 | 静态检查 workflow + 后续构建验证 | 远端 Actions 写权限需用户在 GitHub Settings 确认 |
| `M04-T03` | 补齐站点配置与示例技能内容 | completed | 串行 | 主执行者 | `M04-T01` 完成 | AC3, AC4, AC7 | 6 个默认分类、published 示例、archived 示例、详情字段 | `_data/config.yaml`, `_data/skills/*.yaml` | YAML 最小充足，不塞无关 mock | 继续走 adapter，不页面兜底 | 影响首页、列表页、详情页和静态路由 | published 展示；archived 隐藏 | `_data/*` + `SkillRecord` | 内容合同测试、构建 | `site.baseUrl` 保持空字符串 |
| `M04-T04` | 确认 GitHub Pages base 与静态路由构建 | completed | 串行 | 主执行者 | `M04-T02`, `M04-T03` 完成 | AC2, AC6 | BASE_PATH、本地默认 `/`、SSG 路由 | `vite.config.ts`, `src/app/main.ts`, `src/router/index.ts` | 不在页面硬编码 `/skill-hub/` | base 只属于构建配置 | 构建路径影响所有静态资源 | 项目子路径构建通过 | 无 API；TS context 按 `tsconfig.app.json` | `BASE_PATH=/skill-hub/ npm run build` | `/skill-hub/` 仅出现在 README |
| `M04-T05` | 补齐 README 维护与部署说明 | completed | 串行 | 主执行者 | `M04-T02`-`M04-T04` 完成 | AC5 | 开发、验证、内容维护、Pages 设置、安全提示 | `README.md` | 文档命令必须与实际脚本一致 | README 不替代 workflow | 面向维护者交接 | 无运行时交互 | 说明 `_data/*` 合同，不新增类型 | 人工检查 + 命令一致性检查 | 远端 Pages source 需用户设置为 `gh-pages` branch |
| `M04-T06` | 执行验证并记录执行工件 | completed | 串行 | 主执行者 | `M04-T01`-`M04-T05` 完成 | AC1-AC7 | changelog、测试、typecheck、build、敏感信息检查 | execution / verification / review 输入 | 记录证据，不写空泛结论 | 不伪造远端发布成功 | 影响最终 complete 判断 | 失败回 execute | 无 API | `npm test`, `npm run typecheck`, `BASE_PATH=/skill-hub/ npm run build` | 远端发布只记录人工检查点，不冒充本地已验证 |
