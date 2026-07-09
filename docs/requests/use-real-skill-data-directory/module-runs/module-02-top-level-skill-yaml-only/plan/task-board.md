# 任务看板

| 任务 ID | 任务名称 | 状态 | 执行模式 | 执行说明 | 触发/前置条件 | 关联规格区域 | 覆盖功能单元 | 页面/模块/容器范围 | 整洁性约束或注意点 | 模式约束或抽象边界 | 代码上下文或影响面备注 | 关键交互与状态约束 | API 契约来源与类型策略 | 测试切入点 | 待确认项或已批准假设 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | 收紧生成脚本源文件发现规则 | 已完成 | 串行 | 只发现一级主 `SKILL.md` | 读取现有生成脚本 | 一级 skill YAML 生成 | 数据生成 | 脚本 | 过滤规则集中在发现阶段 | 不新增模式层 | `scripts/generate-real-skill-data.mjs` | 不生成 subskill YAML | 不涉及 API；Node ESM 脚本 | 生成数量检查 | 用户已批准只生成一级 skill |
| T2 | 重新生成数据并更新测试契约 | 已完成 | 串行 | 清理旧数据并重建，更新测试断言 | T1 完成 | 安装命令语义、内容加载契约 | 数据输出与测试 | `_data/real-skills`、Vitest | 不保留旧 subskill YAML | 不做运行时过滤 | `_data/real-skills/**`、`load-skill-records.test.ts` | records 不包含 subskill ID | `SkillRecord` YAML 本地数据 | `npm test` | 一级 skill 当前数量为 5 |
| T3 | 验证与收口 | 已完成 | 串行 | 执行测试、类型检查、构建并写 verify/review | T2 完成 | 全部验收标准 | 验证与工件 | 请求工件 | 证据必须可复查 | 不跳过失败项 | verification/review 工件 | 通过后 request complete | 不涉及 API | `npm test`、`npm run typecheck`、`BASE_PATH=/skill-hub/ npm run build` | 无 |
