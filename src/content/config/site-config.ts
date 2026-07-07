import { parse } from 'yaml'

import type { SiteConfigRecord } from '@/types/content'
import type { SiteConfig } from '@/types/skill'

import configSource from '../../../_data/config.yaml?raw'

export function loadSiteConfig(): SiteConfig {
  const record = parse(configSource) as SiteConfigRecord

  return {
    site: {
      title: record.site.title,
      description: record.site.description,
      baseUrl: record.site.baseUrl,
    },
    categories: Array.isArray(record.categories) ? record.categories : [],
  }
}
