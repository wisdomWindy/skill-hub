import type { SkillRecord, UsageExampleRecord } from '@/types/content'
import type { SkillDetail, SkillSummary } from '@/types/skill'

function normalizeUsageExamples(input: UsageExampleRecord[] | null | '' | undefined) {
  if (!Array.isArray(input)) {
    return []
  }

  return input
    .filter((example) => Boolean(example?.title) && Boolean(example?.code))
    .map((example) => ({
      title: example.title!.trim(),
      code: example.code!.trim(),
    }))
}

function normalizeTags(input: string[] | null | '' | undefined) {
  if (!Array.isArray(input)) {
    return []
  }

  return input.filter((tag) => typeof tag === 'string' && tag.trim().length > 0).map((tag) => tag.trim())
}

function normalizeTimestamp(value: string) {
  const timestamp = Date.parse(value)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function toSkillSummary(record: SkillRecord): SkillSummary {
  return {
    id: record.id,
    name: record.name,
    category: record.category,
    version: record.version,
    shortDesc: record.shortDesc,
    icon: record.icon || undefined,
    tags: normalizeTags(record.tags),
    status: record.status,
    installCount: typeof record.installCount === 'number' ? record.installCount : 0,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    createdAtTimestamp: normalizeTimestamp(record.createdAt),
    updatedAtTimestamp: normalizeTimestamp(record.updatedAt),
  }
}

export function toSkillDetail(record: SkillRecord): SkillDetail {
  const summary = toSkillSummary(record)

  return {
    ...summary,
    fullDesc: record.fullDesc,
    installCommand: record.installCommand,
    usageExamples: normalizeUsageExamples(record.usageExamples),
    changelog: record.changelog || undefined,
  }
}
