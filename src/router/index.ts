import type { RouteRecordRaw } from 'vue-router'

import { loadSkillRecords } from '@/content/skills/load-skill-records'
import HomeView from '@/views/HomeView.vue'
import SkillDetailView from '@/views/SkillDetailView.vue'
import SkillsView from '@/views/SkillsView.vue'

const publishedSkillRoutes = loadSkillRecords()
  .filter((record) => record.status === 'published')
  .map<RouteRecordRaw>((record) => ({
    path: `/skills/${record.id}`,
    name: `skill-detail-${record.id}`,
    component: SkillDetailView,
    props: {
      skillId: record.id,
    },
  }))

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/skills',
    name: 'skills',
    component: SkillsView,
  },
  ...publishedSkillRoutes,
  {
    path: '/skills/:skillId',
    name: 'skill-detail',
    component: SkillDetailView,
    props: true,
  },
]
