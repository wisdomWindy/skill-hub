<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  actionLabel?: string
  actionTo?: string | Record<string, unknown>
}>()
</script>

<template>
  <div
    class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-7 text-center shadow-[var(--shadow-soft)] backdrop-blur-[18px]"
  >
    <span
      class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
    >
      无结果
    </span>
    <h2 class="my-[18px] mb-2.5">{{ props.title }}</h2>
    <p class="m-0 leading-[1.7] text-[var(--text-muted)]">{{ props.description }}</p>
    <RouterLink
      v-if="props.actionLabel && props.actionTo"
      class="mt-[18px] inline-flex items-center justify-center rounded-full bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] px-4 py-3 font-extrabold text-[#04101a]"
      :to="props.actionTo"
    >
      {{ props.actionLabel }}
    </RouterLink>
  </div>
</template>
