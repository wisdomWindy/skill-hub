<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import PublicLayout from '@/layouts/PublicLayout.vue'
import { loadSiteConfig } from '@/content/config/site-config'
import InstallCommandCard from '@/features/skills/components/InstallCommandCard.vue'
import SkillDetailMeta from '@/features/skills/components/SkillDetailMeta.vue'
import SkillRelatedList from '@/features/skills/components/SkillRelatedList.vue'
import SkillVersionHistory from '@/features/skills/components/SkillVersionHistory.vue'
import { getSkillById, listRelatedSkills } from '@/features/skills/queries/skill-queries'
import { renderMarkdown } from '@/utils/markdown/render-markdown'

const props = defineProps<{
  skillId: string
}>()

const siteConfig = loadSiteConfig()
const categoryLabelMap = Object.fromEntries(siteConfig.categories.map((item) => [item.key, item.label]))

const skill = computed(() => getSkillById(props.skillId))
const relatedSkills = computed(() => listRelatedSkills(props.skillId))
const categoryLabel = computed(() => {
  if (!skill.value) {
    return ''
  }

  return categoryLabelMap[skill.value.category] || skill.value.category
})
const renderedDescription = computed(() =>
  renderMarkdown(
    skill.value?.fullDesc?.trim()
      || '## Description unavailable\n\nThis published skill does not include a detailed description yet.',
  ),
)
const renderedUsageExamples = computed(() =>
  skill.value?.usageExamples.map((example) => ({
    title: example.title,
    html: renderMarkdown(`\`\`\`bash\n${example.code}\n\`\`\``),
  })) || [],
)
const renderedChangelog = computed(() => (skill.value?.changelog ? renderMarkdown(skill.value.changelog) : ''))

useHead(() => ({
  title: skill.value ? `${skill.value.name} · SkillHub` : 'Skill Detail · SkillHub',
  meta: [
    {
      property: 'og:title',
      content: skill.value ? `${skill.value.name} · SkillHub` : 'Skill Detail · SkillHub',
    },
    {
      property: 'og:description',
      content: skill.value?.shortDesc || siteConfig.site.description,
    },
  ],
}))
</script>

<template>
  <PublicLayout>
    <section class="app-container detail-shell">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/skills">Skills</RouterLink>
        <span>/</span>
        <span>{{ skill?.name || 'Skill not found' }}</span>
      </nav>

      <div v-if="skill" class="detail-grid">
        <main class="detail-main">
          <article class="surface-card detail-section">
            <SkillDetailMeta :skill="skill" :category-label="categoryLabel" />
          </article>

          <article class="surface-card detail-section">
            <span class="eyebrow">Details</span>
            <div class="markdown-body detail-markdown" v-html="renderedDescription" />
          </article>

          <article v-if="renderedUsageExamples.length" class="surface-card detail-section">
            <span class="eyebrow">Examples</span>
            <h2>Usage Examples</h2>
            <div class="example-list">
              <section v-for="example in renderedUsageExamples" :key="example.title" class="example-block">
                <h3>{{ example.title }}</h3>
                <div class="markdown-body" v-html="example.html" />
              </section>
            </div>
          </article>
        </main>

        <aside class="detail-side">
          <InstallCommandCard :command="skill.installCommand" />
          <SkillVersionHistory :rendered-changelog="renderedChangelog" />
          <SkillRelatedList :skills="relatedSkills" :category-labels="categoryLabelMap" />
        </aside>
      </div>

      <article v-else class="surface-card missing-card">
        <span class="eyebrow">Missing</span>
        <h1>Skill not found</h1>
        <p>This skill is not published or does not exist in the static directory.</p>
        <RouterLink class="back-link" to="/skills">Back to directory</RouterLink>
      </article>
    </section>
  </PublicLayout>
</template>

<style scoped>
.detail-shell {
  padding: 34px 0 0;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 18px;
  color: var(--text-muted);
  font-size: 14px;
}

.breadcrumb a {
  color: var(--accent);
  font-weight: 800;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 22px;
}

.detail-main,
.detail-side,
.example-list {
  display: grid;
  gap: 18px;
}

.detail-side {
  align-self: start;
  position: sticky;
  top: 104px;
}

.detail-section,
.missing-card {
  padding: 28px;
}

.detail-section h2,
.missing-card h1 {
  margin: 16px 0 14px;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

.detail-markdown {
  margin-top: 18px;
}

.example-block {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-muted);
  padding: 18px;
}

.example-block h3 {
  margin: 0 0 12px;
  font-size: 18px;
}

.missing-card {
  max-width: 680px;
}

.missing-card p {
  color: var(--text-muted);
  line-height: 1.75;
}

.back-link {
  display: inline-flex;
  margin-top: 12px;
  color: var(--accent);
  font-weight: 800;
}

@media (max-width: 960px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-side {
    position: static;
    order: -1;
  }
}

@media (max-width: 640px) {
  .detail-section,
  .missing-card {
    padding: 22px;
  }
}
</style>
