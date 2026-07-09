---
name: ai-video-production-framework-production-planning
description: Stage subskill for AI video production planning. Use only when the main AI video framework routes a project to schedule generation, versioning, asset control, review gates, naming, and risk management before production.
---

# Production Planning Subskill

## 触发场景

- 主 skill 在 `storyboard-animatic` 通过后路由到 `production-planning`。
- 生成阶段混乱、版本不可追溯、素材丢失或返工无法定位原因时回退到本阶段。

## 必要输入

- `artifacts/storyboard-animatic.md`
- `artifacts/storyboard-script.md`
- `artifacts/storyboard-script.jsonl`
- `artifacts/shot-list.md`
- `artifacts/look-bible.md`
- `artifacts/delivery-spec.md`
- `artifacts/asset-manifest.md`

## 执行步骤

1. 先校验 `artifacts/storyboard-script.jsonl` 是否逐行可解析，且每镜头字段完整；不通过则回退到 `storyboard-animatic`。
2. 对 `layered_composite` 或 `reference_driven` 的连续角色镜头，校验 `layered_assets` 是否包含角色资产 ID、路径和用途，且 `visual_prompt` 是否显式引用同一角色资产 ID/路径；不通过则回退到 `storyboard-animatic`。
3. 建立镜头生产表：镜号、时间段、优先级、难度、依赖、负责人或工具、预计迭代次数。
4. 定义版本命名和目录：source、generated、selected、edit、review、master。
5. 按 `generation_mode` 建立生产路径：
   - `integrated_scene`：整体生成单张图或单段视频。
   - `layered_composite`：分别生成人物、背景、道具、前景或文字板，再进入合成。
   - `reference_driven`：基于角色参考图、背景参考图、姿势参考图或已批准帧生成。
6. 定义每镜生成参数记录方式：工具、模型、`visual_prompt`、`negative_prompt`、seed、参考资产、分层资产、版本号、配音文案、字幕文案。
7. 建立 review gate：单镜通过、镜头组通过、分层资产通过、合成通过、粗剪通过、声音通过、调色通过、QC 通过。
8. 标记 blocker 风险：版权、角色一致性、动作连续性、口型、字幕、品牌露出、交付规格。
9. 为漫剧项目安排强钩子镜头、人物关系镜头、集尾镜头优先生成。
10. 为电影级项目安排复杂运动、关键表演、转场和声音驱动镜头优先测试。

## 输出格式

- `artifacts/production-plan.md`
- 更新 `artifacts/asset-manifest.md`
- 更新 `state.json`

## 验收标准

- 每个镜头都有生产路径、版本规则、验收责任和风险等级。
- 生产计划逐镜头引用 `storyboard-script.jsonl` 中的 `shot_id`、时间段、画面提示词、生成模式、分层资产、配音、字幕和负面约束。
- 对 `layered_composite` 镜头，生产计划必须列出人物、背景、道具、前景、字幕或图形层的生成顺序、合成顺序和验收点。
- 对涉及连续角色的 `layered_composite` 或 `reference_driven` 镜头，生产计划必须能定位角色资产路径，并将该资产作为生成或合成输入。
- 生成日志格式足以复现或诊断主要镜头版本。
- 关键镜头和高风险镜头有测试策略，不等全片生成完才暴露问题。
- 生产计划支持漫剧快速迭代和电影级镜头组一致性。
- 下游能明确哪些素材可剪、哪些待修、哪些已废弃。

## 安全边界

- 不能在没有版本命名、资产清单和 review gate 的情况下大规模生成。
- 不能把 `layered_composite` 镜头当作普通整体生成镜头安排生产。
- 不能允许缺少角色资产 ID/路径引用的连续角色镜头进入生成阶段。
- 不能把高风险镜头留到最终 QC 才处理。
- 不能混用未授权素材和可交付素材。
