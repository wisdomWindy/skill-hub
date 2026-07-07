<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'

import PublicLayout from '@/layouts/PublicLayout.vue'
import { getSkillById, listRelatedSkills } from '@/features/skills/queries/skill-queries'
import { renderMarkdown } from '@/utils/markdown/render-markdown'

const props = defineProps<{
  skillId: string
}>()

const skill = computed(() => getSkillById(props.skillId))
const relatedSkills = computed(() => listRelatedSkills(props.skillId))
const renderedDescription = computed(() => renderMarkdown(skill.value?.fullDesc || '## Missing skill'))

useHead(() => ({
  title: skill.value ? `${skill.value.name} · SkillHub` : 'Skill Detail · SkillHub',
}))
</script>

<template>
  <PublicLayout>
    <section class="app-container detail-grid">
      <article class="surface-card detail-main">
        <span class="eyebrow">{{ skill?.category || 'Unknown' }}</span>
        <h1>{{ skill?.name || 'Skill not found' }}</h1>
        <p v-if="skill" class="detail-meta">{{ skill.version }} · Updated {{ skill.updatedAt }}</p>
        <div class="markdown-body" v-html="renderedDescription" />
      </article>

      <aside class="surface-card detail-side">
        <template v-if="skill">
          <h2>Install Command</h2>
          <pre><code>{{ skill.installCommand }}</code></pre>
          <h3>Related Seeds</h3>
          <ul>
            <li v-for="item in relatedSkills" :key="item.id">{{ item.name }}</li>
          </ul>
        </template>
      </aside>
    </section>
  </PublicLayout>
</template>

<style scoped>
.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 22px;
  padding: 40px 0 0;
}

.detail-main,
.detail-side {
  padding: 28px;
}

.detail-main h1 {
  margin: 18px 0 10px;
  font-size: clamp(2rem, 4vw, 3.4rem);
}

.detail-meta,
.detail-side ul {
  color: var(--text-muted);
}

@media (max-width: 960px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
