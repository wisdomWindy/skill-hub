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
    <section
      class="mx-auto grid w-[min(100%_-_32px,var(--page-max-width))] grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)] gap-[22px] pt-12 max-[960px]:w-[min(100%_-_20px,var(--page-max-width))] max-[960px]:grid-cols-1"
    >
      <article
        class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-soft)] backdrop-blur-[18px]"
      >
        <span
          class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
        >
          Discover Skills
        </span>
        <h1 class="my-[18px] mb-3 text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05]">
          Find the right AI skill, copy the install command, and keep moving.
        </h1>
        <p class="leading-[1.8] text-[var(--text-muted)]">
          SkillHub is your static-first skill directory: fast browsing, clear categories, and install-ready entries
          served straight from GitHub Pages.
        </p>

        <form class="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3 max-[960px]:grid-cols-1" @submit.prevent="navigateToDirectory()">
          <input
            v-model="searchModel"
            class="min-w-0 rounded-full border border-[var(--border)] bg-white/4 px-[18px] py-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]"
            placeholder="Search by skill name or short description"
            type="search"
          />
          <button
            class="inline-flex items-center justify-center rounded-full bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] px-[18px] py-[14px] font-extrabold text-[#04101a]"
            type="submit"
          >
            Browse Skills
          </button>
        </form>

        <div class="mt-5 flex flex-wrap items-center gap-[14px]">
          <RouterLink
            class="inline-flex items-center justify-center rounded-full bg-[var(--accent-soft)] px-[14px] py-2.5 font-bold text-[var(--accent)]"
            :to="{ name: 'skills' }"
          >
            全部
          </RouterLink>
          <RouterLink
            v-for="category in siteConfig.categories"
            :key="category.key"
            class="inline-flex items-center justify-center rounded-full bg-[var(--bg-muted)] px-[14px] py-2.5 font-bold text-[var(--text-muted)]"
            :to="{ name: 'skills', query: { category: category.key } }"
          >
            {{ category.label }}
          </RouterLink>
        </div>

        <div class="mt-[18px] flex flex-wrap items-center gap-[14px]">
          <span class="text-[var(--text-muted)]">{{ categorySummary }}</span>
        </div>
      </article>

      <aside
        class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-soft)] backdrop-blur-[18px]"
      >
        <h2>Why It Feels Fast</h2>
        <ul>
          <li class="leading-[1.8] text-[var(--text-muted)]">Search and filtering stay client-side for sub-second feedback.</li>
          <li class="leading-[1.8] text-[var(--text-muted)]">Skill cards and details are generated ahead of time for GitHub Pages delivery.</li>
          <li class="leading-[1.8] text-[var(--text-muted)]">{{ latestSkills.length }} published sample skills are already wired into the directory.</li>
        </ul>
      </aside>
    </section>

    <section class="mx-auto w-[min(100%_-_32px,var(--page-max-width))] pt-8 max-md:w-[min(100%_-_20px,var(--page-max-width))]">
      <div class="mb-5 flex items-end justify-between gap-4 max-[960px]:flex-col max-[960px]:items-stretch">
        <div>
          <span
            class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
          >
            Latest Skills
          </span>
          <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.6rem)]">Newest entries in the directory</h2>
        </div>
        <RouterLink class="font-extrabold text-[var(--accent)]" to="/skills">See full listing</RouterLink>
      </div>

      <div v-if="latestSkills.length" class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[18px]">
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
