# Clarifications

## Question

当前部署链路应使用 GitHub Pages official artifact deployment，还是严格发布到 `gh-pages` 分支？

## Answer

模块需求明确写到 GitHub Actions 构建并部署到 `gh-pages` 分支，GitHub Pages 从 `gh-pages` 分支托管站点。现有仓库 workflow 使用的是 official Pages artifact deployment，与该模块交付口径不一致。

## Final Decision

当前模块 spec 采用 `gh-pages` 分支发布作为首版交付合同。执行阶段应收敛为一条主部署链路：`main` push 构建，成功后发布 `dist` 到 `gh-pages`，构建失败不覆盖旧站点。

## Affected Spec Area

- Function-Complete Behavior Breakdown / GitHub Actions 静态部署
- Design Constraints
- Acceptance Criteria

## Question

首版是否需要配置自定义域名？

## Answer

上游需求和用户澄清只要求 GitHub 仓库驱动的纯静态 GitHub Pages 站点，未给出自定义域名。

## Final Decision

首版不新增 `CNAME` 文件。通过 `BASE_PATH` 预留项目页和未来自定义域名的路径配置能力。

## Affected Spec Area

- In Scope
- Out of Scope
- Edge Cases

## Question

README 中应要求维护者使用哪组验证命令？

## Answer

当前仓库已经有 `npm test`、`npm run typecheck`、`npm run build`，GitHub Pages 项目路径还需要显式验证 `BASE_PATH=/skill-hub/ npm run build`。

## Final Decision

README 写明本地开发、常规构建和项目子路径构建命令；CI 由于存在 `package-lock.json`，使用 `npm ci` 保证安装可重复。

## Affected Spec Area

- Function-Complete Behavior Breakdown / README 维护说明
- Acceptance Criteria
