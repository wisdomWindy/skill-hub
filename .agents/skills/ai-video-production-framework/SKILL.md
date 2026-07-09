---
name: ai-video-production-framework
description: Use when the user wants to create, plan, generate, revise, finish, or deliver an AI video through a full production workflow, especially for manju, vertical drama, cinematic short film, trailer, film-quality commercial, or industry-standard video delivery.
---

# AI Video Production Framework

Use this as the main orchestration skill for end-to-end AI video production. It turns a rough video idea into a controlled production package with stage artifacts, quality gates, rollback rules, and final delivery checks aligned with manju and film production expectations.

## 触发场景

- 用户要求制作 AI 视频、AI 短片、AI 漫剧、电影感视频、预告片、广告片或完整视频成片。
- 用户要求“全流程”“工业化”“电影级”“漫剧业界标准”“可交付”“可上线”的 AI 视频制作。
- 用户已有脚本、分镜、素材、提示词、粗剪、样片或成片，需要继续推进、返修、QC 或交付。
- 用户要求把 AI 视频制作拆成制片、编剧、分镜、生成、剪辑、声音、调色、交付等阶段。

## 必要输入

- `project_goal`: 成片用途、目标受众、平台、片长、语言、横竖屏、交付日期。
- `format_lane`: `manju`、`film-short`、`trailer`、`commercial`、`music-video` 或用户自定义类型。
- `source_materials`: 创意梗概、剧本、人物设定、参考片、品牌规范、已有素材、已有工程文件。
- `delivery_spec`: 分辨率、帧率、宽高比、字幕、音频响度、编码、封装、平台或发行方要求；缺失时先建立可验证假设。
- `rights_constraints`: 肖像权、音乐版权、字体版权、品牌授权、素材授权、不可模仿对象、敏感内容限制。
- `quality_target`: 目标是概念样片、可评审样片、上线成片、电影节/院线/品牌交付母版中的哪一档。
- `target_path`: 默认使用 `docs/ai-video-projects/<project-id>/` 保存项目状态和产物。

## 执行步骤

1. 先读取 `references/industry-standards.md`，建立本项目的漫剧/电影级质量基线。
2. 在进入 `storyboard-animatic` 前读取 `references/storyboard-script-format.md`，确保分镜脚本可被视频生成模型、图像生成模型、剪辑脚本或批量生产工具逐镜头解析。
3. 判断任务类型：
   - 新项目：从 `intake` 开始。
   - 续作或返修：读取 `docs/ai-video-projects/<project-id>/state.json`、最新产物和 QC 记录后再路由。
   - 单阶段请求：仍先检查上游产物是否足够支撑该阶段；不足时回退到最早缺口阶段。
4. 建立或恢复生命周期：
   `intake -> script-breakdown -> look-development -> storyboard-animatic -> production-planning -> ai-generation -> editorial-post -> sound-music -> color-finishing -> qc-delivery -> acceptance-review -> complete`
5. 每次只加载并执行当前阶段 subskill，不让下游阶段代替上游阶段补漏洞。
6. 每个阶段完成后检查该 subskill 的验收标准：
   - 通过：更新 `state.json` 并推进下一阶段。
   - 未通过：保留 blocker，继续本阶段或回退到最早能修复问题的阶段。
   - 需用户决策：记录待确认项，不把未确认风险当作已接受。
7. 对“业界标准”类目标必须把标准转为可检查条目：故事钩子、镜头连续性、角色一致性、画面稳定性、对白可懂度、响度、色彩一致性、字幕可读性、交付规格、版权清单、QC 缺陷阈值。
8. 任何需要生成视频镜头的项目，都必须先产出机器可解析分镜脚本；分镜脚本的每段镜头必须能独立生成，包含镜头编号、时间段、阶段功能、画面提示词、配音文案、字幕、运镜、画幅、角色/场景连续性约束和负面约束。
9. 完成 `qc-delivery` 后必须进入 `acceptance-review`；只有 acceptance review 明确通过，项目状态才可置为 `complete`。

## 输出格式

每个项目使用下面的工作区结构：

`docs/ai-video-projects/<project-id>/`

核心产物：

- `request.md`
- `state.json`
- `artifacts/creative-brief.md`
- `artifacts/delivery-spec.md`
- `artifacts/script-breakdown.md`
- `artifacts/look-bible.md`
- `artifacts/storyboard-animatic.md`
- `artifacts/storyboard-script.md`
- `artifacts/storyboard-script.jsonl`
- `artifacts/production-plan.md`
- `artifacts/asset-manifest.md`
- `artifacts/generation-log.md`
- `artifacts/edit-decision-log.md`
- `artifacts/sound-music-log.md`
- `artifacts/color-finishing-log.md`
- `artifacts/qc-report.md`
- `artifacts/delivery-manifest.md`
- `artifacts/accepted-risks.md`
- `artifacts/acceptance-review.md`
- `outputs/masters/`
- `outputs/platform-versions/`
- `outputs/review-cuts/`

Subskill 产物可以增加文件，但不能破坏上面的核心工作区契约。

## 验收标准

- 主流程完整覆盖创意立项、剧本拆解、视觉开发、分镜动态预演、生产计划、AI 生成、剪辑后期、声音音乐、调色封装、QC 交付和最终验收。
- `state.json` 记录当前阶段、已通过闸门、blocker、回退原因、交付目标、版本号和下一步动作。
- 每个阶段都有可审阅产物，不能只留下聊天结论或抽象描述。
- 分镜脚本必须达到可生产粒度：每个镜头都是独立生成单元，时长边界明确，画面提示词可直接投喂生成模型，配音文案和字幕逐镜头对齐，JSONL 版本可被脚本逐行解析。
- 成片或样片没有未记录的角色漂移、画风漂移、镜头跳轴、时序错乱、明显 AI 闪烁、肢体异常、字幕遮挡、音频爆音、版权缺口或交付规格缺口。
- 漫剧项目满足强钩子、段落推进、人物关系清晰、字幕可读、移动端观看和集尾悬念等平台叙事基线。
- 电影或电影级项目满足镜头语言、连续性、节奏、表演可信度、声音空间、色彩统一、母版管理和 QC 可追溯等制片基线。
- `acceptance-review` 对每条质量目标给出 pass/fail/blocker，并明确记录最终是否允许交付。

## 安全边界

- 不得伪造已生成、已剪辑、已调色、已混音或已通过 QC 的事实；没有实际产物只能标记为计划或待执行。
- 不得把用户未授权的人脸、声音、品牌、音乐、字体或受版权保护风格当作可用素材。
- 不得用“电影感”“高级”“业界标准”等模糊词替代可检查标准。
- 不得把只有镜号、标题、简短画面描述的粗略 shot list 当作可生成分镜脚本。
- 不得让剪辑、调色或提示词微调掩盖剧本、分镜、角色设定或版权层面的上游问题。
- 不得在平台交付规格缺失时宣称已满足某平台最新规范；只能记录假设并在 QC 阶段要求用户或平台文档确认。
- 不得把内部自检当作外部发行、平台审核、法务审核或真实观众反馈。
