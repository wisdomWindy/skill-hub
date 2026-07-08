<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  command: string
}>()

const copyState = ref<'idle' | 'success' | 'error'>('idle')

const feedbackText = computed(() => {
  if (copyState.value === 'success') {
    return '命令已复制'
  }

  if (copyState.value === 'error') {
    return '复制失败'
  }

  return '可复制安装命令'
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
  <section
    class="flex flex-col gap-[18px] rounded-[var(--radius-lg)] border border-[rgba(0,212,170,0.34)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-[18px]"
    aria-labelledby="install-command-title"
  >
    <div class="flex items-start justify-between gap-4 max-[520px]:flex-col">
      <div>
        <span
          class="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent-soft)] px-[14px] py-2 text-[13px] font-bold tracking-[0.08em] text-[var(--accent)] uppercase"
        >
          安装
        </span>
        <h2 id="install-command-title" class="mt-[14px] text-[22px]">安装命令</h2>
      </div>
      <button
        type="button"
        class="min-h-10 cursor-pointer rounded-full border-0 bg-linear-to-br from-[var(--accent)] to-[var(--accent-strong)] px-4 font-extrabold text-[#04101a] max-[520px]:w-full"
        @click="copyInstallCommand"
      >
        复制
      </button>
    </div>

    <pre class="m-0 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[rgba(2,6,23,0.82)] p-4"><code class="font-mono leading-[1.7] whitespace-pre text-[#d1fae5]">{{ props.command }}</code></pre>
    <p
      class="m-0 min-h-5 text-sm font-bold"
      :class="{
        'text-[var(--accent)]': copyState === 'success',
        'text-[#fca5a5]': copyState === 'error',
        'text-[var(--text-muted)]': copyState === 'idle',
      }"
    >
      {{ feedbackText }}
    </p>
  </section>
</template>
