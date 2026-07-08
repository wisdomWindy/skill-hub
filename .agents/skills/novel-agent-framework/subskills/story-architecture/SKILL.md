---
name: novel-agent-framework-story-architecture
description: Stage subskill for story architecture. Build the novel's structural backbone, turning points, escalation path, and ending logic.
---

# Story Architecture Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `story-architecture` 阶段时使用。

## 必要输入

- `artifacts/story-premise.md`
- `artifacts/theme-and-promise.md`
- `artifacts/genre-and-readership.md`
- `state.json`

## 执行步骤

1. 基于题材与读者预期选择主结构：
   - 三幕式
   - 起承转合
   - 英雄旅程的简化变体
2. 固定关键节点：
   - 开场新常态
   - 激励事件
   - 第一转折
   - 中点
   - 至暗时刻
   - 高潮
   - 结尾新常态
3. 写入 `artifacts/story-architecture.md`。
4. 解释每个节点如何兑现主题与卖点。
5. 若结构无法承载既定目标篇幅，记录并修订。
6. 通过时把 `state.json.stage` 推进到 `character-design`。

## 输出格式

- 必须产出：
  - `artifacts/story-architecture.md`

## 验收标准

- 关键结构节点已完整落盘，而不是只存在一个模糊大纲印象。
- 开场、激励事件、主要转折、中点、至暗时刻、高潮与结尾之间存在明确因果链，而不是事件并列摆放。
- 主冲突具备可追踪的升级路径，且升级节奏与目标市场的钩子密度、高潮频率和篇幅策略相容。
- 结尾不只是“有收尾”，而是能回应开头承诺、主题命题与核心卖点。
- `story-architecture.md` 已能为后续人物、章节与 scene 设计提供稳定骨架，不再依赖临场补想关键转折。
- 不存在会阻止进入 `character-design` 的结构 blocker；若仍有高风险节点，已明确记录并阻止放行。

## 安全边界

- 不能只有事件清单而没有因果。
- 不能把高潮建立在未铺垫的信息上。
