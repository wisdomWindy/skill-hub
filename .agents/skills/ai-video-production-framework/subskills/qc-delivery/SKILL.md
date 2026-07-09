---
name: ai-video-production-framework-qc-delivery
description: Stage subskill for AI video QC and delivery. Use only when the main AI video framework routes a finished cut to inspect defects, verify technical specs, package deliverables, and produce a delivery manifest.
---

# QC Delivery Subskill

## 触发场景

- 主 skill 在 `color-finishing` 通过后路由到 `qc-delivery`。
- 用户要求检查成片、导出平台版本、准备上线、交付客户或发行。

## 必要输入

- 待 QC master 或平台版本
- `artifacts/delivery-spec.md`
- `artifacts/color-finishing-log.md`
- `artifacts/sound-music-log.md`
- `artifacts/asset-manifest.md`

## 执行步骤

1. 按 `references/industry-standards.md` 的 QC 缺陷等级建立检查表。
2. 检查技术规格：时长、分辨率、宽高比、帧率、编码、封装、色彩、音频、字幕、文件名。
3. 检查 AI 缺陷：身份、手部、口型、闪烁、文字、logo、道具、运动和连续性。
4. 检查叙事和观看体验：首钩、节奏、信息清晰、情绪推进、集尾或结尾承诺。
5. 检查版权和合规：音乐、字体、声音、肖像、品牌、参考素材、敏感内容。
6. 生成平台版本、母版、字幕、缩略图或交付包清单。
7. 将 blocker 或 major 缺陷路由到最早能修复的阶段。

## 输出格式

- `artifacts/qc-report.md`
- `artifacts/delivery-manifest.md`
- 更新 `artifacts/accepted-risks.md`
- `outputs/masters/`
- `outputs/platform-versions/`
- 更新 `state.json`

## 验收标准

- 所有交付文件的路径、版本、规格、用途和状态已记录。
- QC 报告按 blocker、major、minor 分类，且每个 blocker 都已修复或阻止交付。
- 平台或客户交付规格已核对；未能核对的项目被标记为风险而非默认通过。
- AI 特有缺陷、字幕、声音、色彩、版权和文件技术规格均有检查结论。
- 交付包能被下游用户、平台或客户复核，不依赖聊天上下文。

## 安全边界

- 不能在 blocker 未解决时进入最终验收。
- 不能把平台规格未知项写成已满足。
- 不能删除或覆盖已批准母版。
