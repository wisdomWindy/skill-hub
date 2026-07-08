---
name: novel-agent-framework-market-positioning
description: Stage subskill for market positioning. Define the novel's target lane, comparable titles, format expectations, and commercial promise before heavy story design begins.
---

# Market Positioning Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `market-positioning` 阶段时使用。

## 必要输入

- `request.md`
- `artifacts/story-premise.md`
- `artifacts/genre-and-readership.md`
- `artifacts/market-positioning.md`
- `state.json`

## 执行步骤

1. 固定作品的目标形态：
   - 连载网文
   - 商业出版长篇
   - 类型文学系列
   - 中短篇集中的单篇
2. 明确：
   - 目标平台或交付渠道
   - 更新/交付形态
   - 目标字数带
   - 单章长度带
   - 年龄分级或受众边界
   - 内容红线与禁区
   - 目标赛道
   - 核心读者
   - 至少 2-3 个对标作品或对标组合
   - 读者预期的爽点、痛点、节奏、文风
   - 钩子密度与高潮频率预期
   - 本作的差异化卖点
3. 先读：
   - `../../references/templates/market-positioning.md`
   - `../../references/templates/style-sheet.md`
4. 严格按模板结构回写 `artifacts/market-positioning.md`。
5. 初始化 `artifacts/style-sheet.md` 的上游约束部分：
   - 命名风格
   - 专有名词语言来源
   - 称谓体系
   - 数字、日期、时间与章节标题规范
6. 如果定位与原始 premise 冲突，记录冲突并要求后续阶段按定位修订 premise。
7. 通过时把 `state.json.stage` 推进到 `idea-expansion`。

## 输出格式

- 必须产出：
  - `artifacts/market-positioning.md`
  - `artifacts/style-sheet.md`

## 验收标准

- 目标市场和作品形态明确。
- 平台、更新形态、长度带、年龄边界和内容红线明确。
- 对标作品与差异化卖点明确。
- 钩子密度、章节长度和节奏预期可为后续结构、人物和节奏设计提供约束。
- `market-positioning.md` 与 `style-sheet.md` 已按模板形成可复用工件。

## 安全边界

- 不能只写空泛的“面向所有读者”。
- 不能把市场定位写成营销口号而没有结构约束意义。
- 不能缺失会直接影响结构与章节节奏的硬约束字段。
