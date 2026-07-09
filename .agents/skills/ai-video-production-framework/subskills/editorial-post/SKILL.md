---
name: ai-video-production-framework-editorial-post
description: Stage subskill for AI video editorial post. Use only when the main AI video framework routes a project to assemble, cut, conform, subtitle, and revise AI-generated shots into a coherent review cut.
---

# Editorial Post Subskill

## 触发场景

- 主 skill 在 `ai-generation` 通过后路由到 `editorial-post`。
- 用户提供已有素材或粗剪，需要按行业标准完成剪辑、字幕、节奏和后期合成。

## 必要输入

- `artifacts/storyboard-animatic.md`
- `artifacts/shot-list.md`
- `artifacts/generation-log.md`
- `artifacts/delivery-spec.md`
- 已选镜头素材或素材清单。

## 执行步骤

1. 按 animatic 组装粗剪，再根据实际素材优化节奏。
2. 记录 edit decision：使用镜头、弃用镜头、替换原因、版本号、时间码。
3. 检查连续性：轴线、视线、动作、情绪、道具、空间和时间。
4. 加入临时或正式字幕，验证安全区、可读时间、换行、遮挡和语言准确性。
5. 对漫剧项目强化首钩、节奏密度、信息清晰和集尾悬念。
6. 对电影级项目强化情绪流、镜头呼吸、转场动机、声画关系和表演可信度。
7. 将无法通过剪辑解决的问题回退到 AI 生成、分镜或剧本拆解。

## 输出格式

- `artifacts/edit-decision-log.md`
- 更新 `artifacts/qc-report.md` 的剪辑问题段落
- `outputs/review-cuts/<version>/`
- 更新 `state.json`

## 验收标准

- 粗剪或精剪具备完整叙事链路，不依赖解释文字才能看懂。
- 镜头衔接没有阻断级跳轴、动作断裂、角色状态错乱或空间混乱。
- 字幕清楚、同步、可读，不遮挡关键画面。
- 漫剧版本节奏紧凑、钩子明确、移动端信息密度可读。
- 电影级版本剪辑点有动机，情绪推进和镜头呼吸不被素材炫技破坏。

## 安全边界

- 不能为了保留好看镜头牺牲故事清晰度。
- 不能把严重 AI 缺陷藏在快切里当作通过。
- 不能跳过字幕和安全区检查后进入交付。
