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
  title: `${siteConfig.site.title} · 发现技能`,
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
          发现技能
        </span>
        <h1 class="my-[18px] mb-3 text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05]">
          找到合适的 AI 技能，复制安装命令，然后继续前进。
        </h1>
        <p class="leading-[1.8] text-[var(--text-muted)]">
          SkillHub 是一个静态优先的技能目录：浏览快速、分类清晰，每个条目都可以直接复制安装命令，
          并通过 GitHub Pages 交付。
        </p>

        <form class="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3 max-[960px]:grid-cols-1" @submit.prevent="navigateToDirectory()">
          <input
            v-model="searchModel"
            class="min-w-0 rounded-full border border-[var(--border)] bg-white/4 px-[18px] py-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]"
            placeholder="按技能名称或简介搜索"
            type="search"
          />
          <button
            class="inline-flex items-center justify-center rounded-full bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] px-[18px] py-[14px] font-extrabold text-[#04101a]"
            type="submit"
          >
            浏览技能
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
        <h2>为什么它很快</h2>
        <ul>
          <li class="leading-[1.8] text-[var(--text-muted)]">搜索和筛选都在客户端完成，反馈几乎即时。</li>
          <li class="leading-[1.8] text-[var(--text-muted)]">技能卡片和详情页会提前生成，适合 GitHub Pages 静态交付。</li>
          <li class="leading-[1.8] text-[var(--text-muted)]">目录中已经接入 {{ latestSkills.length }} 个已发布的示例技能。</li>
        </ul>
      </aside>
    </section>

    <section class="mx-auto w-[min(100%_-_32px,var(--page-max-width))] pt-8 max-md:w-[min(100%_-_20px,var(--page-max-width))]">
      <div class="mb-5 flex items-end justify-between gap-4 max-[960px]:flex-col max-[960px]:items-stretch">
        <div>
          <span
            class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
          >
            最新技能
          </span>
          <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.6rem)]">目录中的最新条目</h2>
        </div>
        <RouterLink class="font-extrabold text-[var(--accent)]" to="/skills">查看完整列表</RouterLink>
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
        title="还没有已发布技能"
        description="静态目录已经准备好。添加已发布的 YAML 条目后，这里会展示技能卡片。"
      />
    </section>
  </PublicLayout>
</template>
