# Module

## Module Identifier

- `module-03-skill-detail`

## Module Name

- 技能详情与转化区

## Source Snapshot

### 功能需求

- 展示大图标、名称、版本、分类、作者、最后更新时间
- 详细描述支持 Markdown 渲染，包含功能说明、使用场景、前置依赖、环境要求
- 安装命令高亮卡片展示，带复制按钮，复制成功后给出 Toast
- 参数配置说明列出环境变量、命令行参数与说明
- 使用示例展示 1 到 3 个典型代码块
- 版本历史按时间倒序展示
- 可选展示安装量与同分类相关技能推荐
- 自动生成 Open Graph 标签

### 验收标准

- 代码块正确语法高亮
- 点击复制后剪贴板成功写入安装命令并显示成功提示
- 详情页加载时间小于 800ms

### UI 设计要点

- 左侧主区域：面包屑、名称 / 版本 / 分类、详细描述、使用示例
- 右侧边栏：安装命令高亮卡片、版本历史、安装量

## Markdown-Normalized Snapshot

1. 主内容承担文档阅读
2. 右侧边栏承担转化与补充信息
3. 安装命令复制是核心转化动作
4. Markdown、语法高亮、相关推荐和分享元信息都属于详情页范围

## Source-Trace References

- `PRD.md` 第 6.2 节
- `PRD.md` 第 8.1 节 Skill 数据模型
- `PRD.md` 第 9.1 节详情页设计要点

## Business Intent

让访客在详情页完成理解技能价值、确认版本信息并复制安装命令的核心转化。

## User-Visible Scope

- 技能详情页
- 安装命令卡片
- 版本历史、参数说明、使用示例、相关推荐

## Forms, Tables, Displays, and Interactions

- Display：面包屑、图标、标题、版本、分类、作者、更新时间、版本历史、安装量
- Interaction：复制安装命令、跳转相关技能、代码块阅读
- State：复制成功、图标缺失兜底、安装量缺失、相关推荐不足 4 个时降级展示

## Workflow and State Rules

- 详情页只能展示已上架技能
- Markdown 内容需要支持完整渲染和 XSS 过滤
- 安装命令来自 Skill 数据模型中的 `installCommand`

## Dependencies and Impacted Neighbors

- 依赖 `module-01-platform-foundation` 的数据入口、Markdown 能力和共享布局
- 依赖 `module-02-public-discovery` 建立的公开浏览跳转入口

## Page-Design Routing Decision

- `page_design_required: true`
- 原因：PRD 对详情页主区与侧栏的视觉层级、转化区位置和内容组织有明确页面设计要求

## Downstream Spec Obligations

- 安装命令复制成功反馈不可丢失
- Markdown / 代码高亮 / 版本历史 / OG 元信息需要明确落位
- 详情页右侧转化卡片必须保持显著性

## Open Questions

- 参数配置说明是从结构化字段生成，还是先按 Markdown 内容渲染，需要在数据设计阶段明确
