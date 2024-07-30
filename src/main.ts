import { createApp } from 'vue'
import piniaPersistPlugin from 'pinia-plugin-persistedstate'
import pinia from './ui/stores'
import App from './ui/App.vue'
import { router } from './ui/router'
import 'virtual:uno.css'
import 'reflect-metadata'

createApp(App)
  .use(pinia.use(piniaPersistPlugin))
  .use(router)
  .mount('#app')
