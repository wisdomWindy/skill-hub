<script setup lang="ts">
import type { SkillSummary } from '@/types/skill'

const props = defineProps<{
  skills: SkillSummary[]
  categoryLabels: Record<string, string>
}>()
</script>

<template>
  <section v-if="props.skills.length" class="surface-card related-card" aria-labelledby="related-title">
    <span class="eyebrow">Related</span>
    <h2 id="related-title">Similar Skills</h2>

    <div class="related-list">
      <RouterLink
        v-for="skill in props.skills"
        :key="skill.id"
        class="related-item"
        :to="`/skills/${skill.id}`"
      >
        <strong>{{ skill.name }}</strong>
        <span>{{ props.categoryLabels[skill.category] || skill.category }} · {{ skill.version }}</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.related-card {
  padding: 22px;
}

.related-card h2 {
  margin: 14px 0 16px;
  font-size: 20px;
}

.related-list {
  display: grid;
  gap: 10px;
}

.related-item {
  display: grid;
  gap: 6px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-muted);
  padding: 14px;
}

.related-item strong {
  font-size: 15px;
}

.related-item span {
  color: var(--text-muted);
  font-size: 13px;
}
</style>
