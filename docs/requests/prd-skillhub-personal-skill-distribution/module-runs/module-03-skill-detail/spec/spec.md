# Spec

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-03-skill-detail`

## Background and Goals

`module-02` 已经把访客成功带到详情页入口。当前模块的目标是把详情页从基础静态展示升级成真正的转化页：既能完整阅读技能说明，也能清晰复制安装命令，并获得相关推荐与版本上下文。

## In Scope

- 详情页完整布局
- 安装命令高亮卡片
- 复制安装命令交互与成功反馈
- 元信息区、Markdown 详情、使用示例、版本历史、相关推荐
- 详情页 SEO / 标题

## Out of Scope

- 后台编辑能力
- 远程安装量上报
- 结构化参数模型的大范围扩展

## Trigger and Start Conditions

- `module-02` 已完成并通过 review
- 当前模块按 `page-design -> architecture-design -> spec` 顺序进入

## Requirement Split Summary

- 来源模块：`module-03-skill-detail`
- 承接技能详情页的转化区与补充信息展示
- 继续复用 `module-01` 的详情查询与 Markdown 渲染能力

## User Flow

1. 访客从首页 / 列表页点击技能卡片进入详情页
2. 详情页展示技能元信息和完整文档
3. 访客在右侧安装命令卡片中复制安装命令
4. 复制成功后看到明确反馈
5. 访客可继续查看相关推荐或版本历史

## Page and Module Design

- 页面结构：
  - 顶部面包屑与标题区
  - 左主右侧双栏
- 左侧主内容：
  - 名称、版本、分类、更新时间
  - Markdown 详细描述
  - 使用示例
  - 参数 / 环境说明（可选）
- 右侧侧栏：
  - 安装命令卡片
  - 安装量 / 版本历史
  - 相关推荐

## Function-Complete Behavior Breakdown

### 1. 详情元信息区

- 展示字段：
  - 图标
  - 名称
  - 版本
  - 分类
  - 最后更新时间
  - 安装量（有值则展示）
- 图标缺失时使用统一占位

### 2. Markdown 详细描述区

- 使用 `renderMarkdown`
- 支持标题、列表、链接、代码块
- 代码块需要保留高亮
- 数据缺失时显示可理解的占位说明，而不是空白区

### 3. 使用示例区

- 数据来源：
  - `usageExamples`
- 展示规则：
  - 每个示例展示标题和代码块
  - 无示例时整个区块隐藏

### 4. 参数 / 环境说明区

- 首版规则：
  - 若当前数据模型没有结构化参数字段，则不强制生成伪参数表
  - 需要参数说明时，优先由 Markdown 详情内容承载
- 页面层不得自行解析 Markdown 文本伪造参数字段

### 5. 安装命令卡片

- 展示：
  - 安装命令代码块
  - 复制按钮
- 交互：
  - 点击复制按钮时调用剪贴板写入
  - 写入成功后显示成功反馈
  - 写入失败后显示失败反馈
- loading：
  - 无额外 loading，保持轻量即时反馈

### 6. 版本历史区

- 首版规则：
  - 优先展示 `changelog` Markdown 内容
  - 无 `changelog` 时隐藏版本历史区

### 7. 相关推荐区

- 数据来源：
  - `listRelatedSkills`
- 规则：
  - 最多 4 个
  - 不包含当前技能自身
  - 不足 4 个按实际数量展示

### 8. 页面标题与 SEO

- 页面标题包含技能名
- 若技能不存在，标题回退为通用详情页标题

## Design Constraints

- 详情页不得在模板中临时拼接数据语义兜底
- 复制交互局限在安装命令卡片，不散到页面容器
- 当前无结构化参数字段时，不为满足 P1 说明而伪造参数模型

## Project Bootstrap and Scaffold Decision

- 继续复用现有工程骨架与详情页路由
- 当前模块只增强已有详情页结构，不重写路由与内容入口

## Change Axes and Pattern Decision

- 变化轴：
  - 是否存在 `usageExamples`
  - 是否存在 `changelog`
  - 是否存在相关推荐
  - 复制命令成功 / 失败反馈
- 采用：
  - 轻量展示组件拆分
- 拒绝：
  - 不引入详情页专用 store
  - 不引入全局 toast 系统作为首版必需项

## Code Context and Impact Assumptions

- 依赖：
  - `getSkillById`
  - `listRelatedSkills`
  - `renderMarkdown`
- 当前模块会直接影响站点转化效率

## API and Data Contracts

- 无远程 API
- 数据合同继续复用 `_data/skills/*.yaml`
- `SkillDetail` 提供：
  - `fullDesc`
  - `installCommand`
  - `usageExamples`
  - `changelog`
  - 元信息字段

## Context and Dependency Sources

- `module-03` requirement 文档
- `module-03` page-design / architecture-design
- 现有 `SkillDetailView.vue` 与查询层实现

## Edge Cases

- 技能不存在时：
  - 展示缺失提示
  - 标题回退
- `usageExamples` 为空时隐藏示例区
- `changelog` 为空时隐藏版本历史区
- 相关推荐不足 4 个时降级展示
- 剪贴板写入失败时显示失败反馈

## Acceptance Criteria

1. 详情页展示完整的技能元信息与 Markdown 说明。
2. 安装命令卡片清晰可见，并支持复制。
3. 复制成功后有明确反馈；失败时也有反馈。
4. 使用示例、版本历史、相关推荐按数据是否存在正确显隐。
5. 详情页标题与内容对技能详情场景友好。

## Human Review and Handoff

- 需要用户审批当前模块 spec 后再进入 plan。
- 当前模块完成后，`module-04-static-delivery` 可专注构建发布与收尾交付。

## Risks

- 若后续需要真正结构化参数区，可能要扩展 YAML 数据模型；当前先不越权改合同
- 复制反馈若过于简陋，后续可以在不改数据边界的前提下补强视觉表现
