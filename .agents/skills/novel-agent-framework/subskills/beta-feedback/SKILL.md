---
name: novel-agent-framework-beta-feedback
description: Stage subskill for beta feedback. Simulate or organize external reader-style feedback focused on boredom, confusion, emotional payoff, and market fit.
---

# Beta Feedback Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `beta-feedback` 阶段时使用。

## 必要输入

- `artifacts/market-positioning.md`
- `artifacts/chapter-plan.md`
- `artifacts/revision-log.md`
- `manuscript/full-draft.md`
- `state.json`

## 执行步骤

1. 以目标读者视角而不是作者视角审查文本。
2. 先读：
   - `../../references/templates/beta-feedback.md`
3. 先明确反馈来源类型：
   - 真实试读者
   - 编辑/同行作者
   - 目标读者模拟
4. 记录每轮反馈的最小元信息：
   - 反馈来源
   - 读者画像
   - 样本数量
   - 阅读范围
   - 收集方式
   - 是否覆盖开头、关键转折、中段、高潮、结尾
5. 重点检查：
   - 哪些段落无聊
   - 哪些地方困惑
   - 哪些角色缺少吸引力
   - 哪些情绪高潮没有兑现
   - 作品是否偏离目标市场期待
6. 按模板结构在 `artifacts/beta-feedback.md` 中记录：
   - blocking reader issues
   - non-blocking reader issues
   - strongest hooks
   - weakest stretches
   - market mismatch notes
   - feedback-source summary
   - synthesis rule（如何把重复意见归并成问题簇）
7. 若本轮只有 `目标读者模拟` 而没有任何外部来源：
   - 记录为 `simulation-only`
   - 不得将本阶段视为满足 industry-standard 的 beta gate
   - 除非用户明确接受该例外，否则保持 gate 未通过
8. 对每个 blocker 标明建议回退阶段，回退目标必须是可修复阶段，如：
   - `structural-revision`
   - `scene-design`
   - `chapter-planning`
   - `drafting`
9. 只有在以下条件全部满足时，才可推进到 `line-polish`：
   - 重大故事级问题已处理或已明确接受风险
   - 反馈来源与归并规则可追溯
   - 存在至少一类外部反馈来源，或已记录用户批准的 simulation-only 例外
   - 覆盖度足以对整部作品或当前交付范围做出有效判断
10. 通过时把 `state.json.stage` 推进到 `line-polish`。

## 输出格式

- 必须产出：
  - `artifacts/beta-feedback.md`

## 验收标准

- 已从读者体验而非作者自我感觉出发提出反馈。
- 反馈来源、读者画像、样本范围和归并规则清晰可追溯。
- 已标明每个 blocker 的修复方向。
- 重大故事级问题未被带入润色阶段。
- 若无用户批准例外，至少存在一类外部反馈来源。
- 反馈覆盖度已足以覆盖当前交付范围，至少明确说明是否覆盖开头、关键转折、中段、高潮与结尾。
- 反馈样本充分性已被明确说明：
  - 样本足以支撑当前结论，或
  - 样本不足且相关结论被标记为 provisional，不得冒充稳定 gate
- 只有当覆盖度与样本充分性足以支撑当前交付范围时，才允许将 beta gate 视为通过。
- `beta-feedback.md` 已按模板沉淀为可追溯反馈工件。

## 安全边界

- 不能把 beta feedback 写成笼统好评。
- 不能只挑语病而忽略阅读体验问题。
- 不能把内部自评伪装成真实外部反馈而不标注来源。
- 不能在只有内部模拟反馈的情况下默认宣称已满足行业化 beta gate。
