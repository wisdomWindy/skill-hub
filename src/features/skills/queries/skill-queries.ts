import { loadSkillRecords } from '@/content/skills/load-skill-records'
import { toSkillDetail, toSkillSummary } from '@/content/adapters/skill-adapter'
import type { SkillRecord } from '@/types/content'
import type { PaginatedSkillResult, SkillDetail, SkillSearchInput, SkillSummary } from '@/types/skill'

function normalizeQueryValue(value: string | undefined) {
  return value?.trim().toLowerCase() || ''
}

function sortSkillSummaries(skills: SkillSummary[], sort: SkillSearchInput['sort']) {
  return [...skills].sort((left, right) => {
    if (sort === 'name') {
      return left.name.localeCompare(right.name)
    }

    return right.createdAtTimestamp - left.createdAtTimestamp
  })
}

export function buildPublishedSkillSummaries(records: SkillRecord[]): SkillSummary[] {
  return sortSkillSummaries(
    records
    .filter((record) => record.status === 'published')
    .map(toSkillSummary),
    'latest',
  )
}

export function filterSkillSummaries(skills: SkillSummary[], input: SkillSearchInput): SkillSummary[] {
  const normalizedQuery = normalizeQueryValue(input.query)

  const filtered = skills.filter((skill) => {
    const matchesCategory = !input.category || input.category === 'all' || skill.category === input.category
    if (!matchesCategory) {
      return false
    }

    if (!normalizedQuery) {
      return true
    }

    const haystack = `${skill.name} ${skill.shortDesc}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })

  return sortSkillSummaries(filtered, input.sort)
}

export function paginateSkills<TItem>(
  items: TItem[],
  page: number,
  pageSize = 20,
): PaginatedSkillResult<TItem> {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * pageSize

  return {
    items: items.slice(startIndex, startIndex + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  }
}

export function loadPublishedSkills(input: SkillSearchInput = {}): SkillSummary[] {
  const records = loadSkillRecords()
  const skills = buildPublishedSkillSummaries(records)

  return filterSkillSummaries(skills, input)
}

export function getSkillById(skillId: string): SkillDetail | undefined {
  const record = loadSkillRecords().find((item) => item.id === skillId && item.status === 'published')
  return record ? toSkillDetail(record) : undefined
}

export function getLatestSkills(limit = 4): SkillSummary[] {
  return loadPublishedSkills({ sort: 'latest' }).slice(0, limit)
}

export function listRelatedSkills(skillId: string, limit = 4): SkillSummary[] {
  const currentSkill = getSkillById(skillId)
  if (!currentSkill) {
    return []
  }

  return loadPublishedSkills({ category: currentSkill.category })
    .filter((skill) => skill.id !== skillId)
    .slice(0, limit)
}
