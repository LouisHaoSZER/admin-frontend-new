import { defineStore } from 'pinia'

interface ThemeState {
  currentTheme: 'light' | 'dark'
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: 'light',
  }),

  getters: {
    isDarkMode: state => state.currentTheme === 'dark',
  },

  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.currentTheme = theme
    },
  },
})
