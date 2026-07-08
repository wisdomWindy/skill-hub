---
name: novel-agent-framework-intake
description: Stage subskill for intake. Create the novel project workspace from a rough idea and write only intake-stage artifacts.
---

# Intake Subskill

## 触发场景

- 当主 `novel-agent-framework` 将项目路由到 `intake` 阶段时使用。
- 适用于从一句话思路、一个场景、一个角色概念或一个类型钩子创建新的小说工作区。

## 必要输入

- 至少一个可写作的种子输入：
  - 一句话 premise
  - 一个关键场景
  - 一个角色设定
  - 一个 "如果……会怎样" 问句
- 如用户已给出，则同时接收：
  - 题材
  - 目标读者
  - 连载/出版形态
  - 目标篇幅
  - 风格锚点
  - 禁忌项
  - 对标作品（如有）

## 执行步骤

1. 先读：
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
2. 生成稳定的 `novel-id`，并创建 `docs/novel-projects/<novel-id>/` 工作区。
3. 只写 intake 阶段工件，不写下游章节正文。
4. 在 `request.md` 中写入：
   - 原始思路
   - 初始目标
   - 目标读者与篇幅策略
   - 初始完成信号
5. 在 `artifacts/story-premise.md` 中记录：
   - 核心一句话
   - 当前已知卖点
   - 当前未知问题
6. 在 `artifacts/genre-and-readership.md` 中记录：
   - 类型
   - 子类型
   - 读者期待
   - 风格边界
7. 在 `artifacts/market-positioning.md` 中初始化：
   - 平台/形态假设
   - 目标赛道
   - 初始对标作品
   - 商业卖点假设
8. 在 `artifacts/acceptance-standard.md` 中初始化完成标准草案。
8. 初始化 `state.json`：
   - `stage=market-positioning`
   - `loop.state=running`
   - `loop.reentry_reason=new_project`

## 输出格式

- 必须产出：
  - `docs/novel-projects/<novel-id>/request.md`
  - `docs/novel-projects/<novel-id>/state.json`
  - `docs/novel-projects/<novel-id>/artifacts/story-premise.md`
  - `docs/novel-projects/<novel-id>/artifacts/genre-and-readership.md`
  - `docs/novel-projects/<novel-id>/artifacts/market-positioning.md`
  - `docs/novel-projects/<novel-id>/artifacts/acceptance-standard.md`

## 验收标准

- 小说工作区已创建。
- 初始 premise 已被规范化为可复述、可继续拆解的工作版本，而不是原始灵感摘录。
- `request.md` 已明确记录：
  - 原始思路
  - 当前目标
  - 已知约束
  - 仍待澄清的开放问题
- 读者、篇幅、交付形态、禁忌项等基础约束已明确记录，未知项也已被显式标注，而不是留在隐含假设里。
- 初始市场定位假设已落盘，且足以支撑下一阶段继续做市场与形态收紧。
- `artifacts/acceptance-standard.md` 不只是占位文件，已至少包含：
  - 当前完成定义草案
  - 关键验收维度
  - 已知例外或待确认项
  - 现阶段不能声称完成的原因
- `state.json` 已初始化并进入 `market-positioning`，且 loop 元信息可支持后续恢复与审计。

## 安全边界

- 不能在本阶段直接开始正文写作。
- 不能把模糊想法伪装成已确认设定。
- 不能宣称项目已具备完成准备度。
