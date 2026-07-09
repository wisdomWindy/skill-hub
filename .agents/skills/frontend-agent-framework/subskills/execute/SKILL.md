---
name: frontend-agent-framework-execute
description: Stage subskill for execution. Implement only approved tasks and keep execution records aligned with the plan.
---

# Execute Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=execute` 时使用。
- 适用于按已批准 spec 和 plan 落地代码实现的阶段。

## 必要输入

- `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
- `docs/requests/<request-id>/module-runs/<current-module-id>/plan/plan.md`
- `docs/requests/<request-id>/module-runs/<current-module-id>/plan/task-board.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
- `docs/requests/<request-id>/module-runs/<current-module-id>/design/architecture-design.md`（如存在）

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/spec/spec.md`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/plan/plan.md`
   - `docs/requests/<request-id>/module-runs/<current-module-id>/plan/task-board.md`
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - `docs/requests/<request-id>/module-runs/<current-module-id>/design/architecture-design.md`（如存在）
   - `../../references/state-machine.md`
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
2. 执行前要求当前模块 `approvals.plan_approved=true`。
3. 仅实现已批准任务。
4. 把 spec 与 plan 视为唯一实现合同。
5. 如果 plan 缺少关键字段、列、交互、状态或 loading 结束条件，停止执行并回退到 `plan`。
6. 如果 spec 与 plan 在行为颗粒度或产品含义上冲突，停止执行并回退修复工件。
7. 对可测试行为按 red -> green -> refactor 执行：
   - 先写失败测试
   - 再写最小通过实现
   - 最后重构并保持测试通过
8. 实现过程中应用 clean-code 规则和已批准的 pattern 决策。
9. 实现新增或修改样式时，严格应用 frontend-components policy：
   - authored styling 只使用 Tailwind CSS-style utility classes
   - 不新增 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class 作为样式方案
   - `class` / `className` / class binding 值必须保持模板内可读，不超过项目 formatter 正常行宽或依赖多行包裹
   - 不得把过长 class 值移入常量、map、computed、helper 或 import 变量来绕过长度限制
   - 如 class 值过长，拆分 markup、提取更小组件或降低样式复杂度
10. 如果存在当前模块 `architecture-design`，把它视为执行期必须遵守的结构输入，包括模块边界、文件结构、代码关系、函数分层、数据结构和类型策略。
11. 如果实际代码情况证明当前 `architecture-design` 在下列任一方面 materially 不合理、不合适、不可行或与现实冲突，必须停止继续实现并回退到 `architecture-design`，不能在执行阶段临时绕过：
   - 模块边界
   - 文件结构
   - 依赖方向
   - 函数组织
   - 数据结构
   - 类型设计
12. 发生上述回退时，先把触发证据和实际约束写入当前模块 `execution/changelog.md` 与 `artifacts/code-context.md`，再由主 workflow 继续 `architecture-design -> spec -> plan -> execute` 循环，直到架构设计稳定。
13. 如果 scoped work 为从 0 开始搭建项目、应用、包或前端业务面：
   - 先按已批准 spec / plan 确认脚手架或 starter 选择
   - 有合适脚手架时，优先基于该脚手架落地，而不是手写 bootstrap
   - 只有在 spec / plan 已明确记录脚手架不可用、不适配或改造成本不合理时，才允许自建初始化结构
   - 对脚手架的裁剪、替换和偏离必须受已批准工件约束，不能在执行时临时发明
14. 如果 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript：
   - 先读取当前目标文件所在作用域的 governing `tsconfig`
   - 如存在直接 extends 链，继续读取所有会 materially 影响当前目标文件的上游 `tsconfig`
   - 提取并理解当前改动实际需要的 compiler context，例如路径别名、ambient globals、JSX runtime、strictness、module resolution、generated type visibility
   - 仅读取与当前改动闭包相关的声明或生成类型来源，例如直接导入类型、package-local `.d.ts`、env shim、backend-owned contract types、proto 生成类型
   - 不要为了“保险”全量扫描仓库所有 `.d.ts` 或 types 文件
   - 如果仍无法确认当前目标文件实际受哪套 `tsconfig` 或类型来源约束，停止编码，先补上下文
15. 对 API 集成工作：
   - 服务端有 TS contract types 时优先复用
   - 非 TS 契约时保留后端字段名并用 TS 类型表达
   - proto 优先复用生成类型，否则从 proto 导出 TS-facing types
   - request transport / contract handling / semantic normalization 保持在 request layer 或 adapter boundary
16. 既有代码影响较大时，优先用 code graph 确认 impact scope / callers / ownership boundaries。
17. 如执行中发现新的结构信息，更新 `artifacts/code-context.md`。
18. 默认串行执行，除非计划明确标注某些 work unit 可并行。
19. 持续更新：
   - 当前模块 `execution/changelog.md`
   - 当前模块 `plan/task-board.md`
20. 保持执行过程可观察、可追问、可重定向。
21. 保留 `state.json.loop`，不重置、不改写。
22. 如果需求变化或计划暴露出 gap，立即停下并回退到 `spec` 或 `plan`。
23. 如果是从 verify / review 失败回流而来，继续当前活动 workflow run，不当作全新任务重来。
24. 本阶段不宣称完成。

## 输出格式

- 必须产出：
  - `docs/requests/<request-id>/module-runs/<current-module-id>/execution/changelog.md`
  - 与计划任务对应的代码改动
  - 更新后的当前模块 `plan/task-board.md`
  - 更新后的 `artifacts/code-context.md`（如结构理解有变化）
- 最终交付物应包含：
  - 实现变更
  - 执行记录
  - 任务状态更新
  - TDD 执行证据或合理例外记录
  - 必要的 clean-code 重构
  - API / graph / adapter 相关实现与记录

## 验收标准

- 已批准的实现任务已完成。
- 当前模块 `execution/changelog.md` 已记录关键决策与偏差。
- 对可测试行为，已记录 test-first 执行步骤或合理例外。
- 若执行期曾发现架构设计与实际代码约束冲突，已留下可驱动 `architecture-design` 修正的证据。
- 若 scoped work 为 greenfield，执行已按批准工件优先采用对应脚手架或已记录拒绝理由。
- 如涉及样式变更，执行结果遵守 Tailwind CSS-style utility class、class 值长度、禁止隐藏过长 class 字符串的约束。
- 改动区域可读性仍然达标，必要的 clean-code 重构已完成或显式记录。
- 引入的 pattern 仍能回溯到已批准问题陈述。
- 当前模块 `plan/task-board.md` 已反映完成状态。
- `state.json.stage=verify`，且保留原有 `loop`。
- 已留下足够证据，使 `verify` 能立即接续。

## 安全边界

- 不能发明新需求。
- 不能猜 plan 未定义的产品行为。
- 不能在 spec / plan 冲突时擅自选一种解释实现。
- 不能在已证明 `architecture-design` 不合理时继续局部打补丁硬做下去。
- 不能无批准地本地重写服务端 TS contract types。
- 不能在无 adapter boundary 的情况下改名非 TS 后端字段。
- 不能在未读取 governing `tsconfig` 与相关声明来源的情况下猜路径别名、全局类型、JSX 设定、module resolution 或现有 contract types。
- 不能把“先把全仓 `.d.ts` 都读一遍”当作默认 TypeScript 上下文恢复策略。
- 不能在存在合适脚手架且未被上游工件否决的情况下手写 greenfield bootstrap。
- 不能用 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class 承载 authored styling。
- 不能保留过长 `class` / `className` / class binding 值，也不能用常量、map、computed、helper 或 import 变量隐藏过长 class 值。
- 不能跳过任务跟踪。
- 不能宣称请求完成。
- 对可测试行为，不能无说明地跳过 TDD。
- 不能把 spec / plan 当作可选参考。
- 不能在已触碰区域保留明显误导命名、隐藏副作用、重复业务规则而不处理。
- 不能在编码时私自发明新 pattern layer。
- 不能对 trivial / unplanned work 擅自启用 workflow-style parallel execution。
- 不能把关键进展与上下文切换藏在仓库工件之外。
