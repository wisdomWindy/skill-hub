---
name: ai-video-production-framework-script-breakdown
description: Stage subskill for AI video script breakdown. Use only when the main AI video framework routes a project to convert the approved brief into story beats, scene logic, shot needs, continuity constraints, and production prompts.
---

# Script Breakdown Subskill

## 触发场景

- 主 skill 在 `intake` 通过后路由到 `script-breakdown`。
- 返修发现故事动机、节奏、人物关系或镜头需求不清，需要回退到剧本拆解。

## 必要输入

- `artifacts/creative-brief.md`
- `artifacts/delivery-spec.md`
- 用户提供的梗概、剧本、台词、人物设定或品牌信息。

## 执行步骤

1. 将创意拆成 logline、核心冲突、人物目标、阻力、转折、结尾承诺。
2. 对漫剧项目建立首钩、段落钩子、反转点、集尾或段尾悬念。
3. 对电影级项目建立三幕或等效结构、情绪曲线、主题回响和镜头叙事需求。
4. 拆分场景：地点、时间、人物、行动、冲突、信息增量、视听重点。
5. 生成初版镜头需求：每个段落至少包含阶段功能、建议时间段、画面目标、配音功能、字幕功能、景别、运动、表演、关键道具、VFX/AI 难点、声音意图。
6. 将旁白、对白、字幕和镜头目标先做段落级对齐；不能只写剧情摘要而没有可进入分镜脚本的口播和字幕信息。
7. 建立连续性账本：人物状态、服化道、空间关系、时间线、未解决伏笔。
8. 标记无法用后期补救的上游问题，并回到 intake 或用户确认。

## 输出格式

- `artifacts/script-breakdown.md`
- `artifacts/continuity-ledger.md`
- 更新 `state.json`

## 验收标准

- 每个场景都有明确戏剧目的、冲突、信息增量和下一场因果关系。
- 漫剧节奏具备强进入点、可持续推进和明确段尾压力。
- 电影级结构具备动机、升级、转折、视听表达和结尾回收。
- 镜头需求足以支撑分镜和生产计划，而不是只有剧情摘要。
- 每个剧情段落都有可转写为分镜脚本的画面目标、配音/对白目标、字幕目标和时间建议。
- 连续性账本记录人物、空间、时间、道具、情绪和伏笔的关键约束。

## 安全边界

- 不能让画面生成替代剧本逻辑。
- 不能保留“后面再补”的核心情节缺口。
- 不能把分镜阶段必须用到的配音、字幕、时长和画面功能留空。
- 不能使用未授权 IP、真实人物或受保护角色作为默认设定。
