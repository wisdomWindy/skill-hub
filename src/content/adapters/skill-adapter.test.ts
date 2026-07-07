import { describe, expect, it } from 'vitest'

import { toSkillDetail, toSkillSummary } from '@/content/adapters/skill-adapter'
import type { SkillRecord } from '@/types/content'

const baseRecord: SkillRecord = {
  id: 'pdf-parser',
  name: 'PDF Parser',
  category: 'devtools',
  version: 'v2.1.0',
  shortDesc: 'Parse PDF documents with OCR-safe defaults.',
  fullDesc: '## PDF Parser\n\nExtract content from PDFs.',
  installCommand: 'curl -fsSL https://example.com/install.sh | bash -s pdf-parser@v2.1.0',
  usageExamples: '',
  tags: '',
  status: 'published',
  installCount: null,
  createdAt: '2026-07-01T10:00:00.000Z',
  updatedAt: '2026-07-06T10:00:00.000Z',
}

describe('skill adapter', () => {
  it('normalizes optional arrays and installCount in detail output', () => {
    const detail = toSkillDetail(baseRecord)

    expect(detail.usageExamples).toEqual([])
    expect(detail.tags).toEqual([])
    expect(detail.installCount).toBe(0)
  })

  it('keeps summary timestamps comparable', () => {
    const summary = toSkillSummary(baseRecord)

    expect(summary.createdAtTimestamp).toBeGreaterThan(0)
    expect(summary.updatedAtTimestamp).toBeGreaterThan(summary.createdAtTimestamp)
  })
})
