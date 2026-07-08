import { describe, expect, it } from 'vitest'

import { toSkillDetail, toSkillSummary } from '@/content/adapters/skill-adapter'
import type { SkillRecord } from '@/types/content'

const baseRecord: SkillRecord = {
  id: 'agent-test-skill',
  name: '测试 Skill',
  category: 'devtools',
  version: 'v2.1.0',
  shortDesc: '用于验证 skill 适配器的本地测试记录。',
  fullDesc: '## 测试 Skill\n\n用于验证详情转换。',
  installCommand: '本地路径：_data/real-skills/agent-test-skill.yaml',
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
