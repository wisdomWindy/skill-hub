<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

function jumpTo(nextPage: number) {
  if (nextPage < 1 || nextPage > props.totalPages || nextPage === props.page) {
    return
  }

  emit('change', nextPage)
}
</script>

<template>
  <nav v-if="props.totalPages > 1" class="pagination-shell" aria-label="Skill pagination">
    <button type="button" class="page-button" :disabled="props.page === 1" @click="jumpTo(props.page - 1)">
      Prev
    </button>

    <button
      v-for="index in props.totalPages"
      :key="index"
      type="button"
      class="page-button"
      :class="{ active: index === props.page }"
      @click="jumpTo(index)"
    >
      {{ index }}
    </button>

    <button
      type="button"
      class="page-button"
      :disabled="props.page === props.totalPages"
      @click="jumpTo(props.page + 1)"
    >
      Next
    </button>
  </nav>
</template>

<style scoped>
.pagination-shell {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.page-button {
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
  border-radius: 999px;
  padding: 10px 14px;
  cursor: pointer;
}

.page-button.active {
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04101a;
  font-weight: 800;
}

.page-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
</style>
