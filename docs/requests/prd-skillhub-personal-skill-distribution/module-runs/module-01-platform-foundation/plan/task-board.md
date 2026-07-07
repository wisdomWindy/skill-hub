# Task Board

## T01

- 任务名称：工程与 TypeScript 骨架
- 状态：completed
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：`spec_approved=true`
- 关联规格区域：工程骨架初始化；TypeScript 上下文建立；Project Bootstrap and Scaffold Decision
- 覆盖功能单元：项目入口、tsconfig、Vite 配置、环境声明
- 页面/模块/容器范围：`package.json`、`vite.config.ts`、`tsconfig*.json`、`src/app/*`
- 整洁性约束或注意点：入口装配与业务逻辑分离；不要把未来页面逻辑写进基础入口
- 模式约束或抽象边界：不引入多余 service / manager
- 代码上下文或影响面备注：决定全项目 TS 与入口结构
- 关键交互与状态约束：无业务交互；重点是可运行与可扩展
- API 契约来源与类型策略：无远程 API；仅准备本地内容导入能力
- 测试切入点：类型检查；基础构建验证
- 待确认项或已批准假设：允许手动搭建等价脚手架

## T02

- 任务名称：公共壳层与主题系统
- 状态：completed
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：T01 完成
- 关联规格区域：公开站点共享壳层；主题系统
- 覆盖功能单元：布局、头部、主题切换、主题持久化
- 页面/模块/容器范围：`src/layouts/*`、`src/components/common/*`、`src/stores/*`、`src/assets/styles/*`
- 整洁性约束或注意点：主题状态单点所有权；样式 token 不混业务
- 模式约束或抽象边界：直接 store/composable，不引入事件总线
- 代码上下文或影响面备注：后续所有公开页面都复用
- 关键交互与状态约束：默认暗色；无本地偏好时跟随系统；切换后持久化
- API 契约来源与类型策略：无
- 测试切入点：主题偏好初始化与切换行为
- 待确认项或已批准假设：搜索入口先提供壳层占位，不在本模块实现完整搜索业务

## T03

- 任务名称：内容模型、Adapter 与查询入口
- 状态：completed
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：T01 完成
- 关联规格区域：内容数据读取与适配；领域查询入口；API and Data Contracts
- 覆盖功能单元：YAML 内容、原始类型、领域类型、adapter、查询函数
- 页面/模块/容器范围：`_data/*`、`src/content/*`、`src/types/*`、`src/features/skills/queries/*`
- 整洁性约束或注意点：所有语义归一必须在 adapter 层
- 模式约束或抽象边界：只允许轻量 Adapter + Query Module
- 代码上下文或影响面备注：决定后续页面是否需要模板兜底
- 关键交互与状态约束：无直接 UI；要求查询结果稳定可消费
- API 契约来源与类型策略：本地 YAML；原始类型与领域类型分层
- 测试切入点：adapter 默认值、published 过滤、详情查询、相关推荐
- 待确认项或已批准假设：安装量先按只读字段处理

## T04

- 任务名称：Markdown、SSG 与 GitHub Pages 兼容基座
- 状态：completed
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：T01 完成，T03 完成
- 关联规格区域：Markdown 与代码渲染基础能力；SSG 与 GitHub Pages 兼容基础
- 覆盖功能单元：Markdown 渲染器、XSS 过滤、代码高亮、公开路由、SSG 入口、部署工作流
- 页面/模块/容器范围：`src/utils/markdown/*`、`src/router/*`、`src/app/ssg.ts`、`vite.config.ts`、`.github/workflows/*`
- 整洁性约束或注意点：Markdown 工具不混入页面业务；`base` 策略集中管理
- 模式约束或抽象边界：不为静态构建再包一层无意义 service
- 代码上下文或影响面备注：直接影响最终 GitHub Pages 是否可用
- 关键交互与状态约束：无运行时后台交互；构建路径必须稳定
- API 契约来源与类型策略：无远程 API；构建期消费本地内容
- 测试切入点：Markdown 渲染测试；构建与路径验证
- 待确认项或已批准假设：GitHub Pages 仓库路径可能需要后续按真实仓库名补 `base`
