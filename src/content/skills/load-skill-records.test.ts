import { describe, expect, it } from 'vitest'

import { loadSiteConfig } from '@/content/config/site-config'
import { loadSkillRecords } from '@/content/skills/load-skill-records'

const realSkillSources = import.meta.glob('../../../_data/real-skills/**/SKILL.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
})

describe('real skill static delivery contract', () => {
  it('keeps real skill categories aligned with site config', () => {
    const categoryKeys = new Set(loadSiteConfig().categories.map((category) => category.key))
    const records = loadSkillRecords()

    expect(records.every((record) => categoryKeys.has(record.category))).toBe(true)
  })

  it('uses the project real-skill data directory as the only skill record source', () => {
    const records = loadSkillRecords()

    expect(records).toHaveLength(Object.keys(realSkillSources).length)
    expect(records).toHaveLength(40)
    expect(records.every((record) => record.id.startsWith('agent-'))).toBe(true)
    expect(records.every((record) => record.status === 'published')).toBe(true)
    expect(records.some((record) => record.id === 'agent-frontend-agent-framework')).toBe(true)
    expect(records.some((record) => record.id === 'agent-frontend-agent-framework-verify')).toBe(true)
  })

  it('keeps the generated data directory aligned with the original skill directory shape', () => {
    expect(realSkillSources).toHaveProperty('../../../_data/real-skills/frontend-agent-framework/SKILL.yaml')
    expect(realSkillSources).toHaveProperty('../../../_data/real-skills/frontend-agent-framework/subskills/verify/SKILL.yaml')
  })

  it('uses directory install commands for main skills and file install commands for subskills', () => {
    const records = loadSkillRecords()

    expect(records.find((record) => record.id === 'agent-frontend-agent-framework')?.installCommand).toBe(
      '本地路径：.agents/skills/frontend-agent-framework',
    )
    expect(records.find((record) => record.id === 'agent-frontend-agent-framework-verify')?.installCommand).toBe(
      '本地路径：.agents/skills/frontend-agent-framework/subskills/verify/SKILL.md',
    )
  })
})
