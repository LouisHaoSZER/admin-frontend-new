import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import '@/ui/stores'

const history = createWebHistory()

export const router = createRouter({
  history,
  extendRoutes: (routes) => {
    const res = setupLayouts(routes)
    return res
  },
})

router.afterEach((to) => {
  const items = [import.meta.env.VITE_APP_TITLE]
  if (to.meta.parentTitle != null) {
    items.unshift(to.meta.parentTitle)
  }
  document.title = items.join(' · ')
})
