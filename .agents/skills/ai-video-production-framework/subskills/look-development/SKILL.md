---
name: ai-video-production-framework-look-development
description: Stage subskill for AI video look development. Use only when the main AI video framework routes a project to define visual identity, character continuity, world rules, style limits, and shot-generation visual controls.
---

# Look Development Subskill

## 触发场景

- 主 skill 在 `script-breakdown` 通过后路由到 `look-development`。
- QC 或剪辑发现画风漂移、角色漂移、场景规则不清，需要回退到视觉开发。

## 必要输入

- `artifacts/creative-brief.md`
- `artifacts/delivery-spec.md`
- `artifacts/script-breakdown.md`
- `artifacts/continuity-ledger.md`
- 用户提供的合法参考图、品牌规范或角色设定。

## 执行步骤

1. 定义整体视觉方向：类型、时代、色彩、光线、质感、镜头语言、画面密度。
2. 建立角色视觉 bible：脸型、发型、服装、年龄、体态、表情范围、禁用变化。
3. 建立场景和道具规则：空间布局、时间、材质、关键道具、屏幕方向。
4. 定义资产分层策略：哪些角色、背景、道具、前景、字幕或图形需要独立生成；哪些镜头允许人物和背景整体生成。
5. 定义 AI 生成控制策略：参考图使用范围、提示词词库、负面提示、风格边界、版本命名。
6. 对漫剧项目检查移动端可读性：脸部、表情、字幕区域、关键物件、竖屏构图。
7. 对电影级项目检查镜头语言：景深、构图、光比、色彩对比、镜头组一致性。
8. 标记版权风险：不得要求模仿受保护艺术家、演员、电影镜头或品牌视觉。

## 输出格式

- `artifacts/look-bible.md`
- `artifacts/asset-manifest.md`
- 更新 `artifacts/continuity-ledger.md`
- 更新 `state.json`

## 验收标准

- 角色、场景、道具、光线、色彩、镜头和风格禁区可被后续阶段复用。
- 角色一致性标准足以检查脸、身体、服装、年龄、声音和表演漂移。
- 已明确默认生成策略：普通镜头可用 `integrated_scene`，连续角色、复用背景、商业修订或镜头运动需求高的镜头应使用 `layered_composite` 或 `reference_driven`。
- 需要分层的角色、背景、道具和前景资产已写入 `asset-manifest.md`，并说明来源、权利状态和用途。
- 视觉方向符合项目格式：漫剧强调移动端叙事可读，电影级强调镜头组统一和视听可信。
- 所有参考资产都有来源和权利状态，未授权参考已替换为可合法使用的描述性方向。
- AI 生成团队可直接依据 look bible 建立 prompt 与筛选标准。

## 安全边界

- 不能用“某导演/画师/演员同款”替代合法且可执行的视觉描述。
- 不能让单张好看的图覆盖角色连续性和镜头组统一。
- 不能在连续角色或复用场景项目中默认每个镜头整图重生成而不评估一致性风险。
- 不能忽略字幕安全区、手机观看或母版交付的画面约束。
