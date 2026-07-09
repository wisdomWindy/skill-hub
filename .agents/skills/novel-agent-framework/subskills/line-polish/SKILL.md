---
name: novel-agent-framework-line-polish
description: Stage subskill for line polish. Improve prose, rhythm, dialogue, and specificity without changing locked story logic.
---

# Line Polish Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `line-polish` 阶段时使用。

## 必要输入

- `manuscript/full-draft.md`
- `artifacts/revision-log.md`
- `artifacts/genre-and-readership.md`
- `artifacts/market-positioning.md`
- `artifacts/beta-feedback.md`
- `artifacts/style-sheet.md`
- `artifacts/accepted-risks.md`
- `state.json`

## 执行步骤

1. 先读 `artifacts/beta-feedback.md`，确认 beta gate 已通过，或 simulation-only 例外已由用户批准并记录到 `artifacts/accepted-risks.md`。
2. 只处理语言层面：
   - 展示而非告知
   - 句式节奏
   - 对白辨识度
   - 重复词与拗口表达
   - 画面感与感官细节
   - 段落起落与叙述张力
3. 润色时必须同时遵守：
   - `market-positioning.md` 中的目标读者、平台节奏、钩子密度与文风承诺
   - `style-sheet.md` 中的 narration mode、POV policy、diction register、dialogue formatting 与 naming conventions
4. 对 beta 反馈中与语言、对白、节奏、情绪兑现相关的非结构问题逐项吸收或记录不采纳理由。
5. 若发现当前文本只有靠改变叙事模式、POV policy 或市场调性才能“润色成功”，视为上游问题并回退，不在本阶段硬修。
6. 不修改已锁定的大结构，除非记录为 blocker 并回退。
7. 更新 `manuscript/full-draft.md`。
8. 在 `artifacts/revision-log.md` 中记录主要润色方向。
9. 通过时把 `state.json.stage` 推进到 `copyedit`。

## 输出格式

- 必须产出：
  - 更新后的 `manuscript/full-draft.md`
  - 更新后的 `artifacts/revision-log.md`

## 验收标准

- 语言质量与目标读者预期更一致。
- 没有用润色掩盖结构缺陷。
- 已为终校阶段留下相对稳定文本。
- `beta-feedback.md` 中可由 line edit 处理的读者体验问题已被吸收、关闭，或记录了明确的不采纳依据。
- 文本已显式符合 `style-sheet.md` 中的 narration mode、POV policy、diction register 与 dialogue formatting 要求。
- 文本已显式兑现 `market-positioning.md` 中的文风、节奏与读者承诺，而不只是“写得更顺”。

## 安全边界

- 不能在本阶段偷偷改剧情大逻辑。
- 不能把风格化写作变成晦涩或空泛堆砌。
- 不能脱离 `style-sheet` 与 `market-positioning` 另起一套文风标准。
