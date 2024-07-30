import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'

import { createAutoImport } from './auto-import'
import { createComponents } from './components'
import { createLayouts } from './layouts'
import { createVueRouter } from './vue-router'

export function createVitePlugins() {
  const vitePlugins: Array<PluginOption | PluginOption[]> = [
    createVueRouter(),
    createAutoImport(),
    createComponents(),
    vue(),
    createLayouts(),
    UnoCss(),
  ]
  return vitePlugins
}
