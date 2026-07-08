import { describe, expect, it } from 'vitest'

import { loadSkillRecords } from '@/content/skills/load-skill-records'
import { routes } from '@/router'

describe('static skill routes', () => {
  it('emits static detail routes for published skills only', () => {
    const records = loadSkillRecords()
    const publishedIds = records.filter((record) => record.status === 'published').map((record) => record.id)
    const archivedIds = records.filter((record) => record.status === 'archived').map((record) => record.id)
    const routePaths = routes.map((route) => route.path)

    for (const skillId of publishedIds) {
      expect(routePaths).toContain(`/skills/${skillId}`)
    }

    for (const skillId of archivedIds) {
      expect(routePaths).not.toContain(`/skills/${skillId}`)
    }
  })
})
