<script setup lang="ts">
import type { SkillSummary } from '@/types/skill'

const props = defineProps<{
  skill: SkillSummary
  categoryLabel: string
}>()

function resolveInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<template>
  <RouterLink
    :to="`/skills/${props.skill.id}`"
    class="flex flex-col gap-[18px] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-[22px] shadow-[var(--shadow-soft)] backdrop-blur-[18px] transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-[3px] hover:border-[rgba(0,212,170,0.35)]"
  >
    <div class="flex flex-wrap items-center gap-2.5">
      <span class="rounded-full bg-[var(--accent-soft)] px-2.5 py-1.5 text-[13px] text-[var(--accent)]">
        {{ categoryLabel }}
      </span>
      <strong class="rounded-full bg-[var(--bg-muted)] px-2.5 py-1.5 text-[13px] text-[var(--text-muted)]">
        {{ props.skill.version }}
      </strong>
    </div>

    <div class="flex items-start gap-4">
      <div
        v-if="props.skill.icon"
        class="h-14 w-14 flex-none overflow-hidden rounded-[18px] bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)]"
      >
        <img class="h-full w-full object-cover" :src="props.skill.icon" :alt="`${props.skill.name} 图标`" />
      </div>
      <div
        v-else
        class="inline-flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-[18px] bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] font-extrabold tracking-[0.08em] text-[#04101a]"
      >
        {{ resolveInitials(props.skill.name) }}
      </div>

      <div>
        <h2 class="mb-2.5 text-[22px]">{{ props.skill.name }}</h2>
        <p class="m-0 leading-[1.7] text-[var(--text-muted)]">{{ props.skill.shortDesc }}</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2.5">
      <span
        v-for="tag in props.skill.tags"
        :key="tag"
        class="rounded-full bg-[var(--bg-muted)] px-2.5 py-1.5 text-[13px] text-[var(--text-muted)]"
      >
        {{ tag }}
      </span>
    </div>
  </RouterLink>
</template>
