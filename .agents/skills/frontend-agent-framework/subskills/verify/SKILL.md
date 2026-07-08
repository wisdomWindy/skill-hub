---
name: frontend-agent-framework-verify
description: Stage subskill for verification. Validate the implementation against acceptance criteria and record durable evidence.
---

# Verify Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=verify` 时使用。
- 适用于对实现结果做验收、留证据、判断是否可进入 review 的阶段。

## 必要输入

- `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
- `docs/requests/<request-id>/module-runs/<current-module-id>/plan/plan.md`
- `docs/requests/<request-id>/module-runs/<current-module-id>/execution/changelog.md`
- `docs/requests/<request-id>/state.json`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/plan/plan.md`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/execution/changelog.md`
   - `../../references/state-machine.md`
   - `../../references/templates/verify.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/typescript-context.md`
2. 产出 `module-runs/<current-module-id>/verification/verification.md`。
3. 将每条 acceptance criterion 映射到：
   - verification method
   - result
   - evidence
4. 验证实现是否符合 approved spec，而不是 undocumented intent。
5. 验证 spec 与 plan 是否在实现范围内保持同一 function-complete granularity。
6. 验证可测试行为是否被测试覆盖，若无则检查是否有明确例外说明。
7. 如果 approved spec 包含 trigger/context/handoff 假设，也要验证实现是否遵守。
8. 如涉及后端接口，验证 request/response handling 是否符合 approved backend contract source，包括：
   - API docs
   - protobuf contracts
   - backend-owned TypeScript declarations
9. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，验证实现是否遵守 governing `tsconfig` 与已确认的相关声明来源，尤其是 alias resolution、ambient types、generated contracts 与 strictness-sensitive assumptions。
10. 在当前模块 `verification/verification.md` 中写出明确的 `spec constraint compliance` pass/fail。
11. 保留 `state.json.loop`，不重置、不改写。
12. 若验证失败，明确记录失败原因，交回主 skill 回流到 `execute`，并继续同一 workflow run。
13. 本阶段不能在没有验证工件的情况下宣称完成。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/module-runs/<current-module-id>/verification/verification.md`
  - `docs/requests/<request-id>/module-runs/<current-module-id>/verification/evidence/` 下的可选证据文件
- 最终交付物应包含：
  - acceptance coverage mapping
  - verification evidence
  - spec-constraint compliance 结论
  - spec-plan granularity alignment 结论
  - API contract conformance evidence（如适用）
  - failure records（如失败）
  - TDD exception checks（如适用）
  - workflow handoff readiness evidence（如适用）

## 验收标准

- 每条 acceptance criterion 都已被检查。
- 每个验证项都有附件或引用证据。
- 当前模块 `verification/verification.md` 已明确写出 spec constraints pass/fail。
- 当前模块 `verification/verification.md` 已明确写出 spec-plan 粒度对齐结论。
- 对可测试行为的 TDD 例外都有明确理由和替代证据。
- 若存在失败，要么已修复，要么已明确回流执行。
- 若工作流要求 handoff / downstream-ready result，也已明确验证。
- 通过时 `state.json.stage=review`，且保留原有 `loop`。
- 若失败，记录足够精确，`execute` 不需等待用户重新描述即可继续。

## 安全边界

- 不能在没有证据时标记完成。
- 不能忽略失败的 acceptance criteria。
- 不能把 spec-constraint compliance 当作默认成立而不写 pass/fail。
- 不能接受无法回溯到 approved spec 的实现行为。
- 不能在 spec / plan 存在行为颗粒度冲突时仍判定验证通过。
- 不能在 request/response handling 与 approved backend contract source 冲突时仍判定验证通过。
