<script setup lang="ts">
const props = defineProps<{
  renderedChangelog: string
}>()
</script>

<template>
  <section
    v-if="props.renderedChangelog"
    class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-[22px] shadow-[var(--shadow-soft)] backdrop-blur-[18px]"
    aria-labelledby="version-history-title"
  >
    <span
      class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
    >
      Changelog
    </span>
    <h2 id="version-history-title" class="mt-[14px] mb-3 text-xl">Version History</h2>
    <div class="markdown-body text-[var(--text-muted)] [&_ul]:pl-[18px]" v-html="props.renderedChangelog" />
  </section>
</template>
