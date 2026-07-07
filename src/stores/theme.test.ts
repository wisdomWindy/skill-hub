import { beforeEach, describe, expect, it } from 'vitest'

import { THEME_STORAGE_KEY, applyThemeToDocument, resolveInitialTheme } from '@/stores/theme'

describe('theme store helpers', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.dataset.theme = ''
  })

  it('falls back to system theme when no local value exists', () => {
    expect(resolveInitialTheme()).toBe('dark')
  })

  it('uses stored theme preference when available', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light')

    expect(resolveInitialTheme()).toBe('light')
  })

  it('applies theme to the root dataset', () => {
    applyThemeToDocument('light')

    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
