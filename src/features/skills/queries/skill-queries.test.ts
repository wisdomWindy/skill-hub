import { describe, expect, it } from 'vitest'

import {
  buildPublishedSkillSummaries,
  filterSkillSummaries,
  findRelatedSkillSummaries,
  listRelatedSkills,
  paginateSkills,
} from '@/features/skills/queries/skill-queries'
import type { SkillRecord } from '@/types/content'
import type { SkillSummary } from '@/types/skill'

const records: SkillRecord[] = [
  {
    id: 'pdf-parser',
    name: 'PDF Parser',
    category: 'devtools',
    version: 'v2.1.0',
    shortDesc: 'Parse PDF documents with OCR-safe defaults.',
    fullDesc: 'detail',
    installCommand: 'install',
    usageExamples: '',
    tags: ['pdf', 'ocr'],
    status: 'published',
    installCount: 4,
    createdAt: '2026-07-01T10:00:00.000Z',
    updatedAt: '2026-07-06T10:00:00.000Z',
  },
  {
    id: 'draft-skill',
    name: 'Draft Skill',
    category: 'devtools',
    version: 'v0.1.0',
    shortDesc: 'Should not leak to the public list.',
    fullDesc: 'detail',
    installCommand: 'install',
    usageExamples: '',
    tags: ['draft'],
    status: 'archived',
    installCount: 0,
    createdAt: '2026-07-02T10:00:00.000Z',
    updatedAt: '2026-07-02T10:00:00.000Z',
  },
]

function createSkillSummary(input: Partial<SkillSummary> & Pick<SkillSummary, 'id' | 'category'>): SkillSummary {
  return {
    id: input.id,
    name: input.name ?? input.id,
    category: input.category,
    version: input.version ?? 'v1.0.0',
    shortDesc: input.shortDesc ?? 'summary',
    tags: input.tags ?? [],
    status: input.status ?? 'published',
    installCount: input.installCount ?? 0,
    createdAt: input.createdAt ?? '2026-07-01T10:00:00.000Z',
    updatedAt: input.updatedAt ?? '2026-07-01T10:00:00.000Z',
    createdAtTimestamp: input.createdAtTimestamp ?? 0,
    updatedAtTimestamp: input.updatedAtTimestamp ?? 0,
  }
}

describe('skill queries', () => {
  it('only keeps published skills in public summaries', () => {
    const result = buildPublishedSkillSummaries(records)

    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('pdf-parser')
  })

  it('filters published skills by search query and category', () => {
    const published = buildPublishedSkillSummaries(records)
    const result = filterSkillSummaries(published, { query: '  parse pdf  ', category: 'devtools' })

    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('pdf-parser')
  })

  it('does not match tags when searching discovery results', () => {
    const published = buildPublishedSkillSummaries(records)
    const result = filterSkillSummaries(published, { query: 'parsing' })

    expect(result).toHaveLength(0)
  })

  it('clamps page number when pagination exceeds available pages', () => {
    const published = buildPublishedSkillSummaries(records)
    const paginated = paginateSkills(published, 8, 20)

    expect(paginated.page).toBe(1)
    expect(paginated.totalPages).toBe(1)
    expect(paginated.items).toHaveLength(1)
  })

  it('finds related skills by category without including the current skill', () => {
    const current = createSkillSummary({ id: 'current', category: 'devtools' })
    const related = findRelatedSkillSummaries(current, [
      current,
      createSkillSummary({ id: 'related-one', category: 'devtools' }),
      createSkillSummary({ id: 'other-category', category: 'writing' }),
    ])

    expect(related.map((skill) => skill.id)).toEqual(['related-one'])
  })

  it('limits related skills to the requested count', () => {
    const current = createSkillSummary({ id: 'current', category: 'devtools' })
    const related = findRelatedSkillSummaries(current, [
      createSkillSummary({ id: 'related-one', category: 'devtools' }),
      createSkillSummary({ id: 'related-two', category: 'devtools' }),
      createSkillSummary({ id: 'related-three', category: 'devtools' }),
    ], 2)

    expect(related.map((skill) => skill.id)).toEqual(['related-one', 'related-two'])
  })

  it('returns no related skills when the current skill does not exist', () => {
    expect(listRelatedSkills('missing-skill')).toEqual([])
  })
})
