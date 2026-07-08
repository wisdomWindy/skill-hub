# 请求标识

- request_id: localize-pages-zh
- 来源: 用户在 Codex 中直接提出“把当前项目中所有页面的文本改成中文”

# 业务摘要

当前 SkillHub 前端页面存在英文展示文案和部分乱码中文。需要将首页、技能列表页、技能详情页、公共页眉页脚、技能卡片/空状态/分页/安装命令/相关技能/版本记录等页面可见文本统一改为中文。

# 目标声明

所有页面向用户展示的静态文案、站点配置文案、示例技能展示数据和相关测试期望值改为可读中文；品牌名、路由、命令、ID、状态枚举、代码标识符等机器字段保持稳定。

# 初始完成信号

- 页面和组件中可见英文文案已中文化。
- `_data` 中用于页面展示的名称、描述、标签、变更记录等用户可见字段已中文化。
- 已修复现有乱码中文。
- 测试、类型检查和构建通过，或记录无法执行的原因。

# 触发条件

用户明确要求当前项目所有页面文本改为中文。

# 初始上下文来源

- 用户当前请求
- `src/views/**/*.vue`
- `src/components/**/*.vue`
- `src/features/skills/components/**/*.vue`
- `_data/config.yaml`
- `_data/skills/*.yaml`
- `tsconfig.json`
- `tsconfig.app.json`
- `src/env.d.ts`
- `src/types/*.ts`

# 人工交接点

交付时说明修改范围、验证命令结果和任何残留风险。

# 影响范围

- 前端 Vue 页面与组件的可见文案
- 页面 SEO title / fallback 文案
- 示例技能 YAML 数据
- 与中文标签相关的单元测试

# 参与模块

- module-01-localize-visible-copy
