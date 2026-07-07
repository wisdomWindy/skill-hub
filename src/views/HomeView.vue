<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import PublicLayout from '@/layouts/PublicLayout.vue'
import { loadSiteConfig } from '@/content/config/site-config'
import SkillCard from '@/features/skills/components/SkillCard.vue'
import SkillGridEmptyState from '@/features/skills/components/SkillGridEmptyState.vue'
import { getLatestSkills } from '@/features/skills/queries/skill-queries'

const router = useRouter()
const siteConfig = loadSiteConfig()
const latestSkills = getLatestSkills(4)
const searchModel = ref('')

useHead({
  title: `${siteConfig.site.title} · Discover Skills`,
  meta: [
    {
      name: 'description',
      content: siteConfig.site.description,
    },
  ],
})

const categorySummary = computed(() => siteConfig.categories.map((item) => item.label).join(' / '))
const categoryLabelMap = computed(() =>
  Object.fromEntries(siteConfig.categories.map((item) => [item.key, item.label])),
)

function navigateToDirectory() {
  const normalizedQuery = searchModel.value.trim()

  void router.push({
    name: 'skills',
    query: normalizedQuery ? { query: normalizedQuery } : undefined,
  })
}
</script>

<template>
  <PublicLayout>
    <section class="app-container hero-grid">
      <article class="surface-card hero-copy">
        <span class="eyebrow">Discover Skills</span>
        <h1>Find the right AI skill, copy the install command, and keep moving.</h1>
        <p>
          SkillHub is your static-first skill directory: fast browsing, clear categories, and install-ready entries
          served straight from GitHub Pages.
        </p>

        <form class="hero-search-row" @submit.prevent="navigateToDirectory()">
          <input
            v-model="searchModel"
            class="ghost-input hero-search"
            placeholder="Search by skill name or short description"
            type="search"
          />
          <button class="hero-link primary-link" type="submit">Browse Skills</button>
        </form>

        <div class="hero-actions category-row">
          <RouterLink class="category-chip active-chip" :to="{ name: 'skills' }">全部</RouterLink>
          <RouterLink
            v-for="category in siteConfig.categories"
            :key="category.key"
            class="category-chip"
            :to="{ name: 'skills', query: { category: category.key } }"
          >
            {{ category.label }}
          </RouterLink>
        </div>

        <div class="hero-actions">
          <span class="hero-meta">{{ categorySummary }}</span>
        </div>
      </article>

      <aside class="surface-card hero-panel">
        <h2>Why It Feels Fast</h2>
        <ul>
          <li>Search and filtering stay client-side for sub-second feedback.</li>
          <li>Skill cards and details are generated ahead of time for GitHub Pages delivery.</li>
          <li>{{ latestSkills.length }} published sample skills are already wired into the directory.</li>
        </ul>
      </aside>
    </section>

    <section class="app-container latest-shell">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Latest Skills</span>
          <h2>Newest entries in the directory</h2>
        </div>
        <RouterLink class="browse-all-link" to="/skills">See full listing</RouterLink>
      </div>

      <div v-if="latestSkills.length" class="skill-grid">
        <SkillCard
          v-for="skill in latestSkills"
          :key="skill.id"
          :skill="skill"
          :category-label="categoryLabelMap[skill.category] || skill.category"
        />
      </div>
      <SkillGridEmptyState
        v-else
        title="No published skills yet"
        description="The static directory is ready. Add published YAML entries to populate this grid."
      />
    </section>
  </PublicLayout>
</template>

<style scoped>
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
  gap: 22px;
  padding: 48px 0 0;
}

.hero-copy,
.hero-panel {
  padding: 28px;
}

.hero-copy h1 {
  margin: 18px 0 12px;
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 1.05;
}

.hero-copy p,
.hero-panel li {
  color: var(--text-muted);
  line-height: 1.8;
}

.hero-search-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  margin-top: 24px;
}

.hero-search {
  min-width: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  margin-top: 18px;
}

.primary-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04101a;
  font-weight: 800;
}

.category-row {
  margin-top: 20px;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--bg-muted);
  color: var(--text-muted);
  font-weight: 700;
}

.active-chip {
  background: var(--accent-soft);
  color: var(--accent);
}

.hero-meta {
  color: var(--text-muted);
}

.latest-shell {
  padding: 32px 0 0;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  margin-bottom: 20px;
}

.section-heading h2 {
  margin: 16px 0 0;
  font-size: clamp(1.7rem, 3vw, 2.6rem);
}

.browse-all-link {
  color: var(--accent);
  font-weight: 800;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-search-row {
    grid-template-columns: 1fr;
  }

  .section-heading {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
