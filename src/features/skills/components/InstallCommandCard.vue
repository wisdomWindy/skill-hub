<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  command: string
}>()

const copyState = ref<'idle' | 'success' | 'error'>('idle')

const feedbackText = computed(() => {
  if (copyState.value === 'success') {
    return 'Command copied'
  }

  if (copyState.value === 'error') {
    return 'Copy failed'
  }

  return 'Ready to copy'
})

async function copyInstallCommand() {
  copyState.value = 'idle'

  try {
    if (!navigator?.clipboard?.writeText) {
      throw new Error('Clipboard API unavailable')
    }

    await navigator.clipboard.writeText(props.command)
    copyState.value = 'success'
  } catch {
    copyState.value = 'error'
  }
}
</script>

<template>
  <section class="surface-card install-card" aria-labelledby="install-command-title">
    <div class="install-card-header">
      <div>
        <span class="eyebrow">Install</span>
        <h2 id="install-command-title">Install Command</h2>
      </div>
      <button type="button" class="copy-button" @click="copyInstallCommand">Copy</button>
    </div>

    <pre class="command-block"><code>{{ props.command }}</code></pre>
    <p class="copy-feedback" :class="copyState">{{ feedbackText }}</p>
  </section>
</template>

<style scoped>
.install-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border-color: rgba(0, 212, 170, 0.34);
}

.install-card-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
}

.install-card h2 {
  margin: 14px 0 0;
  font-size: 22px;
}

.copy-button {
  min-height: 40px;
  border: 0;
  border-radius: 999px;
  padding: 0 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04101a;
  cursor: pointer;
  font-weight: 800;
}

.command-block {
  margin: 0;
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: rgba(2, 6, 23, 0.82);
  padding: 16px;
}

.command-block code {
  color: #d1fae5;
  font-family:
    "JetBrains Mono",
    "SFMono-Regular",
    monospace;
  line-height: 1.7;
  white-space: pre;
}

.copy-feedback {
  min-height: 20px;
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 700;
}

.copy-feedback.success {
  color: var(--accent);
}

.copy-feedback.error {
  color: #fca5a5;
}

@media (max-width: 520px) {
  .install-card-header {
    flex-direction: column;
  }

  .copy-button {
    width: 100%;
  }
}
</style>
