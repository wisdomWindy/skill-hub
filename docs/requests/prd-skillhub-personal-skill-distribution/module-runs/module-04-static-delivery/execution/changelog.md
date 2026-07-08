# Execution Changelog

## Delivery Unit

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-04-static-delivery`
- Stage: `execute`

## Summary

完成 module-04 已批准计划中的 6 个执行任务，收敛 GitHub Pages 分支发布链路，补齐静态内容样例和维护文档，并新增测试锁定静态交付合同。

## Task Execution Record

### M04-T01 测试先行锁定静态内容与部署合同

- 新增 `src/content/config/site-config.test.ts`，断言 PRD 默认 6 个分类。
- 新增 `src/content/skills/load-skill-records.test.ts`，断言多个 published 示例、至少一个 archived 示例，并验证分类与配置一致。
- 新增 `src/router/index.test.ts`，断言 published 技能生成静态详情路由、archived 技能不生成静态详情路由。
- 新增 `src/test/static-delivery-workflow.test.ts`，断言 workflow 使用 `npm ci`、`BASE_PATH` 和 `gh-pages` 分支发布。
- Red 证据：首次 `npm test` 失败，暴露 workflow 仍为 artifact Pages、分类只有 3 个、published 示例不足 3 个。

### M04-T02 收敛 GitHub Actions 到 `gh-pages` 分支发布

- 更新 `.github/workflows/deploy.yml`：
  - `permissions.contents` 改为 `write`
  - 依赖安装改为 `npm ci`
  - 保留 `BASE_PATH=/${{ github.event.repository.name }}/`
  - 使用 `peaceiris/actions-gh-pages@v4` 发布 `./dist` 到 `gh-pages`
  - 移除 official Pages artifact deployment 主流程

### M04-T03 补齐站点配置与示例技能内容

- 更新 `_data/config.yaml`，补齐 PRD 默认分类：
  - 开发工具
  - 数据处理
  - DevOps
  - 安全
  - 办公自动化
  - 其他
- 新增 `_data/skills/deploy-watch.yaml` 作为 published DevOps 示例。
- 新增 `_data/skills/secret-scanner.yaml` 作为 archived Security 示例。
- 示例命令未包含真实 token、PAT、私有密钥或部署凭据。

### M04-T04 确认 GitHub Pages base 与静态路由构建

- 保留 `vite.config.ts` 的 `process.env.BASE_PATH || '/'` 策略。
- 确认 `src/app/main.ts` 继续通过 `import.meta.env.BASE_URL` 传入 Vite SSG base。
- 使用 `rg` 检查 `/skill-hub/` 只出现在 README 说明中，没有进入 `src` 或 `vite.config.ts`。
- `BASE_PATH=/skill-hub/ npm run build` 通过，渲染 5 个静态页面：
  - `/`
  - `/skills`
  - `/skills/pdf-parser`
  - `/skills/deploy-watch`
  - `/skills/code-reviewer`

### M04-T05 补齐 README 维护与部署说明

- 更新 `README.md`，说明：
  - 项目纯静态范围
  - 本地开发命令
  - 测试、typecheck、普通构建与 GitHub Pages 子路径构建命令
  - `_data/config.yaml` 与 `_data/skills/*.yaml` 内容维护方式
  - `published` / `archived` 状态语义
  - GitHub Pages source 与 Actions 写权限设置
  - 不提交 token、PAT、私有密钥或真实凭据

### M04-T06 执行验证并记录执行工件

- `npm test`：通过，7 files / 17 tests。
- `npm run typecheck`：通过。
- `BASE_PATH=/skill-hub/ npm run build`：通过。
- 构建产物敏感内容扫描：
  - 首次宽泛扫描因 `pat` 子串命中过多普通代码文本，不作为有效结果。
  - 收窄为 `github_token|github_pat|ghp_[A-Za-z0-9]|secrets\\.GITHUB_TOKEN|private key|personal access token` 后无命中。
- 构建仍有既有 chunk size warning，记录为非阻塞。

## Deviations

- 未执行真实远端 GitHub Pages 发布；远端仓库 Pages source 与 Actions 写权限需由维护者在 GitHub Settings 中确认。
- 未新增自定义域名或 `CNAME`，符合 spec 的 out-of-scope 决策。

## Clean-Code Notes

- 未新增部署 service / manager / runtime status store。
- 内容语义继续通过现有 adapter / query / route 边界消费，未在页面层加入临时兜底。
- workflow 只保留一条主部署链路，避免双发布路径漂移。
