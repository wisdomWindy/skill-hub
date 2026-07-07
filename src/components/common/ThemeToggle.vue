<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <button class="theme-toggle" type="button" @click="themeStore.toggleTheme()">
    <span>{{ theme === 'dark' ? 'Dark' : 'Light' }}</span>
    <strong>Theme</strong>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elevated);
  color: var(--text);
  cursor: pointer;
}

.theme-toggle strong {
  color: var(--accent);
}
</style>
