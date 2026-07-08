import { describe, expect, it } from 'vitest'

import { loadSiteConfig } from '@/content/config/site-config'

const requiredCategories = [
  ['devtools', '开发工具'],
  ['data', '数据处理'],
  ['devops', 'DevOps'],
  ['security', '安全'],
  ['automation', '办公自动化'],
  ['other', '其他'],
]

describe('site config static delivery contract', () => {
  it('includes the PRD default public categories', () => {
    const config = loadSiteConfig()

    expect(config.categories).toHaveLength(requiredCategories.length)
    expect(config.categories.map((category) => [category.key, category.label])).toEqual(requiredCategories)
  })
})
