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
  <RouterLink :to="`/skills/${props.skill.id}`" class="surface-card skill-card">
    <div class="card-topline">
      <span class="category-pill">{{ categoryLabel }}</span>
      <strong class="version-pill">{{ props.skill.version }}</strong>
    </div>

    <div class="card-heading">
      <div v-if="props.skill.icon" class="icon-shell">
        <img :src="props.skill.icon" :alt="`${props.skill.name} icon`" />
      </div>
      <div v-else class="icon-shell icon-fallback">{{ resolveInitials(props.skill.name) }}</div>

      <div>
        <h2>{{ props.skill.name }}</h2>
        <p>{{ props.skill.shortDesc }}</p>
      </div>
    </div>

    <div class="tag-row">
      <span v-for="tag in props.skill.tags" :key="tag">{{ tag }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.skill-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.skill-card:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 212, 170, 0.35);
}

.card-topline,
.tag-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.category-pill,
.version-pill,
.tag-row span {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 13px;
}

.category-pill {
  background: var(--accent-soft);
  color: var(--accent);
}

.version-pill,
.tag-row span {
  background: var(--bg-muted);
  color: var(--text-muted);
}

.card-heading {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.card-heading h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.card-heading p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.7;
}

.icon-shell {
  flex: 0 0 auto;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
}

.icon-shell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #04101a;
  font-weight: 800;
  letter-spacing: 0.08em;
}
</style>
