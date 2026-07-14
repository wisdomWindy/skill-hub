---
name: frontend-agent-framework-execute
description: Stage subskill for execution. Implement only framework-approved tasks and keep execution records aligned with the plan.
---

# Execute Subskill

## 触发场景

- 当主 `frontend-agent-framework` 将请求路由到 `stage=execute` 时使用。
- 适用于按已通过 framework 自动审批的 spec 和 plan 落地代码实现的阶段。

## 必要输入

- 当前交付单元的 `spec/spec.md`
- 当前交付单元的 `plan/plan.md`
- 当前交付单元的 `plan/task-board.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
- 当前交付单元的 `design/architecture-design.md`（如存在）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - 当前交付单元的 `spec/spec.md`
   - 当前交付单元的 `plan/plan.md`
   - 当前交付单元的 `plan/task-board.md`
   - `docs/requests/<request-id>/artifacts/code-context.md`（如存在）
   - 当前交付单元的 `design/architecture-design.md`（如存在）
   - `../../references/state-machine.md`
   - `../../references/templates/execution.md`
   - `../../references/templates/code-context.md`
   - `../../references/policies/api-contracts.md`
   - `../../references/policies/clean-code.md`
   - `../../references/policies/code-graph.md`
   - `../../references/policies/design-patterns.md`
   - `../../references/policies/spec-constraints.md`
   - `../../references/policies/frontend-architecture.md`
   - `../../references/policies/frontend-components.md`
   - `../../references/policies/functional-programming.md`
   - `../../references/policies/testing.md`
   - `../../references/policies/typescript-context.md`
   - `../../references/policies/user-intent.md`
2. 执行前要求当前交付单元 plan 已通过 framework 自动审批：
   - 拆分 PRD 模块：`state.json.module_flow.modules.<current-module-id>.approvals.plan_approved=true`
   - direct-change、bugfix 或非拆分请求：`state.json.approvals.plan_approved=true`
3. 仅实现已通过 framework 自动审批的任务。
4. 把 spec 与 plan 视为唯一实现合同。
5. 如果 plan 缺少关键字段、列、交互、状态或 loading 结束条件，停止执行并回退到 `plan`。
6. 如果 spec 与 plan 在行为颗粒度或产品含义上冲突，停止执行并回退修复工件。
7. 如果 spec / plan 包含 user intent contract，执行必须同时满足 literal request 与 practical goal；不得采用 forbidden interpretations，不得把复杂度、风险、歧义或责任转移到未检查位置。
8. 修改或移除既有代码前，必须先审查本次变更涉及的完整功能链路与文件引用关系：
   - 功能入口、组件 / hook / store / service / adapter / helper 链路
   - import / export、调用方、消费者、事件、watch / computed、测试与 mock
   - 请求、副作用、状态流转、下游 UI 或数据消费者
   - 当前变更 owner 与邻近影响面
   - 测试文件引用只作为测试适配面，不作为保留待改 / 待删生产代码的真实 owner
   如果无法确认链路 owner 或影响范围，先补 `artifacts/code-context.md` 或回退到 `plan`，不能直接编辑。
9. 如果任务是移除调用、请求、分支、字段、控件或副作用，必须追踪并清理该行为独占的依赖闭包：
   - import / export
   - helper function / constant / enum / type
   - request wrapper / composable / adapter
   - ref / reactive state / computed / watch
   - tests / mocks / comments
   对保留的 helper 必须确认仍存在真实生产调用方，不能因为“以后可能复用”或“测试还引用”保留死代码；仅测试引用视为空引用，必须修改或删除测试来适配需求。
10. 修改或移除既有代码后，必须复查操作后的链路是否正常：
   - 必要入口、状态流、请求、adapter、helper、UI 消费链路没有缺环
   - 被移除行为没有残留多余 import、helper、状态、副作用、测试、mock 或注释
   - 测试文件已按新行为更新、替换或删除，没有用旧测试引用反向保留生产代码
   - 替代实现没有形成重复路径、冲突路径或隐藏副作用
   - 邻近功能没有被未授权影响
11. 对可测试行为按 red -> green -> refactor 执行：
   - 先写失败测试
   - 再写最小通过实现
   - 最后重构并保持测试通过
12. 实现过程中应用 clean-code、functional-programming 规则和已批准的 pattern 决策。声明常量时必须先确认它至少承载稳定业务语义、集中规则或配置、必要快照、复杂表达式简化或真实复用之一：
   - 单次使用且显而易见的字符串、数字、布尔值、模板片段、对象 / 数组字面量、简单属性访问或简单表达式应保持内联，不能声明一个只复述值或下一步操作的常量
   - 不得为了假想复用创建模块级或导出常量，也不得给已有领域常量再声明同义或透传别名
   - 仅当前函数或组件拥有的值优先保持局部；只有存在真实跨作用域 owner 或调用方时才扩大常量作用域
   - 为避免重复或昂贵求值、固定非确定性 / 有状态读取的一次结果、支持类型收窄或显著改善多步控制流而声明的局部 `const` 可以保留
13. 对业务规则、校验、筛选排序、payload 构造、状态派生、adapter / mapper / `fromDetail` 转换，优先实现为可测试的纯函数或纯转换步骤：
   - 不直接 mutate props、backend DTO、共享 store snapshot、函数参数或导入常量
   - 请求、导航、写状态、缓存、埋点等副作用只能放在明确 command / action / request / lifecycle 边界
   - 纯 helper 不得隐藏 I/O、状态写入、导航、缓存、埋点或请求调用
   - adapter / mapper / `fromDetail` 负责数据语义归一；component `computed` 只承载视图局部派生，不能补做数据语义修正
   - 避免为了“函数式”写出难读的 point-free、过度 currying、过长 reducer chain 或未经批准的函数式工具库抽象
14. 实现新增或修改样式时，严格应用 frontend-components policy：
   - authored styling 只使用 Tailwind CSS-style utility classes
   - 不新增 scoped CSS、CSS modules、Sass/Less、inline style object 或非 utility semantic class 作为样式方案
   - `class` / `className` / class binding 值必须保持模板内可读，不超过项目 formatter 正常行宽或依赖多行包裹
   - 不得把过长 class 值移入常量、map、computed、helper 或 import 变量来绕过长度限制
   - 如 class 值过长，拆分 markup、提取更小组件或降低样式复杂度
15. 如果存在当前交付单元 `architecture-design`，把它视为执行期必须遵守的结构输入，包括模块边界、文件结构、代码关系、函数分层、数据结构和类型策略。
16. 如果实际代码情况证明当前 `architecture-design` 在下列任一方面 materially 不合理、不合适、不可行或与现实冲突，必须停止继续实现并回退到 `architecture-design`，不能在执行阶段临时绕过：
   - 模块边界
   - 文件结构
   - 依赖方向
   - 函数组织
   - 数据结构
   - 类型设计
17. 发生上述回退时，先把触发证据和实际约束写入当前交付单元 `execution/changelog.md` 与 `artifacts/code-context.md`，再由主 workflow 继续 `architecture-design -> spec -> plan -> execute` 循环，直到架构设计稳定。
18. 如果 scoped work 为从 0 开始搭建项目、应用、包或前端业务面：
   - 先按已通过 framework 自动审批的 spec / plan 确认脚手架或 starter 选择
   - 有合适脚手架时，优先基于该脚手架落地，而不是手写 bootstrap
   - 只有在 spec / plan 已明确记录脚手架不可用、不适配或改造成本不合理时，才允许自建初始化结构
   - 对脚手架的裁剪、替换和偏离必须受已批准工件约束，不能在执行时临时发明
19. 如果 scoped work 涉及 TypeScript 或依赖 TypeScript 声明才能正确实现的 JavaScript：
   - 先读取当前目标文件所在作用域的 governing `tsconfig`
   - 如存在直接 extends 链，继续读取所有会 materially 影响当前目标文件的上游 `tsconfig`
   - 提取并理解当前改动实际需要的 compiler context，例如路径别名、ambient globals、JSX runtime、strictness、module resolution、generated type visibility
   - 仅读取与当前改动闭包相关的声明或生成类型来源，例如直接导入类型、package-local `.d.ts`、env shim、backend-owned contract types、proto 生成类型
   - 不要为了“保险”全量扫描仓库所有 `.d.ts` 或 types 文件
   - 如果仍无法确认当前目标文件实际受哪套 `tsconfig` 或类型来源约束，停止编码，先补上下文
20. 对 API 集成工作：
   - 服务端有 TS contract types 时优先复用
   - 非 TS 契约时保留后端字段名并用 TS 类型表达
   - proto 优先复用生成类型，否则从 proto 导出 TS-facing types
   - request transport / contract handling / semantic normalization 保持在 request layer 或 adapter boundary
21. 既有代码影响较大时，优先用 code graph 确认 impact scope / callers / ownership boundaries。
22. 如执行中发现新的结构信息，更新 `artifacts/code-context.md`。
23. 默认串行执行，除非计划明确标注某些 work unit 可并行。
24. 持续更新：
   - 当前交付单元 `execution/changelog.md`
   - 当前交付单元 `plan/task-board.md`
25. 保持执行过程可观察、可追问、可重定向。
26. 保留 `state.json.loop`，不重置、不改写。
27. 如果需求变化或计划暴露出 gap，立即停下并回退到 `spec` 或 `plan`。
28. 如果是从 verify / review 失败回流而来，继续当前活动 workflow run，不当作全新任务重来。
29. 本阶段不宣称完成。

## 输出格式

- 必须产出：
  - 当前交付单元的 `execution/changelog.md`
  - 与计划任务对应的代码改动
  - 更新后的当前交付单元 `plan/task-board.md`
  - 更新后的 `artifacts/code-context.md`（如结构理解有变化）
- 最终交付物应包含：
  - 实现变更
  - 执行记录
  - 任务状态更新
  - 修改或移除既有代码时的变更前链路审查与变更后链路复查记录
  - TDD 执行证据或合理例外记录
  - 必要的 clean-code 重构
  - functional-programming 边界执行记录（如适用）
  - API / graph / adapter 相关实现与记录

## 验收标准

- 已通过 framework 自动审批的实现任务已完成。
- 如存在 user intent contract，执行结果同时满足 literal request 与 practical goal，且没有采用 forbidden interpretations。
- 如果修改或移除了既有代码，已审查完整功能链路、文件引用关系、调用方、副作用与影响面，并在操作后复查链路正常、无缺环、无多余环节。
- 如果任务移除了行为，已清理该行为独占的 import、helper、常量、类型、请求封装、状态、测试、mock 和注释；保留项都有真实生产调用方。
- 如果测试文件引用待改或待删代码，已将测试作为适配对象更新、替换或删除；没有把测试引用当作生产代码保留依据。
- 当前交付单元 `execution/changelog.md` 已记录关键决策与偏差。
- 对可测试行为，已记录 test-first 执行步骤或合理例外。
- 如存在规则、校验、转换、状态派生或 payload 构造，已按计划落实纯函数、不可变数据和显式副作用边界，或记录了合理例外。
- 若执行期曾发现架构设计与实际代码约束冲突，已留下可驱动 `architecture-design` 修正的证据。
- 若 scoped work 为 greenfield，执行已按批准工件优先采用对应脚手架或已记录拒绝理由。
- 如涉及样式变更，执行结果遵守 Tailwind CSS-style utility class、class 值长度、禁止隐藏过长 class 字符串的约束。
- 新增常量均能说明其业务语义、约束、必要快照、可读性收益或真实复用价值；不存在只给一次性显然值换名的无意义常量。
- 改动区域可读性仍然达标，必要的 clean-code 重构已完成或显式记录。
- 引入的 pattern 仍能回溯到已批准问题陈述。
- 当前交付单元 `plan/task-board.md` 已反映完成状态。
- `state.json.stage=verify`，且保留原有 `loop`。
- 已留下足够证据，使 `verify` 能立即接续。

## 安全边界

- 不能发明新需求。
- 不能猜 plan 未定义的产品行为。
- 不能用表面满足字面要求的方式规避用户真实意图。
- 不能在未审查完整功能链路、文件引用关系、调用方、副作用和影响面的情况下修改或移除既有代码。
- 不能在修改或移除后跳过链路复查，或保留缺少 owner 的多余环节。
- 不能因为测试文件仍引用待改或待删代码而保留生产代码；测试引用视为空引用，应修改测试适配需求。
- 不能只删除调用点却留下该调用独占的 helper、import、request wrapper、状态或测试注释。
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
- 不能声明只复述单次使用字面量、简单属性访问或简单表达式的无意义常量，也不能以假想复用为由扩大常量作用域或导出常量。
- 不能在纯 helper 中隐藏请求、状态写入、导航、缓存、埋点或其他副作用。
- 不能通过 mutate props、backend DTO、共享 store snapshot、函数参数或导入常量来完成数据转换。
- 不能把本应属于 adapter / mapper / `fromDetail` 的数据语义归一挪到 computed、watch 或模板兜底中。
- 不能在编码时私自发明新 pattern layer。
- 不能对 trivial / unplanned work 擅自启用 workflow-style parallel execution。
- 不能把关键进展与上下文切换藏在仓库工件之外。
