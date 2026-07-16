---
name: frontend-agent-framework-review
description: Stage subskill for review. Review correctness, standards compliance, and residual risk before completion.
---

# Review Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=review` 时使用。
- 适用于在 completion 前对代码、spec、plan、verification 输出做最终审查的阶段。

## 必要输入

- 当前交付单元的 `spec/spec.md`
- 当前交付单元的 `plan/plan.md`
- 当前交付单元的 `verification/verification.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - 当前交付单元的 `spec/spec.md`
   - 当前交付单元的 `plan/plan.md`
   - 当前交付单元的 `verification/verification.md`
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/review.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/clean-code.md`
   - `../../references/policies/code-graph.md`
   - `../../references/policies/design-patterns.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/frontend-architecture.md`
   - `../../references/policies/frontend-components.md`
   - `../../references/policies/functional-programming.md`
   - `../../references/policies/source-grounding.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/typescript-context.md`
   - `../../references/policies/user-intent.md`
2. 先读变更后的代码，再开始评审。
3. 产出当前交付单元的 `review/review.md`。
4. 把评审结论分成：
   - blocking issues
   - non-blocking issues
   - accepted risks
   - follow-up items
5. 检查实现、验证结论与 review 发现是否全部回溯到 framework-approved spec / plan 的 source-grounding 条目；任何无来源行为、相邻模块扩展、样例内容扩展或常规做法扩展均按 blocker 处理。
6. 既看功能正确性，也看 clean-code 和 functional-programming 合规性。逐个检查本次新增或扩大作用域的常量是否具有稳定业务语义、约束、必要快照、复杂表达式简化或真实复用价值；以下情况按 blocker 处理：
   - 只给单次使用的显然字面量、模板片段、对象 / 数组、简单属性访问或简单表达式换名
   - 名称只是复述值或下一步操作，移除常量后代码同样清晰且不损失正确性
   - 为假想复用创建模块级 / 导出常量，或为已有领域常量创建同义 / 透传别名
   - 常量作用域大于当前真实 owner 和调用方所需范围
7. 检查引入或修改的 pattern 是否真的必要、是否与问题匹配。
8. 依据 spec 中声明的设计约束审查实现，不做脱离工件的主观审美评审。
9. 检查 spec 与 plan 是否保持同一 function-complete behavior granularity；若有漂移，按 blocker 处理。
10. 如存在 user intent contract，检查实现是否同时满足 literal request 与 practical goal；如果实现只是转移复杂度、风险、歧义、责任或采用 forbidden interpretation，按 blocker 处理。
11. 如果实现修改或移除了既有代码，检查变更前是否审查完整功能链路和文件引用关系，变更后是否复查链路正常；缺少证据、缺少必要环节、残留多余环节、重复路径、冲突路径或未授权影响邻近功能，均按 blocker 处理。测试文件引用待改或待删代码时，只能视为测试适配面，不能作为保留生产代码的真实 owner。
12. 如果实现移除了调用、请求、分支、字段、控件或副作用，检查该行为独占的 import、helper、常量、类型、request wrapper、状态、测试、mock 和注释是否同步清理；孤立残留按 blocker 处理。保留 helper 时必须有真实生产调用方，不能只靠测试引用。
13. 检查 API 集成是否符合 API contract policy：
   - contract-source fidelity
   - type reuse correctness
   - field-name preservation
   - adapter-boundary discipline
   - request-layer ownership
14. 检查 functional-programming policy 是否被正确应用：
   - 规则、校验、数据转换、payload 构造是否优先用纯函数表达
   - 副作用是否集中在明确 command / action / request / lifecycle 边界
   - 是否存在 hidden mutation、hidden side effect、duplicated derived state
   - 是否存在为了函数式而牺牲可读性的过度 point-free、过长 reducer chain、过度 currying 或未经批准的函数式库抽象
15. 明确写出：
   - `clean-code assessment: pass|fail`
   - `source grounding assessment: pass|fail`
   - `functional-programming assessment: pass|fail`
   - `design-pattern assessment: pass|fail`
   - `user intent assessment: pass|fail`（如适用）
   - `change-chain integrity assessment: pass|fail`（如适用）
   - `removal cleanup assessment: pass|fail`（如适用）
   - `frontend styling assessment: pass|fail`（如适用）
   - `API contract assessment: pass|fail`（如适用）
   - `TypeScript context assessment: pass|fail`（如适用）
16. 如涉及样式变更，检查 authored styling 是否遵守 frontend-components policy；以下情况按 blocker 处理：
   - 使用未批准的 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class
   - `class` / `className` / class binding 值超过项目 formatter 正常行宽或依赖多行包裹
   - 用常量、map、computed、helper 或 import 变量隐藏过长 class 值
   - 用条件 class binding 承载大段基础样式而不是小型状态切换
17. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，检查实现是否先恢复了 governing `tsconfig` 与相关声明来源，再进行编码与类型决策；把靠猜测 path aliases、ambient globals、generated types 落地的行为视为流程缺陷。
18. 如果结论依赖真实依赖方向、ownership boundary、side-effect spread、abstraction fan-out，优先使用 code graph 证据。
19. 如果 review 扩展或推翻了早先结构理解，更新 `artifacts/code-context.md`。
20. 保留 `state.json.loop`，不重置、不改写。
21. 若仍有 blocker，记录后交回主 skill 回流到 `execute`，并在同一 workflow run 中继续。
22. 若当前拆分模块通过 review，必须要求主 skill 执行模块收口状态迁移：
   - 将当前模块标记为 `completed`
   - 更新 `pending_module_ids` 与 `completed_module_ids`
   - 若仍有待处理模块，则提升下一个模块并切到其首个下游阶段
   - 若无待处理模块，则切到 `stage=complete` 且令 `loop.state=complete`
23. 若 direct-change、bugfix 或非拆分请求通过 review，必须要求主 skill 设置 `state.json.stage=complete` 与 `state.json.loop.state=complete`。
24. 在 blocker 未清零前，不允许标记 complete。

## 输出格式

- 必须产出：
  - 当前交付单元的 `review/review.md`
- 最终交付物应包含：
  - final review findings
  - merge readiness judgment
  - spec-plan alignment findings
  - source-grounding findings
  - user-intent findings（如适用）
  - API integration findings
  - change-chain integrity findings（修改或移除既有代码时适用）
  - clean-code findings
  - functional-programming findings（如适用）
  - frontend styling findings（如适用）
  - API contract assessment（如适用）
  - TypeScript context assessment（如适用）
  - design-pattern findings
  - code-graph-backed structural findings（如适用）
  - pass/fail compliance conclusions
  - 可直接驱动下一轮 execute 的 blocker 列表

## 验收标准

- 当前交付单元 `review/review.md` 已存在并按严重级别记录发现项。
- 已明确说明实现是否全部回溯到 source-grounding 条目，且没有未授权扩展。
- 如存在 user intent contract，已明确说明实现是否满足用户实际目标并避开 forbidden interpretations。
- 如存在既有代码修改或移除，已明确说明操作前链路审查是否充分、操作后链路是否干净、是否存在缺环或多余环节、是否影响邻近功能。
- 已明确说明 changed area 是否仍有 clean-code blocker。
- 已明确说明新增或扩大作用域的常量是否均有可证明的语义、约束、快照、简化或复用价值，且无意义常量已作为 blocker 处理。
- 如存在行为移除，已明确说明是否仍有 orphan helper、unused import、stale request wrapper、obsolete state、测试或注释残留。
- 已明确说明测试文件是否已按需求适配；没有把测试引用当作待改或待删生产代码的真实调用方。
- 如涉及样式变更，已明确说明 Tailwind CSS-style styling、class 值长度、禁止隐藏过长 class 字符串是否合规。
- 如涉及 API 合同，已明确说明 API contract assessment pass/fail。
- 如涉及 TypeScript context，已明确说明 TypeScript context assessment pass/fail。
- 已明确说明 pattern choice 是 justified / overbuilt / unnecessary。
- 当前交付单元 `review/review.md` 已明确写出 `clean-code assessment: pass|fail` 与 `design-pattern assessment: pass|fail`。
- 当前交付单元 `review/review.md` 已明确写出 `source grounding assessment: pass|fail`。
- 当前交付单元 `review/review.md` 已明确写出 `functional-programming assessment: pass|fail`（如适用）。
- 已明确说明 spec 与 plan 是否保持所需行为颗粒度对齐。
- 当前交付单元所有 blocker 都已清零，否则必须回流执行。
- 拆分模块通过时，主 skill 必须完成模块收口状态迁移后，再推进到下一个模块或 `complete`，且保留原有 `loop`。
- direct-change、bugfix 或非拆分请求通过时，主 skill 必须设置 `stage=complete` 与 `loop.state=complete`。

## 安全边界

- 不能把 review 压缩成一句批准语。
- 不能接受没有来源锚定的行为或从常规做法、相邻模块、样例内容、个人偏好扩展出来的行为。
- 不能因为“功能能跑”就忽略严重的可维护性问题。
- 不能因为“函数式”就接受更难读、更难调试或隐藏副作用的实现。
- 不能接受只给一次性显然值换名、为假想复用导出、创建同义别名或无依据扩大作用域的常量。
- 不能接受只满足字面要求但违背用户实际目标的实现。
- 不能接受缺少变更链路审查或链路复查证据的既有代码修改 / 移除。
- 不能接受修改或移除后仍存在缺环、多余环节、重复路径、冲突路径或未授权邻近功能影响。
- 不能接受删除行为后残留孤立 helper、unused import、stale request wrapper、obsolete state、测试或注释。
- 不能接受因为测试文件仍引用待改或待删代码而保留生产代码；测试引用视为空引用，测试应适配新需求。
- 不能接受没有实际问题支撑的 pattern layer / fake extensibility / framework-shaped indirection。
- 不能把 clean-code 或 design-pattern 合规性当成默认成立而不写 pass/fail。
- 不能把 functional-programming 合规性当成默认成立而不写 pass/fail（如适用）。
- 不能接受违反 Tailwind CSS-style utility class、class 值长度或禁止隐藏过长 class 字符串规则的 authored styling。
- 不能把 material spec-plan granularity drift 当作无害文档问题。
- 不能接受无批准 adapter boundary 的 API 集成代码去重复声明服务端 TS 类型或偷偷改写后端字段语义。
- 不能接受 TypeScript 相关实现建立在未确认 `tsconfig`、未确认声明来源、或全靠猜测的 alias / global / generated-type 假设之上。
- 在 blocker 未解决前，不能宣称 merge-ready。
