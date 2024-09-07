import { createApp } from 'vue'

import { setupStore } from './ui/stores'
import App from './ui/App.vue'
import { router } from './ui/router'
import 'virtual:uno.css'
import 'reflect-metadata'
import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)
setupStore(app) // 全局注册pinia
app.use(router)
app.mount('#app')
