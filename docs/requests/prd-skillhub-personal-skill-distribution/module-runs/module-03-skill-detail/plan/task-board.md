# Task Board

## T01

- 任务名称：详情页容器与头部元信息骨架
- 状态：pending
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：`module-03 spec_approved=true`
- 关联规格区域：详情元信息区；页面标题与 SEO；技能不存在缺失态
- 覆盖功能单元：面包屑、标题区、双栏容器、缺失态、页面标题
- 页面/模块/容器范围：`SkillDetailView.vue`、`router/index.ts`
- 整洁性约束或注意点：页面容器只做数据编排，不承接复制副作用
- 模式约束或抽象边界：不引入详情页 store；优先局部组件拆分
- 代码上下文或影响面备注：是所有详情区块的挂载基础
- 关键交互与状态约束：技能不存在时主内容提示且侧栏依赖区块不渲染
- API 契约来源与类型策略：复用 `getSkillById` 与 `SkillDetail`
- 测试切入点：标题回退、静态详情页构建、缺失态逻辑
- 待确认项或已批准假设：面包屑至少返回 `/skills`

## T02

- 任务名称：Markdown 内容区与使用示例区
- 状态：pending
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：T01 完成
- 关联规格区域：Markdown 详细描述区；使用示例区；参数 / 环境说明区
- 覆盖功能单元：元信息字段、Markdown 渲染、示例区显隐、参数说明约束
- 页面/模块/容器范围：`SkillDetailView.vue`、`SkillDetailMeta.vue`
- 整洁性约束或注意点：不在模板层伪造参数区或修补数据语义
- 模式约束或抽象边界：继续复用 `renderMarkdown`
- 代码上下文或影响面备注：直接影响详情阅读体验与缺失态清晰度
- 关键交互与状态约束：示例为空整区隐藏；Markdown 缺失显示说明占位
- API 契约来源与类型策略：复用 `SkillDetail`；`usageExamples` 继续由 adapter 归一
- 测试切入点：示例显隐、Markdown 占位、安装量展示规则
- 待确认项或已批准假设：`installCount <= 0` 视为当前无有效展示值

## T03

- 任务名称：安装命令卡片、版本历史与相关推荐
- 状态：pending
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：T01、T02 完成
- 关联规格区域：安装命令卡片；版本历史区；相关推荐区
- 覆盖功能单元：复制按钮、复制反馈、changelog 显隐、相关推荐裁剪
- 页面/模块/容器范围：`InstallCommandCard.vue`、`SkillVersionHistory.vue`、`SkillRelatedList.vue`、`SkillDetailView.vue`
- 整洁性约束或注意点：副作用只留在安装命令卡片；相关推荐规则只在查询层定义一次
- 模式约束或抽象边界：不引入全局 toast；不引入额外 store
- 代码上下文或影响面备注：直接决定详情页转化路径是否清晰
- 关键交互与状态约束：复制成功 / 失败都需即时反馈；无 changelog / related 时整区隐藏
- API 契约来源与类型策略：安装命令与 changelog 来自 `SkillDetail`；相关推荐来自 `listRelatedSkills`
- 测试切入点：相关推荐边界规则；可测复制 helper 的 success / failure
- 待确认项或已批准假设：反馈落在卡片局部，不依赖全局消息系统

## T04

- 任务名称：查询补强、验证留痕与回归
- 状态：pending
- 执行模式：串行
- 执行人或执行说明：Codex 执行
- 触发/前置条件：T01-T03 完成
- 关联规格区域：Acceptance Criteria 1-5；Edge Cases；Human Review and Handoff
- 覆盖功能单元：相关推荐规则测试、类型检查、构建验证、verify/review 工件
- 页面/模块/容器范围：`skill-queries.ts`、`skill-queries.test.ts`、模块 verify/review 文档
- 整洁性约束或注意点：验证失败要回到 execute，不能靠文档解释
- 模式约束或抽象边界：测试优先对准规格行为，不绑死模板细节
- 代码上下文或影响面备注：为模块关闭提供可复查证据
- 关键交互与状态约束：不新增任何产品行为
- API 契约来源与类型策略：继续以本地 YAML + adapter 为唯一合同源
- 测试切入点：`npm test`、`npm run typecheck`、`npm run build`
- 待确认项或已批准假设：详情页真实技能路由产物应在构建结果中可见
