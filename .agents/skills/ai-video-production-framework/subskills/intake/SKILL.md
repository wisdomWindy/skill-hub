---
name: ai-video-production-framework-intake
description: Stage subskill for AI video intake. Use only when the main AI video framework routes a new or resumed project to define the brief, delivery target, rights limits, and acceptance contract.
---

# Intake Subskill

## 触发场景

- 主 `ai-video-production-framework` 将新项目、续作项目或目标不清的项目路由到 `intake`。

## 必要输入

- 用户原始需求、创意种子、目标平台、交付时间、已有素材。
- 可用的品牌、版权、角色、音乐、字幕、语言和平台限制。

## 执行步骤

1. 读取主 skill 的 `references/industry-standards.md`。
2. 建立项目工作区 `docs/ai-video-projects/<project-id>/`。
3. 明确 `format_lane`：漫剧、竖屏短剧、电影短片、预告片、广告片、MV 或其他。
4. 把“电影级”“漫剧标准”“高级感”等词转成可检查标准。
5. 固定交付假设：片长、宽高比、帧率、分辨率、语言、字幕、音频、交付文件、平台。
6. 记录版权和安全边界：人物肖像、声音、音乐、字体、品牌、参考风格、禁用内容。
7. 写入初始 `state.json`，下一阶段设为 `script-breakdown`。

## 输出格式

- `request.md`
- `state.json`
- `artifacts/creative-brief.md`
- `artifacts/delivery-spec.md`
- `artifacts/accepted-risks.md`

## 验收标准

- 项目目标、观众、格式、片长、交付规格和质量档位明确。
- 漫剧项目已定义首钩、单集或段落推进、字幕和移动端可读要求。
- 电影级项目已定义类型、主题、镜头语言、声音和母版质量目标。
- 权利限制和未知风险已记录，未把未授权素材默认视为可用。
- 后续阶段能根据 brief 判断什么算完成、什么必须返工。

## 安全边界

- 不能跳过交付规格和版权边界直接进入生成。
- 不能把用户模糊审美词当作验收标准。
- 不能承诺满足某平台最新规格，除非已有明确规格来源。
