import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouteGuards } from './core/RoutesGuards'
import '@/ui/stores'

const history = createWebHistory()

export const router = createRouter({
  history,
  extendRoutes: (routes) => {
    const res = setupLayouts(routes)
    return res
  },
})

// 注册路由守卫
createRouteGuards(router)
