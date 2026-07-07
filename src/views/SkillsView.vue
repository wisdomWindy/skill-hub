<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PublicLayout from '@/layouts/PublicLayout.vue'
import { loadSiteConfig } from '@/content/config/site-config'
import SkillCard from '@/features/skills/components/SkillCard.vue'
import SkillGridEmptyState from '@/features/skills/components/SkillGridEmptyState.vue'
import SkillPagination from '@/features/skills/components/SkillPagination.vue'
import { loadPublishedSkills, paginateSkills } from '@/features/skills/queries/skill-queries'
import type { SkillSortOption } from '@/types/skill'

const router = useRouter()
const route = useRoute()
const siteConfig = loadSiteConfig()

const categoryOptions = [{ key: 'all', label: '全部' }, ...siteConfig.categories]
const categoryLabelMap = Object.fromEntries(siteConfig.categories.map((item) => [item.key, item.label]))

function getQueryString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function normalizeCategory(value: unknown) {
  const candidate = getQueryString(value)
  const validKeys = new Set(siteConfig.categories.map((item) => item.key))

  return candidate && validKeys.has(candidate) ? candidate : 'all'
}

function normalizeSort(value: unknown): SkillSortOption {
  return getQueryString(value) === 'name' ? 'name' : 'latest'
}

function normalizePage(value: unknown) {
  const page = Number.parseInt(getQueryString(value), 10)
  if (Number.isNaN(page) || page < 1) {
    return 1
  }

  return page
}

const searchInput = ref(getQueryString(route.query.query))

watch(
  () => route.query.query,
  (value) => {
    searchInput.value = getQueryString(value)
  },
)

const selectedCategory = computed(() => normalizeCategory(route.query.category))
const selectedSort = computed(() => normalizeSort(route.query.sort))
const currentPage = computed(() => normalizePage(route.query.page))

const filteredSkills = computed(() =>
  loadPublishedSkills({
    query: searchInput.value,
    category: selectedCategory.value,
    sort: selectedSort.value,
  }),
)

const paginatedSkills = computed(() => paginateSkills(filteredSkills.value, currentPage.value, 20))
const activeCategoryLabel = computed(
  () => categoryOptions.find((item) => item.key === selectedCategory.value)?.label || '全部',
)
const resultSummary = computed(() => {
  const summaryParts = [`${paginatedSkills.value.totalItems} results`]

  if (selectedCategory.value !== 'all') {
    summaryParts.push(activeCategoryLabel.value)
  }

  const normalizedQuery = searchInput.value.trim()
  if (normalizedQuery) {
    summaryParts.push(`"${normalizedQuery}"`)
  }

  return summaryParts.join(' · ')
})

function replaceRouteState(nextState: {
  query?: string
  category?: string
  sort?: SkillSortOption
  page?: number
}) {
  const nextQuery: Record<string, string> = {}
  const normalizedQuery = nextState.query?.trim()
  const normalizedCategory = nextState.category || 'all'
  const normalizedSort = nextState.sort || 'latest'
  const normalizedPage = nextState.page || 1

  if (normalizedQuery) {
    nextQuery.query = normalizedQuery
  }

  if (normalizedCategory !== 'all') {
    nextQuery.category = normalizedCategory
  }

  if (normalizedSort !== 'latest') {
    nextQuery.sort = normalizedSort
  }

  if (normalizedPage > 1) {
    nextQuery.page = String(normalizedPage)
  }

  void router.replace({
    name: 'skills',
    query: nextQuery,
  })
}

function handleSearchInput() {
  replaceRouteState({
    query: searchInput.value,
    category: selectedCategory.value,
    sort: selectedSort.value,
    page: 1,
  })
}

function handleCategoryChange(category: string) {
  replaceRouteState({
    query: searchInput.value,
    category,
    sort: selectedSort.value,
    page: 1,
  })
}

function handleSortChange(event: Event) {
  const nextSort = (event.target as HTMLSelectElement).value === 'name' ? 'name' : 'latest'

  replaceRouteState({
    query: searchInput.value,
    category: selectedCategory.value,
    sort: nextSort,
    page: 1,
  })
}

function handlePageChange(page: number) {
  replaceRouteState({
    query: searchInput.value,
    category: selectedCategory.value,
    sort: selectedSort.value,
    page: paginatedSkills.value.totalItems === 0 ? 1 : page,
  })

  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

useHead({
  title: 'Skill Directory · SkillHub',
})
</script>

<template>
  <PublicLayout>
    <section class="app-container listing-shell">
      <div class="surface-card listing-header">
        <div class="listing-copy">
          <span class="eyebrow">Directory</span>
          <h1>Browse published skills by category, query, and release order.</h1>
          <p>{{ resultSummary }}</p>
        </div>

        <div class="header-controls">
          <input
            v-model="searchInput"
            class="ghost-input listing-search"
            placeholder="Search by skill name or short description"
            type="search"
            @input="handleSearchInput()"
          />

          <select class="sort-select" :value="selectedSort" @change="handleSortChange">
            <option value="latest">发布时间（新到旧）</option>
            <option value="name">名称（A 到 Z）</option>
          </select>
        </div>
      </div>

      <div class="listing-grid">
        <aside class="surface-card category-panel">
          <div class="panel-title">Categories</div>
          <button
            v-for="category in categoryOptions"
            :key="category.key"
            type="button"
            class="category-filter"
            :class="{ active: category.key === selectedCategory }"
            @click="handleCategoryChange(category.key)"
          >
            {{ category.label }}
          </button>
        </aside>

        <div class="results-panel">
          <div v-if="paginatedSkills.items.length" class="skill-grid">
            <SkillCard
              v-for="skill in paginatedSkills.items"
              :key="skill.id"
              :skill="skill"
              :category-label="categoryLabelMap[skill.category] || skill.category"
            />
          </div>

          <SkillGridEmptyState
            v-else
            title="No matching skills"
            description="Try clearing the query or switching back to all categories."
            action-label="Reset Filters"
            :action-to="{ name: 'skills' }"
          />

          <div class="pagination-row">
            <SkillPagination
              :page="paginatedSkills.page"
              :total-pages="paginatedSkills.totalPages"
              @change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>

<style scoped>
.listing-shell {
  padding: 40px 0 0;
}

.listing-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: end;
  padding: 24px 28px;
  margin-bottom: 22px;
}

.listing-header h1 {
  margin: 16px 0 8px;
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.listing-copy p {
  margin: 0;
  color: var(--text-muted);
}

.header-controls {
  display: grid;
  grid-template-columns: minmax(280px, 360px) 200px;
  gap: 12px;
  align-items: center;
}

.listing-search,
.sort-select {
  min-height: 52px;
}

.sort-select {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elevated);
  color: var(--text);
  padding: 0 16px;
}

.listing-grid {
  display: grid;
  grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
  gap: 20px;
}

.category-panel {
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px;
  position: sticky;
  top: 110px;
}

.panel-title {
  font-weight: 800;
}

.category-filter {
  border: 1px solid var(--border);
  background: var(--bg-muted);
  color: var(--text-muted);
  border-radius: 999px;
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
}

.category-filter.active {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: rgba(0, 212, 170, 0.28);
}

.results-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.pagination-row {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 1080px) {
  .listing-header,
  .listing-grid {
    grid-template-columns: 1fr;
  }

  .listing-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-controls {
    grid-template-columns: 1fr;
  }

  .category-panel {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .panel-title {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .pagination-row {
    justify-content: flex-start;
  }
}
</style>
