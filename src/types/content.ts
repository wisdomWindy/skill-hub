export type SkillStatus = 'published' | 'archived'

export interface CategoryRecord {
  key: string
  label: string
}

export interface SiteConfigRecord {
  site: {
    title: string
    description: string
    baseUrl: string
  }
  categories: CategoryRecord[]
}

export interface UsageExampleRecord {
  title?: string
  code?: string
}

export interface SkillRecord {
  id: string
  name: string
  category: string
  version: string
  shortDesc: string
  fullDesc: string
  installCommand: string
  usageExamples?: UsageExampleRecord[] | null | ''
  icon?: string | null
  tags?: string[] | null | ''
  changelog?: string | null
  status: SkillStatus
  installCount?: number | null
  createdAt: string
  updatedAt: string
}
