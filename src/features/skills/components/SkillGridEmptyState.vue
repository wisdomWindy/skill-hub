<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  actionLabel?: string
  actionTo?: string | Record<string, unknown>
}>()
</script>

<template>
  <div class="surface-card empty-shell">
    <span class="eyebrow">No Results</span>
    <h2>{{ props.title }}</h2>
    <p>{{ props.description }}</p>
    <RouterLink v-if="props.actionLabel && props.actionTo" class="reset-link" :to="props.actionTo">
      {{ props.actionLabel }}
    </RouterLink>
  </div>
</template>

<style scoped>
.empty-shell {
  padding: 28px;
  text-align: center;
}

.empty-shell h2 {
  margin: 18px 0 10px;
}

.empty-shell p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.7;
}

.reset-link {
  display: inline-flex;
  margin-top: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04101a;
  font-weight: 800;
}
</style>
