# SkillHub — 产品需求文档（PRD）

**版本**：v1.0.0 | **状态**：最终定稿 | **机密等级**：内部公开


## 一、文档信息

| 项目 | 内容 |
|------|------|
| 文档名称 | SkillHub —— 个人技能分发平台 |
| 版本号 | v1.0.0 |
| 作者 | 产品团队 |
| 创建日期 | 2026-07-07 |
| 最后更新 | 2026-07-07 |
| 发布模式 | **单维护者分发模型**（Sole Maintainer Distribution） |
| 技术栈 | Vue 3 + Vite + Pinia + GitHub Pages |

**变更记录**

| 日期 | 版本 | 变更内容 | 作者 |
|------|------|---------|------|
| 2026-07-07 | v1.0.0 | 初始版本创建（单维护者 + Vue 技术栈） | 产品团队 |


## 二、背景与产品定位

### 2.1 核心定位

SkillHub 是一个**个人技能分发站点**，而非社区协作平台。它的核心定位如下：

- **你（站点所有者）** 是唯一的技能开发者和发布者，负责开发和维护所有 AI 技能
- **访客（用户）** 是技能的消费者，可以浏览、搜索、查看技能文档，并**复制安装命令**在终端中完成安装
- 所有内容部署在 **GitHub Pages** 上，完全由你掌控，零服务器运维成本

### 2.2 典型工作流

```
[你] 开发技能 → 更新站点数据 → 推送到 GitHub → GitHub Actions 自动构建部署
                                                      ↓
[用户] 访问 SkillHub → 搜索/浏览技能 → 查看详情 → 复制安装命令 → 终端执行安装
```

### 2.3 与“社区平台”的本质区别

| 维度 | 社区平台（非本产品） | **SkillHub（本产品）** |
|------|---------------------|----------------------|
| 发布者 | 多人 | **仅站点所有者（你）** |
| 用户认证 | 必需（登录后发布/评论） | **无需登录**，完全公开访问 |
| 审核流程 | 管理员审核贡献者提交 | **无需审核**（自己对自己负责） |
| 评分/评论 | 公共评价系统 | **不需要**（纯文档分发） |
| 权限体系 | 复杂的 RBAC | **极简**：你（读写） vs 世界（只读） |

### 2.4 解决的问题

- **技能分发难**：好用的 AI 技能散落在本地，别人不知道、找不到
- **文档展示弱**：没有结构化的页面来展示技能的使用方法和参数
- **安装流程繁琐**：用户需要手动下载、配置，缺乏标准化的安装指引
- **版本管理混乱**：技能迭代后，用户无法确认当前使用的版本


## 三、产品目标与成功指标

### 3.1 产品愿景

SkillHub 是你的**个人技能展示窗与分发管道**——让团队/社区能快速发现你开发的 AI 技能，通过一键复制的终端命令完成安装，将“技能分发”的效率提升到极致。

### 3.2 业务目标

| 目标编号 | 目标描述 | 优先级 |
|---------|---------|--------|
| G1 | 为你的每一个技能提供结构化的展示页面与完整文档 | P0 |
| G2 | 让用户通过搜索和分类快速找到所需技能 | P0 |
| G3 | 提供清晰、可一键复制的终端安装命令 | P0 |
| G4 | 极简维护成本：你只需更新数据文件即可发布新技能 | P0 |
| G5 | 追踪技能的使用热度（可选） | P1 |

### 3.3 成功指标（上线后 3 个月）

- 站点月独立访客 ≥ 300 人（或根据实际受众自定目标）
- 技能详情页到“复制安装命令”的转化率 ≥ 50%
- 单个技能平均浏览时长 ≥ 1.5 分钟（表明文档被认真阅读）
- 站点首屏加载时间 < 1.5s
- 管理后台一次发布操作到线上可见时间 < 3 分钟


## 四、范围定义

### 4.1 功能范围（In Scope）

| 模块 | 说明 |
|------|------|
| 技能列表与卡片展示 | 所有已发布技能的网格/列表视图 |
| 分类筛选与关键词搜索 | 按分类浏览 + 全局关键词检索 |
| 技能详情页 | 完整文档、参数说明、使用示例 |
| **安装命令复制** | ⭐ 核心功能：一键复制终端安装命令 |
| 私有管理后台 | 仅你可见的技能增删改查界面（受路由保护） |
| 技能版本标识 | 展示当前版本号及更新日志 |
| 技能上下架 | 控制技能在公开站点的可见性 |
| 响应式设计 | 桌面端 + 平板 + 移动端完美适配 |
| 暗色/亮色主题 | 默认暗色主题，支持手动切换 |

### 4.2 明确不做（Out of Scope）

| 项目 | 说明 |
|------|------|
| 多用户注册与登录 | 普通用户无需任何账号即可使用全部公开功能 |
| 公开技能发布表单 | 只有你通过管理后台发布，不开放给公众 |
| 评分/评论系统 | 无社区互动功能 |
| 技能审核工作流 | 无待审核队列 |
| 收藏/关注 | 无需用户维度的个性化数据 |
| 专用 CLI 客户端 | 用户通过终端原生命令安装，无需安装额外客户端 |
| 技能包托管 | 技能包本体存储在 GitHub Releases，平台仅存储元数据和文档 |


## 五、用户角色

| 角色 | 数量 | 权限 |
|------|------|------|
| **维护者（你）** | 1 人 | 发布、编辑、删除、上下架技能；查看后台统计数据 |
| **消费者（访客）** | 无限 | 浏览、搜索、查看详情、复制安装命令（**无需登录**） |


## 六、功能需求（详细）

### 6.1 模块一：公开技能浏览（面向所有访客）

| 编号 | 需求描述 | 优先级 |
|------|---------|--------|
| FR1.1 | 首页展示所有已上架技能的卡片网格，每张卡片含：技能图标（若有）、名称、简短描述（≤120字）、分类标签、当前版本号 | P0 |
| FR1.2 | 顶部导航提供分类筛选下拉菜单（分类可配置，默认：开发工具 / 数据处理 / DevOps / 安全 / 办公自动化 / 其他） | P0 |
| FR1.3 | 全局搜索框：按技能名称和描述进行全文检索，实时显示匹配结果（支持模糊匹配） | P0 |
| FR1.4 | 排序选项：按发布时间（新→旧）、按名称（A→Z） | P1 |
| FR1.5 | 分页：每页 20 个技能，支持页码跳转或滚动加载 | P1 |
| FR1.6 | 空状态展示：当无技能或搜索结果为空时，展示友好的提示信息 | P1 |

**验收标准：**
- 未登录用户可完整访问所有公开页面，无任何功能受限
- 搜索响应 < 500ms（基于客户端预索引）
- 分类筛选与搜索条件可叠加使用

---

### 6.2 模块二：技能详情页（核心转化区）

| 编号 | 需求描述 | 优先级 |
|------|---------|--------|
| FR2.1 | 展示完整技能信息：大图标（若有）、名称、当前版本号、分类标签、作者（你）、最后更新时间 | P0 |
| FR2.2 | 详细描述区域（支持 Markdown 完整渲染）：功能说明、使用场景、前置依赖、环境要求 | P0 |
| FR2.3 | **📋 安装命令区域**（核心功能）—— 以高亮卡片形式展示终端安装命令，提供“一键复制”按钮，复制成功后给出 Toast 成功反馈 | P0 |
| FR2.4 | 参数配置说明：列出该技能支持的环境变量、命令行参数及其说明 | P1 |
| FR2.5 | 使用示例：展示 1–3 个典型使用场景的代码块（支持语法高亮） | P0 |
| FR2.6 | 版本历史：展示过往版本号及每个版本的更新日志（按时间倒序） | P1 |
| FR2.7 | 安装量计数（可选）：显示该技能被安装的次数（通过外部埋点或手动更新） | P2 |
| FR2.8 | 相关技能推荐：展示同分类下的其他技能（最多 4 个） | P2 |
| FR2.9 | 页面元信息：自动生成友好的 Open Graph 标签（标题、描述、图标），便于在社交媒体或即时通讯中分享 | P1 |

**安装命令展示示例：**
```bash
# 用户实际看到的安装命令区域（带复制按钮）
curl -fsSL https://yourdomain.com/install.sh | bash -s pdf-parser@v2.1.0
```
> 注：实际的安装脚本由你独立维护在仓库根目录，站点仅负责展示和复制。

**验收标准：**
- 所有代码块正确显示语法高亮
- 点击复制按钮后，剪贴板成功写入安装命令，并显示成功提示
- 详情页加载时间 < 800ms

---

### 6.3 模块三：私有管理后台（仅你可见）

| 编号 | 需求描述 | 优先级 |
|------|---------|--------|
| FR3.1 | **访问保护**：管理后台路径（如 `/admin`）通过 **GitHub OAuth** 保护，仅允许预设的 GitHub 账号（你的账号）登录访问 | P0 |
| FR3.2 | **后台仪表盘**：展示总技能数、已上架数、已下架数、累计安装量（若有）等概览卡片 | P1 |
| FR3.3 | **技能列表（管理视图）**：展示所有技能（含已下架），显示状态标签（上架/下架）、版本号、安装量，支持按状态筛选 | P0 |
| FR3.4 | **发布新技能**：表单填写——名称（自动生成 URL ID）、分类、版本号（SemVer）、简短描述、详细描述（Markdown）、安装命令模板、使用示例（可增删多个）、图标上传（1:1 裁剪）、自定义标签、更新日志 | P0 |
| FR3.5 | **编辑技能**：修改已有技能的所有字段，保存后自动触发重新构建部署 | P0 |
| FR3.6 | **上下架切换**：一键切换技能可见状态（下架后公开页面不可见，但已安装用户不受影响） | P0 |
| FR3.7 | **删除技能**：永久删除（需二次确认弹窗），同时从仓库中移除对应的 YAML 文件 | P1 |
| FR3.8 | **手动触发部署**：提供“立即重新部署”按钮，强制触发 GitHub Actions 构建（无需等待 Git Push） | P2 |
| FR3.9 | **数据导出**：将所有技能数据导出为单个 YAML 或 JSON 文件，便于备份或迁移 | P2 |

**发布/编辑表单核心字段：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | text | 是 | 技能显示名称 |
| `id` | text | 是 | URL 友好标识（自动根据名称生成 kebab-case，可手动修正） |
| `category` | 下拉选择 | 是 | 从预定义分类列表中选择 |
| `version` | text | 是 | 语义化版本号（校验格式：v1.2.3） |
| `shortDesc` | textarea | 是 | 简短描述（≤120 字符），展示在卡片上 |
| `fullDesc` | Markdown 编辑器 | 是 | 详细文档，支持实时预览 |
| `installCommand` | text | 是 | 用户要复制的完整终端命令 |
| `usageExamples` | 动态数组 | 否 | 每个示例含标题 + 代码块内容 |
| `icon` | 图片上传 | 否 | 技能图标（自动压缩，支持 PNG/JPG/SVG，≤1MB） |
| `tags` | 标签输入 | 否 | 多个自定义标签（如 `pdf`, `ocr`, `automation`） |
| `changelog` | Markdown | 否 | 本次版本的更新内容 |

**验收标准：**
- 非管理员访问 `/admin` 路径时自动跳转到 GitHub OAuth 授权页，或显示 404/403
- 表单所有必填字段校验通过后方可提交
- 版本号格式校验严格，不符合 SemVer 规范时给出错误提示
- 图标上传后自动裁剪为 200×200 正方形，并转换为 WebP 格式存储为 Base64 或上传到仓库
- 保存成功后，页面给出明确的状态反馈（“提交成功，正在触发部署...”）

---

### 6.4 模块四：数据存储与部署机制（架构核心）

| 编号 | 需求描述 | 优先级 |
|------|---------|--------|
| FR4.1 | 所有技能数据以 YAML 文件格式存储在 `_data/skills/` 目录下，每个技能一个文件（如 `pdf-parser.yaml`） | P0 |
| FR4.2 | 站点配置（分类列表、管理员 GitHub ID、站点标题等）存储在 `_data/config.yaml` 中 | P0 |
| FR4.3 | 管理后台的操作（发布/编辑/删除/上下架）实际为修改仓库中的 YAML 文件，并通过 **GitHub API** 提交 Commit 到 `main` 分支 | P0 |
| FR4.4 | GitHub Actions 监听 `main` 分支的 push 事件，自动触发 Vite 静态站点构建并部署到 `gh-pages` 分支 | P0 |
| FR4.5 | GitHub Pages 从 `gh-pages` 分支托管站点，对外提供服务 | P0 |
| FR4.6 | 每次通过管理后台修改数据时，Commit 信息自动记录操作类型和技能名称（如 `chore: update skill pdf-parser to v2.1.0`） | P1 |

**数据流示意图：**
```
[管理后台操作] → [修改 YAML 文件] → [GitHub API Commit & Push]
       ↓
[GitHub Actions 构建] → [Vite 生成静态 HTML] → [部署到 gh-pages]
       ↓
[GitHub Pages] → [用户访问 skillhub.yourdomain.com]
```


## 七、非功能需求

### 7.1 性能要求

| 指标 | 要求 | 测量方式 |
|------|------|---------|
| 首页首屏加载（FCP） | < 1.2s | Lighthouse |
| 技能详情页加载（LCP） | < 1.5s | Lighthouse |
| 搜索响应时间 | < 300ms（客户端检索） | 手动计时 |
| 管理后台表单提交到站点更新 | < 3 分钟 | 端到端计时 |
| 并发用户支持 | ≥ 1000（GitHub Pages 天然承载） | — |

### 7.2 可用性与可靠性

- 系统可用性 ≥ 99.5%（依托 GitHub Pages SLA）
- 构建失败时自动保留上一次成功构建的站点，服务不中断
- 数据存储在 Git 仓库中，每次变更均可追溯和回滚（`git revert`）

### 7.3 安全性

| 要求 | 说明 |
|------|------|
| 全站 HTTPS | GitHub Pages 自带免费 TLS 证书 |
| 管理后台认证 | GitHub OAuth 严格校验，仅允许预设的 GitHub 用户 ID（你的账号） |
| GitHub Token 安全 | Personal Access Token 仅用于后端 API 调用，不暴露给前端静态资源 |
| 文件上传安全 | 图标上传做文件类型（仅图片）和大小（≤1MB）双重校验，防止恶意文件 |
| XSS 防护 | 对用户输入的 Markdown 内容做 XSS 过滤（使用 DOMPurify 或类似库） |
| CSRF 防护 | 管理后台写操作携带 CSRF Token（或利用 GitHub OAuth State 参数） |

### 7.4 可维护性

- 技能数据与站点代码物理分离（`_data/` 目录独立），新增/修改技能无需改动源码
- 新增分类仅需在 `_data/config.yaml` 中追加，无需修改代码逻辑
- 使用 TypeScript 提供完整的类型安全，降低维护成本
- 开发环境支持 HMR（热模块替换），调试体验流畅

### 7.5 兼容性

| 维度 | 要求 |
|------|------|
| 浏览器 | Chrome / Firefox / Safari / Edge 最新两个版本 |
| 操作系统 | Windows / macOS / Linux 桌面端 + iOS / Android 移动端 |
| 屏幕适配 | 响应式设计：桌面（≥1280px）、平板（768–1279px）、移动（<768px） |
| 主题 | 默认暗色主题，支持手动切换亮色，并自动跟随系统偏好 |


## 八、数据模型

### 8.1 Skill（技能）—— 存储于 `_data/skills/{id}.yaml`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 唯一标识（kebab-case），用作 URL slug |
| `name` | string | 是 | 技能显示名称（如 "PDF Parser"） |
| `category` | string | 是 | 分类（枚举值，需匹配 config.yaml 中的定义） |
| `version` | string | 是 | 语义化版本号（如 v2.1.0） |
| `shortDesc` | string | 是 | 简短描述（≤120 字符） |
| `fullDesc` | string | 是 | 详细描述（Markdown 格式） |
| `installCommand` | string | 是 | 完整的终端安装命令 |
| `usageExamples` | array[UsageExample] | 否 | 使用示例数组 |
| `icon` | string | 否 | 图标 Data URL 或 CDN 地址 |
| `tags` | array[string] | 否 | 自定义标签（如 `["pdf", "ocr"]`） |
| `changelog` | string | 否 | 更新日志（Markdown 格式） |
| `status` | enum | 是 | `published` / `archived` |
| `installCount` | number | 是 | 累计安装次数（默认 0，可手动更新） |
| `createdAt` | datetime | 是 | 创建时间（ISO 8601） |
| `updatedAt` | datetime | 是 | 最后更新时间（ISO 8601） |

**UsageExample（使用示例）结构：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 示例标题（如 "基础文本提取"） |
| `code` | string | 示例命令或代码块内容 |

### 8.2 Config（站点配置）—— 存储于 `_data/config.yaml`

| 字段 | 类型 | 说明 |
|------|------|------|
| `site.title` | string | 站点标题，显示在浏览器标签栏和首页 |
| `site.description` | string | 站点描述，用于 SEO |
| `site.baseUrl` | string | 站点根 URL（如 `https://skillhub.dev`），用于生成完整安装命令链接 |
| `admin.githubId` | number | 允许访问管理后台的 GitHub 用户 ID（即你的 ID） |
| `admin.githubUsername` | string | 允许访问管理后台的 GitHub 用户名（便于识别） |
| `categories` | array[Category] | 分类列表，每个分类含 `key`（如 `dev`）和 `label`（如 "开发工具"） |


## 九、用户界面设计要点

### 9.1 公开站点（消费者视角）

| 页面 | 设计要点 |
|------|---------|
| **首页** | 顶部居中大标题 + 搜索框（类似文档站），下方为分类快捷入口（横向滚动标签），再下方为“最新技能”卡片网格（4列响应式） |
| **列表页** | 左侧分类侧边栏（可折叠），右侧卡片网格，顶部带排序下拉和结果数量统计 |
| **详情页** | 左侧主区域（2/3 宽度）：面包屑导航、技能名称/版本/分类标签、详细描述（Markdown 渲染）、使用示例（代码块）；右侧边栏（1/3 宽度）：**安装命令高亮卡片（带复制按钮，粘贴图标醒目）**、版本历史列表、安装量计数 |
| **全局组件** | 顶部导航栏（左侧 Logo + 站点名，右侧搜索入口 + 主题切换按钮） |
| **主题** | 默认深色（#0d1117 背景），强调色使用 `#00D4AA`（科技感薄荷绿），卡片圆角 12px，柔和阴影 |

### 9.2 管理后台（维护者视角）

- 独立布局，与公开站点视觉区分（顶部显示“管理后台”标识）
- 左侧垂直导航：仪表盘 / 技能列表 / 发布新技能 / 设置
- 表单采用两栏布局：左侧字段输入区，右侧 Markdown 实时预览区
- 所有操作按钮带 loading 状态和明确的成功/失败反馈（Toast/Message）
- 技能列表支持行内快速上下架切换（Toggle Switch）


## 十、技术架构设计（Vue 生态）

### 10.1 设计原则

- **静态优先（Static-First）** ：完全预渲染为静态 HTML，部署到 GitHub Pages，无需任何服务端运行时
- **Git-Native 数据流**：所有技能数据以 YAML 存储在仓库中，管理后台操作本质为 Git Commit
- **零后端运维**：依赖 GitHub API + 浏览器本地能力，无需维护任何云服务器或数据库
- **渐进增强**：核心浏览功能（列表/详情）在 JavaScript 未完全加载时仍可读，搜索和后台管理为增强交互

### 10.2 技术栈选型（Vue 全家桶）

| 层级 | 技术选型 | 版本 | 说明 |
|------|---------|------|------|
| **前端框架** | **Vue 3** | ≥ 3.4 | 组合式 API + `<script setup>` 语法，轻量高效 |
| **构建工具** | **Vite** | ≥ 5.0 | 极速冷启动，原生 ESM，完美适配 Vue 生态 |
| **静态站点生成** | **vite-ssg** | ≥ 0.23 | Vue 官方推荐的 SSG 插件，支持路由级预渲染 |
| **路由** | **Vue Router** | ≥ 4.0 | 管理 SPA 路由（公开站点 + 管理后台） |
| **状态管理** | **Pinia** | ≥ 2.0 | Vue 官方推荐，轻量且类型安全 |
| **UI 组件库** | **Naive UI** | ≥ 2.38 | 完全 TypeScript，内置暗色主题，组件丰富（表格、表单、弹窗、消息），对 Vue 3 支持完美 |
| **样式方案** | **Tailwind CSS** + `@vueuse/head` | ≥ 3.0 | 原子化 CSS 快速布局；VueUse 管理页面元信息 |
| **Markdown 渲染** | **markdown-it** + **highlight.js** | 最新 | 将技能详细描述和更新日志渲染为 HTML，支持代码语法高亮 |
| **HTTP 客户端** | **Axios** | 最新 | 调用 GitHub API 进行数据读写（管理后台） |
| **GitHub API 封装** | **@octokit/rest** | ≥ 20.0 | 官方 SDK，类型完善，用于管理后台对仓库的 CRUD 操作 |
| **认证方案** | **GitHub OAuth Device Flow** + `@vueuse/core` | 最新 | 仅用于管理员登录，通过 OAuth 换取 Token，限制特定 GitHub ID |
| **工具库** | **@vueuse/core** | ≥ 10.0 | Vue 组合式工具集（`useLocalStorage`、`useDark`、`useFetch`） |
| **包管理器** | **pnpm** | ≥ 8.0 | 节省磁盘空间，依赖安装速度快 |
| **语言** | **TypeScript** | ≥ 5.0 | 完整类型安全，提升代码质量 |

### 10.3 项目目录结构

```
skillhub/
├── .github/
│   └── workflows/
│       └── deploy.yml                     # GitHub Actions CI/CD
├── public/
│   ├── install.sh                         # 提供给用户的通用安装脚本
│   └── favicon.ico
├── src/
│   ├── assets/                            # 静态资源（全局样式、字体）
│   │   ├── styles/
│   │   │   ├── main.css                   # Tailwind 入口
│   │   │   └── markdown.css               # Markdown 渲染样式
│   │   └── logo.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.vue              # 顶部导航
│   │   │   ├── AppFooter.vue              # 底部版权
│   │   │   ├── SearchBar.vue              # 全局搜索框
│   │   │   └── ThemeToggle.vue            # 暗色/亮色切换
│   │   ├── skill/
│   │   │   ├── SkillCard.vue              # 技能卡片（列表/首页用）
│   │   │   ├── SkillDetail.vue            # 详情主内容
│   │   │   ├── InstallCommand.vue         # ⭐ 安装命令展示+复制组件
│   │   │   ├── VersionHistory.vue         # 版本历史列表
│   │   │   └── RelatedSkills.vue          # 相关技能推荐
│   │   └── admin/
│   │       ├── AdminLayout.vue            # 后台布局（侧边栏 + 头部）
│   │       ├── SkillForm.vue              # 发布/编辑技能表单
│   │       ├── SkillTable.vue             # 管理技能列表
│   │       ├── StatsCards.vue             # 统计概览卡片
│   │       └── MarkdownEditor.vue         # Markdown 编辑器（含预览）
│   ├── views/
│   │   ├── Home.vue                       # 首页（搜索 + 分类导航 + 最新技能）
│   │   ├── List.vue                       # 技能列表页（分类筛选 + 搜索 + 排序）
│   │   ├── Detail.vue                     # 技能详情页
│   │   ├── AdminLogin.vue                 # 管理员登录页（OAuth 跳转）
│   │   └── admin/
│   │       ├── Dashboard.vue              # 后台仪表盘
│   │       ├── SkillList.vue              # 管理技能列表（含上下架操作）
│   │       └── SkillEditor.vue            # 发布/编辑技能（两栏 + 实时预览）
│   ├── stores/
│   │   ├── index.ts                       # Pinia 入口
│   │   ├── theme.ts                       # 暗色/亮色主题偏好
│   │   ├── admin.ts                       # 管理员认证状态
│   │   └── skill.ts                       # 技能列表缓存与搜索筛选
│   ├── router/
│   │   └── index.ts                       # Vue Router 配置（含后台路由守卫）
│   ├── utils/
│   │   ├── github.ts                      # GitHub API 封装（Octokit 实例 + Token）
│   │   ├── yaml.ts                        # YAML 序列化/反序列化（js-yaml）
│   │   ├── markdown.ts                    # Markdown 渲染配置（markdown-it 实例）
│   │   ├── validator.ts                   # 版本号校验、表单校验
│   │   └── constants.ts                   # 分类常量、站点配置
│   ├── types/
│   │   ├── skill.d.ts                     # Skill 类型定义
│   │   └── config.d.ts                    # Config 类型定义
│   ├── App.vue
│   └── main.ts                            # Vue 应用入口
├── _data/                                 # 📦 核心数据目录（与代码分离）
│   ├── skills/
│   │   ├── pdf-parser.yaml
│   │   ├── code-reviewer.yaml
│   │   └── ...                            # 每个技能一个 YAML 文件
│   └── config.yaml                        # 站点配置
├── index.html
├── vite.config.ts                         # Vite 配置（含 SSG 插件）
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 10.4 静态生成策略（SSG）

由于站点部署在 GitHub Pages（纯静态环境），采用 `vite-ssg` 实现预渲染：

| 策略 | 实现方式 | 适用页面 |
|------|---------|---------|
| **完全静态生成** | 使用 `vite-ssg` 插件，在构建时读取 `_data/skills/*.yaml`，为每个技能生成独立的 `/detail/{id}/index.html` | 首页、列表页、所有详情页 |
| **客户端动态路由** | 管理后台（`/admin/*`）不预渲染，仅在客户端加载后通过 Vue Router 动态挂载（需认证） | 所有后台页面 |
| **构建优化** | 技能数量 < 100 时，全量构建时间 < 30s；使用 `rollup-plugin-visualizer` 分析包体积 | 持续优化 |

**核心配置示例（vite.config.ts）：**
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import SSG from 'vite-ssg'
import yaml from '@modyfi/vite-plugin-yaml'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    yaml(), // 支持直接 import .yaml 文件
    SSG({
      include: ['/**'], // 预渲染所有路由
      format: 'html',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, './_data'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})
```

### 10.5 数据流与 Git 操作（管理后台核心）

#### 10.5.1 读取流程（公开站点）

1. **构建时**：Vite 通过 `import` 语句直接读取 `_data/skills/*.yaml` 文件，将数据注入到 Vue 组件的 `setup` 中
2. **运行时**：公开页面直接使用构建时注入的数据，无额外 API 请求（加载极快，完全离线可用）
3. **搜索/筛选**：在客户端内存中对预加载的技能列表进行实时过滤（使用 `Fuse.js` 做模糊搜索）

#### 10.5.2 写入流程（管理后台）

当你在管理后台发布/编辑/删除技能时，完整技术流程如下：

| 步骤 | 操作 | 技术细节 |
|------|------|---------|
| 1 | 填写表单并提交 | 前端组装技能对象，进行字段校验 |
| 2 | 转换为 YAML | 使用 `js-yaml` 将对象序列化为 YAML 字符串 |
| 3 | 获取最新 Commit SHA | 调用 Octokit `GET /repos/{owner}/{repo}/git/ref/heads/main` |
| 4 | 创建或更新文件 | 调用 Octokit `PUT /repos/{owner}/{repo}/contents/_data/skills/{id}.yaml`，携带 YAML 内容和 Base64 编码 |
| 5 | 提交 Commit | 在上述 API 调用中填写 Commit 信息（如 `feat: add new skill pdf-parser v1.0.0`） |
| 6 | 触发部署 | Push 到 `main` 分支后，GitHub Actions 自动执行构建部署 |
| 7 | 反馈结果 | 前端轮询或通过 WebSocket（可选）感知部署状态，给用户“发布成功，正在部署...”的提示 |

**关键代码示意（Octokit 写入）：**
```typescript
import { Octokit } from '@octokit/rest'
import { encode } from 'js-base64'

const octokit = new Octokit({ auth: token })
await octokit.repos.createOrUpdateFileContents({
  owner: 'your-username',
  repo: 'skillhub',
  path: `_data/skills/${skillId}.yaml`,
  message: `feat: ${action} skill ${skillId} v${version}`,
  content: encode(yamlString),
  branch: 'main',
})
```

### 10.6 认证与安全（管理后台）

由于只有你（唯一维护者）需要访问后台，认证方案设计如下：

| 方案 | 实现 | 优点 |
|------|------|------|
| **GitHub OAuth（推荐）** | 前端跳转 GitHub OAuth 授权页，回调后换取 Token，校验 `user.id` 是否等于 `_data/config.yaml` 中预设的 `admin.githubId` | 无需记忆密码，复用 GitHub 身份，安全等级高 |
| **Token 存储** | OAuth 交换得到的 Token 仅存储在 Pinia 的 `admin` store 中（内存），不持久化到 localStorage（避免 XSS 窃取） | 每次刷新页面需重新登录，但安全性最佳 |

**OAuth 流程（简化）：**
1. 访问 `/admin` → 路由守卫检测到未登录 → 重定向到 GitHub OAuth 授权页
2. 用户（你）在 GitHub 授权 → 携带 `code` 回调到 `/admin/callback`
3. 前端将 `code` 发送到 **极简 Token 交换服务**（可使用 Cloudflare Worker 或 GitHub Actions 部署的轻量 API，也可利用 GitHub OAuth Device Flow 直接在浏览器完成）
4. 换取 `access_token` 后，调用 GitHub API 获取用户信息，校验 ID
5. 校验通过，写入 Pinia store，允许访问后台

> **备选方案**：如果不想额外部署 Token 交换服务，可使用 **GitHub OAuth Device Flow**（适用于无后端场景），完全在浏览器端完成认证，无需中间服务。

### 10.7 部署流水线（GitHub Actions）

```yaml
# .github/workflows/deploy.yml
name: Deploy SkillHub to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch: # 允许手动触发

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build static site
        run: pnpm build
        env:
          NODE_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 10.8 性能优化策略

| 优化项 | Vue 生态方案 |
|--------|-------------|
| 代码分割 | Vite 自动基于动态 `import()` 分割路由模块，管理后台与公开站点分开打包 |
| 预加载 | 使用 `@vueuse/head` 对详情页 `<link rel="prefetch">` 提前加载相邻技能 |
| 图片优化 | 技能图标上传时使用 `browser-image-compression` 库自动压缩为 WebP 格式 |
| 搜索性能 | 使用 `Fuse.js` 在客户端进行模糊搜索，构建时预生成搜索索引 JSON，减少运行时计算 |
| 组件按需加载 | Naive UI 配合 `unplugin-vue-components` 自动按需引入组件 |
| 静态资源 CDN | 通过 GitHub Pages 全球 CDN 自动加速静态资源 |


## 十一、实施与上线计划

### 11.1 里程碑（一次性全量发布）

| 阶段 | 周期 | 交付内容 |
|------|------|---------|
| **设计阶段** | 第 1 周 | UI 设计稿、交互原型、数据模型确认 |
| **核心开发** | 第 2–4 周 | 公开站点（首页/列表/详情）+ 安装命令组件 + 管理后台（CRUD） |
| **集成与测试** | 第 5 周 | GitHub Actions 流水线调试、端到端测试、安全加固、跨浏览器测试 |
| **预发布** | 第 6 周 | 部署到你自己的 GitHub Pages，内部验证 5–10 个技能发布流程 |
| **正式上线** | 第 7 周 | 对外公开访问，正式发布 v1.0 |

### 11.2 日常维护操作手册（你的视角）

| 操作 | 步骤 |
|------|------|
| **发布新技能** | 访问 `https://yourdomain.com/admin` → GitHub OAuth 登录 → 点击“发布新技能” → 填写表单 → 提交 → 等待约 2 分钟部署完成 |
| **更新已有技能** | 进入管理后台 → 技能列表 → 点击“编辑” → 修改内容 → 保存（自动触发重新部署） |
| **下架技能** | 技能列表 → 点击“下架”开关 → 技能在公开站点不可见 |
| **删除技能** | 技能列表 → 点击“删除” → 二次确认 → 永久移除（同时从仓库中删除 YAML 文件） |

### 11.3 上线检查清单（Go/No-Go）

- [ ] GitHub OAuth 配置正确，仅预设的 GitHub 账号可登录管理后台
- [ ] GitHub Personal Access Token 具有 `repo` 和 `workflow` 权限，且配置为仓库 Secret
- [ ] `_data/config.yaml` 中的 `admin.githubId` 已正确填写（你的 GitHub ID）
- [ ] GitHub Actions 构建部署流程验证通过（至少成功部署一次）
- [ ] 至少预置 5 个示例技能（可展示站点效果的虚拟数据）
- [ ] 安装命令中的 `baseUrl` 替换为你的实际域名
- [ ] 页面 Meta 信息（标题/描述/OG 图片）配置完整，社交分享预览正常
- [ ] 响应式测试通过（手机/平板/桌面，暗色/亮色主题）
- [ ] 所有外部链接（GitHub 仓库、文档）检查无误


## 十二、风险与依赖

### 12.1 主要风险

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|---------|
| GitHub API Token 泄露 | 攻击者可篡改技能数据 | 低 | Token 仅用于管理后台服务端逻辑，不暴露给前端；使用 GitHub 精细令牌（Fine-grained Token）限制到特定仓库和特定操作 |
| GitHub Actions 构建失败 | 站点更新中断，用户看到旧内容 | 中 | 配置构建失败告警（邮件/钉钉）；保留上次成功构建的静态文件；提供“手动重新部署”按钮作为应急手段 |
| 安装命令脚本失效 | 用户无法正确安装技能 | 中 | 将安装脚本作为独立仓库维护，技能详情页仅展示命令；脚本需经你充分测试后再发布新版本 |
| 冷启动（技能太少） | 用户访问后无实质内容，流失 | 中 | 上线前准备 10+ 个真实可用的高质量技能作为种子库，确保站点看起来丰富 |
| 浏览器兼容性问题 | 部分用户无法正常访问 | 低 | 上线前通过 BrowserStack 或类似工具测试主流浏览器；使用 Polyfill 确保基础功能在旧浏览器可用 |

### 12.2 关键依赖

| 依赖项 | 说明 | 风险等级 |
|--------|------|---------|
| GitHub API 服务可用性 | 管理后台的读写操作依赖 GitHub API | 中（GitHub 提供 99.9% SLA） |
| GitHub Pages 服务稳定性 | 站点的最终托管依赖 GitHub Pages | 低（SLA 极高） |
| GitHub OAuth 服务 | 管理后台登录依赖 OAuth 流程 | 低 |
| 你的域名 DNS 解析 | 若使用自定义域名，需确保 DNS 配置正确 | 低 |


## 十三、附录

### 13.1 一个技能的完整 YAML 数据示例

```yaml
id: pdf-parser
name: PDF Parser
category: data
version: v2.1.0
shortDesc: 从 PDF 中提取文本、表格和元数据，支持 OCR 识别
fullDesc: |
  ## 功能概述
  该技能用于自动化 PDF 文档解析，支持：
  - 文本提取（保留段落结构）
  - 表格识别（输出为 CSV/JSON）
  - 元数据提取（作者、标题、页数）
  - 光学字符识别（OCR，支持扫描版 PDF）
  
  ## 前置依赖
  - Python 3.9+
  - Tesseract OCR（仅扫描版需要）
  
  ## 使用场景
  适用于财务报告解析、合同审核、学术论文数据提取等批量文档处理任务。
installCommand: curl -fsSL https://skillhub.dev/install.sh | bash -s pdf-parser@v2.1.0
usageExamples:
  - title: 基础文本提取
    code: |
      skill run pdf-parser --input document.pdf --output text.json
  - title: 表格识别为 CSV
    code: |
      skill run pdf-parser --input invoice.pdf --extract-tables --format csv
  - title: 批量处理（启用 OCR）
    code: |
      skill run pdf-parser --input ./invoices/*.pdf --ocr --output ./output/
icon: data:image/svg+xml;base64,PHN2ZyB...
tags: [pdf, ocr, document-parsing, automation]
status: published
installCount: 142
createdAt: 2026-06-01T10:00:00Z
updatedAt: 2026-07-07T14:30:00Z
changelog: |
  ## v2.1.0 (2026-07-07)
  - 新增 OCR 支持，可识别扫描版 PDF
  - 优化内存占用，支持 500MB+ 大文件处理
  
  ## v2.0.0 (2026-06-15)
  - 重构解析引擎，速度提升 40%
  - 新增表格识别功能
```

### 13.2 站点配置示例（`_data/config.yaml`）

```yaml
site:
  title: SkillHub
  description: AI 技能分发与文档中心
  baseUrl: https://skillhub.dev

admin:
  githubId: 12345678           # 替换为你的 GitHub 用户 ID
  githubUsername: yourname     # 替换为你的 GitHub 用户名

categories:
  - key: dev
    label: 开发工具
  - key: data
    label: 数据处理
  - key: devops
    label: DevOps
  - key: security
    label: 安全
  - key: office
    label: 办公自动化
  - key: other
    label: 其他
```

### 13.3 安装脚本设计建议（`public/install.sh`）

你可以提供如下通用安装脚本，放置在站点根目录下：

```bash
#!/bin/bash
# SkillHub 通用安装脚本
# 用法: curl -fsSL https://skillhub.dev/install.sh | bash -s <skill-name>@<version>

set -e

SKILL_FULL=$1
SKILL_NAME=$(echo $SKILL_FULL | cut -d'@' -f1)
VERSION=$(echo $SKILL_FULL | cut -d'@' -f2)

if [ -z "$SKILL_NAME" ]; then
  echo "错误: 请指定技能名称"
  echo "用法: curl -fsSL https://skillhub.dev/install.sh | bash -s <skill-name>@<version>"
  exit 1
fi

INSTALL_DIR="${HOME}/.skillhub/${SKILL_NAME}"
mkdir -p "$INSTALL_DIR"

# 从 GitHub Releases 下载对应的技能包
RELEASE_URL="https://github.com/yourusername/skillhub/releases/download/${VERSION}/${SKILL_NAME}.tar.gz"
curl -fsSL "$RELEASE_URL" -o "/tmp/${SKILL_NAME}.tar.gz"
tar -xzf "/tmp/${SKILL_NAME}.tar.gz" -C "$INSTALL_DIR"

echo "✅ 技能 ${SKILL_NAME} 安装成功！"
echo "📁 安装位置: ${INSTALL_DIR}"
echo "🚀 使用命令: skill run ${SKILL_NAME}"
```

> 注：你需要在 GitHub Releases 中按版本上传编译好的技能包，供脚本下载。

### 13.4 术语表

| 术语 | 定义 |
|------|------|
| Skill（技能） | 可被 AI Agent 或终端调用的专项能力包，包含可执行脚本、配置和文档 |
| SkillHub | 本产品的名称 —— 个人技能分发站点 |
| 维护者 | 即站点所有者（你），唯一具备发布和管理权限的人 |
| 消费者 | 访问 SkillHub 浏览技能、复制安装命令的普通用户（无需登录） |
| SemVer | 语义化版本控制规范（Semantic Versioning 2.0.0），格式为 `v主版本.次版本.补丁` |
| GitHub Pages | GitHub 提供的免费静态网站托管服务 |
| SSG | 静态站点生成（Static Site Generation），在构建时预渲染所有页面为 HTML |
| GitHub OAuth | GitHub 提供的 OAuth 2.0 认证服务，用于管理后台身份验证 |


> **文档签署**：本 PRD 经确认后即进入开发阶段。所有后续变更须通过正式 CR（Change Request）流程审批。开发可基于本 PRD 中的 **Vue 3 + Vite + GitHub Pages** 技术方案启动实施。