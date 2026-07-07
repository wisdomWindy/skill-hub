import { parse } from 'yaml'

import type { SkillRecord } from '@/types/content'

const skillSources = import.meta.glob('../../../_data/skills/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function loadSkillRecords(): SkillRecord[] {
  return Object.values(skillSources).map((source) => parse(source) as SkillRecord)
}
