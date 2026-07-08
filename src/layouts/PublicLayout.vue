<script setup lang="ts">
import AppFooter from '@/components/common/AppFooter.vue'
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
