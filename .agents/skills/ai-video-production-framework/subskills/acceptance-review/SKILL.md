---
name: ai-video-production-framework-acceptance-review
description: Stage subskill for AI video final acceptance. Use only when the main AI video framework routes a QC-complete project to decide pass, fail, rollback, accepted risk, or final completion.
---

# Acceptance Review Subskill

## 触发场景

- 主 skill 在 `qc-delivery` 通过后路由到 `acceptance-review`。
- 用户要求判断 AI 视频是否达到漫剧、电影级、上线或交付标准。

## 必要输入

- `artifacts/creative-brief.md`
- `artifacts/delivery-spec.md`
- `artifacts/qc-report.md`
- `artifacts/delivery-manifest.md`
- `artifacts/accepted-risks.md`
- 最终 review cut、master 或交付包说明。

## 执行步骤

1. 对照 brief、delivery spec 和行业标准建立最终验收表。
2. 逐项检查：故事目标、格式目标、视觉目标、AI 缺陷、剪辑、声音、调色、字幕、版权、技术交付。
3. 对漫剧项目单独检查首钩、段落推进、移动端可读、字幕、人物关系和结尾压力。
4. 对电影级项目单独检查镜头语言、连续性、表演可信、声画关系、调色统一和母版质量。
5. 对每项给出 `pass`、`fail`、`blocker` 或 `accepted-risk`。
6. 有 blocker 时回退到最早能修复的阶段；有 major 风险时要求修复或显式记录用户接受。
7. 全部通过后更新 `state.json.loop.state=complete`。

## 输出格式

- `artifacts/acceptance-review.md`
- 更新 `artifacts/accepted-risks.md`
- 更新 `state.json`

## 验收标准

- 最终结论不是泛泛评价，而是逐项对应项目目标和行业标准。
- 无未解决 blocker；major 缺陷已修复或在 accepted risks 中被明确接受。
- 最终交付包、版本号、规格和用途与 delivery manifest 一致。
- 漫剧或电影级专项验收有明确 pass/fail 证据。
- `state.json` 只有在明确通过时才进入 `complete`。

## 安全边界

- 不能把“基本可以”“观感不错”写成最终通过。
- 不能替用户接受版权、平台或质量风险。
- 不能绕过 QC 报告直接宣布完成。
