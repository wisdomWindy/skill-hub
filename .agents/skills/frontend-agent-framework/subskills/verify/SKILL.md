---
name: frontend-agent-framework-verify
description: Stage subskill for verification. Validate the implementation against acceptance criteria and record durable evidence.
---

# Verify Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=verify` 时使用。
- 适用于对实现结果做验收、留证据、判断是否可进入 review 的阶段。

## 必要输入

- 当前交付单元的 `spec/spec.md`
- 当前交付单元的 `plan/plan.md`
- 当前交付单元的 `execution/changelog.md`
- `docs/requests/<request-id>/state.json`

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - 当前交付单元的 `spec/spec.md`
   - 当前交付单元的 `plan/plan.md`
   - 当前交付单元的 `execution/changelog.md`
   - `../../references/state-machine.md`
   - `../../references/templates/verify.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/doc-writing.md`
   - `../../references/policies/frontend-components.md`
   - `../../references/policies/functional-programming.md`
   - `../../references/policies/source-grounding.md`
   - `../../references/policies/typescript-context.md`
   - `../../references/policies/user-intent.md`
2. 产出当前交付单元的 `verification/verification.md`。
3. 将每条 acceptance criterion 映射到：
   - verification method
   - result
   - evidence
4. 验证实现是否符合 framework-approved spec，而不是 undocumented intent。
5. 验证实现行为是否全部回溯到 framework-approved spec / plan 的 source-grounding 条目，不能接受无来源行为、相邻模块扩展、样例内容扩展或常规做法扩展。
6. 验证 spec 与 plan 是否在实现范围内保持同一 function-complete granularity。
7. 验证可测试行为是否被测试覆盖，若无则检查是否有明确例外说明。
8. 如果 framework-approved spec 包含 user intent contract，必须同时验证：
   - literal compliance
   - intent compliance
   - forbidden interpretations 未被采用
   - 复杂度、风险、歧义或责任没有被转移到未检查位置
9. 如果实现修改或移除了既有代码，验证是否具备变更前链路审查与变更后链路复查证据：
   - 功能入口到组件、状态、请求、adapter、helper、UI 消费者的链路仍完整
   - 文件引用关系、调用方、事件、watch / computed、测试与 mock 已同步
   - 测试文件引用待改或待删代码时，已被当作测试适配面处理，而不是生产代码保留依据
   - 没有缺少必要环节、残留多余环节、重复路径、冲突路径或未授权邻近功能影响
10. 如果实现移除了调用、请求、分支、字段、控件或副作用，验证是否同步清理该行为独占的 import、helper、常量、类型、request wrapper、状态、测试、mock 和注释；保留 helper 时必须有真实生产调用方证据，仅测试引用不能作为保留证据。
11. 如果 framework-approved spec 包含 trigger/context/handoff 假设，也要验证实现是否遵守。
12. 如涉及后端接口，验证 request/response handling 是否符合 framework-approved backend contract source，包括：
   - API docs
   - protobuf contracts
   - backend-owned TypeScript declarations
13. 如 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript，验证实现是否遵守 governing `tsconfig` 与已确认的相关声明来源，尤其是 alias resolution、ambient types、generated contracts 与 strictness-sensitive assumptions。
14. 如涉及样式变更，验证 authored styling 是否遵守 frontend-components policy：
   - 是否只使用 Tailwind CSS-style utility classes
   - 是否存在新增 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class
   - 是否存在超过项目 formatter 正常行宽或依赖多行包裹的 `class` / `className` / class binding
   - 是否存在用常量、map、computed、helper 或 import 变量隐藏过长 class 值
15. 如实现包含规则、校验、数据转换、状态派生、payload 构造或 adapter / mapper，验证是否遵守 functional-programming policy：
   - 确定性规则和转换是否可测试且结果符合预期
   - 是否没有在纯 helper 中隐藏副作用
   - 是否没有直接 mutate props、backend DTO、共享 store snapshot、函数参数或导入常量
   - 数据语义归一是否位于 adapter / mapper / `fromDetail`，而不是 computed / watch / template fallback
16. 在当前交付单元 `verification/verification.md` 中写出明确的 pass/fail 结论：
   - `spec constraint compliance: pass|fail`
   - `source grounding compliance: pass|fail`
   - `user intent compliance: pass|fail`（如适用）
   - `change-chain integrity: pass|fail`（如适用）
   - `removal cleanup compliance: pass|fail`（如适用）
   - `functional-programming compliance: pass|fail`（如适用）
   - `frontend styling compliance: pass|fail`（如适用）
   - `API contract conformance: pass|fail`（如适用）
   - `TypeScript context compliance: pass|fail`（如适用）
17. 保留 `state.json.loop`，不重置、不改写。
18. 若验证失败，明确记录失败原因，交回主 skill 回流到 `execute`，并继续同一 workflow run。
19. 本阶段不能在没有验证工件的情况下宣称完成。

## 输出格式

- 必须产出：
  - 当前交付单元的 `verification/verification.md`
  - 当前交付单元的 `verification/evidence/` 下的可选证据文件
- 最终交付物应包含：
  - acceptance coverage mapping
  - verification evidence
  - spec-constraint compliance 结论
  - source grounding compliance 结论
  - user-intent compliance 结论（如适用）
  - change-chain integrity 结论（修改或移除既有代码时适用）
  - functional-programming compliance 结论（如适用）
  - spec-plan granularity alignment 结论
  - frontend styling compliance evidence（如适用）
  - API contract conformance evidence（如适用）
  - TypeScript context compliance evidence（如适用）
  - failure records（如失败）
  - TDD exception checks（如适用）
  - workflow handoff readiness evidence（如适用）

## 验收标准

- 每条 acceptance criterion 都已被检查。
- 每个验证项都有附件或引用证据。
- 当前交付单元 `verification/verification.md` 已明确写出 spec constraints pass/fail。
- 当前交付单元 `verification/verification.md` 已明确写出 source grounding pass/fail，且实现没有未授权扩展。
- 如存在 user intent contract，当前交付单元 `verification/verification.md` 已明确写出 literal compliance 与 intent compliance pass/fail。
- 如存在既有代码修改或移除，当前交付单元 `verification/verification.md` 已明确写出变更前链路审查与变更后链路完整性复查结论。
- 如存在行为移除，当前交付单元 `verification/verification.md` 已明确写出删除依赖闭包清理结论。
- 如测试文件引用待改或待删代码，当前交付单元 `verification/verification.md` 已明确写出测试适配结论，且未把测试引用当成生产代码保留依据。
- 如涉及样式变更，当前交付单元 `verification/verification.md` 已明确写出 Tailwind CSS-style styling 与 class 值长度检查结论。
- 如涉及规则、校验、转换、状态派生或 payload 构造，当前交付单元 `verification/verification.md` 已明确写出 functional-programming compliance pass/fail。
- 如涉及 API 合同，当前交付单元 `verification/verification.md` 已明确写出 API contract conformance pass/fail。
- 如涉及 TypeScript context，当前交付单元 `verification/verification.md` 已明确写出 TypeScript context compliance pass/fail。
- 当前交付单元 `verification/verification.md` 已明确写出 spec-plan 粒度对齐结论。
- 对可测试行为的 TDD 例外都有明确理由和替代证据。
- 若存在失败，要么已修复，要么已明确回流执行。
- 若工作流要求 handoff / downstream-ready result，也已明确验证。
- 通过时 `state.json.stage=review`，且保留原有 `loop`。
- 若失败，记录足够精确，`execute` 不需等待用户重新描述即可继续。

## 安全边界

- 不能在没有证据时标记完成。
- 不能忽略失败的 acceptance criteria。
- 不能把 spec-constraint compliance 当作默认成立而不写 pass/fail。
- 不能把 source grounding compliance 当作默认成立而不写 pass/fail。
- 不能接受无法回溯到 framework-approved spec 的实现行为。
- 不能接受从常规做法、相邻模块、样例内容或个人偏好中扩展出来的实现行为。
- 不能在实现只满足字面要求但违反用户实际目标时判定验证通过。
- 不能在缺少变更前链路审查、变更后链路复查，或仍存在缺环、多余环节、重复路径、冲突路径、未授权邻近功能影响时判定验证通过。
- 不能在移除行为后仍有孤立 helper、unused import、stale request wrapper、obsolete state、测试或注释残留时判定验证通过。
- 不能因为测试文件引用待改或待删生产代码就判定该生产代码仍有真实调用方；测试必须适配新需求。
- 不能在 spec / plan 存在行为颗粒度冲突时仍判定验证通过。
- 不能在 request/response handling 与 framework-approved backend contract source 冲突时仍判定验证通过。
- 不能在 authored styling 违反 Tailwind CSS-style utility class、class 值长度或禁止隐藏过长 class 字符串规则时判定验证通过。
- 不能在存在隐藏副作用、隐藏 mutation、语义归一层级错误或不可读的过度函数式链路时判定 functional-programming compliance 通过。
