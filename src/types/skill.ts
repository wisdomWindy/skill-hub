import type { CategoryRecord, SkillStatus, UsageExampleRecord } from '@/types/content'

export interface SiteConfig {
  site: {
    title: string
    description: string
    baseUrl: string
  }
  categories: CategoryRecord[]
}

export interface UsageExample {
  title: string
  code: string
}

export interface SkillSummary {
  id: string
  name: string
  category: string
  version: string
  shortDesc: string
  icon?: string
  tags: string[]
  status: SkillStatus
  installCount: number
  createdAt: string
  updatedAt: string
  createdAtTimestamp: number
  updatedAtTimestamp: number
}

export interface SkillDetail extends SkillSummary {
  fullDesc: string
  installCommand: string
  usageExamples: UsageExample[]
  changelog?: string
}

export interface SkillSearchInput {
  query?: string
  category?: string
  sort?: 'latest' | 'name'
}

export type SkillSortOption = 'latest' | 'name'

export interface PaginatedSkillResult<TItem> {
  items: TItem[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface SkillAdapterContext {
  usageExamples?: UsageExampleRecord[] | null | ''
  tags?: string[] | null | ''
}
