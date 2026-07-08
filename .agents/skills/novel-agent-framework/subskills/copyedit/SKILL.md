---
name: novel-agent-framework-copyedit
description: Stage subskill for copyedit. Perform post-line-edit language consistency, naming consistency, style-sheet alignment, and sentence-level cleanup before final proofread.
---

# Copyedit Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `copyedit` 阶段时使用。

## 必要输入

- `manuscript/full-draft.md`
- `artifacts/continuity-ledger.md`
- `artifacts/revision-log.md`
- `artifacts/style-sheet.md`
- `state.json`

## 执行步骤

1. 先读：
   - `../../references/templates/copyedit-log.md`
   - `../../references/templates/style-sheet.md`
2. 只做 copyedit 级编辑：
   - 句法硬伤
   - 语气与文体一致性
   - 名词统一
   - 时间线与设定表面矛盾
   - 人名、地名、称谓、瞳色、伤势等一致性
   - style sheet 合规性
3. 按模板将发现与修改记录写入 `artifacts/copyedit-log.md`。
4. 如 style sheet 缺失或明显不足，先补齐再继续。
5. 如果发现的是故事级或结构级问题，记录 blocker 并回退，不在本阶段硬修。
6. 更新 `manuscript/full-draft.md`。
7. 通过时把 `state.json.stage` 推进到 `proofread`。

## 输出格式

- 必须产出：
  - `artifacts/copyedit-log.md`
  - 更新后的 `manuscript/full-draft.md`

## 验收标准

- copyedit 级 blocker 已清零，不再存在会阻止进入 `proofread` 的命名、称谓、术语、句法或风格一致性硬伤。
- `style-sheet.md` 中已锁定的命名、称谓、标点、对白格式、日期数字写法与 register 约束已真正落实到正文，而不是局部抽样合规。
- `continuity-ledger.md` 与 `revision-log.md` 涉及的表层一致性问题已被吸收、关闭，或被明确登记为 residual issues 并说明为何不构成 blocker。
- 未把故事级、结构级或 line-polish 级问题误压成 copyedit 已完成；一旦存在此类问题，必须记录 blocker 并阻止放行。
- `copyedit-log.md` 已按模板形成完整 handoff，至少包含：
  - 已处理问题类型
  - 残留问题
  - blocker 状态
  - 给 `proofread` 的交接提醒
- 文本进入 `proofread` 时，应已处于“只剩终校级表层处理”的状态，而不是仍需大量 sentence-level 或 consistency-level 修整。

## 安全边界

- 不能在本阶段重写大段剧情。
- 不能把严重结构问题偷偷压成字句级修订。
