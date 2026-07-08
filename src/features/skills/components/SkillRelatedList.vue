<script setup lang="ts">
import type { SkillSummary } from '@/types/skill'

const props = defineProps<{
  skills: SkillSummary[]
  categoryLabels: Record<string, string>
}>()
</script>

<template>
  <section
    v-if="props.skills.length"
    class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-[22px] shadow-[var(--shadow-soft)] backdrop-blur-[18px]"
    aria-labelledby="related-title"
  >
    <span
      class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
    >
      Related
    </span>
    <h2 id="related-title" class="mt-[14px] mb-4 text-xl">Similar Skills</h2>

    <div class="grid gap-2.5">
      <RouterLink
        v-for="skill in props.skills"
        :key="skill.id"
        class="grid gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-muted)] p-[14px]"
        :to="`/skills/${skill.id}`"
      >
        <strong class="text-[15px]">{{ skill.name }}</strong>
        <span class="text-[13px] text-[var(--text-muted)]">
          {{ props.categoryLabels[skill.category] || skill.category }} · {{ skill.version }}
        </span>
      </RouterLink>
    </div>
  </section>
</template>
