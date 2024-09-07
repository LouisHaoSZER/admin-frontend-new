import type { App } from 'vue'
import type { Pinia } from 'pinia'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store: Pinia = createPinia()

// 持久化插件
store.use(piniaPluginPersistedstate)

// 导出函数全局注册Pinia
export function setupStore(app: App<Element>) {
  app.use(store)
}
