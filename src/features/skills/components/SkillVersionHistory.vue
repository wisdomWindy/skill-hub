<script setup lang="ts">
const props = defineProps<{
  renderedChangelog: string
}>()
</script>

<template>
  <section v-if="props.renderedChangelog" class="surface-card version-card" aria-labelledby="version-history-title">
    <span class="eyebrow">Changelog</span>
    <h2 id="version-history-title">Version History</h2>
    <div class="markdown-body version-markdown" v-html="props.renderedChangelog" />
  </section>
</template>

<style scoped>
.version-card {
  padding: 22px;
}

.version-card h2 {
  margin: 14px 0 12px;
  font-size: 20px;
}

.version-markdown {
  color: var(--text-muted);
}

.version-markdown :deep(ul) {
  padding-left: 18px;
}
</style>
