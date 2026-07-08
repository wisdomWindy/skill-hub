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
  const summaryParts = [`${paginatedSkills.value.totalItems} 个结果`]

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
  title: '技能目录 · SkillHub',
})
</script>

<template>
  <PublicLayout>
    <section class="mx-auto w-[min(100%_-_32px,var(--page-max-width))] pt-10 max-md:w-[min(100%_-_20px,var(--page-max-width))]">
      <div
        class="mb-[22px] flex items-end justify-between gap-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] px-7 py-6 shadow-[var(--shadow-soft)] backdrop-blur-[18px] max-[1080px]:flex-col max-[1080px]:items-stretch"
      >
        <div>
          <span
            class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
          >
            技能目录
          </span>
          <h1 class="my-4 mb-2 text-[clamp(1.8rem,4vw,3rem)]">按分类、关键词和发布时间浏览已发布技能。</h1>
          <p class="m-0 text-[var(--text-muted)]">{{ resultSummary }}</p>
        </div>

        <div class="grid grid-cols-[minmax(280px,360px)_200px] items-center gap-3 max-[1080px]:grid-cols-1">
          <input
            v-model="searchInput"
            class="min-h-[52px] rounded-full border border-[var(--border)] bg-white/4 px-[18px] py-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]"
            placeholder="按技能名称或简介搜索"
            type="search"
            @input="handleSearchInput()"
          />

          <select
            class="min-h-[52px] rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 text-[var(--text)]"
            :value="selectedSort"
            @change="handleSortChange"
          >
            <option value="latest">发布时间（新到旧）</option>
            <option value="name">名称（A 到 Z）</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-[minmax(220px,260px)_minmax(0,1fr)] gap-5 max-[1080px]:grid-cols-1">
        <aside
          class="sticky top-[110px] flex flex-col gap-2.5 self-start rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-[22px] shadow-[var(--shadow-soft)] backdrop-blur-[18px] max-[1080px]:static max-[1080px]:flex-row max-[1080px]:flex-wrap"
        >
          <div class="font-extrabold max-[1080px]:w-full">分类</div>
          <button
            v-for="category in categoryOptions"
            :key="category.key"
            type="button"
            class="cursor-pointer rounded-full border px-[14px] py-3 text-left"
            :class="
              category.key === selectedCategory
                ? 'border-[rgba(0,212,170,0.28)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-muted)]'
            "
            @click="handleCategoryChange(category.key)"
          >
            {{ category.label }}
          </button>
        </aside>

        <div class="flex flex-col gap-[18px]">
          <div v-if="paginatedSkills.items.length" class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[18px]">
            <SkillCard
              v-for="skill in paginatedSkills.items"
              :key="skill.id"
              :skill="skill"
              :category-label="categoryLabelMap[skill.category] || skill.category"
            />
          </div>

          <SkillGridEmptyState
            v-else
            title="没有匹配的技能"
            description="试试清空关键词，或切回全部分类。"
            action-label="重置筛选"
            :action-to="{ name: 'skills' }"
          />

          <div class="flex justify-end max-md:justify-start">
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
