---
name: ai-video-production-framework-sound-music
description: Stage subskill for AI video sound and music. Use only when the main AI video framework routes a project to build dialogue, voice, effects, ambience, music, rights tracking, and mix readiness.
---

# Sound Music Subskill

## 触发场景

- 主 skill 在 `editorial-post` 通过后路由到 `sound-music`。
- 需要为 AI 视频添加对白、旁白、音效、环境声、音乐、混音或声音 QC。

## 必要输入

- `artifacts/edit-decision-log.md`
- `artifacts/delivery-spec.md`
- 当前剪辑版本
- 音乐、声音、配音、字幕和版权约束。

## 执行步骤

1. 建立声音需求表：对白、旁白、拟音、环境声、音乐、转场、静音点。
2. 检查声音权利：音乐授权、音效授权、声音克隆授权、演员或用户同意。
3. 对白和旁白优先保证可懂度、情绪准确、口型匹配和语言自然。
4. 音效和环境声必须服务空间、动作和情绪，不用无动机堆叠。
5. 音乐必须支持节奏和情绪转折，不掩盖对白和关键信息。
6. 按交付规格建立响度、峰值、声道、静音头尾和版本要求。
7. 将无法通过混音解决的口型、节奏或剧情问题回退到剪辑或生成阶段。

## 输出格式

- `artifacts/sound-music-log.md`
- 更新 `artifacts/asset-manifest.md`
- 带声音的 review cut 或音频交付说明
- 更新 `state.json`

## 验收标准

- 对白、旁白和关键信息清楚可懂，没有爆音、削波、明显噪声或突兀跳变。
- 音乐、音效和环境声均有来源或授权状态记录。
- 漫剧版本在移动设备外放下仍能理解对白和重点音效。
- 电影级版本具备合理声场、空间感、动态控制和情绪支撑。
- 声音问题没有掩盖画面、节奏或口型的上游缺陷。

## 安全边界

- 不能使用未授权音乐、声音克隆或受保护音频。
- 不能用大音量音乐遮盖对白或生成缺陷。
- 不能在未满足交付响度假设时宣称可发布。
