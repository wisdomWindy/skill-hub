import { describe, expect, it } from 'vitest'

import { loadSiteConfig } from '@/content/config/site-config'
import { loadSkillRecords } from '@/content/skills/load-skill-records'

const realSkillSources = import.meta.glob('../../../_data/real-skills/**/SKILL.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
})

describe('real skill static delivery contract', () => {
  const topLevelSkillCount = 5

  it('keeps real skill categories aligned with site config', () => {
    const categoryKeys = new Set(loadSiteConfig().categories.map((category) => category.key))
    const records = loadSkillRecords()

    expect(records.every((record) => categoryKeys.has(record.category))).toBe(true)
  })

  it('uses the project real-skill data directory as the only skill record source', () => {
    const records = loadSkillRecords()

    expect(records).toHaveLength(Object.keys(realSkillSources).length)
    expect(records).toHaveLength(topLevelSkillCount)
    expect(records.every((record) => record.id.startsWith('agent-'))).toBe(true)
    expect(records.every((record) => record.status === 'published')).toBe(true)
    expect(records.some((record) => record.id === 'agent-frontend-agent-framework')).toBe(true)
    expect(records.some((record) => record.id === 'agent-frontend-agent-framework-verify')).toBe(false)
  })

  it('generates records only for top-level skills', () => {
    expect(realSkillSources).toHaveProperty('../../../_data/real-skills/frontend-agent-framework/SKILL.yaml')
    expect(realSkillSources).not.toHaveProperty('../../../_data/real-skills/frontend-agent-framework/subskills/verify/SKILL.yaml')
    expect(Object.keys(realSkillSources).every((sourcePath) => !sourcePath.includes('/subskills/'))).toBe(true)
  })

  it('uses directory install commands so subskills are installed with the main skill tree', () => {
    const records = loadSkillRecords()

    expect(records.find((record) => record.id === 'agent-frontend-agent-framework')?.installCommand).toBe(
      '本地路径：.agents/skills/frontend-agent-framework',
    )
    expect(records.some((record) => record.installCommand.includes('/subskills/'))).toBe(false)
  })
})
