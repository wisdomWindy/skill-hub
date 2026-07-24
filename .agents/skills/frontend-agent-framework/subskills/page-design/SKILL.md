---
name: frontend-agent-framework-page-design
description: Stage subskill for page design. Define page layout, visual hierarchy, styling direction, and interaction structure for page-oriented requests before the formal spec stage.
---

# Page Design Subskill

## 触发场景

- 当主 `frontend-agent-framework` 在 `intake` 之后判断该需求是页面型需求时使用。
- 适用于：
  - 新页面
  - 页面改版
  - 明显影响布局、样式、视觉层级、交互组织的 UI-heavy 变更

## 必要输入

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/requirements/requirement-map.md`
- `docs/requests/<request-id>/state.json`
- `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（拆分 PRD 模块适用）

当前交付单元路径规则：

- 拆分 PRD 模块：`docs/requests/<request-id>/module-runs/<current-module-id>/`
- direct-change、bugfix 或非拆分请求：`docs/requests/<request-id>/`

## 执行步骤

1. 先读：
   - `docs/requests/<request-id>/state.json`
   - `docs/requests/<request-id>/request.md`
   - `docs/requests/<request-id>/artifacts/prd-snapshot.md`
   - `docs/requests/<request-id>/requirements/requirement-map.md`
   - `docs/requests/<request-id>/requirements/modules/<current-module-id>.md`（如存在）
   - `../../references/framework-overview.md`
   - `../../references/state-machine.md`
   - `../../references/templates/page-design.md`
   - `../../references/policies/policy-index.md`
   - 按 `policy-index.md` 的 `page-design` 阶段映射读取本次页面设计适用的 policy 文件；默认至少读取 `frontend-components.md`、`doc-writing.md`；涉及 Vue SFC / 组件边界决策时读取 `vue-component-extraction.md`
2. 只在页面型需求中使用本阶段。
3. 仅为当前交付单元产出页面设计；拆分 PRD 工作不得跨模块混写。
4. 产出当前交付单元的 `design/page-design.md`。
5. 明确定义：
   - 页面布局结构
   - 区块层级
   - 样式方向
   - 交互骨架
   - 响应式考虑
   - Tailwind CSS-style utility class 约束与 class 值长度风险
   - Vue 组件抽取 / 不抽取决策：必须写明候选区块、是否抽取、触发的抽取条件或不抽取条件、props / emits / slots 边界、状态 owner、样式边界和验证面
6. 设计结果必须足够稳定，使当前交付单元的 `architecture-design`（如存在）和 `spec` 能把它当作上游输入，而不是再重新发明布局决策。
7. 拆分 PRD 工作必须以 `requirements/requirement-map.md` 和当前模块工件为页面范围来源，不得跨模块混写；direct-change、bugfix 或非拆分请求以 `request.md`、`artifacts/prd-snapshot.md` 和既有 code context 为范围来源。
8. 所有设计决策必须写入仓库工件，不保留在聊天上下文里。
9. 保留 `state.json.loop`，不重置、不改写。
10. 本阶段不写代码。
11. 对于引入或实质改变当前交付单元布局、视觉层级、样式方向、交互组织的页面需求，不允许跳过本阶段。

## 输出格式

- 必须产出：
  - 当前交付单元的 `design/page-design.md`
- 最终交付物应至少包含：
  - 页面布局结构
  - 区块层级
  - 样式方向
  - Tailwind CSS-style styling constraints
  - 交互骨架
  - 响应式考虑
  - 设计风险与未决 UI 问题

## 验收标准

- 当前交付单元 `design/page-design.md` 已存在。
- 文档已定义布局、层级、样式方向、交互结构、响应式考虑。
- 如涉及样式变更，文档已声明只能使用 Tailwind CSS-style utility classes，且不能用常量、computed 或 helper 隐藏过长 class 值。
- 如涉及 Vue 组件拆分，文档已明确哪些组件应抽取、哪些保持内联，以及每个决定对应的具体条件；没有使用“页面太长”“以后可能复用”这类泛化理由。
- 所有未决 UI 问题已记录。
- `state.json.stage` 已切换到当前交付单元的下一下游阶段，且保留原有 `loop`。

## 安全边界

- 不能写代码。
- 不能把本阶段强行变成像素级设计工具流程要求。
- 没有 durable design artifact 时，不能进入实现规划。
- 不能把本阶段用于不影响页面结构或样式的非 UI 任务。
