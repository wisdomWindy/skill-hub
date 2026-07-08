<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <button
    class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-[14px] py-3 text-[var(--text)]"
    type="button"
    @click="themeStore.toggleTheme()"
  >
    <span>{{ theme === 'dark' ? '深色' : '浅色' }}</span>
    <strong class="text-[var(--accent)]">主题</strong>
  </button>
</template>
