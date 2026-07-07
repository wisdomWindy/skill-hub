# Module

## Module Identifier

- `module-04-static-delivery`

## Module Name

- GitHub Pages 静态交付与内容示例

## Source Snapshot

### 功能与部署约束

- 技能数据以 YAML 文件格式存储在 `_data/skills/` 目录下，每个技能一个文件。
- 站点配置存储在 `_data/config.yaml` 中。
- GitHub Actions 监听 `main` 分支的 push 事件，自动触发 Vite 静态站点构建并部署到 `gh-pages` 分支。
- GitHub Pages 从 `gh-pages` 分支托管站点，对外提供服务。
- 构建失败时自动保留上一次成功构建的站点。

### 静态生成策略

- 使用 `vite-ssg` 插件，在构建时读取 `_data/skills/*.yaml`，为每个技能生成独立详情页。
- 公开页面完全静态生成。

## Markdown-Normalized Snapshot

1. 站点内容由仓库中的 YAML 数据驱动
2. 构建阶段完成静态页面生成
3. GitHub Actions 负责部署到 GitHub Pages
4. 交付物需要包含最小示例内容和可运行部署配置

## Source-Trace References

- `PRD.md` 第 6.4 节
- `PRD.md` 第 7.2 节
- `PRD.md` 第 10.4 节

## Business Intent

让 SkillHub 作为一个纯静态站点稳定地从仓库内容构建并发布到 GitHub Pages，降低后续维护和部署成本。

## User-Visible Scope

- 部署后的公开站点可访问
- 示例技能内容可在首页、列表页、详情页被静态消费

## Forms, Tables, Displays, and Interactions

- Display：构建出的静态页面
- Interaction：无运行时后台交互；主要是构建期内容装载与部署流程
- State：构建成功、构建失败保留旧版本

## Workflow and State Rules

- 内容修改通过 Git 仓库提交触发
- `main` 为源分支，`gh-pages` 为部署分支
- 站点运行期不依赖服务端接口

## Dependencies and Impacted Neighbors

- 依赖 `module-01-platform-foundation` 的工程骨架和数据读取能力
- 为 `module-02-public-discovery` 与 `module-03-skill-detail` 提供真实可消费的静态内容来源

## Page-Design Routing Decision

- `page_design_required: false`
- 原因：该模块以构建、部署与静态内容交付为核心，不以页面布局决策为中心

## Downstream Spec Obligations

- 明确 GitHub Actions 与 GitHub Pages 的交付链路
- 明确 YAML 示例内容、构建输入和部署输出位置
- 明确在 GitHub Pages 环境下的 `base` 和静态路径处理约束

## Open Questions

- 仓库最终 GitHub Pages 部署路径是否为自定义域名或项目子路径，需要在实现中预留 `base` 配置能力
