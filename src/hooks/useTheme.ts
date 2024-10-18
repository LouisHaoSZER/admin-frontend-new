import { useThemeStore } from '@/ui/stores/modules/theme'

/**
 *  主题切换hooks
 */
export const useTheme = () => {
  const theme = ref<'sunny' | 'moon'>('sunny')
  const mode = ref<'light' | 'dark'>('light')
  const toggleTheme = () => {
    theme.value = theme.value === 'sunny' ? 'moon' : 'sunny'
    mode.value = mode.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('theme-mode', mode.value)
    useThemeStore().setTheme(mode.value)
  }
  return {
    theme,
    toggleTheme,
  }
}
