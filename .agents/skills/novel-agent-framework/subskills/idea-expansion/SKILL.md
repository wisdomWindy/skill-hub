---
name: novel-agent-framework-idea-expansion
description: Stage subskill for idea expansion. Turn a rough story seed into premise, theme, conflict, hooks, and narrative promise.
---

# Idea Expansion Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `idea-expansion` 阶段时使用。

## 必要输入

- `docs/novel-projects/<novel-id>/request.md`
- `docs/novel-projects/<novel-id>/artifacts/story-premise.md`
- `docs/novel-projects/<novel-id>/artifacts/genre-and-readership.md`
- `docs/novel-projects/<novel-id>/artifacts/market-positioning.md`
- `docs/novel-projects/<novel-id>/state.json`

## 执行步骤

1. 先读当前 premise 与读者定位。
2. 扩展并固定：
   - 核心 premise
   - 主题命题
   - 核心冲突
   - 悬念钩子
   - 情绪承诺
   - 商业卖点
   - 与目标赛道相匹配的差异化切口
3. 产出 `artifacts/theme-and-promise.md`。
4. 回写 `artifacts/story-premise.md`，消除过泛或不可写表述。
5. 如果 premise 仍无法驱动长篇，明确记录阻塞并保持在本阶段继续打磨。
6. 通过时把 `state.json.stage` 推进到 `story-architecture`。

## 输出格式

- 必须产出：
  - `artifacts/theme-and-promise.md`
  - 更新后的 `artifacts/story-premise.md`

## 验收标准

- premise 能用一句话稳定复述。
- 类型、冲突、悬念和情绪承诺彼此一致。
- 卖点既能区分作品，也不偏离目标市场。
- 已能支撑结构设计，而不只是一个点子。

## 安全边界

- 不能用华丽措辞掩盖 premise 空洞。
- 不能跳过冲突与代价设计。
