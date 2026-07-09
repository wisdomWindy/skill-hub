---
name: ai-video-production-framework-color-finishing
description: Stage subskill for AI video color and finishing. Use only when the main AI video framework routes a project to match shots, manage color, finish graphics, prepare masters, and make the video technically ready for QC.
---

# Color Finishing Subskill

## 触发场景

- 主 skill 在 `sound-music` 通过后路由到 `color-finishing`。
- 需要调色、镜头匹配、画面修复、字幕图形收尾、母版准备或技术封装前处理。

## 必要输入

- 已锁定或准锁定剪辑版本
- `artifacts/delivery-spec.md`
- `artifacts/look-bible.md`
- `artifacts/edit-decision-log.md`
- `artifacts/sound-music-log.md`

## 执行步骤

1. 确认 picture lock 或记录未锁定风险。
2. 建立色彩管理假设：目标色域、gamma、监看环境、输出格式。
3. 做镜头匹配：曝光、对比、白平衡、肤色或角色色、场景氛围、夜景/日景逻辑。
4. 清理 finishing 问题：边缘、闪烁、字幕、图形、logo、片头片尾、黑场、帧边界。
5. 对漫剧项目确保手机屏幕上人物脸、字幕、关键动作和品牌信息清楚。
6. 对电影级项目确保 look 统一、镜头组过渡自然、动态范围和黑位受控。
7. 输出 QC 前 master 或 review master，并记录导出参数。

## 输出格式

- `artifacts/color-finishing-log.md`
- 更新 `artifacts/delivery-manifest.md`
- `outputs/masters/` 或待 QC master 说明
- 更新 `state.json`

## 验收标准

- 镜头之间没有明显非叙事性的曝光、色温、饱和度或对比跳变。
- 角色肤色或角色主色稳定，未出现 AI 生成导致的非故意漂移。
- 字幕、图形、logo、片头片尾和安全区符合 delivery spec。
- 输出参数、色彩假设、版本号和母版路径可追溯。
- 漫剧可在手机端清楚观看；电影级版本具备统一 look 和可进入 QC 的母版质量。

## 安全边界

- 不能用调色掩盖身份漂移、动作崩坏或剧本问题。
- 不能在 picture lock 未确认时覆盖最终母版。
- 不能忽略目标平台或发行方的色彩和编码要求。
