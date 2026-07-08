import { describe, expect, it } from 'vitest'

import { loadSiteConfig } from '@/content/config/site-config'
import { loadSkillRecords } from '@/content/skills/load-skill-records'

describe('skill YAML static delivery contract', () => {
  it('provides enough public and archived sample skills for static pages', () => {
    const records = loadSkillRecords()
    const publishedRecords = records.filter((record) => record.status === 'published')
    const archivedRecords = records.filter((record) => record.status === 'archived')

    expect(publishedRecords.length).toBeGreaterThanOrEqual(3)
    expect(archivedRecords.length).toBeGreaterThanOrEqual(1)
  })

  it('keeps sample skill categories aligned with site config', () => {
    const categoryKeys = new Set(loadSiteConfig().categories.map((category) => category.key))
    const records = loadSkillRecords()

    expect(records.every((record) => categoryKeys.has(record.category))).toBe(true)
  })
})
