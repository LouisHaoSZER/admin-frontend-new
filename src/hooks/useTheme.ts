/**
 *  主题切换hooks
 */
// TODO: 做缓存
export const useTheme = () => {
  const theme = ref('sunny')
  const mode = ref('light')
  const toggleTheme = () => {
    theme.value = theme.value === 'sunny' ? 'moon' : 'sunny'
    mode.value = mode.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('theme-mode', mode.value)
  }
  return {
    theme,
    toggleTheme,
  }
}
