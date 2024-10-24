import type { App } from 'vue'
import size from './module/sizeDirect'
import slide from './module/slideIn'

// 自定义指令
const directives = {
  size,
  slide,
}

// type Directives = keyof typeof directives // { size: "size", slide: "slide" }

export const installDirectives = {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key as keyof typeof directives])
    })
  },
}
