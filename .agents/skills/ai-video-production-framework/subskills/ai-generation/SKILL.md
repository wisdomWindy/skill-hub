---
name: ai-video-production-framework-ai-generation
description: Stage subskill for AI video generation. Use only when the main AI video framework routes a project to generate, select, repair, and log AI shots while enforcing continuity, rights, and technical quality controls.
---

# AI Generation Subskill

## 触发场景

- 主 skill 在 `production-planning` 通过后路由到 `ai-generation`。
- 需要批量生成、重生成、挑选或修复 AI 镜头、图像、口型、旁白或辅助素材。

## 必要输入

- `artifacts/production-plan.md`
- `artifacts/storyboard-script.jsonl`
- `artifacts/shot-list.md`
- `artifacts/look-bible.md`
- `artifacts/asset-manifest.md`
- `artifacts/continuity-ledger.md`

## 执行步骤

1. 按 `storyboard-script.jsonl` 和生产计划逐镜生成，不跳过日志记录。
2. 对 `integrated_scene` 镜头，整体生成完整画面或视频段，并检查人物、背景、光影和字幕安全区是否一次性成立。
3. 对 `layered_composite` 镜头，先生成或确认背景、人物、道具、前景、文字板等分层资产，再合成镜头；每层和合成结果都要记录版本。
4. 对 `reference_driven` 镜头，先确认参考资产有效，再记录参考图、参考帧或角色表与生成结果的对应关系。
5. 对所有涉及连续角色的 `layered_composite` 或 `reference_driven` 镜头，生成前必须确认 `visual_prompt` 显式引用的角色资产 ID/路径与 `layered_assets` 中的角色资产一致；不一致或缺失时回退到 `storyboard-animatic`。
6. 每个版本记录工具、模型、`visual_prompt`、`negative_prompt`、`generation_mode`、分层资产、seed 或可复现参数、参考资产、配音文案、字幕文案、生成时间和筛选结果。
7. 先做关键镜头和高风险镜头测试，再扩展到普通镜头。
8. 按镜头验收检查角色一致性、服化道、空间、动作、口型、字幕区域、画面稳定和版权风险。
9. 对失败镜头先诊断原因：剧本问题、分镜问题、视觉 bible 问题、生成模式选择错误、角色资产引用缺失或错误、提示词问题、工具能力问题或后期可修问题。
10. 将可修镜头进入重生成、分层重做、局部修复或合成修复；不可修镜头回退到对应上游阶段。
11. 只把通过单镜标准的素材放入 `selected` 或可剪辑素材池。

## 输出格式

- `artifacts/generation-log.md`
- 更新 `artifacts/asset-manifest.md`
- 更新 `artifacts/continuity-ledger.md`
- `outputs/review-cuts/` 中的镜头预览或镜头包说明
- 更新 `state.json`

## 验收标准

- 每个交付镜头都有可追溯版本记录和选择理由。
- 生成结果能追溯回 `storyboard-script.jsonl` 的对应 `shot_id` 和 `generation_mode`，且画面、配音、字幕没有脱离该镜头脚本。
- `layered_composite` 镜头的每个资产层和最终合成版本均可追溯，且人物与背景的光影、比例、透视和边缘融合通过检查。
- 连续角色镜头的生成日志必须记录实际使用的角色资产 ID 和路径，并与 `visual_prompt`、`layered_assets` 一致。
- 通过镜头没有阻断级 AI 缺陷：身份断裂、严重闪烁、肢体异常、文字乱码、空间崩坏、口型不可接受。
- 镜头组在角色、服装、光线、场景、方向和动作上可连续剪辑。
- 漫剧镜头在移动端能清楚读到人物、表情、冲突和字幕空间。
- 电影级镜头具备可接受的运动可信度、构图、镜头质感和情绪表演。

## 安全边界

- 不能把未通过单镜 QC 的素材放入最终剪辑素材池。
- 不能为了省事把已标记为 `layered_composite` 或 `reference_driven` 的镜头改成整体生成，除非回退并更新分镜脚本与生产计划。
- 不能在角色资产 ID/路径缺失或与提示词不一致时继续生成连续角色镜头。
- 不能伪造生成参数、授权状态或可复现性。
- 不能用生成工具限制当借口，掩盖需要回退分镜或视觉开发的问题。
