import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(rootDir, '.agents', 'skills')
const outputRoot = path.join(rootDir, '_data', 'real-skills')

const frameworkLabels = {
  'backend-agent-framework': '后端智能体框架',
  'frontend-agent-framework': '前端智能体框架',
  'novel-agent-framework': '小说智能体框架',
  'skill-generator': 'Skill 生成器',
}

const stageLabels = {
  'acceptance-review': '验收评审',
  'architecture-design': '架构设计',
  'beta-feedback': 'Beta 反馈',
  'bugfix-intake': '缺陷接收',
  'chapter-planning': '章节规划',
  'character-design': '角色设计',
  'continuity-review': '连续性审查',
  copyedit: '文案编辑',
  drafting: '正文起草',
  execute: '执行实现',
  'idea-expansion': '创意扩展',
  intake: '需求接收',
  'line-polish': '语言润色',
  'market-positioning': '市场定位',
  'page-design': '页面设计',
  plan: '计划编写',
  proofread: '校对',
  review: '评审',
  'requirement-analysis': '需求分析',
  'requirement-splitting': '需求拆分',
  'scene-design': '场景设计',
  spec: '规格编写',
  'story-architecture': '故事架构',
  'structural-revision': '结构修订',
  verify: '验证',
}

function findSkillFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return findSkillFiles(entryPath)
    }

    return entry.name === 'SKILL.md' ? [entryPath] : []
  })
}

function toPosixPath(filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join('/')
}

function parseSkillName(source, fallback) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    return fallback
  }

  const nameMatch = match[1].match(/^name:\s*(.+)$/m)
  return nameMatch?.[1]?.trim().replace(/^['"]|['"]$/g, '') || fallback
}

function resolveSegments(filePath) {
  return path
    .relative(sourceRoot, path.dirname(filePath))
    .split(path.sep)
    .filter(Boolean)
}

function buildSkillId(segments) {
  return `agent-${segments.filter((segment) => segment !== 'subskills').join('-')}`
}

function resolveOutputPath(filePath) {
  const relativePath = path.relative(sourceRoot, filePath).replace(/\.md$/, '.yaml')
  return path.join(outputRoot, relativePath)
}

function resolveDisplayName(segments, fallbackName) {
  const [framework, maybeSubskills, stage] = segments
  const frameworkLabel = frameworkLabels[framework] || fallbackName

  if (maybeSubskills === 'subskills' && stage) {
    return `${frameworkLabel}：${stageLabels[stage] || stage}`
  }

  return frameworkLabel
}

function resolveCategory(segments) {
  return segments[0] === 'novel-agent-framework' ? 'other' : 'devtools'
}

function resolveShortDesc(segments) {
  const [framework, maybeSubskills, stage] = segments
  const frameworkLabel = frameworkLabels[framework] || '本地智能体'

  if (maybeSubskills === 'subskills' && stage) {
    return `${frameworkLabel}的${stageLabels[stage] || stage}阶段 skill，用于驱动本地工作流的对应步骤。`
  }

  if (framework === 'skill-generator') {
    return '把可重复流程、检查清单或需求草案沉淀为可复用的本地 Codex skill。'
  }

  return `${frameworkLabel}主控 skill，用于编排本地工作流、维护阶段门禁并路由到子技能。`
}

function resolveTags(segments) {
  const [framework, maybeSubskills, stage] = segments
  const tags = ['本地技能', 'agent']

  if (framework === 'novel-agent-framework') {
    tags.push('写作')
  } else {
    tags.push('工作流')
  }

  if (maybeSubskills === 'subskills' && stage) {
    tags.push(stageLabels[stage] || stage)
  }

  return tags
}

function quote(value) {
  return JSON.stringify(value)
}

function renderSkillRecord(filePath) {
  const source = readFileSync(filePath, 'utf8')
  const segments = resolveSegments(filePath)
  const triggerName = parseSkillName(source, segments.at(-1) || 'local-skill')
  const id = buildSkillId(segments)
  const displayName = resolveDisplayName(segments, triggerName)
  const shortDesc = resolveShortDesc(segments)
  const sourcePath = toPosixPath(filePath)
  const tags = resolveTags(segments)
  const fullDesc = [
    `## ${displayName}`,
    '',
    shortDesc,
    '',
    '## 来源',
    '',
    `该条目来自仓库本地 skill 文件：\`${sourcePath}\`。`,
    '',
    '## 使用提示',
    '',
    `在 Codex 中可通过 \`$${triggerName}\` 或对应工作流触发该 skill。`,
  ].join('\n')

  return [
    `id: ${quote(id)}`,
    `name: ${quote(displayName)}`,
    `category: ${quote(resolveCategory(segments))}`,
    'version: "v1.0.0"',
    `shortDesc: ${quote(shortDesc)}`,
    `fullDesc: ${quote(fullDesc)}`,
    `installCommand: ${quote(`本地路径：${sourcePath}`)}`,
    'usageExamples:',
    '  - title: "在 Codex 中触发"',
    `    code: ${quote(`$${triggerName}`)}`,
    'tags:',
    ...tags.map((tag) => `  - ${quote(tag)}`),
    'status: "published"',
    'installCount: 0',
    'createdAt: "2026-07-08T00:00:00.000Z"',
    'updatedAt: "2026-07-08T00:00:00.000Z"',
    '',
  ].join('\n')
}

rmSync(outputRoot, { recursive: true, force: true })
mkdirSync(outputRoot, { recursive: true })

const skillFiles = findSkillFiles(sourceRoot).sort((left, right) => toPosixPath(left).localeCompare(toPosixPath(right)))

for (const filePath of skillFiles) {
  const outputPath = resolveOutputPath(filePath)
  mkdirSync(path.dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, renderSkillRecord(filePath), 'utf8')
}

console.log(`Generated ${skillFiles.length} skill records in ${toPosixPath(outputRoot)}`)
