---
name: frontend-agent-framework-review
description: Stage subskill for review. Review correctness, standards compliance, and residual risk before completion.
---

# Review Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=review` 时使用。
- 适用于在 completion 前对代码、spec、plan、verification 输出做最终审查的阶段。

## 必要输入

- `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
- `docs/requests/<request-id>/module-runs/<current-module-id>/plan/plan.md`
- `docs/requests/<request-id>/module-runs/<current-module-id>/verification/verification.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/plan/plan.md`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/verification/verification.md`
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
   - `../../references/policies/testing.md`
   - `../../references/policies/typescript-context.md`
2. 先读变更后的代码，再开始评审。
3. 产出 `module-runs/<current-module-id>/review/review.md`。
4. 把评审结论分成：
   - blocking issues
   - non-blocking issues
   - accepted risks
   - follow-up items
5. 既看功能正确性，也看 clean-code 合规性。
6. 检查引入或修改的 pattern 是否真的必要、是否与问题匹配。
7. 依据 spec 中声明的设计约束审查实现，不做脱离工件的主观审美评审。
8. 检查 spec 与 plan 是否保持同一 function-complete behavior granularity；若有漂移，按 blocker 处理。
9. 检查 API 集成是否符合 API contract policy：
   - contract-source fidelity
   - type reuse correctness
   - field-name preservation
   - adapter-boundary discipline
   - request-layer ownership
10. 明确写出：
   - `clean-code assessment: pass|fail`
   - `design-pattern assessment: pass|fail`
11. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，检查实现是否先恢复了 governing `tsconfig` 与相关声明来源，再进行编码与类型决策；把靠猜测 path aliases、ambient globals、generated types 落地的行为视为流程缺陷。
12. 如果结论依赖真实依赖方向、ownership boundary、side-effect spread、abstraction fan-out，优先使用 code graph 证据。
13. 如果 review 扩展或推翻了早先结构理解，更新 `artifacts/code-context.md`。
14. 保留 `state.json.loop`，不重置、不改写。
15. 若仍有 blocker，记录后交回主 skill 回流到 `execute`，并在同一 workflow run 中继续。
16. 若当前模块通过 review，必须要求主 skill 执行模块收口状态迁移：
   - 将当前模块标记为 `completed`
   - 更新 `pending_module_ids` 与 `completed_module_ids`
   - 若仍有待处理模块，则提升下一个模块并切到其首个下游阶段
   - 若无待处理模块，则切到 `stage=complete` 且令 `loop.state=complete`
17. 在 blocker 未清零前，不允许标记 complete。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/module-runs/<current-module-id>/review/review.md`
- 最终交付物应包含：
  - final review findings
  - merge readiness judgment
  - spec-plan alignment findings
  - API integration findings
  - clean-code findings
  - design-pattern findings
  - code-graph-backed structural findings（如适用）
  - pass/fail compliance conclusions
  - 可直接驱动下一轮 execute 的 blocker 列表

## 验收标准

- 当前模块 `review/review.md` 已存在并按严重级别记录发现项。
- 已明确说明 changed area 是否仍有 clean-code blocker。
- 已明确说明 pattern choice 是 justified / overbuilt / unnecessary。
- 当前模块 `review/review.md` 已明确写出 `clean-code assessment: pass|fail` 与 `design-pattern assessment: pass|fail`。
- 已明确说明 spec 与 plan 是否保持所需行为颗粒度对齐。
- 当前模块所有 blocker 都已清零，否则必须回流执行。
- 当前模块通过时，主 skill 必须完成模块收口状态迁移后，再推进到下一个模块或 `complete`，且保留原有 `loop`。

## 安全边界

- 不能把 review 压缩成一句批准语。
- 不能因为“功能能跑”就忽略严重的可维护性问题。
- 不能接受没有实际问题支撑的 pattern layer / fake extensibility / framework-shaped indirection。
- 不能把 clean-code 或 design-pattern 合规性当成默认成立而不写 pass/fail。
- 不能把 material spec-plan granularity drift 当作无害文档问题。
- 不能接受无批准 adapter boundary 的 API 集成代码去重复声明服务端 TS 类型或偷偷改写后端字段语义。
- 不能接受 TypeScript 相关实现建立在未确认 `tsconfig`、未确认声明来源、或全靠猜测的 alias / global / generated-type 假设之上。
- 在 blocker 未解决前，不能宣称 merge-ready。
