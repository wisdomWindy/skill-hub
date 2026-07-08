---
name: skill-generator
description: Create or update a Codex skill from a rough workflow, checklist, or requirement draft. Use when the user wants to build a new skill, refactor an existing skill, or turn a repeatable operating process into a reusable local Codex skill with valid `SKILL.md` and `agents/openai.yaml`.
---

# Create Codex Skill

## 触发场景

在下面这些情况使用本 skill：

- 用户明确要求“创建一个 skill”“把这个流程做成 skill”“补一个可复用的 Codex skill”。
- 已经有一段流程、规范、操作手册或口头要求，需要沉淀为可触发、可复用的 skill。
- 现有 skill 结构混乱、缺少元数据、缺少触发描述，需按规范补齐或重写。
- 需要在仓库本地 `.agents/skills/` 下交付可直接被后续 agent 使用的 skill。

如果用户只是询问“skill 是什么”或“怎么写 skill”，而没有要求落地创建文件，先回答问题，不直接创建目录。

## 必要输入

在开始创建前，收集并归一下面这些输入：

1. `skill_name`
   只允许小写字母、数字、连字符；如用户给的是自然语言标题，先转成 hyphen-case。
2. `skill_goal`
   这个 skill 解决什么问题，替谁省步骤。
3. `trigger_examples`
   至少 3 条可能触发这个 skill 的用户说法，用于写 frontmatter `description`。
4. `target_path`
   技能目录要创建到哪里。当前仓库默认使用 `.agents/skills/`；如果用户明确指定别处，按用户要求执行。
5. `delivery_scope`
   是“新建 skill”还是“更新已有 skill”。
6. `resource_needs`
   是否需要 `scripts/`、`references/`、`assets/`。没有明确必要时，不创建额外资源目录。

如果缺少 `skill_name`、`skill_goal` 或 `trigger_examples` 之一，不要硬生成成品；先用最少的问题补齐。

## 执行步骤

按下面顺序执行，不要跳步：

1. 读规范
   先读本仓库或当前环境中的 skill 创建规范，至少包括：
   `skill-creator/SKILL.md`、`references/openai_yaml.md`，以及目标仓库里已有 skill 样例。
2. 查现状
   检查目标目录是否已存在同名 skill，确认这是“新建”还是“更新”。
3. 判断资源形态
   根据用户流程判断是否真的需要 `scripts/`、`references/`、`assets/`。
   只有当存在重复代码、外部参考资料、模板资产时才创建对应目录。
4. 生成骨架
   优先使用标准初始化脚本生成骨架；如果环境限制导致脚本不可用，再手动创建等价目录结构。
5. 写元数据
   完成 `SKILL.md` frontmatter 的 `name` 与 `description`。
   `description` 必须同时说明“做什么”和“什么时候触发”，不能只写概念名词。
6. 写正文
   正文优先写 Codex 不知道、但执行任务时必须知道的步骤、判断条件和交付要求。
   删除模板中的 TODO、教学占位和无关说明。
7. 写 `agents/openai.yaml`
   至少补齐 `interface.display_name`、`interface.short_description`、`interface.default_prompt`、`policy.allow_implicit_invocation`。
   `default_prompt` 必须显式包含 `$skill-name`。
8. 校验结果
   优先运行现成校验脚本。
   如果校验脚本因环境缺依赖不可用，至少手动检查：
   frontmatter 是否完整、文件命名是否合法、是否仍残留 TODO、`openai.yaml` 字段是否齐全。
9. 汇报假设
   在最终交付说明里写明默认值、降级处理和未自动完成的部分。

## 输出格式

最终交付物应包含：

1. 一个完整 skill 目录，默认位于目标路径下的 `<skill-name>/`。
2. 必需文件：
   `SKILL.md`
   `agents/openai.yaml`
3. 可选文件：
   `scripts/`
   `references/`
   `assets/`
4. 一段交付说明，至少说明：
   创建或更新了哪些文件；
   是否使用了标准初始化脚本；
   校验是脚本通过还是人工校验；
   还存在什么假设或限制。

## 验收标准

满足下面条件才算完成：

1. skill 目录存在，且命名符合 lowercase-hyphen 规则。
2. `SKILL.md` frontmatter 合法，`name` 与目录名一致，`description` 具备触发语义。
3. `SKILL.md` 正文包含这六个部分：
   `触发场景`、`必要输入`、`执行步骤`、`输出格式`、`验收标准`、`安全边界`。
4. `agents/openai.yaml` 可读，且 `default_prompt` 显式引用 `$skill-generator` 或对应实际 skill 名称。
5. 文件中不残留 TODO、模板说明或明显占位文本。
6. 若环境允许，校验脚本通过；若环境不允许，已明确记录人工校验结论。

## 安全边界

下面这些动作不能自动做：

- 不要未经确认覆盖已有 skill 的关键内容；若是更新已有 skill，先读取并基于现状修改。
- 不要自动删除用户已有资源目录或资产文件，除非用户明确要求。
- 不要在缺少关键信息时凭空补全业务流程、外部 API 细节或组织规范。
- 不要为了让校验通过而编造依赖、脚本或引用文档。
- 不要把“什么时候触发”的语义只放在正文里；frontmatter `description` 必须同步表达。
- 不要创建用不到的 `scripts/`、`references/`、`assets/`，避免制造空壳资源。
