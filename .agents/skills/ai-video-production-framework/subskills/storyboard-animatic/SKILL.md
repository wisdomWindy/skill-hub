---
name: ai-video-production-framework-storyboard-animatic
description: Stage subskill for AI video storyboard and animatic planning. Use only when the main AI video framework routes a project to convert script and look bible into shot-by-shot boards, timing, camera language, and edit rhythm.
---

# Storyboard Animatic Subskill

## 触发场景

- 主 skill 在 `look-development` 通过后路由到 `storyboard-animatic`。
- 下游发现镜头顺序、视线、跳轴、空间关系、节奏或表演 beat 不清。

## 必要输入

- `artifacts/script-breakdown.md`
- `artifacts/look-bible.md`
- `artifacts/delivery-spec.md`
- `artifacts/continuity-ledger.md`
- `references/storyboard-script-format.md`

## 执行步骤

1. 先读取 `references/storyboard-script-format.md`，按其中格式产出分镜脚本。
2. 为每个镜头建立独立生成单元，必须包含：镜头编号、起止时间、阶段功能、画面提示词、生成模式、分层资产、配音文案、字幕、音效/音乐、运镜/剪辑、生成约束、验收要点。
3. 同步产出机器可解析 `storyboard-script.jsonl`；每一行对应一个镜头，字段必须完整，JSON 必须可逐行解析。
4. 为每个镜头选择 `generation_mode`：普通镜头用 `integrated_scene`；连续角色、复用背景、前后景遮挡、商业修订、镜头运动或多语言替换需求高的镜头用 `layered_composite`；已有参考资产时用 `reference_driven`。
5. 对所有 `layered_composite` 或 `reference_driven` 的连续角色镜头，在 `layered_assets` 中写入角色资产 `asset_id`、`type`、`path`、`role`，并在 `visual_prompt` 中显式引用同一个角色资产 ID 和路径。
6. 设计镜头连续性：轴线、视线、屏幕方向、入出画、道具位置、时空关系、角色身份、服装、光线变化。
7. 设定每镜时长和段落节奏，形成 animatic timing；确保时间段连续、不重叠，且 `duration=end-start`。
8. 对漫剧项目优先验证竖屏构图、表情可读、字幕避让、强钩子和段尾悬念。
9. 对电影级项目验证镜头组、情绪推进、镜头动机、剪辑点和声画关系。
10. 标记高风险 AI 镜头：复杂手部、群演、打斗、口型、品牌、文字、连续运动。
11. 将不可执行镜头回退到剧本或视觉开发调整。

## 输出格式

- `artifacts/storyboard-animatic.md`
- `artifacts/storyboard-script.md`
- `artifacts/storyboard-script.jsonl`
- `artifacts/shot-list.md`
- 更新 `artifacts/continuity-ledger.md`
- 更新 `state.json`

## 验收标准

- 每个需要生成或剪辑的镜头都有镜号、起止时间、阶段功能、构图、运动、时长、声音意图、画面提示词、生成模式、分层资产、配音文案、字幕和生成约束。
- `artifacts/storyboard-script.md` 使用 `镜头<N>｜<start>-<end>s｜<阶段功能>` 结构，且每镜头均有 `画面提示词`、`生成模式`、`分层资产`、`配音文案`、`字幕`、`音效/音乐`、`运镜/剪辑`、`生成约束`、`验收要点`。
- `artifacts/storyboard-script.jsonl` 每行是一个合法 JSON 对象，字段完整，可被批量生成脚本逐行读取。
- JSONL 每个镜头必须声明 `generation_mode`，且 `layered_composite` 或 `reference_driven` 镜头必须列出所需分层资产或参考资产。
- 所有 `layered_composite` 或 `reference_driven` 的连续角色镜头，必须在 `layered_assets` 中提供角色资产 ID、路径和用途，并在 `visual_prompt` 中显式引用同一角色资产 ID/路径。
- 每条 `visual_prompt` 都达到可直接投喂视频/图像生成模型的粒度，而不是短句概括。
- 镜头顺序支持故事和情绪推进，没有未解释的空间跳跃或跳轴风险。
- 漫剧版本在手机观看下能读懂人物关系、冲突和字幕。
- 电影级版本具备镜头动机、节奏变化、视觉连续性和可剪辑性。
- 高风险 AI 镜头有替代方案或明确返工策略。

## 安全边界

- 不能只有文字剧情而没有镜头级计划。
- 不能用简陋 shot list 代替可直接生成的分镜脚本。
- 不能把人物背景是否分层的问题留给生成阶段临时判断。
- 不能只写“同一人物”“参考女主”而不引用具体角色资产 ID/路径。
- 不能把画面提示词、配音文案、字幕、音效或生成约束留给下游临时补写。
- 不能把不可生成的镜头留给生成阶段碰运气。
- 不能用漂亮单帧代替可剪辑的镜头组。
