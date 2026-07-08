# 来源摘要

用户直接要求“把当前项目中所有页面的文本改成中文”。本请求不是外部 PRD 驱动，当前消息作为稳定需求源。

# 关键业务目标

- 将 SkillHub 全站页面展示语言统一为中文。
- 修复已有乱码中文。
- 保持非展示性机器字段稳定，避免破坏路由、筛选、安装命令和数据加载。

# 显式行为约束

- 改用户可见文本，不改业务流程。
- 保留 SkillHub 品牌名。
- 保留 skill `id`、category `key`、status、installCommand、路由名、测试中用于逻辑匹配的英文查询样例等机器语义。
- 示例技能的 `name`、`shortDesc`、`fullDesc`、`usageExamples.title`、`tags`、`changelog` 属于页面展示文本，需要中文化。

# 表单、列表、展示与交互提取

- 首页：搜索框 placeholder、浏览按钮、分类入口、最新技能区、空状态。
- 技能列表页：页面标题、搜索框、排序下拉、分类侧栏、结果摘要、空状态、重置按钮。
- 技能详情页：面包屑、详情区、示例区、缺失状态、返回入口、安装命令卡片、版本记录、相关技能。
- 公共组件：页眉当前页面标签、全技能入口、禁用搜索占位文案、主题切换按钮、页脚。
- 分页：上一页、下一页与 aria label。

# 工作流和状态规则

- 本次只做静态文案本地化，不新增 API 或持久化状态。
- 复制安装命令交互保留原行为，仅反馈文案中文化。
- 搜索、筛选、排序、分页逻辑保持不变。

# 相关页面或模块

- `src/views/HomeView.vue`
- `src/views/SkillsView.vue`
- `src/views/SkillDetailView.vue`
- `src/components/common/*`
- `src/features/skills/components/*`
- `_data/config.yaml`
- `_data/skills/*.yaml`

# 上游开放问题

- 无阻断问题。品牌名 SkillHub、安装命令和技术缩写默认保留。
