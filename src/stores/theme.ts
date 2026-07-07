import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ThemeMode = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'skillhub-theme'

export function resolveSystemTheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark' as ThemeMode
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark' as ThemeMode
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme
  }

  return resolveSystemTheme()
}

export function applyThemeToDocument(theme: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.theme = theme
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeMode>(resolveInitialTheme())

  function setTheme(nextTheme: ThemeMode) {
    theme.value = nextTheme
    applyThemeToDocument(nextTheme)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    }
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  applyThemeToDocument(theme.value)

  return {
    theme,
    setTheme,
    toggleTheme,
  }
})
