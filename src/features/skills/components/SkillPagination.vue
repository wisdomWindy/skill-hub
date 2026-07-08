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
  <nav v-if="props.totalPages > 1" class="flex flex-wrap items-center gap-2.5" aria-label="Skill pagination">
    <button
      type="button"
      class="cursor-pointer rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-[14px] py-2.5 text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-45"
      :disabled="props.page === 1"
      @click="jumpTo(props.page - 1)"
    >
      Prev
    </button>

    <button
      v-for="index in props.totalPages"
      :key="index"
      type="button"
      class="cursor-pointer rounded-full border border-[var(--border)] px-[14px] py-2.5"
      :class="
        index === props.page
          ? 'bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] font-extrabold text-[#04101a]'
          : 'bg-[var(--bg-elevated)] text-[var(--text)]'
      "
      @click="jumpTo(index)"
    >
      {{ index }}
    </button>

    <button
      type="button"
      class="cursor-pointer rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-[14px] py-2.5 text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-45"
      :disabled="props.page === props.totalPages"
      @click="jumpTo(props.page + 1)"
    >
      Next
    </button>
  </nav>
</template>
