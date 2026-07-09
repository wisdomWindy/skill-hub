# 执行记录

## 交付单元

- request_id: use-real-skill-data-directory
- module_id: module-02-top-level-skill-yaml-only

## 已完成任务

- T1：将 `scripts/generate-real-skill-data.mjs` 的源发现逻辑从递归扫描全部 `SKILL.md` 改为只扫描 `.agents/skills/<skill>/SKILL.md`。
- T2：更新 `src/content/skills/load-skill-records.test.ts`，断言只生成一级 skill 记录，不存在 subskill YAML，不返回 subskill ID，安装命令不指向 `subskills` 文件。
- T2：运行 `node scripts/generate-real-skill-data.mjs` 重新生成 `_data/real-skills`，输出 5 条一级 skill YAML。
- T3：完成测试、类型检查与 GitHub Pages BASE_PATH 构建验证。

## TDD 证据

- 先更新测试到新契约后运行 `npm test`，预期失败：
  - 加载结果仍为 40 条而不是 5 条。
  - `_data/real-skills/frontend-agent-framework/subskills/verify/SKILL.yaml` 仍存在。
  - 仍存在指向 `/subskills/` 的安装命令。
- 修改生成器并重新生成数据后再次运行 `npm test`，7 个测试文件、19 个测试全部通过。

## 关键实现决策

- 过滤规则放在源文件发现阶段，由 `findTopLevelSkillFiles()` 只返回一级目录中的 `SKILL.md`。
- 每次生成前继续清理整个 `_data/real-skills`，确保旧 subskill YAML 不残留。
- `installCommand` 始终来自主 skill 的目录路径，例如 `本地路径：.agents/skills/frontend-agent-framework`。
- 不新增运行时过滤层，避免数据目录与页面展示契约不一致。

## 偏差

- 无。
