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
      || '## 暂无详情\n\n这个已发布技能还没有补充详细说明。',
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
  title: skill.value ? `${skill.value.name} · SkillHub` : '技能详情 · SkillHub',
  meta: [
    {
      property: 'og:title',
      content: skill.value ? `${skill.value.name} · SkillHub` : '技能详情 · SkillHub',
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
    <section class="mx-auto w-[min(100%_-_32px,var(--page-max-width))] pt-[34px] max-md:w-[min(100%_-_20px,var(--page-max-width))]">
      <nav class="mb-[18px] flex flex-wrap items-center gap-2.5 text-sm text-[var(--text-muted)]" aria-label="面包屑">
        <RouterLink class="font-extrabold text-[var(--accent)]" to="/skills">技能</RouterLink>
        <span>/</span>
        <span>{{ skill?.name || '未找到技能' }}</span>
      </nav>

      <div v-if="skill" class="grid grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-[22px] max-[960px]:grid-cols-1">
        <main class="grid gap-[18px]">
          <article
            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-soft)] backdrop-blur-[18px] max-[640px]:p-[22px]"
          >
            <SkillDetailMeta :skill="skill" :category-label="categoryLabel" />
          </article>

          <article
            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-soft)] backdrop-blur-[18px] max-[640px]:p-[22px]"
          >
            <span
              class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
            >
              详情
            </span>
            <div class="markdown-body mt-[18px]" v-html="renderedDescription" />
          </article>

          <article
            v-if="renderedUsageExamples.length"
            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-soft)] backdrop-blur-[18px] max-[640px]:p-[22px]"
          >
            <span
              class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
            >
              示例
            </span>
            <h2 class="my-4 mb-[14px] text-[clamp(1.6rem,3vw,2.4rem)]">使用示例</h2>
            <div class="grid gap-[18px]">
              <section
                v-for="example in renderedUsageExamples"
                :key="example.title"
                class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-muted)] p-[18px]"
              >
                <h3 class="mb-3 text-lg">{{ example.title }}</h3>
                <div class="markdown-body" v-html="example.html" />
              </section>
            </div>
          </article>
        </main>

        <aside class="sticky top-[104px] grid self-start gap-[18px] max-[960px]:static max-[960px]:order-first">
          <InstallCommandCard :command="skill.installCommand" />
          <SkillVersionHistory :rendered-changelog="renderedChangelog" />
          <SkillRelatedList :skills="relatedSkills" :category-labels="categoryLabelMap" />
        </aside>
      </div>

      <article
        v-else
        class="max-w-[680px] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-soft)] backdrop-blur-[18px] max-[640px]:p-[22px]"
      >
        <span
          class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
        >
          未找到
        </span>
        <h1 class="my-4 mb-[14px] text-[clamp(1.6rem,3vw,2.4rem)]">未找到技能</h1>
        <p class="leading-[1.75] text-[var(--text-muted)]">这个技能尚未发布，或不存在于静态目录中。</p>
        <RouterLink class="mt-3 inline-flex font-extrabold text-[var(--accent)]" to="/skills">返回目录</RouterLink>
      </article>
    </section>
  </PublicLayout>
</template>
