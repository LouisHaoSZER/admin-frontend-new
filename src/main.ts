// @ts-expect-error waitting to add ts support
import UI from '@repo/ui'

import { createApp } from 'vue'
import App from './ui/App.vue'
import { installDirectives } from './ui/directives'
import { router } from './ui/router'
import { setupStore } from './ui/stores'
import 'virtual:uno.css'
import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)
setupStore(app) // 全局注册pinia
app.use(router)
installDirectives.install(app)
app.use(UI)
app.mount('#app')
