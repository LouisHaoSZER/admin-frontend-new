import NProgress from 'nprogress' // 导入 NProgress
import 'nprogress/nprogress.css' // 导入 NProgress 的样式
import type { NavigationFailure, NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useUserStore } from '@/ui/stores/modules/user'
import { RouteConstant } from '@/constants/routes'

// 配置 NProgress 跳转样式
NProgress.configure({
  showSpinner: false, // 是否显示旋转进度条
  easing: 'ease', // 进度条动画方式
  speed: 500, // 进度条动画速度
  minimum: 0.3, // 进度条最小百分比
  trickleSpeed: 200, // 自动递增的速度 ms
})

// 路由守卫构造器
export function createRouteGuards(router: Router) {
// 前置路由守卫
// @ts-expect-error 参数未使用
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    NProgress.start() // 开始进度条
    // 1. 判断是否需要登录
    const userStore = useUserStore()
    if (userStore.authInfo.accessToken !== undefined && userStore.authInfo.accessToken.length >= 57) {
      // 已经登陆后
      // 1. 判断是否访问的是login登录界面
      if (to.path === RouteConstant.LOGIN_PATH) {
        // 1.1 如果已经登陆 重定向到首页
        next({ path: RouteConstant.HOME_PATH })
        NProgress.done()
      }
      else {
        // 1.2 本后台角色全部都是管理员权限 无需判断权限
        if (to.matched.length === 0) {
          // 1.2 如果访问的路由不存在 重定向到404
          next({ path: RouteConstant.NOT_FOUND_PATH })
          NProgress.done()
        }
        else {
          // 1.2 如果访问的路由存在 直接放行
          next()
        }
      }
    }
    else {
      // 2. 未登录
      // 2.1 判断访问页面是否在守卫路由白名单中
      if (RouteConstant.GUARD_LIST_WHITELIST.includes(to.path)) {
        // 2.1.1 如果在白名单中 直接放行
        next()
      }
    }
  })
  // 后置路由守卫
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized, failure?: NavigationFailure | void) => {
    console.info('路由跳转完成', to, from, failure)
    NProgress.done() // 结束进度条
    // TODO:更新网页Tag页签标题和icon
  })
  // 路由错误处理
  router.onError((error, to: RouteLocationNormalized, form: RouteLocationNormalizedLoaded) => {
    NProgress.done() // 结束进度条
    console.error('路由错误', error, to, form)
  })
}
