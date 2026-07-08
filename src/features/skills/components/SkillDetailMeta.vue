<script setup lang="ts">
import type { SkillDetail } from '@/types/skill'

const props = defineProps<{
  skill: SkillDetail
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
  <header class="grid grid-cols-[82px_minmax(0,1fr)] items-start gap-5 max-[640px]:grid-cols-1">
    <div
      v-if="props.skill.icon"
      class="h-[82px] w-[82px] overflow-hidden rounded-[22px] bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)]"
    >
      <img class="h-full w-full object-cover" :src="props.skill.icon" :alt="`${props.skill.name} icon`" />
    </div>
    <div
      v-else
      class="inline-flex h-[82px] w-[82px] items-center justify-center overflow-hidden rounded-[22px] bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] text-[22px] font-black text-[#04101a]"
    >
      {{ resolveInitials(props.skill.name) }}
    </div>

    <div class="min-w-0">
      <div class="flex flex-wrap gap-2.5">
        <span class="rounded-full bg-[var(--bg-muted)] px-2.5 py-[7px] text-[13px] text-[var(--text-muted)]">
          {{ categoryLabel }}
        </span>
        <strong class="rounded-full bg-[var(--accent-soft)] px-2.5 py-[7px] text-[13px] text-[var(--accent)]">
          {{ props.skill.version }}
        </strong>
        <span
          v-if="props.skill.installCount > 0"
          class="rounded-full bg-[var(--bg-muted)] px-2.5 py-[7px] text-[13px] text-[var(--text-muted)]"
        >
          {{ props.skill.installCount }} installs
        </span>
      </div>
      <h1 class="my-[18px] mb-3 text-[clamp(2rem,4vw,3.6rem)] leading-[1.06]">{{ props.skill.name }}</h1>
      <p class="m-0 max-w-[720px] leading-[1.75] text-[var(--text-muted)]">{{ props.skill.shortDesc }}</p>
      <dl class="mt-[18px] flex flex-wrap gap-4">
        <div class="grid gap-1">
          <dt class="m-0 text-[13px] text-[var(--text-muted)]">Updated</dt>
          <dd class="m-0 font-extrabold">{{ props.skill.updatedAt }}</dd>
        </div>
      </dl>
    </div>
  </header>
</template>
