<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { loadSiteConfig } from '@/content/config/site-config'

import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const siteConfig = loadSiteConfig()

const currentLabel = computed(() => {
  if (route.name === 'skills') {
    return 'Skill Directory'
  }

  if (route.name === 'skill-detail') {
    return 'Skill Detail'
  }

  return 'Static Delivery'
})
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-[22px]">
    <div
      class="mx-auto flex w-[min(100%_-_32px,var(--page-max-width))] items-center justify-between gap-[18px] py-[18px] max-[960px]:w-[min(100%_-_20px,var(--page-max-width))] max-[960px]:flex-col max-[960px]:items-stretch"
    >
      <RouterLink class="flex items-center gap-[14px]" to="/">
        <span
          class="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] font-extrabold text-[#04101a]"
        >
          SH
        </span>
        <div>
          <div class="text-lg font-extrabold">{{ siteConfig.site.title }}</div>
          <div class="text-[13px] text-[var(--text-muted)]">{{ currentLabel }}</div>
        </div>
      </RouterLink>

      <div class="flex items-center gap-3 max-[960px]:w-full max-[960px]:flex-wrap">
        <RouterLink class="font-bold text-[var(--text-muted)]" to="/skills">All Skills</RouterLink>
        <input
          class="w-[280px] rounded-full border border-[var(--border)] bg-white/4 px-[18px] py-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)] max-[960px]:w-full"
          disabled
          placeholder="Search wiring arrives in the next module"
        />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
