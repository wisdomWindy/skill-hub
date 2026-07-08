# 交付单元标识

- module_id: module-01-real-skill-data-directory

# 任务

## T1 - 创建真实 skill 数据目录

新增 `_data/real-skills/`，并通过脚本从 `.agents/skills` 同步生成 YAML。

```mermaid
flowchart TD
  A["读取本地 skill 源"] --> B["生成 SkillRecord YAML"]
  B --> C["写入 _data/real-skills"]
```

## T2 - 切换前端数据源

修改 `loadSkillRecords()`，只读取 `_data/real-skills/*.yaml`。

```mermaid
flowchart TD
  A["开始"] --> B["移除 .agents glob"]
  B --> C["读取 real-skills YAML"]
  C --> D["更新测试"]
```

## T3 - 验证

运行测试、类型检查和构建。

```mermaid
flowchart TD
  A["测试"] --> B["类型检查"]
  B --> C["构建"]
  C --> D["完成"]
```
