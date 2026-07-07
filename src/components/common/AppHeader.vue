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
  <header class="header-shell">
    <div class="app-container header-inner">
      <RouterLink class="brand-mark" to="/">
        <span class="brand-logo">SH</span>
        <div>
          <div class="brand-title">{{ siteConfig.site.title }}</div>
          <div class="brand-subtitle">{{ currentLabel }}</div>
        </div>
      </RouterLink>

      <div class="header-actions">
        <RouterLink class="nav-link" to="/skills">All Skills</RouterLink>
        <input class="ghost-input search-shell" disabled placeholder="Search wiring arrives in the next module" />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-shell {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(22px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04101a;
  font-weight: 800;
}

.brand-title {
  font-size: 18px;
  font-weight: 800;
}

.brand-subtitle {
  color: var(--text-muted);
  font-size: 13px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-link {
  color: var(--text-muted);
  font-weight: 700;
}

.search-shell {
  width: 280px;
}

@media (max-width: 960px) {
  .header-inner {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .search-shell {
    width: 100%;
  }
}
</style>
