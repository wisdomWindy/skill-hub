# Clarifications - module-05-tailwind-style-refactor

## Question

“Tailwind CSS 风格”是否要求接入真实 Tailwind CSS，还是仅允许用自定义 utility class 模拟？

## Answer

按真实 Tailwind CSS 依赖和 Vite 构建接入理解。

## Final Decision

执行阶段应安装并配置 Tailwind CSS。若网络或依赖解析失败，需要阻塞并回报，而不是退回 scoped CSS 或行内样式。

## Affected Spec Area

- In Scope
- Page And Module Design
- Acceptance Criteria

## Question

禁止 “style 标签、内联样式、行内样式” 是否也禁止全局 CSS 文件？

## Answer

不禁止全局 CSS 文件。全局 CSS 文件用于 Tailwind 入口、主题变量、基础 reset 和 Markdown / highlight.js 生成 HTML 的样式边界。

## Final Decision

禁止范围是 Vue SFC `<style>` / `<style scoped>` 和模板 `style` 属性。`src/assets/styles/main.css` 可以继续存在，但要收敛职责。

## Affected Spec Area

- Function-Complete Behavior Breakdown
- Design Constraints
- Edge Cases
