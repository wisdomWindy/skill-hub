---
name: novel-agent-framework-proofread
description: Stage subskill for proofread. Perform the final typo, punctuation, formatting, and surface-consistency pass after copyedit.
---

# Proofread Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `proofread` 阶段时使用。

## 必要输入

- `manuscript/full-draft.md`
- `artifacts/style-sheet.md`
- `artifacts/continuity-ledger.md`
- `artifacts/copyedit-log.md`
- `state.json`

## 执行步骤

1. 先读：
   - `../../references/templates/proofread-log.md`
   - `../../references/templates/style-sheet.md`
2. 只做 proofread 级处理：
   - 错别字
   - 标点
   - 空格、格式、章节标题样式
   - 遗漏字、重复字、重复标点
   - copyedit 后残留的表层一致性问题
3. 终校时必须对照 `style-sheet.md` 与 `continuity-ledger.md` 逐项核对至少以下敏感项：
   - 人名、地名、称谓、头衔
   - 时间锚点与日期顺序
   - 伤势、疤痕、物品持有、关系温度等 continuity-sensitive attributes
   - 章节标题、标点、对话格式、数字与日期写法
4. 按模板将发现与修改记录写入 `artifacts/proofread-log.md`。
5. 如果发现的是 copyedit 级或更高层问题，记录 blocker 并回退，不在本阶段硬修。
6. 更新 `manuscript/full-draft.md`。
7. 通过时把 `state.json.stage` 推进到 `acceptance-review`。

## 输出格式

- 必须产出：
  - `artifacts/proofread-log.md`
  - 更新后的 `manuscript/full-draft.md`

## 验收标准

- 不再存在阻止进入最终验收的 proofread blocker。
- `proofread-log.md` 已按模板完成最终 handoff 记录，且记录了仍存在的 residual issues 或明确记录为 none。
- `style-sheet.md` 与 `continuity-ledger.md` 中的关键敏感项已完成逐项终校核对，不只是抽样检查。
- 人名、称谓、章节标题、对话格式、日期数字写法、时间锚点、伤势与物品状态等高敏感项已完成最终一致性确认。
- 未把 copyedit 或结构问题误当作终校问题处理。
- 文本可进入最终验收，且不会因明显表层错误或已知一致性问题而在最后一轮被轻易打回。

## 安全边界

- 不能在本阶段改写剧情逻辑。
- 不能把 copyedit 级一致性问题伪装成 proofread 已通过。
