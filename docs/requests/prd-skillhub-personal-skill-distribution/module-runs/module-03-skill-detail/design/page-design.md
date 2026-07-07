# Page Design

## Delivery Unit Identifier

- Request: `prd-skillhub-personal-skill-distribution`
- Module: `module-03-skill-detail`

## Page Objective

让访客在详情页快速完成三件事：理解技能价值、确认版本与安装信息、复制安装命令开始使用。

## Target Users or Scenarios

- 从首页 / 列表页点击进入详情的访客
- 已经知道目标技能，需要复制安装命令的人
- 需要通过长文档、示例和版本历史判断技能是否适合自己的访客

## Layout Structure

- 顶部：
  - 面包屑
  - 技能标题区
- 主体双栏：
  - 左侧主内容区
  - 右侧侧栏转化区
- 左侧主内容区：
  - 图标、名称、版本、分类、更新时间
  - Markdown 详细描述
  - 使用示例
  - 参数 / 环境说明
- 右侧侧栏：
  - 安装命令高亮卡片
  - 复制按钮
  - 安装量 / 版本历史
  - 相关推荐

## Visual Hierarchy

- 第一焦点：标题区与安装命令卡片
- 第二焦点：详细描述与示例
- 第三焦点：版本历史、安装量、相关推荐

## Section Breakdown

- 面包屑导航
- 技能头图信息区
- 详细描述区
- 使用示例区
- 参数 / 环境说明区
- 安装命令卡片
- 版本历史区
- 相关推荐区

## Styling Direction

- 延续公开站点的玻璃卡片与薄荷绿强调色
- 侧栏转化卡片比普通信息卡更高对比、更醒目
- Markdown 阅读区保持舒适行宽，避免被侧栏挤压得过窄

## Interaction Skeleton

- 复制按钮点击后：
  - 写入剪贴板
  - 显示成功反馈
- 相关推荐点击后进入对应详情页
- 面包屑支持返回列表页

## Responsive Behavior

- 桌面：
  - 左右双栏
- 平板：
  - 仍可双栏，但侧栏宽度收窄
- 移动：
  - 侧栏转为主内容下方堆叠
  - 安装命令卡片上移到更靠前位置

## Design Risks

- 若移动端仍把安装命令卡片放得太靠后，会弱化转化路径
- 若版本历史和相关推荐与安装命令卡片争夺强调级别，会稀释主目标

## Open UI Questions

- 参数说明区先按“可选信息区”设计：有结构化数据就展示，没有则不强行插空
