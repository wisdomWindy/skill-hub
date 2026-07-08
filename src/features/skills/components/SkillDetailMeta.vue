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
  <header class="detail-meta">
    <div v-if="props.skill.icon" class="detail-icon">
      <img :src="props.skill.icon" :alt="`${props.skill.name} icon`" />
    </div>
    <div v-else class="detail-icon icon-fallback">{{ resolveInitials(props.skill.name) }}</div>

    <div class="detail-copy">
      <div class="meta-pills">
        <span>{{ categoryLabel }}</span>
        <strong>{{ props.skill.version }}</strong>
        <span v-if="props.skill.installCount > 0">{{ props.skill.installCount }} installs</span>
      </div>
      <h1>{{ props.skill.name }}</h1>
      <p>{{ props.skill.shortDesc }}</p>
      <dl class="meta-list">
        <div>
          <dt>Updated</dt>
          <dd>{{ props.skill.updatedAt }}</dd>
        </div>
      </dl>
    </div>
  </header>
</template>

<style scoped>
.detail-meta {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.detail-icon {
  width: 82px;
  height: 82px;
  border-radius: 22px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
}

.detail-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #04101a;
  font-size: 22px;
  font-weight: 900;
}

.detail-copy {
  min-width: 0;
}

.meta-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.meta-pills span,
.meta-pills strong {
  border-radius: 999px;
  padding: 7px 10px;
  background: var(--bg-muted);
  color: var(--text-muted);
  font-size: 13px;
}

.meta-pills strong {
  background: var(--accent-soft);
  color: var(--accent);
}

.detail-copy h1 {
  margin: 18px 0 12px;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.06;
}

.detail-copy p {
  max-width: 720px;
  margin: 0;
  color: var(--text-muted);
  line-height: 1.75;
}

.meta-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 18px 0 0;
}

.meta-list div {
  display: grid;
  gap: 4px;
}

.meta-list dt,
.meta-list dd {
  margin: 0;
}

.meta-list dt {
  color: var(--text-muted);
  font-size: 13px;
}

.meta-list dd {
  font-weight: 800;
}

@media (max-width: 640px) {
  .detail-meta {
    grid-template-columns: 1fr;
  }
}
</style>
